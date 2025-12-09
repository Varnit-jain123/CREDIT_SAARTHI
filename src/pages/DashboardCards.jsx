// DashboardCards.jsx
import React from 'react';
import { FiCheckCircle, FiClock, FiXCircle, FiFileText, FiUpload } from 'react-icons/fi';
// Uses SheetJS to parse CSV/xlsx/xls reliably in the browser
import * as XLSX from 'xlsx';

const DashboardCards = ({ applications, setApplications }) => {
  const stats = {
    approved: applications.filter(app => app.status === 'approved').length,
    pending: applications.filter(app => app.status === 'pending').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    total: applications.length
  };

  const cards = [
    { title: "Total Applications", value: stats.total, icon: <FiFileText className="text-3xl text-purple-600" />, bgColor: "from-purple-50 to-purple-100", borderColor: "border-purple-200", accentColor: "bg-purple-100" },
    { title: "Approved", value: stats.approved, icon: <FiCheckCircle className="text-3xl text-emerald-600" />, bgColor: "from-emerald-50 to-emerald-100", borderColor: "border-emerald-200", accentColor: "bg-emerald-100" },
    { title: "Pending", value: stats.pending, icon: <FiClock className="text-3xl text-amber-600" />, bgColor: "from-amber-50 to-amber-100", borderColor: "border-amber-200", accentColor: "bg-amber-100" },
    { title: "Rejected", value: stats.rejected, icon: <FiXCircle className="text-3xl text-rose-600" />, bgColor: "from-rose-50 to-rose-100", borderColor: "border-rose-200", accentColor: "bg-rose-100" }
  ];

  const clampScore = (score, min = 300, max = 900) => Math.max(min, Math.min(max, score));

  // Helper: try find id column header index (case-insensitive)
  const findIdIndex = (headers) => {
    if (!headers || !Array.isArray(headers)) return -1;
    for (let i = 0; i < headers.length; i++) {
      const h = String(headers[i] || '').trim().toLowerCase();
      if (h === 'id' || h === 'ids' || h === 'identifier') return i;
    }
    return -1;
  };

  // Primary file handler (accepts csv/xls/xlsx/xlsb/etc.)
  const handleFileChange = async (e) => {
    if (typeof setApplications !== 'function') {
      console.error('DashboardCards: setApplications is not provided. Upload disabled.');
      alert('Upload disabled: updater not available. See console.');
      e.target.value = '';
      return;
    }

    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      // Read file as ArrayBuffer for SheetJS
      const ab = await file.arrayBuffer();
      const workbook = XLSX.read(ab, { type: 'array' });

      // We'll take the first sheet
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        alert('No sheets found in file.');
        e.target.value = '';
        return;
      }
      const sheet = workbook.Sheets[firstSheetName];

      // Convert sheet to JSON array of arrays (raw)
      // use header:1 to get rows as arrays so we can support files with/without headers
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      if (!rows || rows.length === 0) {
        alert('Uploaded file is empty.');
        e.target.value = '';
        return;
      }

      // Clean rows: remove empty rows
      const cleaned = rows.map(r => r.map(c => (typeof c === 'string' ? c.trim() : c))).filter(r => r.some(c => String(c).trim() !== ''));

      if (cleaned.length === 0) {
        alert('No data found in uploaded file.');
        e.target.value = '';
        return;
      }

      // Attempt to detect header row: if header row contains 'id' column
      const headerRow = cleaned[0].map(x => String(x).trim());
      const idIdx = findIdIndex(headerRow);

      let ids = [];
      if (idIdx !== -1) {
        // header exists: collect from subsequent rows using idIdx
        for (let i = 1; i < cleaned.length; i++) {
          const row = cleaned[i];
          const val = String((row[idIdx] ?? '')).trim();
          if (val !== '') ids.push(val);
        }
      } else {
        // no header: assume first column of every row is id
        for (let i = 0; i < cleaned.length; i++) {
          const row = cleaned[i];
          const val = String((row[0] ?? '')).trim();
          if (val !== '') ids.push(val);
        }
      }

      if (ids.length === 0) {
        alert('No id values found. Ensure the file contains an "id" column or that the first column contains ids.');
        e.target.value = '';
        return;
      }

      console.info('Parsed ids from upload:', ids);

      // Update applications: only use id values
      setApplications(prevApps => {
        const appsMap = new Map(prevApps.map(a => [String(a.id), { ...a }]));

        ids.forEach(rawId => {
          if (rawId == null) return;
          const idStr = String(rawId).trim();

          // Create candidate keys: exact string, numeric normalized ("05" -> "5"), padded forms
          const candidates = [idStr];
          const numericMatch = idStr.match(/^\d+$/);
          if (numericMatch) {
            const n = parseInt(idStr, 10).toString(); // "05" -> "5"
            candidates.push(n);
            if (n.length < 2) candidates.push(n.padStart(2, '0'));
          }

          // try to find matching existing key
          let existingKey = null;
          for (const c of candidates) {
            if (appsMap.has(c)) { existingKey = c; break; }
          }

          // final attempt: trailing digits of idStr
          if (!existingKey) {
            const trailing = idStr.match(/(\d+)$/);
            if (trailing) {
              const tr = trailing[1].replace(/^0+/, '') || '0';
              if (appsMap.has(tr)) existingKey = tr;
              if (!existingKey && appsMap.has(tr.padStart(2, '0'))) existingKey = tr.padStart(2, '0');
            }
          }

          if (!existingKey) return; // no match

          const existing = appsMap.get(existingKey);

          // Compute last two digits: combine all digits in idStr and take last two
          const digits = (idStr.match(/\d+/g) || []).join('');
          let lastTwo = 0;
          if (digits.length > 0) {
            const lastTwoStr = digits.slice(-2);
            lastTwo = parseInt(lastTwoStr, 10);
            if (Number.isNaN(lastTwo)) lastTwo = 0;
          } else {
            lastTwo = 0;
          }

          const delta = Math.floor(Math.random() * 100) + 1; // 1..100
          let newScore = existing.credit_score;
          if (lastTwo > 25) newScore = existing.credit_score + delta;
          else newScore = existing.credit_score - delta;
          newScore = clampScore(newScore, 300, 900);

          appsMap.set(existingKey, { ...existing, credit_score: newScore });
        });

        // Return array in original order
        return prevApps.map(a => appsMap.get(String(a.id)) || a);
      });

      alert(`Processed upload: ${ids.length} id(s) read and applied.`);
    } catch (err) {
      console.error('CSV/Excel processing error', err);
      alert('Failed to parse uploaded file. Make sure it is a valid CSV/XLS/XLSX file.');
    } finally {
      e.target.value = '';
    }
  };

  const canUpdate = typeof setApplications === 'function';
  if (!canUpdate) console.error('DashboardCards: setApplications is not a function. Upload disabled.');

  return (
    <div>
      {/* Upload area */}
      <div className="mb-4 flex items-center justify-end space-x-3">
        {canUpdate ? (
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <div className="px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg flex items-center space-x-2 hover:bg-slate-700/70 transition-colors">
              <FiUpload className="text-md text-slate-200" />
              <span className="text-sm text-slate-200">Upload IDs (CSV / XLSX / XLS)</span>
            </div>
            <input
              type="file"
              accept=".csv, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload new data spreadsheet"
            />
          </label>
        ) : (
          <div className="px-3 py-2 bg-gray-600/50 border border-gray-500 rounded-lg text-sm text-gray-200">
            Upload disabled — missing updater (see console).
          </div>
        )}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`backdrop-blur-xl bg-gradient-to-br ${card.bgColor} border ${card.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{card.title}</p>
                <p className="text-4xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`p-3 ${card.accentColor} rounded-xl backdrop-blur`}>{card.icon}</div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    index === 0 ? 'bg-purple-500' :
                    index === 1 ? 'bg-emerald-500' :
                    index === 2 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${(card.value / Math.max(stats.total, 1)) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((card.value / Math.max(stats.total, 1)) * 100).toFixed(1)}% of total
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
