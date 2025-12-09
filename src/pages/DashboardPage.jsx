// DashboardPage.jsx  (REPLACE your existing file with this)
import React, { useState, useCallback } from 'react';
import DashboardCards from '../DashboardPage';
import ApplicationTable from '../DashboardPage';
import ApplicationDetails from '../DashboardPage';

const DashboardPage = ({ applications, setApplications }) => {
  // selected application for the "View" modal
  const [selectedApp, setSelectedApp] = useState(null);

  // Handler when user clicks "View" in the table
  const onViewApplication = useCallback((app) => {
    setSelectedApp(app);
    // Scroll lock / focus could be added here if needed
  }, []);

  // Close the details modal
  const onCloseDetails = useCallback(() => {
    setSelectedApp(null);
  }, []);

  // Update status for an application (approve / reject)
  // id matches application.id (string), newStatus is 'approved'|'rejected'|'pending'
  const onStatusUpdate = useCallback((id, newStatus) => {
    setApplications(prev => {
      const found = prev.some(p => String(p.id) === String(id));
      if (!found) {
        console.warn('onStatusUpdate: application not found for id', id);
        return prev;
      }
      const next = prev.map(app => {
        if (String(app.id) === String(id)) {
          return { ...app, status: newStatus };
        }
        return app;
      });
      return next;
    });

    // If modal is open for the same application, update selectedApp to keep UI in sync
    setSelectedApp(prev => {
      if (!prev) return prev;
      if (String(prev.id) === String(id)) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });

    // quick feedback; replace with toasts if available
    alert(`Application ${id} set to "${newStatus}".`);
  }, [setApplications]);

  // stub for downloading report; ApplicationDetails calls this
  const onDownloadReport = useCallback((application) => {
    // TODO: replace with real PDF/CSV export logic
    console.info('Download report requested for', application);
    alert(`Download report for ${application.id} (stub).`);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Dashboard cards + upload area: pass setApplications so upload can update credit scores */}
      <DashboardCards applications={applications} setApplications={setApplications} />

      {/* Table showing all applications, pass handlers */}
      <div className="mt-8">
        <ApplicationTable
          applications={applications}
          onViewApplication={onViewApplication}
          onStatusUpdate={onStatusUpdate}
        />
      </div>

      {/* Details modal (renders when selectedApp is set) */}
      {selectedApp && (
        <ApplicationDetails
          application={selectedApp}
          onClose={onCloseDetails}
          onStatusUpdate={onStatusUpdate}
          onDownloadReport={() => onDownloadReport(selectedApp)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
