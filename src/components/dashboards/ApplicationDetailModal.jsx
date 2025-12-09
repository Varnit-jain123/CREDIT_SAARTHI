// src/components/ApplicationDetailModal.jsx
import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const ApplicationDetailModal = ({ app, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Beneficiary Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Beneficiary Details
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Name:</span> {app.name}
              </div>
              <div>
                <span className="font-medium">Applicant ID:</span> {app.applicantId}
              </div>
              <div>
                <span className="font-medium">Account No:</span> 1234567890
              </div>
              <div>
                <span className="font-medium">Occupation:</span> Small Business Owner
              </div>
              <div>
                <span className="font-medium">Location:</span> Mumbai, Maharashtra
              </div>
              <div>
                <span className="font-medium">Ration Card:</span> APL
              </div>
              <div>
                <span className="font-medium">Gov Benefits:</span> PMJDY Enrolled
              </div>
            </div>
          </div>

          {/* Score Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Credit Assessment
            </h3>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {app.compositeScore}
              </div>
              <div className="text-sm text-gray-600">Composite Score</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">72</div>
                <div className="text-xs text-gray-600">Income Score</div>
              </div>
              <div className="bg-white rounded p-3 text-center">
                <div className="text-2xl font-bold text-green-600">68</div>
                <div className="text-xs text-gray-600">Repayment Score</div>
              </div>
            </div>
            <div className="bg-white rounded p-3 mb-4">
              <div className="text-sm text-gray-600 mb-1">
                Weighting: 70% Income / 30% Repayment
              </div>
              <div className="text-sm font-semibold text-gray-800">
                Model Opinion: {app.riskBand} Risk
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Approve
              </button>
              <button className="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition">
                Clarify
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t pt-6">
          <div className="flex gap-4 mb-6 border-b">
            <button className="pb-2 px-4 border-b-2 border-blue-600 text-blue-600 font-medium">
              Scores & Explanation
            </button>
            <button className="pb-2 px-4 text-gray-600 hover:text-gray-800">
              Documents
            </button>
            <button className="pb-2 px-4 text-gray-600 hover:text-gray-800">
              Timeline
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Top Score Drivers</h4>
            <div className="space-y-3">
              {[
                { text: 'High EMI-to-income ratio (35%)', impact: 'Negative', color: 'red' },
                { text: 'Good timely payment ratio (92%)', impact: 'Positive', color: 'green' },
                { text: 'Moderate income stability', impact: 'Neutral', color: 'yellow' },
                { text: 'Limited credit history', impact: 'Negative', color: 'red' },
                { text: 'Government benefits enrollment', impact: 'Positive', color: 'green' }
              ].map((driver, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white rounded"
                >
                  <span className="text-gray-800">{driver.text}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      driver.color === 'green'
                        ? 'bg-green-100 text-green-700'
                        : driver.color === 'yellow'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {driver.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example extra alert row (optional) */}
        <div className="mt-6 flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-700">
            This is a demo view for explanation-only purposes.
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ApplicationDetailModal;
