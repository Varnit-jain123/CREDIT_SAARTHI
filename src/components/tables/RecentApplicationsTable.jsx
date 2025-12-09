import RiskBandBadge from '../common/RiskBandBadge'
import StatusBadge from '../common/StatusBadge'
import { Eye } from 'lucide-react'

const RecentApplicationsTable = ({ applications = [] }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return 'bg-gradient-to-r from-green-500 to-emerald-600'
    if (score >= 6) return 'bg-gradient-to-r from-yellow-500 to-amber-600'
    if (score >= 4) return 'bg-gradient-to-r from-orange-500 to-red-500'
    return 'bg-gradient-to-r from-red-500 to-red-700'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Application ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              District
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loan Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Composite Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Risk Band
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-primary-600">{application.id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{application.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.district}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.loanType}</div>
              </td>
              <td className="px-6 py-4">
                <div className={`text-sm font-medium text-white px-3 py-1 rounded-full text-center ${getScoreColor(application.compositeScore)}`}>
                  {application.compositeScore != null ? application.compositeScore.toFixed(1) : '—'}
                </div>
              </td>
              <td className="px-6 py-4">
                <RiskBandBadge band={application.riskBand} />
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={application.status} />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.lastUpdated || '—'}</div>
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700">
                  <Eye size={16} />
                  <span className="text-sm">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentApplicationsTable