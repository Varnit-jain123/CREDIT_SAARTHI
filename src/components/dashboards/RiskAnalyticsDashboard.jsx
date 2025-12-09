// src/components/dashboards/RiskAnalyticsDashboard.jsx
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Dummy data for MAE over time
const maeData = [
  { month: 'Jan', mae: 4.5 },
  { month: 'Feb', mae: 4.3 },
  { month: 'Mar', mae: 4.6 },
  { month: 'Apr', mae: 4.2 },
  { month: 'May', mae: 4.1 },
  { month: 'Jun', mae: 4.3 },
  { month: 'Jul', mae: 4.2 },
  { month: 'Aug', mae: 4.0 },
  { month: 'Sep', mae: 4.1 },
  { month: 'Oct', mae: 4.2 },
  { month: 'Nov', mae: 4.0 },
  { month: 'Dec', mae: 4.2 },
];

// Dummy data for Default Rate by Risk Band
const defaultRateData = [
  { riskBand: 'Low Risk', defaultRate: 0.8, accounts: 7845 },
  { riskBand: 'Medium Risk', defaultRate: 3.2, accounts: 3721 },
  { riskBand: 'High Risk', defaultRate: 12.5, accounts: 892 },
];

const RiskAnalyticsDashboard = ({ loggedInUser, onLogout }) => (
  <div className="min-h-screen bg-gray-50">
    

    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Auditor Dashboard
      </h1>

      {/* Model Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Models in Production</div>
          <div className="text-3xl font-bold text-blue-600">3</div>
          <div className="text-xs text-gray-500 mt-1">
            Income / Repayment / Composite
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Last Re-scoring Run</div>
          <div className="text-lg font-bold text-gray-800">Dec 7, 2024</div>
          <div className="text-xs text-gray-500 mt-1">03:45 AM IST</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">Data Drift Alerts</div>
          <div className="text-3xl font-bold text-orange-600">2</div>
          <div className="text-xs text-orange-500 mt-1">
            Requires attention
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-600 mb-1">
            Avg Model Error (MAE)
          </div>
          <div className="text-3xl font-bold text-green-600">4.2%</div>
          <div className="text-xs text-green-500 mt-1">
            Within tolerance
          </div>
        </div>
      </div>

      {/* Model Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Model Error Over Time (MAE)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={maeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                label={{ value: 'MAE (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [`${value}%`, 'MAE']}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="mae" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
                name="Mean Absolute Error"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Default Rate by Risk Band
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defaultRateData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="riskBand" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6b7280"
                label={{ value: 'Default Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value, name, props) => [
                  `${value}% (${props.payload.accounts.toLocaleString()} accounts)`,
                  'Default Rate'
                ]}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Bar 
                dataKey="defaultRate" 
                name="Default Rate"
                radius={[8, 8, 0, 0]}
              >
                {defaultRateData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={
                      entry.riskBand === 'Low Risk' 
                        ? '#10b981' 
                        : entry.riskBand === 'Medium Risk' 
                        ? '#eab308' 
                        : '#ef4444'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Feature Importance / Top Drivers
        </h3>
        <div className="space-y-4">
          {[
            { feature: 'EMI-to-income ratio', importance: 92 },
            { feature: 'Timely payment ratio', importance: 85 },
            { feature: 'Income stability index', importance: 78 },
            { feature: 'Asset score', importance: 65 },
            { feature: 'Gov benefits score', importance: 58 },
          ].map((item) => (
            <div key={item.feature}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {item.feature}
                </span>
                <span className="text-sm text-gray-600">
                  {item.importance}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${item.importance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Re-scoring & Data Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Re-scoring Control Panel
          </h3>
          <div className="space-y-4">
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
            />
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500">
              <option>v2.3.1 (Current Production)</option>
              <option>v2.3.0</option>
              <option>v2.2.5</option>
            </select>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              Trigger Re-scoring (Demo)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Data Quality Panel
          </h3>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs text-gray-500">
                  Channel
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500">
                  Missing Data
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500">
                  Docs Missing
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { channel: 'XYZ Coop Bank', missing: '2.1%', docs: '3.5%' },
                { channel: 'ABC State Corp', missing: '4.8%', docs: '6.2%' },
                { channel: 'National SC/ST', missing: '1.3%', docs: '2.1%' },
                { channel: 'Regional Dev Bank', missing: '7.2%', docs: '9.8%' },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm">{row.channel}</td>
                  <td className="px-4 py-3 text-sm">{row.missing}</td>
                  <td className="px-4 py-3 text-sm">{row.docs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default RiskAnalyticsDashboard;
