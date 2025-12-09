const ScoreBadge = ({ score, label, type = 'composite' }) => {
  const getColor = (score) => {
    if (score >= 8) return 'bg-gradient-to-r from-green-500 to-emerald-600'
    if (score >= 6) return 'bg-gradient-to-r from-yellow-500 to-amber-600'
    if (score >= 4) return 'bg-gradient-to-r from-orange-500 to-red-500'
    return 'bg-gradient-to-r from-red-500 to-red-700'
  }

  const getTypeColor = (type) => {
    const colors = {
      income: 'bg-blue-100 text-blue-800',
      repayment: 'bg-purple-100 text-purple-800',
      fraud: 'bg-red-100 text-red-800',
      composite: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
    }
    return colors[type] || colors.composite
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={type === 'composite' ? '#10B981' : '#6366F1'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${score * 10}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{score.toFixed(1)}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-600 mt-2">{label}</span>
    </div>
  )
}

export default ScoreBadge