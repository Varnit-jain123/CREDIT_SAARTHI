// // import React, { useState } from 'react';
// // import './Dashboard.css';
// // import './LoanDetails.css';
// // import './LoanApplication.css';

// // // Dashboard Component
// // const Dashboard = () => {
// //   const [selectedLoan, setSelectedLoan] = useState(null);
// //   const [showApplicationModal, setShowApplicationModal] = useState(false);
// //   const [applicationStatus, setApplicationStatus] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Hardcoded data
// //   const creditScore = 75;
// //   const loans = [
// //     {
// //       id: 1,
// //       loanAmount: 50000,
// //       tenure: '24 months',
// //       nextInstallment: '2025-01-15',
// //       status: 'Active',
// //       interestRate: '12%',
// //       channelPartner: 'ABC Finance Ltd.',
// //       purpose: 'Home Renovation'
// //     },
// //     {
// //       id: 2,
// //       loanAmount: 15000,
// //       tenure: '12 months',
// //       nextInstallment: 'N/A',
// //       status: 'Closed',
// //       interestRate: '10%',
// //       channelPartner: 'XYZ Credit Co.',
// //       purpose: 'Education'
// //     },
// //     {
// //       id: 3,
// //       loanAmount: 30000,
// //       tenure: '18 months',
// //       nextInstallment: '2025-01-20',
// //       status: 'Active',
// //       interestRate: '11.5%',
// //       channelPartner: 'ABC Finance Ltd.',
// //       purpose: 'Medical Emergency'
// //     }
// //   ];

// //   const [formData, setFormData] = useState({
// //     loanAmount: '',
// //     tenure: '',
// //     purpose: ''
// //   });

// //   const handleRowClick = (loan) => {
// //     setSelectedLoan(loan);
// //   };

// //   const handleBack = () => {
// //     setSelectedLoan(null);
// //   };

// //   const handleApplyLoan = () => {
// //     setShowApplicationModal(true);
// //     setApplicationStatus(null);
// //     setFormData({ loanAmount: '', tenure: '', purpose: '' });
// //   };

// //   const handleCloseModal = () => {
// //     setShowApplicationModal(false);
// //     setApplicationStatus(null);
// //     setFormData({ loanAmount: '', tenure: '', purpose: '' });
// //   };

// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = () => {
// //     if (!formData.loanAmount || !formData.tenure || !formData.purpose) {
// //       alert('Please fill all fields');
// //       return;
// //     }

// //     setIsLoading(true);

// //     setTimeout(() => {
// //       setIsLoading(false);
// //       const loanAmount = parseFloat(formData.loanAmount);
      
// //       if (loanAmount < 20000 && creditScore > 70) {
// //         setApplicationStatus('approved');
// //       } else {
// //         setApplicationStatus('pending');
// //       }
// //     }, 5000);
// //   };

// //   if (selectedLoan) {
// //     return <LoanDetails loan={selectedLoan} onBack={handleBack} />;
// //   }

// //   return (
// //     <div className="dashboard-container">
// //       <header className="dashboard-header">
// //         <h1>Beneficiary Dashboard</h1>
// //         <button className="apply-loan-btn" onClick={handleApplyLoan}>
// //           Apply for a Loan
// //         </button>
// //       </header>

// //       <div className="credit-score-card">
// //         <h3>Credit Score</h3>
// //         <div className="credit-score-value">{creditScore}</div>
// //         <div className="credit-score-bar">
// //           <div 
// //             className="credit-score-fill" 
// //             style={{ width: `${(creditScore / 100) * 100}%` }}
// //           ></div>
// //         </div>
// //       </div>

// //       <div className="loans-section">
// //         <h2>Previous Loan Details</h2>
// //         <div className="table-container">
// //           <table className="loans-table">
// //             <thead>
// //               <tr>
// //                 <th>Loan Amount</th>
// //                 <th>Tenure</th>
// //                 <th>Next Installment Date</th>
// //                 <th>Loan Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {loans.map((loan) => (
// //                 <tr 
// //                   key={loan.id} 
// //                   onClick={() => handleRowClick(loan)}
// //                   className="loan-row"
// //                 >
// //                   <td>₹{loan.loanAmount.toLocaleString()}</td>
// //                   <td>{loan.tenure}</td>
// //                   <td>{loan.nextInstallment}</td>
// //                   <td>
// //                     <span className={`status-badge ${loan.status.toLowerCase()}`}>
// //                       {loan.status}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {showApplicationModal && (
// //         <LoanApplicationModal
// //           formData={formData}
// //           isLoading={isLoading}
// //           applicationStatus={applicationStatus}
// //           onInputChange={handleInputChange}
// //           onSubmit={handleSubmit}
// //           onClose={handleCloseModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // Loan Details Component
// // const LoanDetails = ({ loan, onBack }) => {
// //   return (
// //     <div className="loan-details-container">
// //       <button className="back-btn" onClick={onBack}>
// //         ← Back to Dashboard
// //       </button>
      
// //       <div className="loan-details-card">
// //         <h2>Loan Details</h2>
        
// //         <div className="detail-grid">
// //           <div className="detail-item">
// //             <label>Loan Amount</label>
// //             <p>₹{loan.loanAmount.toLocaleString()}</p>
// //           </div>
          
// //           <div className="detail-item">
// //             <label>Status</label>
// //             <p>
// //               <span className={`status-badge ${loan.status.toLowerCase()}`}>
// //                 {loan.status}
// //               </span>
// //             </p>
// //           </div>
          
// //           <div className="detail-item">
// //             <label>Tenure</label>
// //             <p>{loan.tenure}</p>
// //           </div>
          
// //           <div className="detail-item">
// //             <label>Interest Rate</label>
// //             <p>{loan.interestRate}</p>
// //           </div>
          
// //           <div className="detail-item">
// //             <label>Channel Partner</label>
// //             <p>{loan.channelPartner}</p>
// //           </div>
          
// //           <div className="detail-item">
// //             <label>Purpose of Loan</label>
// //             <p>{loan.purpose}</p>
// //           </div>
          
// //           {loan.status === 'Active' && (
// //             <div className="detail-item">
// //               <label>Next Installment Date</label>
// //               <p>{loan.nextInstallment}</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Loan Application Modal Component
// // const LoanApplicationModal = ({ 
// //   formData, 
// //   isLoading, 
// //   applicationStatus, 
// //   onInputChange, 
// //   onSubmit, 
// //   onClose 
// // }) => {
// //   return (
// //     <div className="modal-overlay">
// //       <div className="modal-content">
// //         {!isLoading && !applicationStatus && (
// //           <>
// //             <div className="modal-header">
// //               <h2>Apply for a Loan</h2>
// //               <button className="close-btn" onClick={onClose}>×</button>
// //             </div>
            
// //             <div className="loan-form">
// //               <div className="form-group">
// //                 <label>Loan Amount (₹)</label>
// //                 <input
// //                   type="number"
// //                   name="loanAmount"
// //                   value={formData.loanAmount}
// //                   onChange={onInputChange}
// //                   placeholder="Enter loan amount"
// //                 />
// //               </div>
              
// //               <div className="form-group">
// //                 <label>Tenure</label>
// //                 <select
// //                   name="tenure"
// //                   value={formData.tenure}
// //                   onChange={onInputChange}
// //                 >
// //                   <option value="">Select tenure</option>
// //                   <option value="6 months">6 months</option>
// //                   <option value="12 months">12 months</option>
// //                   <option value="18 months">18 months</option>
// //                   <option value="24 months">24 months</option>
// //                   <option value="36 months">36 months</option>
// //                 </select>
// //               </div>
              
// //               <div className="form-group">
// //                 <label>Purpose of Loan</label>
// //                 <textarea
// //                   name="purpose"
// //                   value={formData.purpose}
// //                   onChange={onInputChange}
// //                   placeholder="Enter purpose of loan"
// //                   rows="4"
// //                 />
// //               </div>
              
