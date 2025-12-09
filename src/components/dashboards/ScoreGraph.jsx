import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ScoreGraph = ({ data, scoreType = 'credit' }) => {
  const yAxisDomain = scoreType === 'credit' ? [400, 700] : [0, 100];
  const yAxisLabel = scoreType === 'credit' ? 'Credit Score' : 'Score';
  
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        {scoreType === 'credit' ? 'Credit Score Trend Over Time' : 'Score Trend Over Time'}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              domain={yAxisDomain}
              label={{ 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft',
                offset: -10,
                fill: '#6b7280'
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value) => [value, 'Score']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorScore)"
              name={scoreType === 'credit' ? 'Credit Score' : 'Score'}
              strokeWidth={3}
              dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          {scoreType === 'credit' 
            ? 'This graph shows the pattern of the applicant\'s credit score (400-700 range) over the past 12 months.' 
            : 'This graph shows the pattern of the applicant\'s score over the past 12 months.'}
        </p>
        {scoreType === 'credit' && (
          <p className="mt-2">
            <strong>Interpretation:</strong> 650+ = Auto-Approve, 550-649 = Manual Review, &lt;550 = Reject
          </p>
        )}
      </div>
    </div>
  );
};

export default ScoreGraph;