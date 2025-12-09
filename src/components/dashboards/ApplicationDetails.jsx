import React, { useState } from 'react';
import { FiX, FiDownload, FiFile, FiDollarSign, FiCalendar, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import ScoreGraph from './ScoreGraph';
import SummaryPanel from './SummaryPanel';
import { calculateCompositeScore, generateScoreHistory } from '../../utils/scoringUtils';

const ApplicationDetails = ({ application, onClose, onStatusUpdate, onDownloadReport }) => {
  const [activeTab, setActiveTab] = useState('details');
  const scoreData = calculateCompositeScore(application);
  const scoreHistory = generateScoreHistory(scoreData.credit_score);

  const getScoreColor = (score, type = 'credit') => {
    if (type === 'credit') {
      if (score >= 650) return 'text-emerald-400';
      if (score >= 550) return 'text-amber-400';
      return 'text-rose-400';
    } else {
      // For income_need and repayment scores (40-80)
      if (score >= 75) return 'text-emerald-400';
      if (score >= 60) return 'text-amber-400';
      return 'text-rose-400';
    }
  };

  const getScoreBg = (score, type = 'credit') => {
    if (type === 'credit') {
      if (score >= 650) return 'bg-emerald-500/20 border-emerald-500/50';
      if (score >= 550) return 'bg-amber-500/20 border-amber-500/50';
      return 'bg-rose-500/20 border-rose-500/50';
    } else {
      if (score >= 75) return 'bg-emerald-500/20 border-emerald-500/50';
      if (score >= 60) return 'bg-amber-500/20 border-amber-500/50';
      return 'bg-rose-500/20 border-rose-500/50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm">
      <div className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-slate-700/50">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-700/50 bg-gradient-to-r from-purple-900/50 to-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Application Details</h2>
              <p className="text-slate-400">ID: {application.id} | Name: {application.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <FiX className="text-xl text-slate-300" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-8">
            {/* Application Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-6 border border-purple-500/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-500/30 rounded-lg">
                    <FiDollarSign className="text-purple-300 text-xl" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Loan Amount</p>
                    <p className="text-2xl font-bold text-slate-100">₹{application.loanAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-2xl p-6 border border-indigo-500/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-indigo-500/30 rounded-lg">
                    <FiCalendar className="text-indigo-300 text-xl" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Tenure</p>
                    <p className="text-2xl font-bold text-slate-100">{application.tenure} months</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-2xl p-6 border border-pink-500/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-pink-500/30 rounded-lg">
                    <FiTrendingUp className="text-pink-300 text-xl" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Credit Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(scoreData.credit_score)}`}>
                      {scoreData.credit_score}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-700/50 mb-6">
              <nav className="flex space-x-8">
                {['details', 'scores', 'summary', 'documents'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-purple-500 text-purple-300'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Applicant Information</h3>
                    <InfoRow label="Full Name" value={application.name} />
                    <InfoRow label="Household Size" value={application.household_size} />
                    <InfoRow label="Number of Earners" value={application.number_of_earners} />
                    <InfoRow label="House Type" value={application.house_type} />
                    <InfoRow label="Default Probability" value={`${(application.repay_default_prob * 100).toFixed(1)}%`} />
                    <InfoRow label="Previous Loans" value={application.number_of_loans_taken_before} />
                    <InfoRow label="Ever Defaulted" value={application.ever_defaulted_flag ? "Yes" : "No"} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Financial Details</h3>
                    <InfoRow label="LPG Refills/Year" value={application.lpg_refills_per_year} />
                    <InfoRow label="Landholding" value={`${application.landholding_in_hectares} hectares`} />
                    <InfoRow label="Seasonal Income" value={`₹${application.seasonal_income.toLocaleString()}`} />
                    <InfoRow label="Loan Amount" value={`₹${application.loanAmount.toLocaleString()}`} />
                    <InfoRow label="Tenure" value={`${application.tenure} months`} />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Assets</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <AssetCard label="Car" value={application.car} />
                    <AssetCard label="Phone" value={application.phone} />
                    <AssetCard label="Two Wheeler" value={application.two_wheeler} />
                    <AssetCard label="Fridge" value={application.fridge} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scores' && (
              <div className="space-y-8">
                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ScoreCard
                    title="Credit Score"
                    score={scoreData.credit_score}
                    description="Final credit score"
                    min={400}
                    max={700}
                    color={getScoreColor(scoreData.credit_score, 'credit')}
                    bgColor={getScoreBg(scoreData.credit_score, 'credit')}
                    
                  />
                  <ScoreCard
                    title="Income Need Score"
                    score={scoreData.income_need_score}
                    description="Income-based need assessment"
                    min={40}
                    max={80}
                    color={getScoreColor(scoreData.income_need_score, 'income')}
                    bgColor={getScoreBg(scoreData.income_need_score, 'income')}
                  
                  />
                  <ScoreCard
                    title="Repayment Score"
                    score={scoreData.repayment_score}
                    description="Repayment capacity"
                    min={40}
                    max={80}
                    color={getScoreColor(scoreData.repayment_score, 'repayment')}
                    bgColor={getScoreBg(scoreData.repayment_score, 'repayment')}
                    
                  />
                </div>

                {/* Weight Indicators */}
                <div className="backdrop-blur-xl bg-slate-700/30 border border-slate-600/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-100 mb-4">Score Weight Distribution</h4>
                  <div className="space-y-4">
                    <WeightBar
                      label="Repayment Weight"
                      value={scoreData.w_repay}
                      color="from-purple-500 to-pink-500"
                    />
                    <WeightBar
                      label="Income Need Weight"
                      value={scoreData.w_income}
                      color="from-emerald-500 to-cyan-500"
                    />
                  </div>
                </div>

                {/* Score Graph */}
                <ScoreGraph data={scoreHistory} scoreType="credit" />
              </div>
            )}

            {activeTab === 'summary' && (
              <SummaryPanel scoreData={scoreData} application={application} />
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-slate-700/30 border border-slate-600/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Uploaded Documents</h3>
                  <div className="space-y-3">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="flex items-center space-x-3">
                          <FiFile className="text-slate-400" />
                          <span className="text-slate-300">{doc}</span>
                        </div>
                        <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-700/50 bg-slate-900/50 flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={onDownloadReport}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FiDownload />
              <span>Download Report</span>
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <FiFile />
              <span>View Documents</span>
            </button>
          </div>

          {application.status === 'pending' && (
            <div className="flex space-x-3">
              <button
                onClick={() => onStatusUpdate(application.id, 'rejected')}
                className="px-6 py-2.5 border border-rose-500/50 text-rose-300 hover:bg-rose-500/20 rounded-lg font-medium transition-colors"
              >
                Reject Application
              </button>
              <button
                onClick={() => onStatusUpdate(application.id, 'approved')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
              >
                Approve Application
              </button>
            </div>
          )}

          {application.status !== 'pending' && (
            <div className="text-slate-300">
              Status: <span className="font-medium capitalize text-slate-100">{application.status}</span> | 
              Decision: <span className="font-medium text-slate-100">{scoreData.lending_decision}</span> | 
              Risk: <span className="font-medium text-slate-100">{scoreData.risk_band}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-slate-700/50">
    <span className="text-slate-400">{label}</span>
    <span className="font-medium text-slate-200">{value}</span>
  </div>
);

const AssetCard = ({ label, value }) => (
  <div className={`backdrop-blur-xl p-4 rounded-xl border ${value ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-slate-700/30 border-slate-600/50'}`}>
    <div className="text-center">
      <div className={`text-lg font-semibold mb-1 ${value ? 'text-emerald-300' : 'text-slate-500'}`}>
        {value ? 'Yes' : 'No'}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  </div>
);

const ScoreCard = ({ title, score, description, min, max, color, bgColor, rangeLabel }) => {
  const percentage = ((score - min) / (max - min)) * 100;
  
  return (
    <div className={`backdrop-blur-xl p-6 rounded-2xl border ${bgColor}`}>
      <h4 className="text-lg font-semibold text-slate-100 mb-2">{title}</h4>
      <div className={`text-4xl font-bold mb-2 ${color}`}>{score}</div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-slate-400 mt-3">{description}</p>
    </div>
  );
};

const WeightBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-slate-300">{label}</span>
      <span className="font-medium text-slate-200">{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ApplicationDetails;