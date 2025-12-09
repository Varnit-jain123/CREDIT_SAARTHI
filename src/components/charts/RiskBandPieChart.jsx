import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const RiskBandBarChart = () => {
  const data = [
    { name: 'Low Risk – High Need', value: 245, color: '#10B981' },
    { name: 'Low Risk – Low Need', value: 180, color: '#3B82F6' },
    { name: 'High Risk – High Need', value: 95, color: '#F59E0B' },
    { name: 'High Risk – Low Need', value: 60, color: '#EF4444' },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">{payload[0].value} applications</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default RiskBandBarChart