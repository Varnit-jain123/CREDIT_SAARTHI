// src/components/dashboards/NBCFDCAdminDashboard.jsx
import React, { useState } from 'react';
import { Home, Building2, FileText, Shield, List, AlertCircle } from 'lucide-react';

const channelPartners = [
  { name: 'XYZ Cooperative Bank', loans: 245, avgScore: 692, defaultRate: '2.4%' },
  { name: 'ABC State Corporation', loans: 189, avgScore: 678, defaultRate: '3.1%' },
  { name: 'National SC/ST Finance', loans: 312, avgScore: 705, defaultRate: '1.8%' },
  { name: 'Regional Development Bank', loans: 156, avgScore: 664, defaultRate: '4.2%' }
];

// Dummy data for state/region distribution heatmap
const stateRegionData = [
  { state: 'Maharashtra', region: 'West', loans: 2450, beneficiaries: 1890, defaultRate: 2.1, risk: 'low' },
  { state: 'Uttar Pradesh', region: 'North', loans: 3120, beneficiaries: 2450, defaultRate: 3.4, risk: 'medium' },
  { state: 'Tamil Nadu', region: 'South', loans: 1890, beneficiaries: 1560, defaultRate: 1.8, risk: 'low' },
  { state: 'West Bengal', region: 'East', loans: 1560, beneficiaries: 1230, defaultRate: 4.2, risk: 'high' },
  { state: 'Gujarat', region: 'West', loans: 1780, beneficiaries: 1450, defaultRate: 2.3, risk: 'low' },
  { state: 'Rajasthan', region: 'North', loans: 1340, beneficiaries: 1120, defaultRate: 3.8, risk: 'medium' },
  { state: 'Karnataka', region: 'South', loans: 2100, beneficiaries: 1780, defaultRate: 2.0, risk: 'low' },
  { state: 'Bihar', region: 'East', loans: 980, beneficiaries: 890, defaultRate: 5.1, risk: 'high' },
  { state: 'Madhya Pradesh', region: 'Central', loans: 1230, beneficiaries: 1020, defaultRate: 3.2, risk: 'medium' },
  { state: 'Odisha', region: 'East', loans: 890, beneficiaries: 780, defaultRate: 3.9, risk: 'medium' },
  { state: 'Punjab', region: 'North', loans: 1120, beneficiaries: 950, defaultRate: 2.5, risk: 'low' },
  { state: 'Kerala', region: 'South', loans: 1450, beneficiaries: 1280, defaultRate: 1.5, risk: 'low' },
];

const getRiskColor = (risk, value) => {
  if (risk === 'low') return 'bg-green-500';
  if (risk === 'medium') return 'bg-yellow-500';
  return 'bg-red-500';
};

const getIntensity = (value, maxValue) => {
  const percentage = (value / maxValue) * 100;
  if (percentage > 80) return 'opacity-100';
  if (percentage > 60) return 'opacity-90';
  if (percentage > 40) return 'opacity-75';
  if (percentage > 20) return 'opacity-60';
  return 'opacity-45';
};

const NBCFDCAdminDashboard = ({ loggedInUser, onLogout }) => {
  const [selectedState, setSelectedState] = useState(null);
  const maxLoans = Math.max(...stateRegionData.map(d => d.loans));
  
  return (
  <div className="min-h-screen bg-gray-50">
    
    <div className="flex">
    
    

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          NBCFDC Admin Dashboard
        </h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Active Beneficiaries</div>
            <div className="text-3xl font-bold text-gray-800">12,458</div>
            <div className="text-xs text-green-600 mt-1">↑ 8.2% from last month</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Total Disbursed</div>
            <div className="text-3xl font-bold text-gray-800">₹248 Cr</div>
            <div className="text-xs text-green-600 mt-1">↑ 12.4% this quarter</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Portfolio Default Rate</div>
            <div className="text-3xl font-bold text-red-600">2.8%</div>
            <div className="text-xs text-green-600 mt-1">↓ 0.3% improvement</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Avg Composite Score</div>
            <div className="text-3xl font-bold text-blue-600">684</div>
            <div className="text-xs text-gray-500 mt-1">Across all channels</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">High-Risk Accounts</div>
            <div className="text-3xl font-bold text-orange-600">892</div>
            <div className="text-xs text-gray-500 mt-1">7.2% of portfolio</div>
          </div>
        </div>

        {/* State Heatmap */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            State / Region Distribution
          </h3>
          
          {/* Interactive Heatmap Grid */}
          <div className="mb-6">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {stateRegionData.map((item, idx) => {
                const intensity = getIntensity(item.loans, maxLoans);
                const colorClass = getRiskColor(item.risk, item.loans);
                
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedState(item)}
                    className={`${colorClass} ${intensity} rounded-lg p-4 cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg border-2 ${
                      selectedState?.state === item.state
                        ? 'border-blue-600 ring-2 ring-blue-300'
                        : 'border-transparent'
                    }`}
                    title={`${item.state}: ${item.loans} loans, ${item.defaultRate}% default rate`}
                  >
                    <div className="text-white text-xs font-semibold mb-1 truncate">
                      {item.state.split(' ')[0]}
                    </div>
                    <div className="text-white text-xs opacity-90">
                      {item.loans}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Darker = More Loans</span>
            </div>
          </div>

          {/* Selected State Details */}
          {selectedState && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{selectedState.state}</h4>
                <button
                  onClick={() => setSelectedState(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Region</div>
                  <div className="font-medium text-gray-800">{selectedState.region}</div>
                </div>
                <div>
                  <div className="text-gray-600">Total Loans</div>
                  <div className="font-medium text-gray-800">{selectedState.loans.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Beneficiaries</div>
                  <div className="font-medium text-gray-800">{selectedState.beneficiaries.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Default Rate</div>
                  <div className={`font-medium ${
                    selectedState.risk === 'high' ? 'text-red-600' :
                    selectedState.risk === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {selectedState.defaultRate}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Channel Partner Performance */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Channel Partner Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Partner Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total Loans
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Default Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {channelPartners.map((partner, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {partner.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {partner.loans}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                        {partner.avgScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {partner.defaultRate}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Distribution & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Risk Band Distribution
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Low Risk', count: 7845, percent: 63, color: 'green' },
                { label: 'Medium Risk', count: 3721, percent: 30, color: 'yellow' },
                { label: 'High Risk', count: 892, percent: 7, color: 'red' }
              ].map((band) => (
                <div key={band.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {band.label}
                    </span>
                    <span className="text-sm text-gray-600">
                      {band.count} ({band.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        band.color === 'green'
                          ? 'bg-green-500'
                          : band.color === 'yellow'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${band.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Policy Alerts
            </h3>
            <div className="space-y-3">
              {[
                { text: 'New compliance requirements effective Jan 2025', type: 'info' },
                { text: 'High default rate detected in Region 3', type: 'warning' },
                { text: 'Q4 disbursement target achieved', type: 'success' },
                { text: 'System maintenance scheduled for Dec 15', type: 'info' }
              ].map((alert, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.type === 'warning'
                      ? 'bg-yellow-50'
                      : alert.type === 'success'
                      ? 'bg-green-50'
                      : 'bg-blue-50'
                  }`}
                >
                  <AlertCircle
                    className={`w-5 h-5 flex-shrink-0 ${
                      alert.type === 'warning'
                        ? 'text-yellow-600'
                        : alert.type === 'success'
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`}
                  />
                  <span className="text-sm text-gray-700">{alert.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default NBCFDCAdminDashboard;
