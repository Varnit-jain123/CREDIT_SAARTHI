// import React, { useState } from 'react';
// import MainLayout from  '../components/layout/MainLayout';
// import DashboardCards from '../components/dashboards/DashboardCards';
// import ApplicationTable from '../components/dashboards/ApplicationTable';
// import ApplicationDetails from '../components/dashboards/ApplicationDetails';
// import { applicationsData } from '../data/applications';

// const DashboardPage = ({ applications: initialApplications, setApplications: setInitialApplications }) => {
//   const [applications, setApplications] = useState(initialApplications ?? applicationsData);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);

//   const handleViewApplication = (app) => {
//     setSelectedApplication(app);
//     setIsDetailsOpen(true);
//   };

//   const handleStatusUpdate = (appId, newStatus) => {
//     setApplications(prev => prev.map(app => 
//       app.id === appId ? { ...app, status: newStatus } : app
//     ));
    
//     if (selectedApplication && selectedApplication.id === appId) {
//       setSelectedApplication(prev => ({ ...prev, status: newStatus }));
//     }
//   };

//   const handleDownloadReport = () => {
//     const data = JSON.stringify(selectedApplication, null, 2);
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `application-${selectedApplication.id}-report.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <MainLayout>
//       <div className="animate-slide-up">
//         <DashboardCards applications={applications} />
        
//         <div className="mb-8">
//           <ApplicationTable 
//             applications={applications}
//             onViewApplication={handleViewApplication}
//             onStatusUpdate={handleStatusUpdate}
//           />
//         </div>

//         {isDetailsOpen && selectedApplication && (
//           <ApplicationDetails
//             application={selectedApplication}
//             onClose={() => setIsDetailsOpen(false)}
//             onStatusUpdate={handleStatusUpdate}
//             onDownloadReport={handleDownloadReport}
//           />
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default DashboardPage;

import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import DashboardCards from "../components/dashboards/DashboardCards";
import ApplicationTable from "../components/dashboards/ApplicationTable";
import ApplicationDetails from "../components/dashboards/ApplicationDetails";
import { applicationsData } from "../data/applications";

const DashboardPage = ({
  applications: initialApplications,
  setApplications: setInitialApplications,
}) => {
  const [applications, setApplications] = useState(
    initialApplications ?? applicationsData
  );
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setIsDetailsOpen(true);
  };

  const handleStatusUpdate = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );

    if (selectedApplication && selectedApplication.id === appId) {
      setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleDownloadReport = () => {
    // Dynamic import of jsPDF to avoid bundling issues
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      let yPosition = margin;

      // Title
      doc.setFontSize(16);
      doc.text("Application Report", margin, yPosition);
      yPosition += 15;

      // Application Details
      doc.setFontSize(11);
      const details = [
        { label: "Application ID", value: selectedApplication.id || "N/A" },
        { label: "Applicant Name", value: selectedApplication.name || "N/A" },
        {
          label: "Loan Amount",
          value: `₹${
            selectedApplication.loanAmount?.toLocaleString() || "N/A"
          }`,
        },
        {
          label: "Tenure (months)",
          value: selectedApplication.tenure || "N/A",
        },
        {
          label: "Credit Score",
          value: selectedApplication.credit_score || "N/A",
        },
        {
          label: "Income Need Score",
          value: selectedApplication.income_need_score || "N/A",
        },
        {
          label: "Repayment Score",
          value: selectedApplication.repayment_score || "N/A",
        },
        { label: "Status", value: selectedApplication.status || "N/A" },
        {
          label: "Applied Date",
          value: selectedApplication.appliedDate || "N/A",
        },
        { label: "House Type", value: selectedApplication.house_type || "N/A" },
        {
          label: "Default Probability",
          value:
            (selectedApplication.repay_default_prob * 100).toFixed(2) + "%" ||
            "N/A",
        },
      ];

      details.forEach(({ label, value }) => {
        if (yPosition > pageHeight - margin - 10) {
          doc.addPage();
          yPosition = margin;
        }
        doc.setFont(undefined, "bold");
        doc.text(`${label}:`, margin, yPosition);
        doc.setFont(undefined, "normal");
        doc.text(String(value), margin + 60, yPosition);
        yPosition += 8;
      });

      // Save PDF
      doc.save(`application-${selectedApplication.id}-report.pdf`);
    });
  };

  return (
    <MainLayout>
      <div className="animate-slide-up">
        <DashboardCards applications={applications} />

        <div className="mb-8">
          <ApplicationTable
            applications={applications}
            onViewApplication={handleViewApplication}
            onStatusUpdate={handleStatusUpdate}
          />  
        </div>

        {isDetailsOpen && selectedApplication && (
          <ApplicationDetails
            application={selectedApplication}
            onClose={() => setIsDetailsOpen(false)}
            onStatusUpdate={handleStatusUpdate}
            onDownloadReport={handleDownloadReport}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
