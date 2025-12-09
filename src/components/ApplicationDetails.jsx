import { useState } from 'react'
import { X, XCircle, Download, FileText, Calendar, IndianRupee, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react'
import ScoreChart from './ScoreChart'

const ScoreCard = ({ title, score, maxScore = 10, description }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getBarColor = (score) => {
    if (score >= 8) return 'bg-green-500'
    if (score >= 6) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const percentage = (score / maxScore) * 100

  return (
    <div className={`border rounded-xl p-4 ${getScoreColor(score)}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className="text-lg font-bold">{score.toFixed(1)}/{maxScore}</div>
      </div>
      <div className="mt-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${getBarColor(score)}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      {description && (
        <p className="text-xs mt-2 text-gray-600">{description}</p>
      )}
    </div>
  )
}

const ApplicationDetails = ({ application, onClose, onDownloadReport, onViewDocuments, onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState('scores')

  if (!application) return null

  const handleStatusChange = (status) => {
    if (status === 'approved' && onApprove) {
      onApprove(application.id)
    }
    if (status === 'rejected' && onReject) {
      onReject(application.id)
    }
    onClose()
  }

  const summaryReasons = {
    income: [
      "Stable employment history for 3+ years",
      "Consistent monthly income with minimal fluctuations",
      "Low debt-to-income ratio (0.35)",
      "Multiple income sources identified",
      "Positive banking transaction patterns"
    ],
    repayment: [
      "Excellent credit history with no defaults",
      "Timely payment of existing obligations",
      "Low credit utilization ratio",
      "Previous loan repayment completed successfully",
      "Healthy savings patterns observed"
    ],
    composite: [
      "Strong income stability contributes positively",
      "Excellent repayment history boosts confidence",
      "Adequate loan amount relative to income",
      "Positive financial behavior patterns",
      "Low risk profile based on historical data"
    ]
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-xl shadow-inner">
              <FileText className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
              <p className="text-sm text-gray-500">Review all details and scores</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                application.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : application.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {application.status.toUpperCase()}
            </span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg shadow-inner">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application ID</p>
                  <p className="font-bold text-lg text-gray-800">{application.id}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg shadow-inner">
                  <IndianRupee className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="font-bold text-lg text-gray-800">₹{application.loanAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg shadow-inner">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tenure</p>
                  <p className="font-bold text-lg text-gray-800">{application.tenure} months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveTab('scores')}
                className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'scores'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Scores Overview
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'summary'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Score Summary
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Score History
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'scores' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ScoreCard 
                  title="Composite Credit Score" 
                  score={application.scores.composite}
                  description="Overall creditworthiness score"
                />
                <ScoreCard 
                  title="Income Score" 
                  score={application.scores.income}
                  description="Income stability and capacity"
                />
                <ScoreCard 
                  title="Repayment Score" 
                  score={application.scores.repayment}
                  description="Historical repayment behavior"
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Analysis</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Composite Score Calculation</span>
                    </div>
                    <span className="font-bold">
                      {((application.scores.income * 0.6) + (application.scores.repayment * 0.4)).toFixed(1)}/10
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Formula: Composite Score = (Income Score × 0.6) + (Repayment Score × 0.4)</p>
                    <p className="mt-1">The composite score combines income stability (60%) and repayment history (40%).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Income Score Reasons */}
                <div className="border rounded-xl p-5 bg-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Income Score Reasons</h3>
                  </div>
                  <ul className="space-y-2">
                    {summaryReasons.income.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Repayment Score Reasons */}
                <div className="border rounded-xl p-5 bg-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Info className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Repayment Score Reasons</h3>
                  </div>
                  <ul className="space-y-2">
                    {summaryReasons.repayment.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Composite Score Reasons */}
                <div className="border rounded-xl p-5 bg-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Info className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Composite Score Reasons</h3>
                  </div>
                  <ul className="space-y-2">
                    {summaryReasons.composite.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Trend Over Time</h3>
                <div className="h-80">
                  <ScoreChart scores={application.scoreHistory} />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>This chart shows the applicant's score progression over the last 6 months.</p>
                  <p className="mt-1">A consistent upward trend indicates improving financial behavior.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={onDownloadReport}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button
                onClick={onViewDocuments}
                className="inline-flex items-center px-4 py-2 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Documents
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {application.status === 'pending' && (
              <>
                <button
                  onClick={() => handleStatusChange('approved')}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Application
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Application
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetails