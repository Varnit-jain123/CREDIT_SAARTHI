import React from 'react';
import { FiEye, FiDownload, FiFile, FiCheck, FiX } from 'react-icons/fi';
import { calculateCompositeScore } from '../../utils/scoringUtils';

const ApplicationTable = ({ applications = [], onViewApplication = () => {}, onStatusUpdate = () => {} }) => {
  const getStatusBadge = (status) => {
    const config = {
      approved: {
        color: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50',
        icon: <FiCheck className="mr-1" />
      },
      pending: {
        color: 'bg-amber-500/30 text-amber-300 border-amber-500/50',
        icon: <FiEye className="mr-1" />
      },
      rejected: {
        color: 'bg-rose-500/30 text-rose-300 border-rose-500/50',
        icon: <FiX className="mr-1" />
      }
    };
    
    const cfg = config[status] || { color: '', icon: null };
    const label = (status || '').charAt(0).toUpperCase() + (status || '').slice(1);
    return (
      <span className={`score-indicator border ${cfg.color}`}>
        {cfg.icon}
        {label}
      </span>
    );
  };

  const getCreditScoreBadge = (score) => {
    if (score >= 650) {
      return <span className="score-indicator bg-emerald-500/30 text-emerald-300 border-emerald-500/50">Excellent</span>;
    } else if (score >= 550) {
      return <span className="score-indicator bg-amber-500/30 text-amber-300 border-amber-500/50">Moderate</span>;
    } else {
      return <span className="score-indicator bg-rose-500/30 text-rose-300 border-rose-500/50">Poor</span>;
    }
  };

  const getDecisionBadge = (decision) => {
    const config = {
      "Auto-Approve": "bg-emerald-500/30 text-emerald-300 border-emerald-500/50",
      "Manual Review": "bg-amber-500/30 text-amber-300 border-amber-500/50",
      "Reject": "bg-rose-500/30 text-rose-300 border-rose-500/50"
    };
    const cls = config[decision] || '';
    return (
      <span className={`score-indicator border ${cls}`}>
        {decision || '—'}
      </span>
    );
  };

  return (
    <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">All Applications</h3>
        <p className="text-gray-600 text-sm">Manage and review loan applications</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Application ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Applicant Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Loan Amount</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Credit Score</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Decision</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Applied Date</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => {
              const score = calculateCompositeScore(app || {});

              return (
                <tr key={app.id} className="transition-colors hover:bg-purple-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">{app.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700">{app.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700 font-medium">{app.loanAmount != null ? `₹${app.loanAmount.toLocaleString()}` : '—'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col space-y-1">
                      <div className="text-gray-800 font-bold">{score.credit_score}/700</div>
                      {getCreditScoreBadge(score.credit_score)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getDecisionBadge(score.lending_decision)}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700">{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : '—'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewApplication && onViewApplication(app)}
                        className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-1 px-3 py-1.5 text-sm rounded-lg transition-colors"
                      >
                        <FiEye />
                        <span>View</span>
                      </button>
                      {app.status === 'pending' && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => onStatusUpdate && onStatusUpdate(app.id, 'approved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors"
                          >
                            <FiCheck />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => onStatusUpdate && onStatusUpdate(app.id, 'rejected')}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors"
                          >
                            <FiX />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {applications.length} of {applications.length} applications
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">Previous</button>
          <button className="px-4 py-2 text-sm border border-purple-500 bg-purple-50 text-purple-700 rounded-lg">1</button>
          <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">2</button>
          <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTable;