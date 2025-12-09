import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const ScoreTrendChart = () => {
  const data = [
    { month: 'Jan', avgScore: 7.2, highRisk: 12, lowRisk: 45 },
    { month: 'Feb', avgScore: 7.4, highRisk: 10, lowRisk: 48 },
    { month: 'Mar', avgScore: 7.6, highRisk: 8, lowRisk: 52 },
    { month: 'Apr', avgScore: 7.5, highRisk: 9, lowRisk: 50 },
    { month: 'May', avgScore: 7.8, highRisk: 7, lowRisk: 55 },
    { month: 'Jun', avgScore: 7.9, highRisk: 6, lowRisk: 58 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((pld, index) => (
            <p key={index} className="text-sm" style={{ color: pld.color }}>
              {pld.name}: {pld.value}{pld.dataKey === 'avgScore' ? '' : '%'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="avgScore"
          name="Average Composite Score"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="highRisk"
          name="High Risk %"
          stroke="#EF4444"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="lowRisk"
          name="Low Risk %"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ScoreTrendChart