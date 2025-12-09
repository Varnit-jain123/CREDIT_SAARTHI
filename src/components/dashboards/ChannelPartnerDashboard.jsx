
import React, { useState } from 'react';
import StatCard from '../StatCard';
import ApplicationTable from '../ApplicationTable';
import ApplicationDetails from '../ApplicationDetails';
import ScoreChart from '../ScoreChart';
import {
  Bell,
  Download,
  FileText,
  Settings,
  Sparkles,
  User,
  LogOut,
} from 'lucide-react';


// Mock data
const mockApplications = [
  {
    id: 'APP-001245',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    loanAmount: 50000,
    tenure: 24,
    appliedDate: '2024-01-15',
    status: 'approved',
    scores: {
      composite: 8.5,
      income: 8.3,
      repayment: 8.8,
    },
    scoreHistory: [
      { month: 'Jan', composite: 6.8, income: 7.0, repayment: 6.5 },
      { month: 'Feb', composite: 7.2, income: 7.3, repayment: 7.0 },
      { month: 'Mar', composite: 7.5, income: 7.6, repayment: 7.4 },
      { month: 'Apr', composite: 7.8, income: 8.0, repayment: 7.5 },
      { month: 'May', composite: 8.2, income: 8.3, repayment: 8.0 },
      { month: 'Jun', composite: 8.5, income: 8.5, repayment: 8.5 },
    ],
  },
  {
    id: 'APP-001246',
    name: 'Priya Sharma',
    email: 'priya.s@email.com',
    loanAmount: 75000,
    tenure: 36,
    appliedDate: '2024-01-16',
    status: 'pending',
    scores: {
      composite: 7.2,
      income: 7.8,
      repayment: 6.5,
    },
    scoreHistory: [
      { month: 'Jan', composite: 6.5, income: 7.2, repayment: 5.8 },
      { month: 'Feb', composite: 6.7, income: 7.4, repayment: 6.0 },
      { month: 'Mar', composite: 6.9, income: 7.6, repayment: 6.2 },
      { month: 'Apr', composite: 7.0, income: 7.7, repayment: 6.3 },
      { month: 'May', composite: 7.1, income: 7.8, repayment: 6.4 },
      { month: 'Jun', composite: 7.2, income: 7.8, repayment: 6.5 },
    ],
  },
  {
    id: 'APP-001247',
    name: 'Amit Patel',
    email: 'amit.p@email.com',
    loanAmount: 100000,
    tenure: 48,
    appliedDate: '2024-01-14',
    status: 'rejected',
    scores: {
      composite: 5.8,
      income: 6.2,
      repayment: 5.3,
    },
    scoreHistory: [
      { month: 'Jan', composite: 5.2, income: 5.8, repayment: 4.6 },
      { month: 'Feb', composite: 5.4, income: 6.0, repayment: 4.8 },
      { month: 'Mar', composite: 5.5, income: 6.1, repayment: 5.0 },
      { month: 'Apr', composite: 5.6, income: 6.2, repayment: 5.1 },
      { month: 'May', composite: 5.7, income: 6.2, repayment: 5.2 },
      { month: 'Jun', composite: 5.8, income: 6.2, repayment: 5.3 },
    ],
  },
  {
    id: 'APP-001248',
    name: 'Sunita Devi',
    email: 'sunita.d@email.com',
    loanAmount: 30000,
    tenure: 18,
    appliedDate: '2024-01-17',
    status: 'pending',
    scores: {
      composite: 6.5,
      income: 6.8,
      repayment: 6.1,
    },
    scoreHistory: [
      { month: 'Jan', composite: 5.8, income: 6.2, repayment: 5.4 },
      { month: 'Feb', composite: 6.0, income: 6.4, repayment: 5.6 },
      { month: 'Mar', composite: 6.1, income: 6.5, repayment: 5.7 },
      { month: 'Apr', composite: 6.2, income: 6.6, repayment: 5.8 },
      { month: 'May', composite: 6.3, income: 6.7, repayment: 6.0 },
      { month: 'Jun', composite: 6.5, income: 6.8, repayment: 6.1 },
    ],
  },
  {
    id: 'APP-001249',
    name: 'Vikram Singh',
    email: 'vikram.s@email.com',
    loanAmount: 150000,
    tenure: 60,
    appliedDate: '2024-01-13',
    status: 'approved',
    scores: {
      composite: 9.2,
      income: 9.5,
      repayment: 8.8,
    },
    scoreHistory: [
      { month: 'Jan', composite: 8.5, income: 8.8, repayment: 8.2 },
      { month: 'Feb', composite: 8.7, income: 9.0, repayment: 8.4 },
      { month: 'Mar', composite: 8.8, income: 9.2, repayment: 8.5 },
      { month: 'Apr', composite: 8.9, income: 9.3, repayment: 8.6 },
      { month: 'May', composite: 9.0, income: 9.4, repayment: 8.7 },
      { month: 'Jun', composite: 9.2, income: 9.5, repayment: 8.8 },
    ],
  },
  {
    id: 'APP-001250',
    name: 'Meera Nair',
    email: 'meera.n@email.com',
    loanAmount: 45000,
    tenure: 24,
    appliedDate: '2024-01-18',
    status: 'pending',
    scores: {
      composite: 7.8,
      income: 8.2,
      repayment: 7.3,
    },
    scoreHistory: [
      { month: 'Jan', composite: 7.0, income: 7.5, repayment: 6.5 },
      { month: 'Feb', composite: 7.2, income: 7.7, repayment: 6.7 },
      { month: 'Mar', composite: 7.4, income: 7.9, repayment: 6.9 },
      { month: 'Apr', composite: 7.5, income: 8.0, repayment: 7.0 },
      { month: 'May', composite: 7.6, income: 8.1, repayment: 7.1 },
      { month: 'Jun', composite: 7.8, income: 8.2, repayment: 7.3 },
    ],
  },
  {
    id: 'APP-001251',
    name: 'Rahul Verma',
    email: 'rahul.v@email.com',
    loanAmount: 80000,
    tenure: 36,
    appliedDate: '2024-01-12',
    status: 'rejected',
    scores: {
      composite: 4.2,
      income: 5.0,
      repayment: 3.5,
    },
    scoreHistory: [
      { month: 'Jan', composite: 3.8, income: 4.5, repayment: 3.0 },
      { month: 'Feb', composite: 3.9, income: 4.6, repayment: 3.1 },
      { month: 'Mar', composite: 4.0, income: 4.7, repayment: 3.2 },
      { month: 'Apr', composite: 4.1, income: 4.8, repayment: 3.3 },
      { month: 'May', composite: 4.1, income: 4.9, repayment: 3.4 },
      { month: 'Jun', composite: 4.2, income: 5.0, repayment: 3.5 },
    ],
  },
  {
    id: 'APP-001252',
    name: 'Anjali Desai',
    email: 'anjali.d@email.com',
    loanAmount: 60000,
    tenure: 30,
    appliedDate: '2024-01-19',
    status: 'approved',
    scores: {
      composite: 8.8,
      income: 9.0,
      repayment: 8.5,
    },
    scoreHistory: [
      { month: 'Jan', composite: 8.0, income: 8.3, repayment: 7.7 },
      { month: 'Feb', composite: 8.2, income: 8.5, repayment: 7.9 },
      { month: 'Mar', composite: 8.4, income: 8.7, repayment: 8.1 },
      { month: 'Apr', composite: 8.5, income: 8.8, repayment: 8.2 },
      { month: 'May', composite: 8.6, income: 8.9, repayment: 8.3 },
      { month: 'Jun', composite: 8.8, income: 9.0, repayment: 8.5 },
    ],
  },
];

const ChannelPartnerDashboard = ({ loggedInUser, onLogout }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState(mockApplications);
  const [activePage, setActivePage] = useState('all'); // all | pending | insights

  const stats = {
    total: applications.length,
    approved: applications.filter((app) => app.status === 'approved').length,
    pending: applications.filter((app) => app.status === 'pending').length,
    rejected: applications.filter((app) => app.status === 'rejected').length,
    approvedAmount: applications
      .filter((app) => app.status === 'approved')
      .reduce((sum, app) => sum + app.loanAmount, 0),
  };

  const updateStatus = (appId, status) => {
    setApplications((prev) => {
      const updated = prev.map((app) =>
        app.id === appId ? { ...app, status } : app
      );
      setSelectedApplication((prevSelected) =>
        prevSelected?.id === appId ? { ...prevSelected, status } : prevSelected
      );
      return updated;
    });
  };

  const handleApprove = (appId) => updateStatus(appId, 'approved');
  const handleReject = (appId) => updateStatus(appId, 'rejected');

  const handleDownloadReport = () => {
    alert('Downloading application report...');
  };

  const handleViewDocuments = () => {
    alert('Opening document viewer...');
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 bg-primary-200/60 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 w-80 h-80 bg-indigo-200/50 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur border border-white/60 shadow-lg rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-primary-600" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                    Realtime
                  </p>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Channel Partner Command Center
                </h1>
                <p className="text-sm text-gray-500">
                  Monitor, review, and act on every application in your queue
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="h-5 w-5 text-gray-600" />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {loggedInUser?.name || 'Channel Partner'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {loggedInUser?.role || 'Officer'}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Switcher */}
        <div className="flex items-center space-x-2">
          {[
            { id: 'all', label: 'All Applications' },
            { id: 'pending', label: 'Pending Queue' },
            { id: 'insights', label: 'Insights' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                activePage === tab.id
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <main className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: 'total',
                count: stats.total,
                label: 'Total Applications',
                percentage: 12,
              },
              {
                type: 'approved',
                count: stats.approved,
                label: 'Approved Applications',
                percentage: 8,
              },
              {
                type: 'pending',
                count: stats.pending,
                label: 'Pending Applications',
                percentage: 15,
              },
              {
                type: 'rejected',
                count: stats.rejected,
                label: 'Rejected Applications',
                percentage: -5,
              },
            ].map((card) => (
              <div
                key={card.type}
                className="transform transition hover:-translate-y-1 hover:shadow-lg"
              >
                <StatCard {...card} />
              </div>
            ))}
          </div>

          {/* Overview banner */}
          {activePage === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_35%)]" />
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-white/80">
                      Live portfolio
                    </p>
                    <h2 className="text-2xl font-bold mt-1">
                      Stay ahead with proactive decisions
                    </h2>
                    <p className="text-sm text-white/80 mt-1">
                      View score trends, act on pending files, and download
                      detailed reports instantly.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleDownloadReport}
                      className="inline-flex items-center px-4 py-2 bg-white/15 border border-white/30 text-white rounded-xl backdrop-blur hover:bg-white/25 transition shadow-md"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </button>
                    <button
                      onClick={handleViewDocuments}
                      className="inline-flex items-center px-4 py-2 bg-white text-primary-600 font-semibold rounded-xl shadow-md hover:-translate-y-0.5 transition"
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
                <p className="text-sm text-gray-500">Approved Amount</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{stats.approvedAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Across {stats.approved} approved applications
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Composite Avg</span>
                    <span>
                      {(
                        applications.reduce(
                          (sum, app) => sum + app.scores.composite,
                          0
                        ) / applications.length
                      ).toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-indigo-500"
                      style={{
                        width: `${Math.min(
                          (stats.approved / stats.total) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Approval rate based on current queue
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pending page hero */}
          {activePage === 'pending' && (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-primary-600 font-semibold">
                  Priority queue
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Review all pending applications
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Focus mode for decisions. Open details to approve or reject.
                </p>
                <div className="mt-3 flex items-center space-x-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                    {stats.pending} pending
                  </span>
                  <span className="text-gray-500">Last synced: just now</span>
                </div>
              </div>
              <div className="w-full lg:w-1/3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-2xl p-5 shadow-lg">
                <p className="text-sm uppercase tracking-wide text-white/80">
                  Pending amount
                </p>
                <p className="text-3xl font-bold mt-2">
                  ₹
                  {applications
                    .filter((app) => app.status === 'pending')
                    .reduce((sum, app) => sum + app.loanAmount, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-white/90 mt-1">
                  Across {stats.pending} applications
                </p>
              </div>
            </div>
          )}

          {/* Insights page */}
          {activePage === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Composite Score Trend
                </h3>
                <div className="h-80">
                  <ScoreChart scores={applications[0]?.scoreHistory} />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Track how scores evolve month over month to anticipate
                  approvals.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-6 shadow-lg space-y-3">
                <p className="text-sm uppercase tracking-wide text-white/80">
                  Quick insight
                </p>
                <h3 className="text-xl font-bold">Most stable applicants</h3>
                <ul className="space-y-2 text-sm">
                  {applications
                    .filter((app) => app.status === 'approved')
                    .slice(0, 3)
                    .map((app) => (
                      <li
                        key={app.id}
                        className="flex items-center justify-between"
                      >
                        <span className="font-semibold">{app.name}</span>
                        <span className="px-2 py-1 rounded-full bg-white/15">
                          {app.scores.composite.toFixed(1)}
                        </span>
                      </li>
                    ))}
                </ul>
                <button
                  onClick={handleDownloadReport}
                  className="mt-3 inline-flex items-center px-4 py-2 bg-white text-indigo-700 font-semibold rounded-xl shadow-md hover:-translate-y-0.5 transition"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Insights
                </button>
              </div>
            </div>
          )}

          {/* Applications Table */}
          {activePage === 'all' && (
            <ApplicationTable
              applications={applications}
              onViewApplication={setSelectedApplication}
              showFilter
            />
          )}

          {activePage === 'pending' && (
            <ApplicationTable
              applications={applications.filter(
                (app) => app.status === 'pending'
              )}
              onViewApplication={setSelectedApplication}
              showFilter={false}
            />
          )}
        </main>

        {/* Application Details Modal */}
        {selectedApplication && (
          <ApplicationDetails
            application={selectedApplication}
            onClose={() => setSelectedApplication(null)}
            onDownloadReport={handleDownloadReport}
            onViewDocuments={handleViewDocuments}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}

        {/* Footer */}
        <footer className="px-2 py-4 text-sm text-gray-500 flex items-center justify-between">
          <div>© 2024 Channel Partner Dashboard. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-700">Privacy Policy</button>
            <button className="hover:text-gray-700">Terms of Service</button>
            <button className="hover:text-gray-700">Help Center</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChannelPartnerDashboard;
