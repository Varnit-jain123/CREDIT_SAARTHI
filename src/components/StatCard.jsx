import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react'

const StatCard = ({ type, count, label, percentage }) => {
  const config = {
    approved: {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      percentageColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    pending: {
      icon: <Clock className="h-6 w-6 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      percentageColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    rejected: {
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      percentageColor: 'text-red-600',
      iconBg: 'bg-red-100',
    },
    total: {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      percentageColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
  }

  const { icon, bgColor, borderColor, textColor, percentageColor, iconBg } = config[type]

  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <div className="flex items-baseline mt-2">
            <p className={`text-3xl font-bold ${textColor}`}>{count}</p>
            {percentage && (
              <span className={`ml-2 text-sm font-medium ${percentageColor}`}>
                {percentage > 0 ? '+' : ''}{percentage}%
              </span>
            )}
          </div>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${textColor.replace('text-', 'bg-')}`}
            style={{ width: `${Math.min(percentage + 50, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default StatCard