// //               <button className="submit-btn" onClick={onSubmit}>
// //                 Submit Application
// //               </button>
// //             </div>
// //           </>
// //         )}
        
// //         {isLoading && (
// //           <div className="loading-container">
// //             <div className="loader"></div>
// //             <p>Processing your application...</p>
// //           </div>
// //         )}
        
// //         {applicationStatus === 'approved' && (
// //           <div className="status-container">
// //             <div className="success-animation">
// //               <svg className="checkmark" viewBox="0 0 52 52">
// //                 <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
// //                 <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
// //               </svg>
// //             </div>
// //             <h3 className="success-title">Loan Approved!</h3>
// //             <p className="success-message">
// //               Your loan is approved. Disbursement of amount will happen within the next working day.
// //             </p>
// //             <button className="close-status-btn" onClick={onClose}>Close</button>
// //           </div>
// //         )}
        
// //         {applicationStatus === 'pending' && (
// //           <div className="status-container">
// //             <div className="pending-animation">
// //               <svg className="pending-icon" viewBox="0 0 52 52">
// //                 <circle className="pending-circle" cx="26" cy="26" r="25" fill="none"/>
// //                 <circle className="pending-dot" cx="26" cy="26" r="5"/>
// //               </svg>
// //             </div>
// //             <h3 className="pending-title">Application Under Process</h3>
// //             <p className="pending-message">
// //               Your application is under process. We will notify you on completion.
// //             </p>
// //             <button className="close-status-btn" onClick={onClose}>Close</button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/components/dashboards/Dashboard.jsx
// import React, { useState } from 'react';

// const Dashboard = () => {
//   const [selectedLoan, setSelectedLoan] = useState(null);
//   const [showApplicationModal, setShowApplicationModal] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const creditScore = 75;
//   const loans = [
//     {
//       id: 1,
//       loanAmount: 50000,
//       tenure: '24 months',
//       nextInstallment: '2025-01-15',
//       status: 'Active',
//       interestRate: '12%',
//       channelPartner: 'ABC Finance Ltd.',
//       purpose: 'Home Renovation',
//     },
//     {
//       id: 2,
//       loanAmount: 15000,
//       tenure: '12 months',
//       nextInstallment: 'N/A',
//       status: 'Closed',
//       interestRate: '10%',
//       channelPartner: 'XYZ Credit Co.',
//       purpose: 'Education',
//     },
//     {
//       id: 3,
//       loanAmount: 30000,
//       tenure: '18 months',
//       nextInstallment: '2025-01-20',
//       status: 'Active',
//       interestRate: '11.5%',
//       channelPartner: 'ABC Finance Ltd.',
//       purpose: 'Medical Emergency',
//     },
//   ];

//   const [formData, setFormData] = useState({
//     loanAmount: '',
//     tenure: '',
//     purpose: '',
//   });

//   const handleRowClick = (loan) => setSelectedLoan(loan);
//   const handleBack = () => setSelectedLoan(null);

//   const handleApplyLoan = () => {
//     setShowApplicationModal(true);
//     setApplicationStatus(null);
//     setFormData({ loanAmount: '', tenure: '', purpose: '' });
//   };

