import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { riskBandData } from '../../data/mockData'

const RiskBandPieChart = () => {
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value}% of total</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={riskBandData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {riskBandData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{ right: -20 }}
          formatter={(value, entry) => (
            <span className="text-sm text-gray-700">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default RiskBandPieChart