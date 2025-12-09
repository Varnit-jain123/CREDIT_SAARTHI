// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// const ScoreChart = ({ scores }) => {
//   const data = scores || [
//     { month: 'Jan', composite: 6.8, income: 7.0, repayment: 6.5 },
//     { month: 'Feb', composite: 7.2, income: 7.3, repayment: 7.0 },
//     { month: 'Mar', composite: 7.5, income: 7.6, repayment: 7.4 },
//     { month: 'Apr', composite: 7.8, income: 8.0, repayment: 7.5 },
//     { month: 'May', composite: 8.2, income: 8.3, repayment: 8.0 },
//     { month: 'Jun', composite: 8.5, income: 8.5, repayment: 8.5 },
//   ]

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
//           <p className="font-medium text-gray-800 mb-2">{label}</p>
//           {payload.map((pld, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-1">
//               <div 
//                 className="w-3 h-3 rounded-full" 
//                 style={{ backgroundColor: pld.color }}
//               ></div>
//               <span className="text-sm text-gray-700">{pld.name}:</span>
//               <span className="text-sm font-medium">{pld.value}</span>
//             </div>
//           ))}
//         </div>
//       )
//     }
//     return null
//   }

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//         <XAxis 
//           dataKey="month" 
//           stroke="#666" 
//           tick={{ fill: '#666' }}
//         />
//         <YAxis 
//           stroke="#666" 
//           domain={[0, 10]}
//           tick={{ fill: '#666' }}
//         />
//         <Tooltip content={<CustomTooltip />} />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="composite"
//           name="Composite Score"
//           stroke="#4f46e5"
//           strokeWidth={3}
//           dot={{ r: 5 }}
//           activeDot={{ r: 8 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="income"
//           name="Income Score"
//           stroke="#10b981"
//           strokeWidth={2}
//           strokeDasharray="5 5"
//           dot={{ r: 4 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="repayment"
//           name="Repayment Score"
//           stroke="#f59e0b"
//           strokeWidth={2}
//           strokeDasharray="5 5"
//           dot={{ r: 4 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   )
// }

// export default ScoreChart

// src/components/ScoreChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ScoreChart = ({ scores }) => {
  const data =
    scores ||
    [
      { month: "Jan", composite: 6.8, income: 7.0, repayment: 6.5 },
      { month: "Feb", composite: 7.0, income: 7.2, repayment: 6.7 },
      { month: "Mar", composite: 7.3, income: 7.5, repayment: 7.0 },
      { month: "Apr", composite: 7.6, income: 7.8, repayment: 7.2 },
      { month: "May", composite: 8.0, income: 8.2, repayment: 7.8 },
      { month: "Jun", composite: 8.4, income: 8.5, repayment: 8.2 },
    ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="composite"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="repayment"
          stroke="#eab308"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