//   const handleCloseModal = () => {
//     setShowApplicationModal(false);
//     setApplicationStatus(null);
//     setFormData({ loanAmount: '', tenure: '', purpose: '' });
//     setIsLoading(false);
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.loanAmount || !formData.tenure || !formData.purpose) {
//       alert('Please fill all fields');
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       const loanAmount = parseFloat(formData.loanAmount);

//       if (loanAmount < 20000 && creditScore > 70) {
//         setApplicationStatus('approved');
//       } else {
//         setApplicationStatus('pending');
//       }
//     }, 2000);
//   };

//   if (selectedLoan) {
//     return <LoanDetails loan={selectedLoan} onBack={handleBack} />;
//   }

//   const totalExposure = loans
//     .filter((l) => l.status === 'Active')
//     .reduce((sum, l) => sum + l.loanAmount, 0);

//   const activeLoans = loans.filter((l) => l.status === 'Active').length;

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400">
//               Credit Saarthi · Beneficiary
//             </p>
//             <h1 className="mt-1 text-2xl sm:text-3xl font-semibold">
//               Beneficiary Dashboard
//             </h1>
//             <p className="mt-1 text-sm text-slate-400">
//               Track your loan history, credit score and apply for a new loan.
//             </p>
//           </div>
//           <button
//             onClick={handleApplyLoan}
//             className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
//           >
//             + Apply for a Loan
//           </button>
//         </header>

//         {/* Top cards */}
//         <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {/* Credit Score */}
//           <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-lg shadow-blue-500/20">
//             <div className="flex items-center justify-between mb-3">
//               <div>
//                 <p className="text-xs text-slate-400">Credit Score</p>
//                 <p className="text-2xl font-semibold">
//                   {creditScore}
//                   <span className="text-xs text-slate-500"> / 100</span>
//                 </p>
//               </div>
//               <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-300">
//                 {creditScore >= 80
//                   ? 'Excellent'
//                   : creditScore >= 60
//                   ? 'Good'
//                   : 'Needs Improvement'}
//               </span>
//             </div>
//             <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-blue-600"
//                 style={{ width: `${creditScore}%` }}
//               />
//             </div>
//             <p className="mt-2 text-[11px] text-slate-400">
//               Better scores may help you get faster approvals and better interest rates.
//             </p>
//           </div>

//           {/* Active Loans */}
//           <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-900/10 to-slate-950 p-4 shadow-lg shadow-emerald-500/20">
//             <p className="text-xs text-slate-400 mb-1">Active Loans</p>
//             <p className="text-2xl font-semibold">{activeLoans}</p>
//             <p className="mt-2 text-[11px] text-slate-400">
//               Click on any loan below to see detailed information and repayment schedule.
//             </p>
//           </div>

//           {/* Total Exposure */}
//           <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900/10 to-slate-950 p-4 shadow-lg shadow-indigo-500/20">
//             <p className="text-xs text-slate-400 mb-1">Current Exposure</p>
//             <p className="text-2xl font-semibold">
//               ₹{totalExposure.toLocaleString()}
//             </p>
//             <p className="mt-2 text-[11px] text-slate-400">
//               Plan new loans responsibly based on your income and existing exposure.
//             </p>
//           </div>
//         </section>

//         {/* Loan table */}
//         <section className="rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm shadow-xl shadow-slate-900/40">
//           <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800">
//             <div>
//               <h2 className="text-sm sm:text-base font-semibold">
//                 Previous & Active Loans
//               </h2>
//               <p className="text-[11px] text-slate-400 mt-1">
//                 Click on any row to view full loan details.
//               </p>
//             </div>
//             <button
//               onClick={handleApplyLoan}
//               className="hidden sm:inline-flex items-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition"
//             >
//               Apply New Loan
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="bg-slate-900/60 text-xs text-slate-400">
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                     Loan Amount
//                   </th>
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                     Tenure
//                   </th>
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                     Next Installment
//                   </th>
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loans.map((loan, idx) => (
//                   <tr
//                     key={loan.id}
//                     onClick={() => handleRowClick(loan)}
//                     className={`cursor-pointer transition ${
//                       idx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
//                     } hover:bg-slate-800/80`}
//                   >
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
//                       ₹{loan.loanAmount.toLocaleString()}
//                     </td>
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
//                       {loan.tenure}
//                     </td>
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
//                       {loan.nextInstallment}
//                     </td>
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border ${
//                           loan.status === 'Active'
//                             ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
//                             : 'bg-slate-700/40 text-slate-200 border-slate-600'
//                         }`}
//                       >
//                         <span
//                           className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
//                             loan.status === 'Active'
//                               ? 'bg-emerald-400'
//                               : 'bg-slate-400'
//                           }`}
//                         />
//                         {loan.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//                 {loans.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={4}
//                       className="px-4 sm:px-6 py-6 text-center text-sm text-slate-400"
//                     >
//                       No loan records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>

//       {showApplicationModal && (
//         <LoanApplicationModal
//           formData={formData}
//           isLoading={isLoading}
//           applicationStatus={applicationStatus}
//           onInputChange={handleInputChange}
//           onSubmit={handleSubmit}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// const LoanDetails = ({ loan, onBack }) => {
//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <button
//           onClick={onBack}
//           className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition mb-4"
//         >
//           ← Back to Dashboard
//         </button>

//         <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-900/40 overflow-hidden">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
//             <div>
//               <p className="text-xs text-slate-400">Loan ID #{loan.id}</p>
//               <h2 className="text-lg sm:text-xl font-semibold text-white">
//                 ₹{loan.loanAmount.toLocaleString()} · {loan.tenure}
//               </h2>
//             </div>
//             <span
//               className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
//                 loan.status === 'Active'
//                   ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
//                   : 'bg-slate-700/40 text-slate-200 border-slate-600'
//               }`}
//             >
//               <span
//                 className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
//                   loan.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'
//                 }`}
//               />
//               {loan.status}
//             </span>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 py-5">
//             <DetailItem label="Loan Amount" value={`₹${loan.loanAmount.toLocaleString()}`} />
//             <DetailItem label="Tenure" value={loan.tenure} />
//             <DetailItem label="Interest Rate" value={loan.interestRate} />
//             <DetailItem label="Channel Partner" value={loan.channelPartner} />
//             <DetailItem label="Purpose of Loan" value={loan.purpose} />
//             {loan.status === 'Active' && (
//               <DetailItem label="Next Installment Date" value={loan.nextInstallment} />
//             )}
//           </div>

//           <div className="px-4 sm:px-6 pb-5">
//             <p className="text-[11px] text-slate-500">
//               For any queries or support with this loan, please contact your channel
//               partner: <span className="text-slate-200">{loan.channelPartner}</span>.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
//     <p className="text-[11px] text-slate-400 uppercase tracking-wide">{label}</p>
//     <p className="mt-1 text-sm font-medium text-slate-50">{value}</p>
//   </div>
// );

// const LoanApplicationModal = ({
//   formData,
//   isLoading,
//   applicationStatus,
//   onInputChange,
//   onSubmit,
//   onClose,
// }) => {
//   const isFormFilled =
//     formData.loanAmount.trim() && formData.tenure.trim() && formData.purpose.trim();

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="w-full max-w-lg mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-blue-900/40 overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-600/10 via-slate-900 to-slate-950">
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400">
//               New Loan Application
//             </p>
//             <h2 className="text-base font-semibold text-white mt-1">
//               Apply for a new loan
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
//           >
//             ×
//           </button>
//         </div>

//         <div className="px-5 py-5">
//           {/* Form */}
//           {!isLoading && !applicationStatus && (
//             <div className="space-y-4">
//               <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-3">
//                 <p className="text-[11px] text-blue-300">
//                   Tip: Lower loan amounts and clear purpose generally increase the chances
//                   of faster approval.
//                 </p>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-200">
//                   Loan Amount (₹)
//                 </label>
//                 <input
//                   type="number"
//                   name="loanAmount"
//                   value={formData.loanAmount}
//                   onChange={onInputChange}
//                   placeholder="Enter loan amount e.g. 15000"
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-200">Tenure</label>
//                 <select
//                   name="tenure"
//                   value={formData.tenure}
//                   onChange={onInputChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select tenure</option>
//                   <option value="6 months">6 months</option>
//                   <option value="12 months">12 months</option>
//                   <option value="18 months">18 months</option>
//                   <option value="24 months">24 months</option>
//                   <option value="36 months">36 months</option>
//                 </select>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-200">
//                   Purpose of Loan
//                 </label>
//                 <textarea
//                   name="purpose"
//                   value={formData.purpose}
//                   onChange={onInputChange}
//                   rows={3}
//                   placeholder="e.g. For business expansion / education / medical emergency..."
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                 />
//                 <p className="mt-1 text-[10px] text-slate-500">
//                   A clear and specific purpose improves your application quality.
//                 </p>
//               </div>

//               <div className="flex items-center justify-between pt-2">
//                 <p className="text-[11px] text-slate-500 max-w-[70%]">
//                   By submitting, you allow Credit Saarthi and partner NBFCs to review your
//                   profile for this loan.
//                 </p>
//                 <button
//                   onClick={onSubmit}
//                   disabled={!isFormFilled}
//                   className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition ${
//                     !isFormFilled
//                       ? 'bg-blue-400/40 cursor-not-allowed'
//                       : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Loading */}
//           {isLoading && (
//             <div className="flex flex-col items-center justify-center py-10 space-y-3">
//               <div className="rounded-full bg-slate-900/80 p-4 border border-slate-800">
//                 <div className="w-7 h-7 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
//               </div>
//               <p className="text-sm text-slate-200">Processing your application...</p>
//               <p className="text-[11px] text-slate-500 text-center max-w-xs">
//                 Please wait while we evaluate your credit profile.
//               </p>
//             </div>
//           )}

//           {/* Approved */}
//           {applicationStatus === 'approved' && (
//             <div className="flex flex-col items-center justify-center py-8 space-y-4">
//               <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
//                 <svg className="w-11 h-11 text-emerald-400" viewBox="0 0 24 24">
//                   <path
//                     fill="currentColor"
//                     d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 14.59L7.41 13l1.18-1.18L11 14.17l4.41-4.41L16.59 11Z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-white">Loan Approved!</h3>
//               <p className="text-sm text-slate-300 text-center max-w-sm">
//                 Your loan has been approved. Disbursement will happen within the next working day.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           )}

//           {/* Pending */}
//           {applicationStatus === 'pending' && (
//             <div className="flex flex-col items-center justify-center py-8 space-y-4">
//               <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
//                 <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
//               </div>
//               <h3 className="text-lg font-semibold text-white">
//                 Application Under Process
//               </h3>
//               <p className="text-sm text-slate-300 text-center max-w-sm">
//                 Your application is under review. We will notify you once the decision is taken.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// src/components/dashboards/Dashboard.jsx
// import React, { useState } from 'react';
// import { useLanguage } from '../../context/LanguageContext';
// import { translations } from '../../utils/translations';

// const Dashboard = () => {
//   const { language } = useLanguage();
//   const t = translations[language];
//   const [selectedLoan, setSelectedLoan] = useState(null);
//   const [showApplicationModal, setShowApplicationModal] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const creditScore = 684;
//   const loans = [
//     {
//       id: 1,
//       loanAmount: 50000,
//       tenure: '24 months',
//       nextInstallment: '2025-01-15',
//       status: 'Active',
//       interestRate: '12%',
//       channelPartner: 'ABC Finance Ltd.',
//       purpose: 'Home Renovation',
//     },
//     {
//       id: 2,
//       loanAmount: 15000,
//       tenure: '12 months',
//       nextInstallment: 'N/A',
//       status: 'Closed',
//       interestRate: '10%',
//       channelPartner: 'XYZ Credit Co.',
//       purpose: 'Education',
//     },
//     {
//       id: 3,
//       loanAmount: 30000,
//       tenure: '18 months',
//       nextInstallment: '2025-01-20',
//       status: 'Active',
//       interestRate: '11.5%',
//       channelPartner: 'ABC Finance Ltd.',
//       purpose: 'Medical Emergency',
//     },
//   ];

//   const [formData, setFormData] = useState({
//     loanAmount: '',
//     tenure: '',
//     purpose: '',
//   });

//   const handleRowClick = (loan) => setSelectedLoan(loan);
//   const handleBack = () => setSelectedLoan(null);

//   const handleApplyLoan = () => {
//     setShowApplicationModal(true);
//     setApplicationStatus(null);
//     setFormData({ loanAmount: '', tenure: '', purpose: '' });
//   };

//   const handleCloseModal = () => {
//     setShowApplicationModal(false);
//     setApplicationStatus(null);
//     setFormData({ loanAmount: '', tenure: '', purpose: '' });
//     setIsLoading(false);
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.loanAmount || !formData.tenure || !formData.purpose) {
//       alert(t.beneficiaryDashboard.submitAgreement);
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       const loanAmount = parseFloat(formData.loanAmount);

//       if (loanAmount < 20000 && creditScore > 70) {
//         setApplicationStatus('approved');
//       } else {
//         setApplicationStatus('pending');
//       }
//     }, 2000);
//   };

//   if (selectedLoan) {
//     return <LoanDetails loan={selectedLoan} onBack={handleBack} />;
//   }

//   const totalExposure = loans
//     .filter((l) => l.status === 'Active')
//     .reduce((sum, l) => sum + l.loanAmount, 0);

//   const activeLoans = loans.filter((l) => l.status === 'Active').length;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 text-slate-900">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-600">
//               {t.beneficiaryDashboard.brand}
//             </p>
//             <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-slate-900">
//               {t.beneficiaryDashboard.welcomeBack} {t.beneficiaryDashboard.beneficiary}
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               {t.beneficiaryDashboard.description}
//             </p>
//           </div>
//           <button
//             onClick={handleApplyLoan}
//             className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:bg-sky-700 transition"
//           >
//             {t.beneficiaryDashboard.newLoan}
//           </button>
//         </header>

//         {/* Top cards */}
//         <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {/* Credit Score */}
//           <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 shadow-md shadow-sky-100">
//             <div className="flex items-center justify-between mb-3">
//               <div>
//                 <p className="text-xs text-slate-500">{t.beneficiaryDashboard.creditScore}</p>
//                 <p className="text-2xl font-semibold text-slate-900">
//                   {creditScore}
                  
//                 </p>
//               </div>
//             </div>
//             <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500"
//                 style={{ width: `${creditScore}%` }}
//               />
//             </div>
//             <p className="mt-2 text-[11px] text-slate-500">
//               {t.beneficiaryDashboard.scoreDescription}
//             </p>
//           </div>

//           {/* Active Loans */}
//           <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 shadow-md shadow-emerald-100">
//             <p className="text-xs text-slate-500 mb-1">{t.beneficiaryDashboard.activeLoans}</p>
//             <p className="text-2xl font-semibold text-slate-900">{activeLoans}</p>
//             <p className="mt-2 text-[11px] text-slate-500">
//               {t.beneficiaryDashboard.activeLoansDescription}
//             </p>
//           </div>

//           {/* Total Exposure */}
//           <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 shadow-md shadow-blue-100">
//             <p className="text-xs text-slate-500 mb-1">{t.beneficiaryDashboard.currentExposure}</p>
//             <p className="text-2xl font-semibold text-slate-900">
//               ₹{totalExposure.toLocaleString()}
//             </p>
//             <p className="mt-2 text-[11px] text-slate-500">
//               {t.beneficiaryDashboard.exposureDescription}
//             </p>
//           </div>
//         </section>

//         {/* Loan table */}
//         <section className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg shadow-slate-100">
//           <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200">
//             <div>
//               <h2 className="text-sm sm:text-base font-semibold text-slate-900">
//                 {t.beneficiaryDashboard.previousActiveLoans}
//               </h2>
//               <p className="text-[11px] text-slate-500 mt-1">
//                 {t.beneficiaryDashboard.loansTableDescription}
//               </p>
//             </div>
          
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="bg-sky-50 text-xs text-sky-700 border-b border-slate-200">
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">{t.beneficiaryDashboard.loanAmount}</th>
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">{t.beneficiaryDashboard.tenure}</th>
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                     {t.beneficiaryDashboard.nextInstallment}
//                   </th>
//                   <th className="px-4 sm:px-6 py-3 text-left font-medium">{t.beneficiaryDashboard.status}</th>
//                 </tr> 
//               </thead>
//               <tbody>
//                 {loans.map((loan, idx) => (
//                   <tr
//                     key={loan.id}
//                     onClick={() => handleRowClick(loan)}
//                     className={`cursor-pointer transition ${
//                       idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
//                     } hover:bg-sky-50`}
//                   >
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-800">
//                       ₹{loan.loanAmount.toLocaleString()}
//                     </td>
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-700">
//                       {loan.tenure}
//                     </td>
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-700">
//                       {loan.nextInstallment}
//                     </td>
//                     <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border ${
//                           loan.status === 'Active'
//                             ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
//                             : 'bg-slate-100 text-slate-700 border-slate-300'
//                         }`}
//                       >
//                         <span
//                           className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
//                             loan.status === 'Active'
//                               ? 'bg-emerald-500'
//                               : 'bg-slate-500'
//                           }`}
//                         />
//                         {loan.status === 'Active' ? t.beneficiaryDashboard.active : t.beneficiaryDashboard.closed}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//                 {loans.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={4}
//                       className="px-4 sm:px-6 py-6 text-center text-sm text-slate-500"
//                     >
//                       {t.beneficiaryDashboard.noLoanHistory}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>

//       {showApplicationModal && (
//         <LoanApplicationModal
//           formData={formData}
//           isLoading={isLoading}
//           applicationStatus={applicationStatus}
//           onInputChange={handleInputChange}
//           onSubmit={handleSubmit}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// const LoanDetails = ({ loan, onBack }) => {
//   const { language } = useLanguage();
//   const t = translations[language];
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 text-slate-900">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <button
//           onClick={onBack}
//           className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-sky-50 hover:border-sky-200 transition mb-4 shadow-sm"
//         >
//           ← {t.beneficiaryDashboard.backToDashboard}
//         </button>

//         <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100 overflow-hidden">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-blue-50">
//             <div>
//               <p className="text-xs text-slate-500">{t.beneficiaryDashboard.loanID}{loan.id}</p>
//               <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
//                 ₹{loan.loanAmount.toLocaleString()} · {loan.tenure}
//               </h2>
//             </div>
//             <span
//               className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
//                 loan.status === 'Active'
//                   ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
//                   : 'bg-slate-100 text-slate-700 border-slate-300'
//               }`}
//             >
//               <span
//                 className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
//                   loan.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'
//                 }`}
//               />
//               {loan.status === 'Active' ? t.beneficiaryDashboard.active : t.beneficiaryDashboard.closed}
//             </span>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 py-5">
//             <DetailItem label={t.beneficiaryDashboard.loanAmount} value={`₹${loan.loanAmount.toLocaleString()}`} />
//             <DetailItem label={t.beneficiaryDashboard.tenure} value={loan.tenure} />
//             <DetailItem label={t.beneficiaryDashboard.interestRate} value={loan.interestRate} />
//             <DetailItem label={t.beneficiaryDashboard.channelPartner} value={loan.channelPartner} />
//             <DetailItem label={t.beneficiaryDashboard.purposeOfLoan} value={loan.purpose} />
//             {loan.status === 'Active' && (
//               <DetailItem label={t.beneficiaryDashboard.nextInstallmentDate} value={loan.nextInstallment} />
//             )}
//           </div>

//           <div className="px-4 sm:px-6 pb-5">
//             <p className="text-[11px] text-slate-500">
//               {t.beneficiaryDashboard.loanSupport} <span className="text-slate-800">{loan.channelPartner}</span>.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
//     <p className="text-[11px] text-slate-500 uppercase tracking-wide">{label}</p>
//     <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
//   </div>
// );

// const LoanApplicationModal = ({
//   formData,
//   isLoading,
//   applicationStatus,
//   onInputChange,
//   onSubmit,
//   onClose,
// }) => {
//   const { language } = useLanguage();
//   const t = translations[language];
//   const isFormFilled =
//     formData.loanAmount.trim() && formData.tenure.trim() && formData.purpose.trim();

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
//       <div className="w-full max-w-lg mx-4 rounded-2xl border border-sky-100 bg-white shadow-2xl shadow-sky-100 overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-blue-50">
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-700">
//               {t.beneficiaryDashboard.newLoanApplication}
//             </p>
//             <h2 className="text-base font-semibold text-slate-900 mt-1">
//               {t.beneficiaryDashboard.applyForAdditionalSupport}
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-full p-2 hover:bg-slate-100 text-slate-500 transition"
//           >
//             ×
//           </button>
//         </div>

//         <div className="px-5 py-5">
//           {/* Form */}
//           {!isLoading && !applicationStatus && (
//             <div className="space-y-4">
//               <div className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-3">
//                 <p className="text-[11px] text-sky-700">
//                   {t.beneficiaryDashboard.tip}
//                 </p>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-800">
//                   {t.beneficiaryDashboard.loanAmountLabel}
//                 </label>
//                 <input
//                   type="number"
//                   name="loanAmount"
//                   value={formData.loanAmount}
//                   onChange={onInputChange}
//                   placeholder={t.beneficiaryDashboard.loanAmountPlaceholder}
//                   className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-800">{t.beneficiaryDashboard.tenureLabel}</label>
//                 <select
//                   name="tenure"
//                   value={formData.tenure}
//                   onChange={onInputChange}
//                   className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//                 >
//                   <option value="">{t.beneficiaryDashboard.selectTenure}</option>
//                   <option value="6 months">{t.beneficiaryDashboard.tenureOptions.sixMonths}</option>
//                   <option value="12 months">{t.beneficiaryDashboard.tenureOptions.twelveMonths}</option>
//                   <option value="18 months">{t.beneficiaryDashboard.tenureOptions.eighteenMonths}</option>
//                   <option value="24 months">{t.beneficiaryDashboard.tenureOptions.twentyFourMonths}</option>
//                   <option value="36 months">{t.beneficiaryDashboard.tenureOptions.thirtySixMonths}</option>
//                 </select>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-800">
//                   {t.beneficiaryDashboard.purposeOfLoanLabel}
//                 </label>
//                 <textarea
//                   name="purpose"
//                   value={formData.purpose}
//                   onChange={onInputChange}
//                   rows={3}
//                   placeholder={t.beneficiaryDashboard.purposePlaceholder}
//                   className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
//                 />
//                 <p className="mt-1 text-[10px] text-slate-500">
//                   {t.beneficiaryDashboard.purposeHint}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between pt-2">
//                 <p className="text-[11px] text-slate-500 max-w-[70%]">
//                   {t.beneficiaryDashboard.submitAgreement}
//                 </p>
//                 <button
//                   onClick={onSubmit}
//                   disabled={!isFormFilled}
//                   className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition ${
//                     !isFormFilled
//                       ? 'bg-sky-300 cursor-not-allowed'
//                       : 'bg-sky-600 hover:bg-sky-700 shadow-sky-200'
//                   }`}
//                 >
//                   {t.beneficiaryDashboard.submit}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Loading */}
//           {isLoading && (
//             <div className="flex flex-col items-center justify-center py-10 space-y-3">
//               <div className="rounded-full bg-sky-50 p-4 border border-sky-200">
//                 <div className="w-7 h-7 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
//               </div>
//               <p className="text-sm text-slate-800">{t.beneficiaryDashboard.processing}</p>
//               <p className="text-[11px] text-slate-500 text-center max-w-xs">
//                 {t.beneficiaryDashboard.processingDescription}
//               </p>
//             </div>
//           )}

//           {/* Approved */}
//           {applicationStatus === 'approved' && (
//             <div className="flex flex-col items-center justify-center py-8 space-y-4">
//               <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
//                 <svg className="w-11 h-11 text-emerald-500" viewBox="0 0 24 24">
//                   <path
//                     fill="currentColor"
//                     d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 14.59L7.41 13l1.18-1.18L11 14.17l4.41-4.41L16.59 11Z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-slate-900">{t.beneficiaryDashboard.loanApproved}</h3>
//               <p className="text-sm text-slate-700 text-center max-w-sm">
//                 {t.beneficiaryDashboard.approvedDescription}
//               </p>
//               <button
//                 onClick={onClose}
//                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-600 transition"
//               >
//                 {t.beneficiaryDashboard.close}
//               </button>
//             </div>
//           )}

//           {/* Pending */}
//           {applicationStatus === 'pending' && (
//             <div className="flex flex-col items-center justify-center py-8 space-y-4">
//               <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
//                 <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-900">
//                 {t.beneficiaryDashboard.applicationUnderProcess}
//               </h3>
//               <p className="text-sm text-slate-700 text-center max-w-sm">
//                 {t.beneficiaryDashboard.pendingDescription}
//               </p>
//               <button
//                 onClick={onClose}
//                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900 transition"
//               >
//                 {t.beneficiaryDashboard.close}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';
import { useDualLanguage } from '../../hooks/useDualLanguage';

const Dashboard = () => {
  const { language } = useLanguage();
  const { translate: tr } = useDualLanguage();
  const t = translations[language];

  const [selectedLoan, setSelectedLoan] = useState(null);

  // Household popup (shown first)
  const [showHouseholdModal, setShowHouseholdModal] = useState(false);

  // Loan application popup (shown after household)
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const creditScore = 684;
  const loans = [
    {
      id: 1,
      loanAmount: 50000,
      tenure: '24 months',
      nextInstallment: '2025-01-15',
      status: 'Active',
      interestRate: '12%',
      channelPartner: 'ABC Finance Ltd.',
      purpose: 'Home Renovation',
    },
    {
      id: 2,
      loanAmount: 15000,
      tenure: '12 months',
      nextInstallment: 'N/A',
      status: 'Closed',
      interestRate: '10%',
      channelPartner: 'XYZ Credit Co.',
      purpose: 'Education',
    },
    {
      id: 3,
      loanAmount: 30000,
      tenure: '18 months',
      nextInstallment: '2025-01-20',
      status: 'Active',
      interestRate: '11.5%',
      channelPartner: 'ABC Finance Ltd.',
      purpose: 'Medical Emergency',
    },
  ];

  const [formData, setFormData] = useState({
    loanAmount: '',
    tenure: '',
    purpose: '',
  });

  // compact mirror of Page4 fields for popup
  const [householdData, setHouseholdData] = useState({
    household_size: '',
    num_earners: '',
    avg_monthly_family_income: '',
    income_certificate: null,
    bank_statement: null,

    has_children: '',
    children_school_type: '',

    ac: false,
    fridge: false,
    car: false,
    two_wheeler: false,
    tv: false,
    smartphone: false,

    cooking_fuel: '',
    lpg_refills_per_year: '',

    house_type: '',
    has_other_land: '',
    other_land_size_hectare: '',

    meter_number: '',
    electricity_input_method: '',
    electricity_bill_upload_last_month: null,
    electricity_month1_amount: '',
    electricity_month1_units: '',
    electricity_month2_amount: '',
    electricity_month2_units: '',
    electricity_month3_amount: '',
    electricity_month3_units: '',

    num_phones: '',
    phone_recharges: [],
  });

  const handleRowClick = (loan) => setSelectedLoan(loan);
  const handleBack = () => setSelectedLoan(null);

  // open Household popup first
  const handleApplyLoan = () => {
    setApplicationStatus(null);
    setFormData({ loanAmount: '', tenure: '', purpose: '' });
    setShowHouseholdModal(true);
    setShowApplicationModal(false);
  };

  const handleCloseHouseholdModal = () => {
    setShowHouseholdModal(false);
  };

  const handleHouseholdContinue = () => {
    if (
      !householdData.household_size.trim() ||
      !householdData.num_earners.trim() ||
      !householdData.avg_monthly_family_income.trim() ||
      !householdData.meter_number.trim()
    ) {
      alert(
        tr(
          'Please fill Household Size, Number of Earners, Monthly Family Income and Electricity Meter Number.',
          'कृपया परिवार के सदस्यों की संख्या, कमाने वालों की संख्या, मासिक पारिवारिक आय और बिजली मीटर नंबर भरें।'
        )
      );
      return;
    }
    setShowHouseholdModal(false);
    setShowApplicationModal(true);
    setApplicationStatus(null);
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setShowApplicationModal(false);
    setApplicationStatus(null);
    setFormData({ loanAmount: '', tenure: '', purpose: '' });
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.loanAmount || !formData.tenure || !formData.purpose) {
      alert(t.beneficiaryDashboard.submitAgreement);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const loanAmount = parseFloat(formData.loanAmount);

      if (loanAmount < 20000 && creditScore > 70) {
        setApplicationStatus('approved');
      } else {
        setApplicationStatus('pending');
      }
    }, 2000);
  };

  if (selectedLoan) {
    return <LoanDetails loan={selectedLoan} onBack={handleBack} />;
  }

  const totalExposure = loans
    .filter((l) => l.status === 'Active')
    .reduce((sum, l) => sum + l.loanAmount, 0);
  const activeLoans = loans.filter((l) => l.status === 'Active').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-600">
              {t.beneficiaryDashboard.brand}
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-slate-900">
              {t.beneficiaryDashboard.welcomeBack}{' '}
              {t.beneficiaryDashboard.beneficiary}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {t.beneficiaryDashboard.description}
            </p>
          </div>
          <button
            onClick={handleApplyLoan}
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:bg-sky-700 transition"
          >
            {t.beneficiaryDashboard.newLoan}
          </button>
        </header>

        {/* Top cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Credit Score */}
          <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 shadow-md shadow-sky-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500">
                  {t.beneficiaryDashboard.creditScore}
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {creditScore}
                </p>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500"
                style={{ width: `${creditScore}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              {t.beneficiaryDashboard.scoreDescription}
            </p>
          </div>

          {/* Active Loans */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 shadow-md shadow-emerald-100">
            <p className="text-xs text-slate-500 mb-1">
              {t.beneficiaryDashboard.activeLoans}
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              {activeLoans}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              {t.beneficiaryDashboard.activeLoansDescription}
            </p>
          </div>

          {/* Total Exposure */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 shadow-md shadow-blue-100">
            <p className="text-xs text-slate-500 mb-1">
              {t.beneficiaryDashboard.currentExposure}
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              ₹{totalExposure.toLocaleString()}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              {t.beneficiaryDashboard.exposureDescription}
            </p>
          </div>
        </section>

        {/* Loan table */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg shadow-slate-100">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                {t.beneficiaryDashboard.previousActiveLoans}
              </h2>
              <p className="text-[11px] text-slate-500 mt-1">
                {t.beneficiaryDashboard.loansTableDescription}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-sky-50 text-xs text-sky-700 border-b border-slate-200">
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">
                    {t.beneficiaryDashboard.loanAmount}
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">
                    {t.beneficiaryDashboard.tenure}
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">
                    {t.beneficiaryDashboard.nextInstallment}
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-medium">
                    {t.beneficiaryDashboard.status}
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, idx) => (
                  <tr
                    key={loan.id}
                    onClick={() => handleRowClick(loan)}
                    className={`cursor-pointer transition ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    } hover:bg-sky-50`}
                  >
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-800">
                      ₹{loan.loanAmount.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-700">
                      {loan.tenure}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-700">
                      {loan.nextInstallment}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border ${
                          loan.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            loan.status === 'Active'
                              ? 'bg-emerald-500'
                              : 'bg-slate-500'
                          }`}
                        />
                        {loan.status === 'Active'
                          ? t.beneficiaryDashboard.active
                          : t.beneficiaryDashboard.closed}
                      </span>
                    </td>
                  </tr>
                ))}
                {loans.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 sm:px-6 py-6 text-center text-sm text-slate-500"
                    >
                      {t.beneficiaryDashboard.noLoanHistory}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Household popup */}
      {showHouseholdModal && (
        <HouseholdInfoModal
          data={householdData}
          setData={setHouseholdData}
          onClose={handleCloseHouseholdModal}
          onContinue={handleHouseholdContinue}
        />
      )}

      {/* Loan application popup */}
      {showApplicationModal && (
        <LoanApplicationModal
          formData={formData}
          isLoading={isLoading}
          applicationStatus={applicationStatus}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const LoanDetails = ({ loan, onBack }) => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-sky-50 hover:border-sky-200 transition mb-4 shadow-sm"
        >
          ← {t.beneficiaryDashboard.backToDashboard}
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-blue-50">
            <div>
              <p className="text-xs text-slate-500">
                {t.beneficiaryDashboard.loanID}
                {loan.id}
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                ₹{loan.loanAmount.toLocaleString()} · {loan.tenure}
              </h2>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
                loan.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span
                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                  loan.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'
                }`}
              />
              {loan.status === 'Active'
                ? t.beneficiaryDashboard.active
                : t.beneficiaryDashboard.closed}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 py-5">
            <DetailItem
              label={t.beneficiaryDashboard.loanAmount}
              value={`₹${loan.loanAmount.toLocaleString()}`}
            />
            <DetailItem
              label={t.beneficiaryDashboard.tenure}
              value={loan.tenure}
            />
            <DetailItem
              label={t.beneficiaryDashboard.interestRate}
              value={loan.interestRate}
            />
            <DetailItem
              label={t.beneficiaryDashboard.channelPartner}
              value={loan.channelPartner}
            />
            <DetailItem
              label={t.beneficiaryDashboard.purposeOfLoan}
              value={loan.purpose}
            />
            {loan.status === 'Active' && (
              <DetailItem
                label={t.beneficiaryDashboard.nextInstallmentDate}
                value={loan.nextInstallment}
              />
            )}
          </div>

          <div className="px-4 sm:px-6 pb-5">
            <p className="text-[11px] text-slate-500">
              {t.beneficiaryDashboard.loanSupport}{' '}
              <span className="text-slate-800">{loan.channelPartner}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
    <p className="text-[11px] text-slate-500 uppercase tracking-wide">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
  </div>
);

const HouseholdInfoModal = ({ data, setData, onClose, onContinue }) => {
  const { translate: tr } = useDualLanguage();
  const numericSanitize = (val) => String(val || '').replace(/[^\d.]/g, '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (name, file) => {
    setData((prev) => ({ ...prev, [name]: file }));
  };

  const handleCookingFuelChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      cooking_fuel: value,
      lpg_refills_per_year: value === 'lpg' ? prev.lpg_refills_per_year : '',
    }));
  };

  const handleHasChildrenChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      has_children: value,
      children_school_type: value === 'yes' ? prev.children_school_type : '',
    }));
  };

  const handleHasOtherLandChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      has_other_land: value,
      other_land_size_hectare: value === 'yes' ? prev.other_land_size_hectare : '',
    }));
  };

  const handleElectricityInputMethodChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      electricity_input_method: value,
      electricity_bill_upload_last_month:
        value === 'upload' ? prev.electricity_bill_upload_last_month : null,
      electricity_month1_amount: value === 'history' ? prev.electricity_month1_amount : '',
      electricity_month1_units: value === 'history' ? prev.electricity_month1_units : '',
      electricity_month2_amount: value === 'history' ? prev.electricity_month2_amount : '',
      electricity_month2_units: value === 'history' ? prev.electricity_month2_units : '',
      electricity_month3_amount: value === 'history' ? prev.electricity_month3_amount : '',
      electricity_month3_units: value === 'history' ? prev.electricity_month3_units : '',
    }));
  };

  const handleNumPhonesChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    const n = Number(digits) || 0;
    setData((prev) => {
      const arr = Array.isArray(prev.phone_recharges)
        ? [...prev.phone_recharges]
        : [];
      while (arr.length < n) arr.push({ avg: '' });
      if (arr.length > n) arr.length = n;
      return {
        ...prev,
        num_phones: digits,
        phone_recharges: arr,
      };
    });
  };

  const handlePhoneAvgChange = (index, value) => {
    const sanitized = numericSanitize(value);
    setData((prev) => {
      const arr = Array.isArray(prev.phone_recharges)
        ? [...prev.phone_recharges]
        : [];
      while (arr.length <= index) arr.push({ avg: '' });
      arr[index] = { ...(arr[index] || {}), avg: sanitized };
      return { ...prev, phone_recharges: arr };
    });
  };

  const nPhones = Number(data.num_phones) || 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-4 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-sky-50">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-700">
              {tr('Household & Income Assessment', 'परिवार और आय आकलन')}
            </p>
            <h2 className="text-base font-semibold text-slate-900 mt-1">
              {tr(
                'Please confirm household & utility details before applying for a loan.',
                'ऋण के लिए आवेदन करने से पहले परिवार और उपयोगिता विवरण पुष्टि करें।'
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 text-slate-500 transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto space-y-5 text-sm">
          {/* Household & income */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {tr('Household & Income', 'परिवार और आय')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Household Size', 'परिवार के सदस्य')}
                </label>
                <input
                  type="number"
                  name="household_size"
                  value={data.household_size}
                  onChange={handleChange}
                  placeholder={tr('Number of members', 'सदस्यों की संख्या')}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Number of Earners in a Family', 'परिवार में कमाने वालों की संख्या')}
                </label>
                <input
                  type="number"
                  name="num_earners"
                  value={data.num_earners}
                  onChange={handleChange}
                  placeholder={tr('Number of earning members', 'कमाने वाले सदस्य')}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Monthly Family Income (₹)', 'मासिक पारिवारिक आय (₹)')}
                </label>
                <input
                  type="text"
                  name="avg_monthly_family_income"
                  value={data.avg_monthly_family_income}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      avg_monthly_family_income: numericSanitize(e.target.value),
                    }))
                  }
                  placeholder={tr('e.g. 20000', 'उदाहरण: 20000')}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500">
                  {tr(
                    'Total monthly income of all earners. Best estimate is okay.',
                    'सभी कमाने वालों की कुल मासिक आय (अनुमानित भी चलेगा)।'
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Upload Income Certificate (PDF)', 'आय प्रमाण पत्र अपलोड करें (PDF)')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange('income_certificate', e.target.files[0])
                  }
                  className="w-full text-[11px] text-slate-600"
                />
                <p className="text-[10px] text-slate-500">
                  {tr(
                    'Optional but helps verify your declared income.',
                    'वैकल्पिक, लेकिन घोषित आय सत्यापित करने में मददगार।'
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Upload Bank Statement (PDF)', 'बैंक स्टेटमेंट अपलोड करें (PDF)')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange('bank_statement', e.target.files[0])
                  }
                  className="w-full text-[11px] text-slate-600"
                />
                <p className="text-[10px] text-slate-500">
                  {tr('Upload latest statement if available.', 'उपलब्ध हो तो नवीनतम स्टेटमेंट अपलोड करें।')}
                </p>
              </div>
            </div>
          </section>

          {/* Children & education */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {tr('Children & Education', 'बच्चे और शिक्षा')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Do you have children?', 'क्या आपके बच्चे हैं?')}
                </label>
                <select
                  name="has_children"
                  value={data.has_children}
                  onChange={handleHasChildrenChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select', 'चुनें')}</option>
                  <option value="yes">{tr('Yes', 'हाँ')}</option>
                  <option value="no">{tr('No', 'नहीं')}</option>
                </select>
              </div>
              {data.has_children === 'yes' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-700">
                    {tr('Children School Type', 'बच्चों के स्कूल का प्रकार')}
                  </label>
                  <select
                    name="children_school_type"
                    value={data.children_school_type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">{tr('Select school type', 'स्कूल प्रकार चुनें')}</option>
                    <option value="government">{tr('Government School', 'सरकारी स्कूल')}</option>
                    <option value="private">{tr('Private School', 'निजी स्कूल')}</option>
                    <option value="not_in_school">{tr('Not in School', 'स्कूल में नहीं')}</option>
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* Assets */}
          <section className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {tr('Assets Owned', 'स्वामित्व वाले संसाधन')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { key: 'ac', label: tr('Air Conditioner', 'एयर कंडीशनर') },
                { key: 'fridge', label: tr('Refrigerator', 'फ्रिज') },
                { key: 'car', label: tr('Car', 'कार') },
                { key: 'two_wheeler', label: tr('Two Wheeler', 'दोपहिया वाहन') },
                { key: 'tv', label: tr('Television', 'टेलीविजन') },
                { key: 'smartphone', label: tr('Smartphone', 'स्मार्टफोन') },
              ].map((item) => (
                <label key={item.key} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={!!data[item.key]}
                    onChange={handleChange}
                    className="h-3 w-3 rounded border-slate-300 bg-white text-emerald-500"
                  />
                  <span className="text-slate-800">{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Utilities & land */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {tr('Utilities & Land', 'सुविधाएं और भूमि')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Cooking Fuel', 'रसोई ईंधन')}
                </label>
                <select
                  name="cooking_fuel"
                  value={data.cooking_fuel}
                  onChange={handleCookingFuelChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select fuel type', 'ईंधन प्रकार चुनें')}</option>
                  <option value="lpg">{tr('LPG', 'एलपीजी')}</option>
                  <option value="solid">
                    {tr('Solid fuel (Coal / Wood)', 'ठोस ईंधन (कोयला/लकड़ी)')}
                  </option>
                  <option value="other">{tr('Other', 'अन्य')}</option>
                </select>
              </div>
              {data.cooking_fuel === 'lpg' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-700">
                    {tr('LPG refills per year (cylinders/year)', 'प्रति वर्ष एलपीजी रिफिल (सिलेंडर/वर्ष)')}
                  </label>
                  <input
                    type="number"
                    name="lpg_refills_per_year"
                    value={data.lpg_refills_per_year}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        lpg_refills_per_year: e.target.value.replace(/\D/g, ''),
                      }))
                    }
                    placeholder={tr('e.g. 12', 'उदाहरण: 12')}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Current House Type', 'वर्तमान घर का प्रकार')}
                </label>
                <select
                  name="house_type"
                  value={data.house_type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select house type', 'घर का प्रकार चुनें')}</option>
                  <option value="kutcha">{tr('Kutcha', 'कच्चा')}</option>
                  <option value="pakka">{tr('Pakka', 'पक्का')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Do you have land other than your house?', 'क्या आपके पास घर के अलावा जमीन है?')}
                </label>
                <select
                  name="has_other_land"
                  value={data.has_other_land}
                  onChange={handleHasOtherLandChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select', 'चुनें')}</option>
                  <option value="yes">{tr('Yes', 'हाँ')}</option>
                  <option value="no">{tr('No', 'नहीं')}</option>
                </select>
              </div>
              {data.has_other_land === 'yes' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-700">
                    {tr('Land Size (in Hectare)', 'भूमि का आकार (हेक्टेयर में)')}
                  </label>
                  <input
                    type="text"
                    name="other_land_size_hectare"
                    value={data.other_land_size_hectare}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        other_land_size_hectare: numericSanitize(e.target.value),
                      }))
                    }
                    placeholder={tr('e.g. 0.75', 'उदाहरण: 0.75')}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Electricity */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {tr('Electricity', 'बिजली')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Electricity Meter Number', 'बिजली मीटर नंबर')}
                </label>
                <input
                  type="text"
                  name="meter_number"
                  value={data.meter_number}
                  onChange={handleChange}
                  placeholder={tr('Enter meter number', 'मीटर नंबर दर्ज करें')}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Provide electricity bill using', 'बिजली बिल इस प्रकार दें')}
                </label>
                <select
                  name="electricity_input_method"
                  value={data.electricity_input_method}
                  onChange={handleElectricityInputMethodChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select method', 'विकल्प चुनें')}</option>
                  <option value="upload">
                    {tr("Upload last month's bill (PDF)", 'पिछले महीने का बिल अपलोड करें (PDF)')}
                  </option>
                  <option value="history">
                    {tr("Enter last 3 months' amounts & units", 'पिछले 3 महीनों की राशि और यूनिट दर्ज करें')}
                  </option>
                </select>
              </div>
            </div>

            {data.electricity_input_method === 'upload' && (
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr("Upload last month's electricity bill (PDF)", 'पिछले महीने का बिजली बिल अपलोड करें (PDF)')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange(
                      'electricity_bill_upload_last_month',
                      e.target.files[0]
                    )
                  }
                  className="w-full text-[11px] text-slate-600"
                />
              </div>
            )}

            {data.electricity_input_method === 'history' && (
              <div className="space-y-2 text-xs">
                <p className="text-[10px] text-slate-500">
                  {tr(
                    'Enter amount (₹) and units (kWh) for last 3 months. Month 1 = most recent.',
                    'पिछले 3 महीनों की राशि (₹) और यूनिट (kWh) दर्ज करें। महीना 1 = सबसे हाल।'
                  )}
                </p>
                {[1, 2, 3].map((m) => (
                  <div key={m} className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-700">
                        {tr('Month', 'महीना')} {m} - {tr('Amount (₹)', 'राशि (₹)')}
                      </label>
                      <input
                        type="text"
                        value={data[`electricity_month${m}_amount`]}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            [`electricity_month${m}_amount`]:
                              numericSanitize(e.target.value),
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder={tr('e.g. 850', 'उदाहरण: 850')}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-700">
                        {tr('Month', 'महीना')} {m} - {tr('Units (kWh)', 'यूनिट (kWh)')}
                      </label>
                      <input
                        type="text"
                        value={data[`electricity_month${m}_units`]}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            [`electricity_month${m}_units`]:
                              numericSanitize(e.target.value),
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder={tr('e.g. 210', 'उदाहरण: 210')}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Phones & recharge */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {tr('Phones & Recharge', 'फोन और रिचार्ज')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-700">
                  {tr('Number of Phones', 'फोनों की संख्या')}
                </label>
                <input
                  type="number"
                  value={data.num_phones}
                  onChange={handleNumPhonesChange}
                  placeholder={tr('Number of phones', 'फोनों की संख्या')}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {nPhones > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {Array.from({ length: nPhones }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 space-y-1"
                  >
                    <p className="text-[11px] text-slate-800 font-medium">
                      {tr('Phone', 'फोन')} {idx + 1}
                    </p>
                    <input
                      type="text"
                      value={data.phone_recharges[idx]?.avg || ''}
                      onChange={(e) =>
                        handlePhoneAvgChange(idx, e.target.value)
                      }
                      placeholder={tr('Average 6 months recharge (₹)', 'पिछले 6 महीनों का औसत रिचार्ज (₹)')}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <p className="text-[11px] text-slate-500 max-w-xs">
            {tr(
              'These details help us understand your household situation and offer a suitable loan.',
              'ये विवरण हमें आपकी घरेलू स्थिति समझने और उपयुक्त ऋण सुझाने में मदद करते हैं।'
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              {tr('Cancel', 'रद्द करें')}
            </button>
            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
            >
              {tr('Continue →', 'जारी रखें →')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoanApplicationModal = ({
  formData,
  isLoading,
  applicationStatus,
  onInputChange,
  onSubmit,
  onClose,
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const isFormFilled =
    formData.loanAmount.trim() &&
    formData.tenure.trim() &&
    formData.purpose.trim();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 rounded-2xl border border-sky-100 bg-white shadow-2xl shadow-sky-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-blue-50">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-700">
              {t.beneficiaryDashboard.newLoanApplication}
            </p>
            <h2 className="text-base font-semibold text-slate-900 mt-1">
              {t.beneficiaryDashboard.applyForAdditionalSupport}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 text-slate-500 transition"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5">
          {/* Form */}
          {!isLoading && !applicationStatus && (
            <div className="space-y-4">
              <div className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-3">
                <p className="text-[11px] text-sky-700">
                  {t.beneficiaryDashboard.tip}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-800">
                  {t.beneficiaryDashboard.loanAmountLabel}
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={onInputChange}
                  placeholder={t.beneficiaryDashboard.loanAmountPlaceholder}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-800">
                  {t.beneficiaryDashboard.tenureLabel}
                </label>
                <select
                  name="tenure"
                  value={formData.tenure}
                  onChange={onInputChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="">
                    {t.beneficiaryDashboard.selectTenure}
                  </option>
                  <option value="6 months">
                    {t.beneficiaryDashboard.tenureOptions.sixMonths}
                  </option>
                  <option value="12 months">
                    {t.beneficiaryDashboard.tenureOptions.twelveMonths}
                  </option>
                  <option value="18 months">
                    {t.beneficiaryDashboard.tenureOptions.eighteenMonths}
                  </option>
                  <option value="24 months">
                    {t.beneficiaryDashboard.tenureOptions.twentyFourMonths}
                  </option>
                  <option value="36 months">
                    {t.beneficiaryDashboard.tenureOptions.thirtySixMonths}
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-800">
                  {t.beneficiaryDashboard.purposeOfLoanLabel}
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={onInputChange}
                  rows={3}
                  placeholder={t.beneficiaryDashboard.purposePlaceholder}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  {t.beneficiaryDashboard.purposeHint}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-500 max-w-[70%]">
                  {t.beneficiaryDashboard.submitAgreement}
                </p>
                <button
                  onClick={onSubmit}
                  disabled={!isFormFilled}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition ${
                    !isFormFilled
                      ? 'bg-sky-300 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700 shadow-sky-200'
                  }`}
                >
                  {t.beneficiaryDashboard.submit}
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <div className="rounded-full bg-sky-50 p-4 border border-sky-200">
                <div className="w-7 h-7 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-sm text-slate-800">
                {t.beneficiaryDashboard.processing}
              </p>
              <p className="text-[11px] text-slate-500 text-center max-w-xs">
                {t.beneficiaryDashboard.processingDescription}
              </p>
            </div>
          )}

          {/* Approved */}
          {applicationStatus === 'approved' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <svg
                  className="w-11 h-11 text-emerald-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 14.59L7.41 13l1.18-1.18L11 14.17l4.41-4.41L16.59 11Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t.beneficiaryDashboard.loanApproved}
              </h3>
              <p className="text-sm text-slate-700 text-center max-w-sm">
                {t.beneficiaryDashboard.approvedDescription}
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-600 transition"
              >
                {t.beneficiaryDashboard.close}
              </button>
            </div>
          )}

          {/* Pending */}
          {applicationStatus === 'pending' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t.beneficiaryDashboard.applicationUnderProcess}
              </h3>
              <p className="text-sm text-slate-700 text-center max-w-sm">
                {t.beneficiaryDashboard.pendingDescription}
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900 transition"
              >
                {t.beneficiaryDashboard.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
