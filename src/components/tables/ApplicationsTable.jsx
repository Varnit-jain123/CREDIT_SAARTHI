import { useState } from 'react'
import RiskBandBadge from '../common/RiskBandBadge'
import StatusBadge from '../common/StatusBadge'
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react'

const ApplicationsTable = ({ applications = [], onViewApplication = () => {} }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil((applications.length || 0) / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = applications.slice(startIndex, endIndex)

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentApplications.map(app => app.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

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
            <th className="px-6 py-3">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Application ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Region
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loan Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Income Need
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Repayment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fraud Risk
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Composite
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Risk Band
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentApplications.map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(application.id)}
                  onChange={() => handleSelectRow(application.id)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-primary-600">{application.id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{application.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.phone}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.district}, {application.state}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{application.loanType}</div>
              </td>
              <td className="px-6 py-4">
                  <div className={`text-sm font-medium px-2 py-1 rounded text-center ${(application.incomeNeedScore || 0) >= 7 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                  {application.incomeNeedScore != null ? application.incomeNeedScore.toFixed(1) : '—'}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className={`text-sm font-medium px-2 py-1 rounded text-center ${(application.repaymentScore || 0) >= 7 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                  {application.repaymentScore != null ? application.repaymentScore.toFixed(1) : '—'}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className={`text-sm font-medium px-2 py-1 rounded text-center ${(application.fraudRiskScore || 999) <= 3 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                  {application.fraudRiskScore != null ? application.fraudRiskScore.toFixed(1) : '—'}
                </div>
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
                <button
                  onClick={() => onViewApplication && onViewApplication(application)}
                  className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                >
                  <Eye size={16} />
                  <span className="text-sm">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, applications.length)} of {applications.length} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === pageNum
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsTable