// src/CreditSaarthiPortal.jsx
import React, { useState } from 'react';

import RoleSelection from '../components/RoleSelection'
import LoginScreen from '../components/LoginScreen';
import BeneficiaryLoanDashboard from '../components/dashboards/BeneficiaryLoanDashboard';
import ChannelPartnerDashboard from '../components/dashboards/ChannelPartnerDashboard';
import NBCFDCAdminDashboard from '../components/dashboards/NBCFDCAdminDashboard';
import RiskAnalyticsDashboard from '../components/dashboards/RiskAnalyticsDashboard';
import ApplicationDetailModal from '../components/ApplicationDetailModal';

const CreditSaarthiPortal = () => {
  const [currentView, setCurrentView] = useState('roleSelection');
  const [selectedRole, setSelectedRole] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentView('login');
  };

  const handleLogin = () => {
    const userMap = {
      beneficiary: { name: 'Rajesh Kumar', role: 'Beneficiary' },
      channelPartner: { name: 'Officer Singh', role: 'Channel Partner Officer' },
      nbcfdcAdmin: { name: 'Admin Verma', role: 'NBCFDC Admin' },
      riskAnalytics: { name: 'Dr. Analytics', role: 'Risk Analyst' }
    };

    const viewMap = {
      beneficiary: 'beneficiaryDashboard',
      channelPartner: 'channelPartnerDashboard',
      nbcfdcAdmin: 'nbcfdcAdminDashboard',
      riskAnalytics: 'riskAnalyticsDashboard'
    };

    if (!selectedRole) return;

    setLoggedInUser(userMap[selectedRole]);
    setCurrentView(viewMap[selectedRole]);
  };

  const handleLogout = () => {
    setCurrentView('roleSelection');
    setLoggedInUser(null);
    setSelectedRole(null);
    setSelectedApplication(null);
    setActiveFilter('All');
  };

  return (
    <div className="font-sans">
      {currentView === 'roleSelection' && (
        <RoleSelection onSelectRole={handleRoleSelect} />
      )}

      {currentView === 'login' && (
        <LoginScreen
          selectedRole={selectedRole}
          onBack={() => setCurrentView('roleSelection')}
          onLogin={handleLogin}
        />
      )}

      {currentView === 'beneficiaryDashboard' && (
        <BeneficiaryLoanDashboard
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'channelPartnerDashboard' && (
        <ChannelPartnerDashboard
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onSelectApplication={setSelectedApplication}
        />
      )}

      {currentView === 'nbcfdcAdminDashboard' && (
        <NBCFDCAdminDashboard
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'riskAnalyticsDashboard' && (
        <RiskAnalyticsDashboard
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
        />
      )}

      {selectedApplication && (
        <ApplicationDetailModal
          app={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default CreditSaarthiPortal;
