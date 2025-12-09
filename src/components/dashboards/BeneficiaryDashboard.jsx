// // // src/components/dashboards/BeneficiaryDashboard.jsx
// // import React, { useState } from 'react';
// // import {
// //   CheckCircle,
// //   X,
// //   ArrowLeft,
// //   Loader2,
// //   CreditCard,
// //   Clock3,
// //   TrendingUp,
// // } from 'lucide-react';
// // import Navbar from '../Navbar';
// // import { useLanguage } from '../../context/LanguageContext';
// // import { translations } from '../../utils/translations';

// // const BeneficiaryDashboard = ({ loggedInUser, onLogout }) => {
// //   const { language } = useLanguage();
// //   const t = translations[language];

// //   const [selectedLoan, setSelectedLoan] = useState(null);

// //   // NEW: first popup – Household & Income details
// //   const [showHouseholdModal, setShowHouseholdModal] = useState(false);

// //   // Existing: second popup – Loan application
// //   const [showApplicationModal, setShowApplicationModal] = useState(false);
// //   const [applicationStatus, setApplicationStatus] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Simple form for loan popup
// //   const [formData, setFormData] = useState({
// //     loanAmount: '',
// //     tenure: '',
// //     purpose: '',
// //   });

// //   // Household info form (mirroring Page4 fields in a compact way)
// //   const [householdData, setHouseholdData] = useState({
// //     household_size: '',
// //     num_earners: '',
// //     avg_monthly_family_income: '',
// //     income_certificate: null,
// //     bank_statement: null,

// //     has_children: '',
// //     children_school_type: '',

// //     ac: false,
// //     fridge: false,
// //     car: false,
// //     two_wheeler: false,
// //     tv: false,
// //     smartphone: false,

// //     cooking_fuel: '',
// //     lpg_refills_per_year: '',

// //     house_type: '',
// //     has_other_land: '',
// //     other_land_size_hectare: '',

// //     meter_number: '',
// //     electricity_input_method: '',
// //     electricity_bill_upload_last_month: null,
// //     electricity_month1_amount: '',
// //     electricity_month1_units: '',
// //     electricity_month2_amount: '',
// //     electricity_month2_units: '',
// //     electricity_month3_amount: '',
// //     electricity_month3_units: '',

// //     num_phones: '',
// //     phone_recharges: [], // [{ avg: '' }]
// //   });

// //   // Hardcoded data (same as you had)
// //   const creditScore = 542;
// //   const loans = [
// //     {
// //       id: 1,
// //       loanAmount: 50000,
// //       tenure: '24 months',
// //       nextInstallment: '2025-01-15',
// //       status: 'Active',
// //       interestRate: '12%',
// //       channelPartner: 'ABC Finance Ltd.',
// //       purpose: 'Home Renovation',
// //     },
// //     {
// //       id: 2,
// //       loanAmount: 15000,
// //       tenure: '12 months',
// //       nextInstallment: 'N/A',
// //       status: 'Closed',
// //       interestRate: '10%',
// //       channelPartner: 'XYZ Credit Co.',
// //       purpose: 'Education',
// //     },
// //     {
// //       id: 3,
// //       loanAmount: 30000,
// //       tenure: '18 months',
// //       nextInstallment: '2025-01-20',
// //       status: 'Active',
// //       interestRate: '11.5%',
// //       channelPartner: 'ABC Finance Ltd.',
// //       purpose: 'Medical Emergency',
// //     },
// //   ];

// //   const activeLoans = loans.filter((l) => l.status === 'Active');
// //   const totalExposure = loans
// //     .filter((l) => l.status === 'Active')
// //     .reduce((sum, l) => sum + l.loanAmount, 0);

// //   const handleRowClick = (loan) => {
// //     setSelectedLoan(loan);
// //   };

// //   const handleBack = () => {
// //     setSelectedLoan(null);
// //   };

// //   // When user clicks "New Loan" → open Household popup first
// //   const handleApplyLoan = () => {
// //     setApplicationStatus(null);
// //     setFormData({ loanAmount: '', tenure: '', purpose: '' });
// //     setShowHouseholdModal(true);
// //     setShowApplicationModal(false);
// //   };

// //   const handleCloseHouseholdModal = () => {
// //     setShowHouseholdModal(false);
// //   };

// //   // Continue from Household popup → simple validation then open Loan popup
// //   const handleHouseholdContinue = () => {
// //     if (
// //       !householdData.household_size.trim() ||
// //       !householdData.num_earners.trim() ||
// //       !householdData.avg_monthly_family_income.trim() ||
// //       !householdData.meter_number.trim()
// //     ) {
// //       alert(
// //         'Please fill Household Size, Number of Earners, Monthly Family Income and Electricity Meter Number.'
// //       );
// //       return;
// //     }
// //     setShowHouseholdModal(false);
// //     setShowApplicationModal(true);
// //     setApplicationStatus(null);
// //     setIsLoading(false);
// //   };

// //   const handleCloseLoanModal = () => {
// //     setShowApplicationModal(false);
// //     setApplicationStatus(null);
// //     setIsLoading(false);
// //     setFormData({ loanAmount: '', tenure: '', purpose: '' });
// //   };

// //   const handleInputChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!formData.loanAmount || !formData.tenure || !formData.purpose) {
// //       alert(t.beneficiaryDashboard.submitAgreement);
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
// //     }, 2000);
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-950 text-slate-50">
// //       <Navbar loggedInUser={loggedInUser} onLogout={onLogout} />

// //       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
// //         {/* Top header */}
// //         {!selectedLoan && (
// //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //             <div>
// //               <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
// //                 {t.beneficiaryDashboard.brand}
// //               </p>
// //               <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">
// //                 {t.beneficiaryDashboard.welcomeBack}{' '}
// //                 <span className="text-blue-300">
// //                   {loggedInUser?.name || t.beneficiaryDashboard.beneficiary}
// //                 </span>
// //               </h1>
// //               <p className="mt-1 text-sm text-slate-400">
// //                 {t.beneficiaryDashboard.description}
// //               </p>
// //             </div>
// //             <div className="flex items-center gap-3 self-start sm:self-auto">
// //               <button
// //                 onClick={onLogout}
// //                 className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
// //               >
// //                 <X className="w-4 h-4" />
// //                 {t.beneficiaryDashboard.logout}
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* If a loan is selected, show details view */}
// //         {selectedLoan ? (
// //           <LoanDetailsView loan={selectedLoan} onBack={handleBack} />
// //         ) : (
// //           <>
// //             {/* Top overview cards */}
// //             <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// //               {/* Credit Score Card */}
// //               <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-lg shadow-blue-500/10">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center gap-2">
// //                     <div className="rounded-xl bg-blue-500/10 p-2">
// //                       <CreditCard className="w-5 h-5 text-blue-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs text-slate-400">
// //                         {t.beneficiaryDashboard.creditScore}
// //                       </p>
// //                       <p className="text-xl font-semibold text-white">
// //                         {creditScore}
// //                         <span className="ml-1 text-xs text-slate-400">
// //                           {t.beneficiaryDashboard.outOf}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-300">
// //                     {creditScore >= 80
// //                       ? t.beneficiaryDashboard.excellent
// //                       : creditScore >= 60
// //                       ? t.beneficiaryDashboard.good
// //                       : t.beneficiaryDashboard.needsImprovement}
// //                   </span>
// //                 </div>
// //                 <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
// //                   <div
// //                     className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-blue-500"
// //                     style={{ width: `${creditScore}%` }}
// //                   />
// //                 </div>
// //                 <p className="mt-2 text-[11px] text-slate-400">
// //                   {t.beneficiaryDashboard.scoreDescription}
// //                 </p>
// //               </div>

// //               {/* Active Loans */}
// //               <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-900/10 to-slate-950 p-4 shadow-lg shadow-emerald-500/10">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center gap-2">
// //                     <div className="rounded-xl bg-emerald-500/10 p-2">
// //                       <TrendingUp className="w-5 h-5 text-emerald-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs text-slate-400">
// //                         {t.beneficiaryDashboard.activeLoans}
// //                       </p>
// //                       <p className="text-xl font-semibold text-white">
// //                         {activeLoans.length}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <p className="text-xs text-emerald-300">
// //                     {activeLoans.length > 0
// //                       ? t.beneficiaryDashboard.onTrack
// //                       : t.beneficiaryDashboard.noActiveLoans}
// //                   </p>
// //                 </div>
// //                 <p className="text-[11px] text-slate-400">
// //                   {t.beneficiaryDashboard.activeLoansDescription}
// //                 </p>
// //               </div>

// //               {/* Total Exposure */}
// //               <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900/10 to-slate-950 p-4 shadow-lg shadow-indigo-500/10">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center gap-2">
// //                     <div className="rounded-xl bg-indigo-500/10 p-2">
// //                       <Clock3 className="w-5 h-5 text-indigo-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs text-slate-400">
// //                         {t.beneficiaryDashboard.currentExposure}
// //                       </p>
// //                       <p className="text-xl font-semibold text-white">
// //                         ₹{totalExposure.toLocaleString()}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={handleApplyLoan}
// //                     className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-semibold text-white shadow-md hover:bg-indigo-600 transition"
// //                   >
// //                     {t.beneficiaryDashboard.newLoan}
// //                   </button>
// //                 </div>
// //                 <p className="text-[11px] text-slate-400">
// //                   {t.beneficiaryDashboard.exposureDescription}
// //                 </p>
// //               </div>
// //             </section>

// //             {/* Previous loans table */}
// //             <section className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-xl shadow-slate-900/40">
// //               <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800">
// //                 <div>
// //                   <h2 className="text-sm sm:text-base font-semibold text-white">
// //                     {t.beneficiaryDashboard.previousActiveLoans}
// //                   </h2>
// //                   <p className="text-[11px] text-slate-400 mt-1">
// //                     {t.beneficiaryDashboard.loansTableDescription}
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={handleApplyLoan}
// //                   className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition"
// //                 >
// //                   <CreditCard className="w-4 h-4" />
// //                   {t.beneficiaryDashboard.applyForNewLoan}
// //                 </button>
// //               </div>

// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full text-sm">
// //                   <thead>
// //                     <tr className="bg-slate-900/60 text-xs text-slate-400">
// //                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
// //                         {t.beneficiaryDashboard.loanAmount}
// //                       </th>
// //                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
// //                         {t.beneficiaryDashboard.tenure}
// //                       </th>
// //                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
// //                         {t.beneficiaryDashboard.nextInstallment}
// //                       </th>
// //                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
// //                         {t.beneficiaryDashboard.status}
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {loans.map((loan, idx) => (
// //                       <tr
// //                         key={loan.id}
// //                         onClick={() => handleRowClick(loan)}
// //                         className={`cursor-pointer transition ${
// //                           idx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
// //                         } hover:bg-slate-800/80`}
// //                       >
// //                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-50">
// //                           ₹{loan.loanAmount.toLocaleString()}
// //                         </td>
// //                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-200">
// //                           {loan.tenure}
// //                         </td>
// //                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-300">
// //                           {loan.nextInstallment}
// //                         </td>
// //                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
// //                           <span
// //                             className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
// //                               loan.status === 'Active'
// //                                 ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
// //                                 : 'bg-slate-700/40 text-slate-200 border border-slate-600'
// //                             }`}
// //                           >
// //                             <span
// //                               className={`mr-1 h-1.5 w-1.5 rounded-full ${
// //                                 loan.status === 'Active'
// //                                   ? 'bg-emerald-400'
// //                                   : 'bg-slate-400'
// //                               }`}
// //                             />
// //                             {loan.status === 'Active'
// //                               ? t.beneficiaryDashboard.active
// //                               : t.beneficiaryDashboard.closed}
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                     {loans.length === 0 && (
// //                       <tr>
// //                         <td
// //                           colSpan={4}
// //                           className="px-4 sm:px-6 py-6 text-center text-sm text-slate-400"
// //                         >
// //                           {t.beneficiaryDashboard.noLoanHistory}
// //                         </td>
// //                       </tr>
// //                     )}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </section>
// //           </>
// //         )}
// //       </main>

// //       {/* NEW: Household details modal shown FIRST */}
// //       {showHouseholdModal && (
// //         <HouseholdInfoModal
// //           data={householdData}
// //           setData={setHouseholdData}
// //           onClose={handleCloseHouseholdModal}
// //           onContinue={handleHouseholdContinue}
// //         />
// //       )}

// //       {/* Existing New Loan Application Modal – now shown AFTER household modal */}
// //       {showApplicationModal && (
// //         <LoanApplicationModal
// //           formData={formData}
// //           isLoading={isLoading}
// //           applicationStatus={applicationStatus}
// //           onInputChange={handleInputChange}
// //           onSubmit={handleSubmit}
// //           onClose={handleCloseLoanModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // Loan Details View
// // const LoanDetailsView = ({ loan, onBack }) => {
// //   const { language } = useLanguage();
// //   const t = translations[language];
// //   return (
// //     <section className="mt-4">
// //       <button
// //         onClick={onBack}
// //         className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition mb-4"
// //       >
// //         <ArrowLeft className="w-4 h-4" />
// //         {t.beneficiaryDashboard.backToDashboard}
// //       </button>

// //       <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-900/40 overflow-hidden">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
// //           <div>
// //             <p className="text-xs text-slate-400">
// //               {t.beneficiaryDashboard.loanID}
// //               {loan.id}
// //             </p>
// //             <h2 className="text-lg sm:text-xl font-semibold text-white">
// //               ₹{loan.loanAmount.toLocaleString()} · {loan.tenure}
// //             </h2>
// //           </div>
// //           <span
// //             className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
// //               loan.status === 'Active'
// //                 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
// //                 : 'bg-slate-700/40 text-slate-200 border-slate-600'
// //             }`}
// //           >
// //             <span
// //               className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
// //                 loan.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'
// //               }`}
// //             />
// //             {loan.status === 'Active'
// //               ? t.beneficiaryDashboard.active
// //               : t.beneficiaryDashboard.closed}
// //           </span>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 py-5">
// //           <DetailItem
// //             label={t.beneficiaryDashboard.loanAmount}
// //             value={`₹${loan.loanAmount.toLocaleString()}`}
// //           />
// //           <DetailItem
// //             label={t.beneficiaryDashboard.tenure}
// //             value={loan.tenure}
// //           />
// //           <DetailItem
// //             label={t.beneficiaryDashboard.interestRate}
// //             value={loan.interestRate}
// //           />
// //           <DetailItem
// //             label={t.beneficiaryDashboard.channelPartner}
// //             value={loan.channelPartner}
// //           />
// //           <DetailItem
// //             label={t.beneficiaryDashboard.purposeOfLoan}
// //             value={loan.purpose}
// //           />
// //           {loan.status === 'Active' && (
// //             <DetailItem
// //               label={t.beneficiaryDashboard.nextInstallmentDate}
// //               value={loan.nextInstallment}
// //             />
// //           )}
// //         </div>

// //         <div className="px-4 sm:px-6 pb-5">
// //           <p className="text-[11px] text-slate-500">
// //             {t.beneficiaryDashboard.loanSupport}{' '}
// //             <span className="text-slate-200">{loan.channelPartner}</span>.
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // const DetailItem = ({ label, value }) => (
// //   <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
// //     <p className="text-[11px] text-slate-400 uppercase tracking-wide">
// //       {label}
// //     </p>
// //     <p className="mt-1 text-sm font-medium text-slate-50">{value}</p>
// //   </div>
// // );

// // // NEW: Household info modal
// // const HouseholdInfoModal = ({ data, setData, onClose, onContinue }) => {
// //   const numericSanitize = (val) => String(val || '').replace(/[^\d.]/g, '');

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     if (type === 'checkbox') {
// //       setData((prev) => ({ ...prev, [name]: checked }));
// //     } else {
// //       setData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleFileChange = (name, file) => {
// //     setData((prev) => ({ ...prev, [name]: file }));
// //   };

// //   const handleCookingFuelChange = (e) => {
// //     const value = e.target.value;
// //     setData((prev) => ({
// //       ...prev,
// //       cooking_fuel: value,
// //       lpg_refills_per_year: value === 'lpg' ? prev.lpg_refills_per_year : '',
// //     }));
// //   };

// //   const handleHasChildrenChange = (e) => {
// //     const value = e.target.value;
// //     setData((prev) => ({
// //       ...prev,
// //       has_children: value,
// //       children_school_type: value === 'yes' ? prev.children_school_type : '',
// //     }));
// //   };

// //   const handleHasOtherLandChange = (e) => {
// //     const value = e.target.value;
// //     setData((prev) => ({
// //       ...prev,
// //       has_other_land: value,
// //       other_land_size_hectare: value === 'yes' ? prev.other_land_size_hectare : '',
// //     }));
// //   };

// //   const handleElectricityInputMethodChange = (e) => {
// //     const value = e.target.value;
// //     setData((prev) => ({
// //       ...prev,
// //       electricity_input_method: value,
// //       electricity_bill_upload_last_month:
// //         value === 'upload' ? prev.electricity_bill_upload_last_month : null,
// //       electricity_month1_amount: value === 'history' ? prev.electricity_month1_amount : '',
// //       electricity_month1_units: value === 'history' ? prev.electricity_month1_units : '',
// //       electricity_month2_amount: value === 'history' ? prev.electricity_month2_amount : '',
// //       electricity_month2_units: value === 'history' ? prev.electricity_month2_units : '',
// //       electricity_month3_amount: value === 'history' ? prev.electricity_month3_amount : '',
// //       electricity_month3_units: value === 'history' ? prev.electricity_month3_units : '',
// //     }));
// //   };

// //   const handleNumPhonesChange = (e) => {
// //     const digits = e.target.value.replace(/\D/g, '');
// //     const n = Number(digits) || 0;
// //     setData((prev) => {
// //       const arr = Array.isArray(prev.phone_recharges)
// //         ? [...prev.phone_recharges]
// //         : [];
// //       while (arr.length < n) arr.push({ avg: '' });
// //       if (arr.length > n) arr.length = n;
// //       return {
// //         ...prev,
// //         num_phones: digits,
// //         phone_recharges: arr,
// //       };
// //     });
// //   };

// //   const handlePhoneAvgChange = (index, value) => {
// //     const sanitized = numericSanitize(value);
// //     setData((prev) => {
// //       const arr = Array.isArray(prev.phone_recharges)
// //         ? [...prev.phone_recharges]
// //         : [];
// //       while (arr.length <= index) arr.push({ avg: '' });
// //       arr[index] = { ...(arr[index] || {}), avg: sanitized };
// //       return { ...prev, phone_recharges: arr };
// //     });
// //   };

// //   const nPhones = Number(data.num_phones) || 0;

// //   return (
// //     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
// //       <div className="w-full max-w-4xl mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-emerald-900/40 overflow-hidden max-h-[90vh] flex flex-col">
// //         {/* Header */}
// //         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950">
// //           <div>
// //             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400">
// //               Household & Income Assessment
// //             </p>
// //             <h2 className="text-base font-semibold text-white mt-1">
// //               Please confirm household & utility details before applying for a loan.
// //             </h2>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
// //           >
// //             <X className="w-4 h-4" />
// //           </button>
// //         </div>

// //         {/* Body */}
// //         <div className="px-5 py-4 overflow-y-auto space-y-5 text-sm">
// //           {/* Household basic */}
// //           <section className="space-y-3">
// //             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
// //               Household & Income
// //             </h3>
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Household Size</label>
// //                 <input
// //                   type="number"
// //                   name="household_size"
// //                   value={data.household_size}
// //                   onChange={handleChange}
// //                   placeholder="Number of members"
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 />
// //               </div>
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Number of Earners in a Family</label>
// //                 <input
// //                   type="number"
// //                   name="num_earners"
// //                   value={data.num_earners}
// //                   onChange={handleChange}
// //                   placeholder="Number of earning members"
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 />
// //               </div>
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Monthly Family Income (₹)</label>
// //                 <input
// //                   type="text"
// //                   name="avg_monthly_family_income"
// //                   value={data.avg_monthly_family_income}
// //                   onChange={(e) =>
// //                     setData((prev) => ({
// //                       ...prev,
// //                       avg_monthly_family_income: numericSanitize(e.target.value),
// //                     }))
// //                   }
// //                   placeholder="e.g. 20000"
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 />
// //                 <p className="text-[10px] text-slate-500">
// //                   Total monthly income of all earners. Best estimate is okay.
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Upload Income Certificate (PDF)</label>
// //                 <input
// //                   type="file"
// //                   accept=".pdf"
// //                   onChange={(e) =>
// //                     handleFileChange('income_certificate', e.target.files[0])
// //                   }
// //                   className="w-full text-[11px] text-slate-300"
// //                 />
// //                 <p className="text-[10px] text-slate-500">
// //                   Optional but helps verify your declared income.
// //                 </p>
// //               </div>
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Upload Bank Statement (PDF)</label>
// //                 <input
// //                   type="file"
// //                   accept=".pdf"
// //                   onChange={(e) =>
// //                     handleFileChange('bank_statement', e.target.files[0])
// //                   }
// //                   className="w-full text-[11px] text-slate-300"
// //                 />
// //                 <p className="text-[10px] text-slate-500">
// //                   Upload latest statement if available.
// //                 </p>
// //               </div>
// //             </div>
// //           </section>

// //           {/* Children & School */}
// //           <section className="space-y-3">
// //             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
// //               Children & Education
// //             </h3>
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Do you have children?</label>
// //                 <select
// //                   name="has_children"
// //                   value={data.has_children}
// //                   onChange={handleHasChildrenChange}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="yes">Yes</option>
// //                   <option value="no">No</option>
// //                 </select>
// //               </div>
// //               {data.has_children === 'yes' && (
// //                 <div className="space-y-1">
// //                   <label className="text-xs text-slate-200">Children School Type</label>
// //                   <select
// //                     name="children_school_type"
// //                     value={data.children_school_type}
// //                     onChange={handleChange}
// //                     className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                   >
// //                     <option value="">Select school type</option>
// //                     <option value="government">Government School</option>
// //                     <option value="private">Private School</option>
// //                     <option value="not_in_school">Not in School</option>
// //                   </select>
// //                 </div>
// //               )}
// //             </div>
// //           </section>

// //           {/* Assets */}
// //           <section className="space-y-2">
// //             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
// //               Assets Owned
// //             </h3>
// //             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
// //               {[
// //                 { key: 'ac', label: 'Air Conditioner' },
// //                 { key: 'fridge', label: 'Refrigerator' },
// //                 { key: 'car', label: 'Car' },
// //                 { key: 'two_wheeler', label: 'Two Wheeler' },
// //                 { key: 'tv', label: 'Television' },
// //                 { key: 'smartphone', label: 'Smartphone' },
// //               ].map((item) => (
// //                 <label key={item.key} className="inline-flex items-center gap-2">
// //                   <input
// //                     type="checkbox"
// //                     name={item.key}
// //                     checked={!!data[item.key]}
// //                     onChange={handleChange}
// //                     className="h-3 w-3 rounded border-slate-700 bg-slate-900 text-emerald-500"
// //                   />
// //                   <span className="text-slate-200">{item.label}</span>
// //                 </label>
// //               ))}
// //             </div>
// //           </section>

// //           {/* Utilities & Land */}
// //           <section className="space-y-3">
// //             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
// //               Utilities & Land
// //             </h3>
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Cooking Fuel</label>
// //                 <select
// //                   name="cooking_fuel"
// //                   value={data.cooking_fuel}
// //                   onChange={handleCookingFuelChange}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 >
// //                   <option value="">Select fuel type</option>
// //                   <option value="lpg">LPG</option>
// //                   <option value="solid">Solid fuel (Coal / Wood)</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>
// //               {data.cooking_fuel === 'lpg' && (
// //                 <div className="space-y-1">
// //                   <label className="text-xs text-slate-200">
// //                     LPG refills per year (cylinders/year)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     name="lpg_refills_per_year"
// //                     value={data.lpg_refills_per_year}
// //                     onChange={(e) =>
// //                       setData((prev) => ({
// //                         ...prev,
// //                         lpg_refills_per_year: e.target.value.replace(/\D/g, ''),
// //                       }))
// //                     }
// //                     placeholder="e.g. 12"
// //                     className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                   />
// //                 </div>
// //               )}
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Current House Type</label>
// //                 <select
// //                   name="house_type"
// //                   value={data.house_type}
// //                   onChange={handleChange}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 >
// //                   <option value="">Select house type</option>
// //                   <option value="kutcha">Kutcha</option>
// //                   <option value="pakka">Pakka</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">
// //                   Do you have land other than your house?
// //                 </label>
// //                 <select
// //                   name="has_other_land"
// //                   value={data.has_other_land}
// //                   onChange={handleHasOtherLandChange}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="yes">Yes</option>
// //                   <option value="no">No</option>
// //                 </select>
// //               </div>
// //               {data.has_other_land === 'yes' && (
// //                 <div className="space-y-1">
// //                   <label className="text-xs text-slate-200">
// //                     Land Size (in Hectare)
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="other_land_size_hectare"
// //                     value={data.other_land_size_hectare}
// //                     onChange={(e) =>
// //                       setData((prev) => ({
// //                         ...prev,
// //                         other_land_size_hectare: numericSanitize(e.target.value),
// //                       }))
// //                     }
// //                     placeholder="e.g. 0.75"
// //                     className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           </section>

// //           {/* Electricity */}
// //           <section className="space-y-3">
// //             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
// //               Electricity
// //             </h3>
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">
// //                   Electricity Meter Number
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="meter_number"
// //                   value={data.meter_number}
// //                   onChange={handleChange}
// //                   placeholder="Enter meter number"
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 />
// //               </div>
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">
// //                   Provide electricity bill using
// //                 </label>
// //                 <select
// //                   name="electricity_input_method"
// //                   value={data.electricity_input_method}
// //                   onChange={handleElectricityInputMethodChange}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 >
// //                   <option value="">Select method</option>
// //                   <option value="upload">Upload last month's bill (PDF)</option>
// //                   <option value="history">
// //                     Enter last 3 months' amounts & units
// //                   </option>
// //                 </select>
// //               </div>
// //             </div>

// //             {data.electricity_input_method === 'upload' && (
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">
// //                   Upload last month's electricity bill (PDF)
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept=".pdf"
// //                   onChange={(e) =>
// //                     handleFileChange(
// //                       'electricity_bill_upload_last_month',
// //                       e.target.files[0]
// //                     )
// //                   }
// //                   className="w-full text-[11px] text-slate-300"
// //                 />
// //               </div>
// //             )}

// //             {data.electricity_input_method === 'history' && (
// //               <div className="space-y-2 text-xs">
// //                 <p className="text-[10px] text-slate-500">
// //                   Enter amount (₹) and units (kWh) for last 3 months. Month 1 =
// //                   most recent.
// //                 </p>
// //                 {[1, 2, 3].map((m) => (
// //                   <div key={m} className="grid grid-cols-2 gap-2">
// //                     <div className="space-y-1">
// //                       <label className="text-[11px] text-slate-200">
// //                         Month {m} - Amount (₹)
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={data[`electricity_month${m}_amount`]}
// //                         onChange={(e) =>
// //                           setData((prev) => ({
// //                             ...prev,
// //                             [`electricity_month${m}_amount`]:
// //                               numericSanitize(e.target.value),
// //                           }))
// //                         }
// //                         className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
// //                         placeholder="e.g. 850"
// //                       />
// //                     </div>
// //                     <div className="space-y-1">
// //                       <label className="text-[11px] text-slate-200">
// //                         Month {m} - Units (kWh)
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={data[`electricity_month${m}_units`]}
// //                         onChange={(e) =>
// //                           setData((prev) => ({
// //                             ...prev,
// //                             [`electricity_month${m}_units`]:
// //                               numericSanitize(e.target.value),
// //                           }))
// //                         }
// //                         className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
// //                         placeholder="e.g. 210"
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </section>

// //           {/* Phones */}
// //           <section className="space-y-3">
// //             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
// //               Phones & Recharge
// //             </h3>
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <div className="space-y-1">
// //                 <label className="text-xs text-slate-200">Number of Phones</label>
// //                 <input
// //                   type="number"
// //                   value={data.num_phones}
// //                   onChange={handleNumPhonesChange}
// //                   placeholder="Number of phones"
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// //                 />
// //               </div>
// //             </div>

// //             {nPhones > 0 && (
// //               <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
// //                 {Array.from({ length: nPhones }).map((_, idx) => (
// //                   <div
// //                     key={idx}
// //                     className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 space-y-1"
// //                   >
// //                     <p className="text-[11px] text-slate-300 font-medium">
// //                       Phone {idx + 1}
// //                     </p>
// //                     <input
// //                       type="text"
// //                       value={data.phone_recharges[idx]?.avg || ''}
// //                       onChange={(e) =>
// //                         handlePhoneAvgChange(idx, e.target.value)
// //                       }
// //                       placeholder="Average 6 months recharge (₹)"
// //                       className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </section>
// //         </div>

// //         {/* Footer actions */}
// //         <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/90">
// //           <p className="text-[11px] text-slate-500 max-w-xs">
// //             These details help us understand your household situation and offer a
// //             suitable loan.
// //           </p>
// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={onClose}
// //               className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={onContinue}
// //               className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
// //             >
// //               Continue →
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Existing Loan Application Modal (unchanged logic)
// // const LoanApplicationModal = ({
// //   formData,
// //   isLoading,
// //   applicationStatus,
// //   onInputChange,
// //   onSubmit,
// //   onClose,
// // }) => {
// //   const { language } = useLanguage();
// //   const t = translations[language];
// //   const isFormFilled =
// //     formData.loanAmount.trim() &&
// //     formData.tenure.trim() &&
// //     formData.purpose.trim();

// //   return (
// //     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
// //       <div className="w-full max-w-lg mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-blue-900/40 overflow-hidden">
// //         {/* Header */}
// //         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-600/10 via-slate-900 to-slate-950">
// //           <div>
// //             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400">
// //               {t.beneficiaryDashboard.newLoanApplication}
// //             </p>
// //             <h2 className="text-base font-semibold text-white mt-1">
// //               {t.beneficiaryDashboard.applyForAdditionalSupport}
// //             </h2>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
// //           >
// //             <X className="w-4 h-4" />
// //           </button>
// //         </div>

// //         {/* Content */}
// //         <div className="px-5 py-5">
// //           {/* Initial Form */}
// //           {!isLoading && !applicationStatus && (
// //             <form onSubmit={onSubmit} className="space-y-4">
// //               <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-3 mb-1">
// //                 <p className="text-[11px] text-blue-300">
// //                   {t.beneficiaryDashboard.tip}
// //                 </p>
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-xs font-medium text-slate-200">
// //                   {t.beneficiaryDashboard.loanAmountLabel}
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="loanAmount"
// //                   value={formData.loanAmount}
// //                   onChange={onInputChange}
// //                   placeholder={t.beneficiaryDashboard.loanAmountPlaceholder}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-xs font-medium text-slate-200">
// //                   {t.beneficiaryDashboard.tenureLabel}
// //                 </label>
// //                 <select
// //                   name="tenure"
// //                   value={formData.tenure}
// //                   onChange={onInputChange}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 >
// //                   <option value="">
// //                     {t.beneficiaryDashboard.selectTenure}
// //                   </option>
// //                   <option value="6 months">
// //                     {t.beneficiaryDashboard.tenureOptions.sixMonths}
// //                   </option>
// //                   <option value="12 months">
// //                     {t.beneficiaryDashboard.tenureOptions.twelveMonths}
// //                   </option>
// //                   <option value="18 months">
// //                     {t.beneficiaryDashboard.tenureOptions.eighteenMonths}
// //                   </option>
// //                   <option value="24 months">
// //                     {t.beneficiaryDashboard.tenureOptions.twentyFourMonths}
// //                   </option>
// //                   <option value="36 months">
// //                     {t.beneficiaryDashboard.tenureOptions.thirtySixMonths}
// //                   </option>
// //                 </select>
// //               </div>

// //               <div className="space-y-1">
// //                 <label className="text-xs font-medium text-slate-200">
// //                   {t.beneficiaryDashboard.purposeOfLoanLabel}
// //                 </label>
// //                 <textarea
// //                   name="purpose"
// //                   value={formData.purpose}
// //                   onChange={onInputChange}
// //                   rows={3}
// //                   placeholder={t.beneficiaryDashboard.purposePlaceholder}
// //                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
// //                 />
// //                 <p className="mt-1 text-[10px] text-slate-500">
// //                   {t.beneficiaryDashboard.purposeHint}
// //                 </p>
// //               </div>

// //               <div className="flex items-center justify-between pt-2">
// //                 <p className="text-[11px] text-slate-500 max-w-[70%]">
// //                   {t.beneficiaryDashboard.submitAgreement}
// //                 </p>
// //                 <button
// //                   type="submit"
// //                   disabled={!isFormFilled}
// //                   className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition ${
// //                     !isFormFilled
// //                       ? 'bg-blue-400/40 cursor-not-allowed'
// //                       : 'bg-blue-600 hover:bg-blue-700'
// //                   }`}
// //                 >
// //                   {t.beneficiaryDashboard.submit}
// //                 </button>
// //               </div>
// //             </form>
// //           )}

// //           {/* Loading State */}
// //           {isLoading && (
// //             <div className="flex flex-col items-center justify-center py-10 space-y-3">
// //               <div className="rounded-full bg-slate-900/80 p-4 border border-slate-800">
// //                 <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
// //               </div>
// //               <p className="text-sm text-slate-200">
// //                 {t.beneficiaryDashboard.processing}
// //               </p>
// //               <p className="text-[11px] text-slate-500 text-center max-w-xs">
// //                 {t.beneficiaryDashboard.processingDescription}
// //               </p>
// //             </div>
// //           )}

// //           {/* Approved State */}
// //           {applicationStatus === 'approved' && (
// //             <div className="flex flex-col items-center justify-center py-8 space-y-4">
// //               <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
// //                 <CheckCircle className="w-11 h-11 text-emerald-400" />
// //               </div>
// //               <h3 className="text-lg font-semibold text-white">
// //                 {t.beneficiaryDashboard.loanApproved}
// //               </h3>
// //               <p className="text-sm text-slate-300 text-center max-w-sm">
// //                 {t.beneficiaryDashboard.approvedDescription}
// //               </p>
// //               <button
// //                 onClick={onClose}
// //                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
// //               >
// //                 {t.beneficiaryDashboard.close}
// //               </button>
// //             </div>
// //           )}

// //           {/* Pending State */}
// //           {applicationStatus === 'pending' && (
// //             <div className="flex flex-col items-center justify-center py-8 space-y-4">
// //               <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
// //                 <Clock3 className="w-10 h-10 text-amber-400" />
// //               </div>
// //               <h3 className="text-lg font-semibold text-white">
// //                 {t.beneficiaryDashboard.applicationUnderProcess}
// //               </h3>
// //               <p className="text-sm text-slate-300 text-center max-w-sm">
// //                 {t.beneficiaryDashboard.pendingDescription}
// //               </p>
// //               <button
// //                 onClick={onClose}
// //                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
// //               >
// //                 {t.beneficiaryDashboard.close}
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BeneficiaryDashboard;


// // src/components/dashboards/BeneficiaryDashboard.jsx

// import React, { useState } from 'react';
// import {
//   CheckCircle,
//   X,
//   ArrowLeft,
//   Loader2,
//   CreditCard,
//   Clock3,
//   TrendingUp,
// } from 'lucide-react';
// import Navbar from '../Navbar';
// import { useLanguage } from '../../context/LanguageContext';
// import { translations } from '../../utils/translations';

// const BeneficiaryDashboard = ({ loggedInUser, onLogout }) => {
//   const { language } = useLanguage();
//   const t = translations[language];

//   const [selectedLoan, setSelectedLoan] = useState(null);

//   // 1) NEW – Household popup
//   const [showHouseholdModal, setShowHouseholdModal] = useState(false);

//   // 2) Existing – Loan popup
//   const [showApplicationModal, setShowApplicationModal] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Loan form
//   const [formData, setFormData] = useState({
//     loanAmount: '',
//     tenure: '',
//     purpose: '',
//   });

//   // Household form (compact version of Page4)
//   const [householdData, setHouseholdData] = useState({
//     household_size: '',
//     num_earners: '',
//     avg_monthly_family_income: '',
//     income_certificate: null,
//     bank_statement: null,

//     has_children: '',
//     children_school_type: '',

//     ac: false,
//     fridge: false,
//     car: false,
//     two_wheeler: false,
//     tv: false,
//     smartphone: false,

//     cooking_fuel: '',
//     lpg_refills_per_year: '',

//     house_type: '',
//     has_other_land: '',
//     other_land_size_hectare: '',

//     meter_number: '',
//     electricity_input_method: '',
//     electricity_bill_upload_last_month: null,
//     electricity_month1_amount: '',
//     electricity_month1_units: '',
//     electricity_month2_amount: '',
//     electricity_month2_units: '',
//     electricity_month3_amount: '',
//     electricity_month3_units: '',

//     num_phones: '',
//     phone_recharges: [], // [{ avg: '' }]
//   });

//   // Hardcoded data (same as before)
//   const creditScore = 542;
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

//   const activeLoans = loans.filter((l) => l.status === 'Active');
//   const totalExposure = loans
//     .filter((l) => l.status === 'Active')
//     .reduce((sum, l) => sum + l.loanAmount, 0);

//   const handleRowClick = (loan) => {
//     setSelectedLoan(loan);
//   };

//   const handleBack = () => {
//     setSelectedLoan(null);
//   };

//   // When user clicks "New Loan" / "Apply for New Loan" -> open Household modal first
//   const handleApplyLoan = () => {
//     setApplicationStatus(null);
//     setFormData({ loanAmount: '', tenure: '', purpose: '' });
//     setShowHouseholdModal(true);
//     setShowApplicationModal(false);
//   };

//   const handleCloseHouseholdModal = () => {
//     setShowHouseholdModal(false);
//   };

//   // After Household modal -> simple validation -> open Loan modal
//   const handleHouseholdContinue = () => {
//     if (
//       !householdData.household_size.trim() ||
//       !householdData.num_earners.trim() ||
//       !householdData.avg_monthly_family_income.trim() ||
//       !householdData.meter_number.trim()
//     ) {
//       alert(
//         'Please fill Household Size, Number of Earners, Monthly Family Income and Electricity Meter Number.'
//       );
//       return;
//     }

//     setShowHouseholdModal(false);
//     setShowApplicationModal(true);
//     setApplicationStatus(null);
//     setIsLoading(false);
//   };

//   const handleCloseLoanModal = () => {
//     setShowApplicationModal(false);
//     setApplicationStatus(null);
//     setIsLoading(false);
//     setFormData({ loanAmount: '', tenure: '', purpose: '' });
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

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

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50">
//       <Navbar loggedInUser={loggedInUser} onLogout={onLogout} />

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         {/* Top header */}
//         {!selectedLoan && (
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div>
//               <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
//                 {t.beneficiaryDashboard.brand}
//               </p>
//               <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">
//                 {t.beneficiaryDashboard.welcomeBack}{' '}
//                 <span className="text-blue-300">
//                   {loggedInUser?.name || t.beneficiaryDashboard.beneficiary}
//                 </span>
//               </h1>
//               <p className="mt-1 text-sm text-slate-400">
//                 {t.beneficiaryDashboard.description}
//               </p>
//             </div>
//             <div className="flex items-center gap-3 self-start sm:self-auto">
//               <button
//                 onClick={onLogout}
//                 className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
//               >
//                 <X className="w-4 h-4" />
//                 {t.beneficiaryDashboard.logout}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Either loan details, or dashboard view */}
//         {selectedLoan ? (
//           <LoanDetailsView loan={selectedLoan} onBack={handleBack} />
//         ) : (
//           <>
//             {/* Overview cards */}
//             <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//               {/* Credit Score */}
//               <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-lg shadow-blue-500/10">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <div className="rounded-xl bg-blue-500/10 p-2">
//                       <CreditCard className="w-5 h-5 text-blue-400" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-400">
//                         {t.beneficiaryDashboard.creditScore}
//                       </p>
//                       <p className="text-xl font-semibold text-white">
//                         {creditScore}
//                         <span className="ml-1 text-xs text-slate-400">
//                           {t.beneficiaryDashboard.outOf}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-300">
//                     {creditScore >= 80
//                       ? t.beneficiaryDashboard.excellent
//                       : creditScore >= 60
//                       ? t.beneficiaryDashboard.good
//                       : t.beneficiaryDashboard.needsImprovement}
//                   </span>
//                 </div>
//                 <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
//                   <div
//                     className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-blue-500"
//                     style={{ width: `${creditScore}%` }}
//                   />
//                 </div>
//                 <p className="mt-2 text-[11px] text-slate-400">
//                   {t.beneficiaryDashboard.scoreDescription}
//                 </p>
//               </div>

//               {/* Active Loans */}
//               <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-900/10 to-slate-950 p-4 shadow-lg shadow-emerald-500/10">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <div className="rounded-xl bg-emerald-500/10 p-2">
//                       <TrendingUp className="w-5 h-5 text-emerald-400" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-400">
//                         {t.beneficiaryDashboard.activeLoans}
//                       </p>
//                       <p className="text-xl font-semibold text-white">
//                         {activeLoans.length}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-xs text-emerald-300">
//                     {activeLoans.length > 0
//                       ? t.beneficiaryDashboard.onTrack
//                       : t.beneficiaryDashboard.noActiveLoans}
//                   </p>
//                 </div>
//                 <p className="text-[11px] text-slate-400">
//                   {t.beneficiaryDashboard.activeLoansDescription}
//                 </p>
//               </div>

//               {/* Total Exposure */}
//               <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900/10 to-slate-950 p-4 shadow-lg shadow-indigo-500/10">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <div className="rounded-xl bg-indigo-500/10 p-2">
//                       <Clock3 className="w-5 h-5 text-indigo-400" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-400">
//                         {t.beneficiaryDashboard.currentExposure}
//                       </p>
//                       <p className="text-xl font-semibold text-white">
//                         ₹{totalExposure.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleApplyLoan}
//                     className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-semibold text-white shadow-md hover:bg-indigo-600 transition"
//                   >
//                     {t.beneficiaryDashboard.newLoan}
//                   </button>
//                 </div>
//                 <p className="text-[11px] text-slate-400">
//                   {t.beneficiaryDashboard.exposureDescription}
//                 </p>
//               </div>
//             </section>

//             {/* Previous loans table */}
//             <section className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-xl shadow-slate-900/40">
//               <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800">
//                 <div>
//                   <h2 className="text-sm sm:text-base font-semibold text-white">
//                     {t.beneficiaryDashboard.previousActiveLoans}
//                   </h2>
//                   <p className="text-[11px] text-slate-400 mt-1">
//                     {t.beneficiaryDashboard.loansTableDescription}
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleApplyLoan}
//                   className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition"
//                 >
//                   <CreditCard className="w-4 h-4" />
//                   {t.beneficiaryDashboard.applyForNewLoan}
//                 </button>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm">
//                   <thead>
//                     <tr className="bg-slate-900/60 text-xs text-slate-400">
//                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                         {t.beneficiaryDashboard.loanAmount}
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                         {t.beneficiaryDashboard.tenure}
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                         {t.beneficiaryDashboard.nextInstallment}
//                       </th>
//                       <th className="px-4 sm:px-6 py-3 text-left font-medium">
//                         {t.beneficiaryDashboard.status}
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loans.map((loan, idx) => (
//                       <tr
//                         key={loan.id}
//                         onClick={() => handleRowClick(loan)}
//                         className={`cursor-pointer transition ${
//                           idx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
//                         } hover:bg-slate-800/80`}
//                       >
//                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-50">
//                           ₹{loan.loanAmount.toLocaleString()}
//                         </td>
//                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-200">
//                           {loan.tenure}
//                         </td>
//                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-300">
//                           {loan.nextInstallment}
//                         </td>
//                         <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
//                           <span
//                             className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                               loan.status === 'Active'
//                                 ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
//                                 : 'bg-slate-700/40 text-slate-200 border border-slate-600'
//                             }`}
//                           >
//                             <span
//                               className={`mr-1 h-1.5 w-1.5 rounded-full ${
//                                 loan.status === 'Active'
//                                   ? 'bg-emerald-400'
//                                   : 'bg-slate-400'
//                               }`}
//                             />
//                             {loan.status === 'Active'
//                               ? t.beneficiaryDashboard.active
//                               : t.beneficiaryDashboard.closed}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                     {loans.length === 0 && (
//                       <tr>
//                         <td
//                           colSpan={4}
//                           className="px-4 sm:px-6 py-6 text-center text-sm text-slate-400"
//                         >
//                           {t.beneficiaryDashboard.noLoanHistory}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           </>
//         )}
//       </main>

//       {/* Household modal – FIRST */}
//       {showHouseholdModal && (
//         <HouseholdInfoModal
//           data={householdData}
//           setData={setHouseholdData}
//           onClose={handleCloseHouseholdModal}
//           onContinue={handleHouseholdContinue}
//         />
//       )}

//       {/* Loan application modal – SECOND */}
//       {showApplicationModal && (
//         <LoanApplicationModal
//           formData={formData}
//           isLoading={isLoading}
//           applicationStatus={applicationStatus}
//           onInputChange={handleInputChange}
//           onSubmit={handleSubmit}
//           onClose={handleCloseLoanModal}
//         />
//       )}
//     </div>
//   );
// };

// /* ---------- Loan details view ---------- */

// const LoanDetailsView = ({ loan, onBack }) => {
//   const { language } = useLanguage();
//   const t = translations[language];

//   return (
//     <section className="mt-4">
//       <button
//         onClick={onBack}
//         className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition mb-4"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         {t.beneficiaryDashboard.backToDashboard}
//       </button>

//       <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-900/40 overflow-hidden">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
//           <div>
//             <p className="text-xs text-slate-400">
//               {t.beneficiaryDashboard.loanID}
//               {loan.id}
//             </p>
//             <h2 className="text-lg sm:text-xl font-semibold text-white">
//               ₹{loan.loanAmount.toLocaleString()} · {loan.tenure}
//             </h2>
//           </div>
//           <span
//             className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
//               loan.status === 'Active'
//                 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
//                 : 'bg-slate-700/40 text-slate-200 border-slate-600'
//             }`}
//           >
//             <span
//               className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
//                 loan.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'
//               }`}
//             />
//             {loan.status === 'Active'
//               ? t.beneficiaryDashboard.active
//               : t.beneficiaryDashboard.closed}
//           </span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 py-5">
//           <DetailItem
//             label={t.beneficiaryDashboard.loanAmount}
//             value={`₹${loan.loanAmount.toLocaleString()}`}
//           />
//           <DetailItem
//             label={t.beneficiaryDashboard.tenure}
//             value={loan.tenure}
//           />
//           <DetailItem
//             label={t.beneficiaryDashboard.interestRate}
//             value={loan.interestRate}
//           />
//           <DetailItem
//             label={t.beneficiaryDashboard.channelPartner}
//             value={loan.channelPartner}
//           />
//           <DetailItem
//             label={t.beneficiaryDashboard.purposeOfLoan}
//             value={loan.purpose}
//           />
//           {loan.status === 'Active' && (
//             <DetailItem
//               label={t.beneficiaryDashboard.nextInstallmentDate}
//               value={loan.nextInstallment}
//             />
//           )}
//         </div>

//         <div className="px-4 sm:px-6 pb-5">
//           <p className="text-[11px] text-slate-500">
//             {t.beneficiaryDashboard.loanSupport}{' '}
//             <span className="text-slate-200">{loan.channelPartner}</span>.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
//     <p className="text-[11px] text-slate-400 uppercase tracking-wide">
//       {label}
//     </p>
//     <p className="mt-1 text-sm font-medium text-slate-50">{value}</p>
//   </div>
// );

// /* ---------- Household popup ---------- */

// const HouseholdInfoModal = ({ data, setData, onClose, onContinue }) => {
//   const numericSanitize = (val) => String(val || '').replace(/[^\d.]/g, '');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (name, file) => {
//     setData((prev) => ({ ...prev, [name]: file }));
//   };

//   const handleCookingFuelChange = (e) => {
//     const value = e.target.value;
//     setData((prev) => ({
//       ...prev,
//       cooking_fuel: value,
//       lpg_refills_per_year: value === 'lpg' ? prev.lpg_refills_per_year : '',
//     }));
//   };

//   const handleHasChildrenChange = (e) => {
//     const value = e.target.value;
//     setData((prev) => ({
//       ...prev,
//       has_children: value,
//       children_school_type: value === 'yes' ? prev.children_school_type : '',
//     }));
//   };

//   const handleHasOtherLandChange = (e) => {
//     const value = e.target.value;
//     setData((prev) => ({
//       ...prev,
//       has_other_land: value,
//       other_land_size_hectare: value === 'yes' ? prev.other_land_size_hectare : '',
//     }));
//   };

//   const handleElectricityInputMethodChange = (e) => {
//     const value = e.target.value;
//     setData((prev) => ({
//       ...prev,
//       electricity_input_method: value,
//       electricity_bill_upload_last_month:
//         value === 'upload' ? prev.electricity_bill_upload_last_month : null,
//       electricity_month1_amount: value === 'history' ? prev.electricity_month1_amount : '',
//       electricity_month1_units: value === 'history' ? prev.electricity_month1_units : '',
//       electricity_month2_amount: value === 'history' ? prev.electricity_month2_amount : '',
//       electricity_month2_units: value === 'history' ? prev.electricity_month2_units : '',
//       electricity_month3_amount: value === 'history' ? prev.electricity_month3_amount : '',
//       electricity_month3_units: value === 'history' ? prev.electricity_month3_units : '',
//     }));
//   };

//   const handleNumPhonesChange = (e) => {
//     const digits = e.target.value.replace(/\D/g, '');
//     const n = Number(digits) || 0;
//     setData((prev) => {
//       const arr = Array.isArray(prev.phone_recharges)
//         ? [...prev.phone_recharges]
//         : [];
//       while (arr.length < n) arr.push({ avg: '' });
//       if (arr.length > n) arr.length = n;
//       return {
//         ...prev,
//         num_phones: digits,
//         phone_recharges: arr,
//       };
//     });
//   };

//   const handlePhoneAvgChange = (index, value) => {
//     const sanitized = numericSanitize(value);
//     setData((prev) => {
//       const arr = Array.isArray(prev.phone_recharges)
//         ? [...prev.phone_recharges]
//         : [];
//       while (arr.length <= index) arr.push({ avg: '' });
//       arr[index] = { ...(arr[index] || {}), avg: sanitized };
//       return { ...prev, phone_recharges: arr };
//     });
//   };

//   const nPhones = Number(data.num_phones) || 0;

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="w-full max-w-4xl mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-emerald-900/40 overflow-hidden max-h-[90vh] flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950">
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400">
//               Household & Income Assessment
//             </p>
//             <h2 className="text-base font-semibold text-white mt-1">
//               Please confirm household & utility details before applying for a loan.
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-5 py-4 overflow-y-auto space-y-5 text-sm">
//           {/* Household & income */}
//           <section className="space-y-3">
//             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
//               Household & Income
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">Household Size</label>
//                 <input
//                   type="number"
//                   name="household_size"
//                   value={data.household_size}
//                   onChange={handleChange}
//                   placeholder="Number of members"
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">Number of Earners in a Family</label>
//                 <input
//                   type="number"
//                   name="num_earners"
//                   value={data.num_earners}
//                   onChange={handleChange}
//                   placeholder="Number of earning members"
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">Monthly Family Income (₹)</label>
//                 <input
//                   type="text"
//                   name="avg_monthly_family_income"
//                   value={data.avg_monthly_family_income}
//                   onChange={(e) =>
//                     setData((prev) => ({
//                       ...prev,
//                       avg_monthly_family_income: numericSanitize(e.target.value),
//                     }))
//                   }
//                   placeholder="e.g. 20000"
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//                 <p className="text-[10px] text-slate-500">
//                   Total monthly income of all earners. Best estimate is okay.
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Upload Income Certificate (PDF)
//                 </label>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) =>
//                     handleFileChange('income_certificate', e.target.files[0])
//                   }
//                   className="w-full text-[11px] text-slate-300"
//                 />
//                 <p className="text-[10px] text-slate-500">
//                   Optional but helps verify your declared income.
//                 </p>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Upload Bank Statement (PDF)
//                 </label>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) =>
//                     handleFileChange('bank_statement', e.target.files[0])
//                   }
//                   className="w-full text-[11px] text-slate-300"
//                 />
//                 <p className="text-[10px] text-slate-500">
//                   Upload latest statement if available.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Children & education */}
//           <section className="space-y-3">
//             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
//               Children & Education
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">Do you have children?</label>
//                 <select
//                   name="has_children"
//                   value={data.has_children}
//                   onChange={handleHasChildrenChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//               {data.has_children === 'yes' && (
//                 <div className="space-y-1">
//                   <label className="text-xs text-slate-200">
//                     Children School Type
//                   </label>
//                   <select
//                     name="children_school_type"
//                     value={data.children_school_type}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   >
//                     <option value="">Select school type</option>
//                     <option value="government">Government School</option>
//                     <option value="private">Private School</option>
//                     <option value="not_in_school">Not in School</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* Assets */}
//           <section className="space-y-2">
//             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
//               Assets Owned
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
//               {[
//                 { key: 'ac', label: 'Air Conditioner' },
//                 { key: 'fridge', label: 'Refrigerator' },
//                 { key: 'car', label: 'Car' },
//                 { key: 'two_wheeler', label: 'Two Wheeler' },
//                 { key: 'tv', label: 'Television' },
//                 { key: 'smartphone', label: 'Smartphone' },
//               ].map((item) => (
//                 <label key={item.key} className="inline-flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name={item.key}
//                     checked={!!data[item.key]}
//                     onChange={handleChange}
//                     className="h-3 w-3 rounded border-slate-700 bg-slate-900 text-emerald-500"
//                   />
//                   <span className="text-slate-200">{item.label}</span>
//                 </label>
//               ))}
//             </div>
//           </section>

//           {/* Utilities & land */}
//           <section className="space-y-3">
//             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
//               Utilities & Land
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">Cooking Fuel</label>
//                 <select
//                   name="cooking_fuel"
//                   value={data.cooking_fuel}
//                   onChange={handleCookingFuelChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="">Select fuel type</option>
//                   <option value="lpg">LPG</option>
//                   <option value="solid">Solid fuel (Coal / Wood)</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               {data.cooking_fuel === 'lpg' && (
//                 <div className="space-y-1">
//                   <label className="text-xs text-slate-200">
//                     LPG refills per year (cylinders/year)
//                   </label>
//                   <input
//                     type="number"
//                     name="lpg_refills_per_year"
//                     value={data.lpg_refills_per_year}
//                     onChange={(e) =>
//                       setData((prev) => ({
//                         ...prev,
//                         lpg_refills_per_year: e.target.value.replace(/\D/g, ''),
//                       }))
//                     }
//                     placeholder="e.g. 12"
//                     className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               )}
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">Current House Type</label>
//                 <select
//                   name="house_type"
//                   value={data.house_type}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="">Select house type</option>
//                   <option value="kutcha">Kutcha</option>
//                   <option value="pakka">Pakka</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Do you have land other than your house?
//                 </label>
//                 <select
//                   name="has_other_land"
//                   value={data.has_other_land}
//                   onChange={handleHasOtherLandChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//               {data.has_other_land === 'yes' && (
//                 <div className="space-y-1">
//                   <label className="text-xs text-slate-200">
//                     Land Size (in Hectare)
//                   </label>
//                   <input
//                     type="text"
//                     name="other_land_size_hectare"
//                     value={data.other_land_size_hectare}
//                     onChange={(e) =>
//                       setData((prev) => ({
//                         ...prev,
//                         other_land_size_hectare: numericSanitize(e.target.value),
//                       }))
//                     }
//                     placeholder="e.g. 0.75"
//                     className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* Electricity */}
//           <section className="space-y-3">
//             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
//               Electricity
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Electricity Meter Number
//                 </label>
//                 <input
//                   type="text"
//                   name="meter_number"
//                   value={data.meter_number}
//                   onChange={handleChange}
//                   placeholder="Enter meter number"
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Provide electricity bill using
//                 </label>
//                 <select
//                   name="electricity_input_method"
//                   value={data.electricity_input_method}
//                   onChange={handleElectricityInputMethodChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="">Select method</option>
//                   <option value="upload">Upload last month's bill (PDF)</option>
//                   <option value="history">
//                     Enter last 3 months' amounts & units
//                   </option>
//                 </select>
//               </div>
//             </div>

//             {data.electricity_input_method === 'upload' && (
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Upload last month's electricity bill (PDF)
//                 </label>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) =>
//                     handleFileChange(
//                       'electricity_bill_upload_last_month',
//                       e.target.files[0]
//                     )
//                   }
//                   className="w-full text-[11px] text-slate-300"
//                 />
//               </div>
//             )}

//             {data.electricity_input_method === 'history' && (
//               <div className="space-y-2 text-xs">
//                 <p className="text-[10px] text-slate-500">
//                   Enter amount (₹) and units (kWh) for last 3 months. Month 1 =
//                   most recent.
//                 </p>
//                 {[1, 2, 3].map((m) => (
//                   <div key={m} className="grid grid-cols-2 gap-2">
//                     <div className="space-y-1">
//                       <label className="text-[11px] text-slate-200">
//                         Month {m} - Amount (₹)
//                       </label>
//                       <input
//                         type="text"
//                         value={data[`electricity_month${m}_amount`]}
//                         onChange={(e) =>
//                           setData((prev) => ({
//                             ...prev,
//                             [`electricity_month${m}_amount`]:
//                               numericSanitize(e.target.value),
//                           }))
//                         }
//                         className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
//                         placeholder="e.g. 850"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-[11px] text-slate-200">
//                         Month {m} - Units (kWh)
//                       </label>
//                       <input
//                         type="text"
//                         value={data[`electricity_month${m}_units`]}
//                         onChange={(e) =>
//                           setData((prev) => ({
//                             ...prev,
//                             [`electricity_month${m}_units`]:
//                               numericSanitize(e.target.value),
//                           }))
//                         }
//                         className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
//                         placeholder="e.g. 210"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* Phones & recharge */}
//           <section className="space-y-3">
//             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
//               Phones & Recharge
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <div className="space-y-1">
//                 <label className="text-xs text-slate-200">
//                   Number of Phones
//                 </label>
//                 <input
//                   type="number"
//                   value={data.num_phones}
//                   onChange={handleNumPhonesChange}
//                   placeholder="Number of phones"
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>
//             </div>

//             {nPhones > 0 && (
//               <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
//                 {Array.from({ length: nPhones }).map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 space-y-1"
//                   >
//                     <p className="text-[11px] text-slate-300 font-medium">
//                       Phone {idx + 1}
//                     </p>
//                     <input
//                       type="text"
//                       value={data.phone_recharges[idx]?.avg || ''}
//                       onChange={(e) =>
//                         handlePhoneAvgChange(idx, e.target.value)
//                       }
//                       placeholder="Average 6 months recharge (₹)"
//                       className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         </div>

//         {/* Footer */}
//         <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/90">
//           <p className="text-[11px] text-slate-500 max-w-xs">
//             These details help us understand your household situation and offer a
//             suitable loan.
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={onClose}
//               className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onContinue}
//               className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
//             >
//               Continue →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------- Loan popup ---------- */

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
//     formData.loanAmount.trim() &&
//     formData.tenure.trim() &&
//     formData.purpose.trim();

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="w-full max-w-lg mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-blue-900/40 overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-600/10 via-slate-900 to-slate-950">
//           <div>
//             <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400">
//               {t.beneficiaryDashboard.newLoanApplication}
//             </p>
//             <h2 className="text-base font-semibold text-white mt-1">
//               {t.beneficiaryDashboard.applyForAdditionalSupport}
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="px-5 py-5">
//           {/* Form */}
//           {!isLoading && !applicationStatus && (
//             <form onSubmit={onSubmit} className="space-y-4">
//               <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-3 mb-1">
//                 <p className="text-[11px] text-blue-300">
//                   {t.beneficiaryDashboard.tip}
//                 </p>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-200">
//                   {t.beneficiaryDashboard.loanAmountLabel}
//                 </label>
//                 <input
//                   type="number"
//                   name="loanAmount"
//                   value={formData.loanAmount}
//                   onChange={onInputChange}
//                   placeholder={t.beneficiaryDashboard.loanAmountPlaceholder}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-200">
//                   {t.beneficiaryDashboard.tenureLabel}
//                 </label>
//                 <select
//                   name="tenure"
//                   value={formData.tenure}
//                   onChange={onInputChange}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">
//                     {t.beneficiaryDashboard.selectTenure}
//                   </option>
//                   <option value="6 months">
//                     {t.beneficiaryDashboard.tenureOptions.sixMonths}
//                   </option>
//                   <option value="12 months">
//                     {t.beneficiaryDashboard.tenureOptions.twelveMonths}
//                   </option>
//                   <option value="18 months">
//                     {t.beneficiaryDashboard.tenureOptions.eighteenMonths}
//                   </option>
//                   <option value="24 months">
//                     {t.beneficiaryDashboard.tenureOptions.twentyFourMonths}
//                   </option>
//                   <option value="36 months">
//                     {t.beneficiaryDashboard.tenureOptions.thirtySixMonths}
//                   </option>
//                 </select>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-medium text-slate-200">
//                   {t.beneficiaryDashboard.purposeOfLoanLabel}
//                 </label>
//                 <textarea
//                   name="purpose"
//                   value={formData.purpose}
//                   onChange={onInputChange}
//                   rows={3}
//                   placeholder={t.beneficiaryDashboard.purposePlaceholder}
//                   className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
//                   type="submit"
//                   disabled={!isFormFilled}
//                   className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition ${
//                     !isFormFilled
//                       ? 'bg-blue-400/40 cursor-not-allowed'
//                       : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                 >
//                   {t.beneficiaryDashboard.submit}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Loading */}
//           {isLoading && (
//             <div className="flex flex-col items-center justify-center py-10 space-y-3">
//               <div className="rounded-full bg-slate-900/80 p-4 border border-slate-800">
//                 <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
//               </div>
//               <p className="text-sm text-slate-200">
//                 {t.beneficiaryDashboard.processing}
//               </p>
//               <p className="text-[11px] text-slate-500 text-center max-w-xs">
//                 {t.beneficiaryDashboard.processingDescription}
//               </p>
//             </div>
//           )}

//           {/* Approved */}
//           {applicationStatus === 'approved' && (
//             <div className="flex flex-col items-center justify-center py-8 space-y-4">
//               <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
//                 <CheckCircle className="w-11 h-11 text-emerald-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-white">
//                 {t.beneficiaryDashboard.loanApproved}
//               </h3>
//               <p className="text-sm text-slate-300 text-center max-w-sm">
//                 {t.beneficiaryDashboard.approvedDescription}
//               </p>
//               <button
//                 onClick={onClose}
//                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
//               >
//                 {t.beneficiaryDashboard.close}
//               </button>
//             </div>
//           )}

//           {/* Pending */}
//           {applicationStatus === 'pending' && (
//             <div className="flex flex-col items-center justify-center py-8 space-y-4">
//               <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
//                 <Clock3 className="w-10 h-10 text-amber-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-white">
//                 {t.beneficiaryDashboard.applicationUnderProcess}
//               </h3>
//               <p className="text-sm text-slate-300 text-center max-w-sm">
//                 {t.beneficiaryDashboard.pendingDescription}
//               </p>
//               <button
//                 onClick={onClose}
//                 className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
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

// export default BeneficiaryDashboard;


// src/components/dashboards/BeneficiaryDashboard.jsx
import React, { useState } from 'react';
import {
  CheckCircle,
  X,
  ArrowLeft,
  Loader2,
  CreditCard,
  Clock3,
  TrendingUp,
} from 'lucide-react';
import Navbar from '../Navbar';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';
import { useDualLanguage } from '../../hooks/useDualLanguage';

const BeneficiaryDashboard = ({ loggedInUser, onLogout }) => {
  const { language } = useLanguage();
  const { translate: tr } = useDualLanguage();
  const t = translations[language];

  const [selectedLoan, setSelectedLoan] = useState(null);

  // 1) NEW – Household popup
  const [showHouseholdModal, setShowHouseholdModal] = useState(false);

  // 2) Existing – Loan popup
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Loan form
  const [formData, setFormData] = useState({
    loanAmount: '',
    tenure: '',
    purpose: '',
  });

  // Household form (compact version of Page4)
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
    phone_recharges: [], // [{ avg: '' }]
  });

  // Hardcoded data (same as before)
  const creditScore = 542;
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

  const activeLoans = loans.filter((l) => l.status === 'Active');
  const totalExposure = loans
    .filter((l) => l.status === 'Active')
    .reduce((sum, l) => sum + l.loanAmount, 0);

  const handleRowClick = (loan) => {
    setSelectedLoan(loan);
  };

  const handleBack = () => {
    setSelectedLoan(null);
  };

  // When user clicks "New Loan" / "Apply for New Loan" -> open Household modal first
  const handleApplyLoan = () => {
    setApplicationStatus(null);
    setFormData({ loanAmount: '', tenure: '', purpose: '' });
    setShowHouseholdModal(true);
    setShowApplicationModal(false);
  };

  const handleCloseHouseholdModal = () => {
    setShowHouseholdModal(false);
  };

  // After Household modal -> simple validation -> open Loan modal
  const handleHouseholdContinue = () => {
    if (
      !householdData.household_size.trim() ||
      !householdData.num_earners.trim() ||
      !householdData.avg_monthly_family_income.trim() ||
      !householdData.meter_number.trim()
    ) {
      alert(
        'Please fill Household Size, Number of Earners, Monthly Family Income and Electricity Meter Number.'
      );
      return;
    }

    setShowHouseholdModal(false);
    setShowApplicationModal(true);
    setApplicationStatus(null);
    setIsLoading(false);
  };

  const handleCloseLoanModal = () => {
    setShowApplicationModal(false);
    setApplicationStatus(null);
    setIsLoading(false);
    setFormData({ loanAmount: '', tenure: '', purpose: '' });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.loanAmount || !formData.tenure || !formData.purpose) {
      alert(
        tr(
          'Please fill Household Size, Number of Earners, Monthly Family Income and Electricity Meter Number.',
          'कृपया परिवार के सदस्यों की संख्या, कमाने वालों की संख्या, मासिक पारिवारिक आय और बिजली मीटर नंबर भरें।'
        )
      );
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar loggedInUser={loggedInUser} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top header */}
        {!selectedLoan && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
                {t.beneficiaryDashboard.brand}
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-white">
                {t.beneficiaryDashboard.welcomeBack}{' '}
                <span className="text-blue-300">
                  {loggedInUser?.name || t.beneficiaryDashboard.beneficiary}
                </span>
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {t.beneficiaryDashboard.description}
              </p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
                {t.beneficiaryDashboard.logout}
              </button>
            </div>
          </div>
        )}

        {/* Either loan details, or dashboard view */}
        {selectedLoan ? (
          <LoanDetailsView loan={selectedLoan} onBack={handleBack} />
        ) : (
          <>
            {/* Overview cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Credit Score */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-lg shadow-blue-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-blue-500/10 p-2">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">
                        {t.beneficiaryDashboard.creditScore}
                      </p>
                      <p className="text-xl font-semibold text-white">
                        {creditScore}
                        <span className="ml-1 text-xs text-slate-400">
                          {t.beneficiaryDashboard.outOf}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-300">
                    {creditScore >= 80
                      ? t.beneficiaryDashboard.excellent
                      : creditScore >= 60
                      ? t.beneficiaryDashboard.good
                      : t.beneficiaryDashboard.needsImprovement}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-blue-500"
                    style={{ width: `${creditScore}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  {t.beneficiaryDashboard.scoreDescription}
                </p>
              </div>

              {/* Active Loans */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-900/10 to-slate-950 p-4 shadow-lg shadow-emerald-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-emerald-500/10 p-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">
                        {t.beneficiaryDashboard.activeLoans}
                      </p>
                      <p className="text-xl font-semibold text-white">
                        {activeLoans.length}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-300">
                    {activeLoans.length > 0
                      ? t.beneficiaryDashboard.onTrack
                      : t.beneficiaryDashboard.noActiveLoans}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t.beneficiaryDashboard.activeLoansDescription}
                </p>
              </div>

              {/* Total Exposure */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900/10 to-slate-950 p-4 shadow-lg shadow-indigo-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-indigo-500/10 p-2">
                      <Clock3 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">
                        {t.beneficiaryDashboard.currentExposure}
                      </p>
                      <p className="text-xl font-semibold text-white">
                        ₹{totalExposure.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleApplyLoan}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-semibold text-white shadow-md hover:bg-indigo-600 transition"
                  >
                    {t.beneficiaryDashboard.newLoan}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t.beneficiaryDashboard.exposureDescription}
                </p>
              </div>
            </section>

            {/* Previous loans table */}
            <section className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-xl shadow-slate-900/40">
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-white">
                    {t.beneficiaryDashboard.previousActiveLoans}
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t.beneficiaryDashboard.loansTableDescription}
                  </p>
                </div>
                <button
                  onClick={handleApplyLoan}
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  <CreditCard className="w-4 h-4" />
                  {t.beneficiaryDashboard.applyForNewLoan}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900/60 text-xs text-slate-400">
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
                          idx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/40'
                        } hover:bg-slate-800/80`}
                      >
                        <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-50">
                          ₹{loan.loanAmount.toLocaleString()}
                        </td>
                        <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-200">
                          {loan.tenure}
                        </td>
                        <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-slate-300">
                          {loan.nextInstallment}
                        </td>
                        <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                              loan.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-700/40 text-slate-200 border border-slate-600'
                            }`}
                          >
                            <span
                              className={`mr-1 h-1.5 w-1.5 rounded-full ${
                                loan.status === 'Active'
                                  ? 'bg-emerald-400'
                                  : 'bg-slate-400'
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
                          className="px-4 sm:px-6 py-6 text-center text-sm text-slate-400"
                        >
                          {t.beneficiaryDashboard.noLoanHistory}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Household modal – FIRST */}
      {showHouseholdModal && (
        <HouseholdInfoModal
          data={householdData}
          setData={setHouseholdData}
          onClose={handleCloseHouseholdModal}
          onContinue={handleHouseholdContinue}
        />
      )}

      {/* Loan application modal – SECOND */}
      {showApplicationModal && (
        <LoanApplicationModal
          formData={formData}
          isLoading={isLoading}
          applicationStatus={applicationStatus}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={handleCloseLoanModal}
        />
      )}
    </div>
  );
};

/* ---------- Loan details view ---------- */

const LoanDetailsView = ({ loan, onBack }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="mt-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.beneficiaryDashboard.backToDashboard}
      </button>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-900/40 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
          <div>
            <p className="text-xs text-slate-400">
              {t.beneficiaryDashboard.loanID}
              {loan.id}
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              ₹{loan.loanAmount.toLocaleString()} · {loan.tenure}
            </h2>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold border ${
              loan.status === 'Active'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-700/40 text-slate-200 border-slate-600'
            }`}
          >
            <span
              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                loan.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'
              }`}
            />
            {loan.status === 'Active'
              ? t.beneficiaryDashboard.active
              : t.beneficiaryDashboard.closed}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 py-5">
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
            <span className="text-slate-200">{loan.channelPartner}</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
    <p className="text-[11px] text-slate-400 uppercase tracking-wide">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-slate-50">{value}</p>
  </div>
);

/* ---------- Household popup ---------- */

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-emerald-900/40 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400">
              {tr('Household & Income Assessment', 'परिवार और आय आकलन')}
            </p>
            <h2 className="text-base font-semibold text-white mt-1">
              {tr(
                'Please confirm household & utility details before applying for a loan.',
                'ऋण के लिए आवेदन करने से पहले परिवार और उपयोगिता विवरण पुष्टि करें।'
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto space-y-5 text-sm">
          {/* Household & income */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              {tr('Household & Income', 'परिवार और आय')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Household Size', 'परिवार के सदस्य')}
                </label>
                <input
                  type="number"
                  name="household_size"
                  value={data.household_size}
                  onChange={handleChange}
                  placeholder={tr('Number of members', 'सदस्यों की संख्या')}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Number of Earners in a Family', 'परिवार में कमाने वालों की संख्या')}
                </label>
                <input
                  type="number"
                  name="num_earners"
                  value={data.num_earners}
                  onChange={handleChange}
                  placeholder={tr('Number of earning members', 'कमाने वाले सदस्य')}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
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
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                <label className="text-xs text-slate-200">
                  {tr('Upload Income Certificate (PDF)', 'आय प्रमाण पत्र अपलोड करें (PDF)')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange('income_certificate', e.target.files[0])
                  }
                  className="w-full text-[11px] text-slate-300"
                />
                <p className="text-[10px] text-slate-500">
                  {tr(
                    'Optional but helps verify your declared income.',
                    'वैकल्पिक, लेकिन घोषित आय सत्यापित करने में मददगार।'
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Upload Bank Statement (PDF)', 'बैंक स्टेटमेंट अपलोड करें (PDF)')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange('bank_statement', e.target.files[0])
                  }
                  className="w-full text-[11px] text-slate-300"
                />
                <p className="text-[10px] text-slate-500">
                  {tr('Upload latest statement if available.', 'उपलब्ध हो तो नवीनतम स्टेटमेंट अपलोड करें।')}
                </p>
              </div>
            </div>
          </section>

          {/* Children & education */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              {tr('Children & Education', 'बच्चे और शिक्षा')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Do you have children?', 'क्या आपके बच्चे हैं?')}
                </label>
                <select
                  name="has_children"
                  value={data.has_children}
                  onChange={handleHasChildrenChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select', 'चुनें')}</option>
                  <option value="yes">{tr('Yes', 'हाँ')}</option>
                  <option value="no">{tr('No', 'नहीं')}</option>
                </select>
              </div>
              {data.has_children === 'yes' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-200">
                    {tr('Children School Type', 'बच्चों के स्कूल का प्रकार')}
                  </label>
                  <select
                    name="children_school_type"
                    value={data.children_school_type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
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
                    className="h-3 w-3 rounded border-slate-700 bg-slate-900 text-emerald-500"
                  />
                  <span className="text-slate-200">{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Utilities & land */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              {tr('Utilities & Land', 'सुविधाएं और भूमि')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Cooking Fuel', 'रसोई ईंधन')}
                </label>
                <select
                  name="cooking_fuel"
                  value={data.cooking_fuel}
                  onChange={handleCookingFuelChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                  <label className="text-xs text-slate-200">
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
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Current House Type', 'वर्तमान घर का प्रकार')}
                </label>
                <select
                  name="house_type"
                  value={data.house_type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select house type', 'घर का प्रकार चुनें')}</option>
                  <option value="kutcha">{tr('Kutcha', 'कच्चा')}</option>
                  <option value="pakka">{tr('Pakka', 'पक्का')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Do you have land other than your house?', 'क्या आपके पास घर के अलावा जमीन है?')}
                </label>
                <select
                  name="has_other_land"
                  value={data.has_other_land}
                  onChange={handleHasOtherLandChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{tr('Select', 'चुनें')}</option>
                  <option value="yes">{tr('Yes', 'हाँ')}</option>
                  <option value="no">{tr('No', 'नहीं')}</option>
                </select>
              </div>
              {data.has_other_land === 'yes' && (
                <div className="space-y-1">
                  <label className="text-xs text-slate-200">
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
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Electricity */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              {tr('Electricity', 'बिजली')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Electricity Meter Number', 'बिजली मीटर नंबर')}
                </label>
                <input
                  type="text"
                  name="meter_number"
                  value={data.meter_number}
                  onChange={handleChange}
                  placeholder={tr('Enter meter number', 'मीटर नंबर दर्ज करें')}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Provide electricity bill using', 'बिजली बिल इस प्रकार दें')}
                </label>
                <select
                  name="electricity_input_method"
                  value={data.electricity_input_method}
                  onChange={handleElectricityInputMethodChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                <label className="text-xs text-slate-200">
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
                  className="w-full text-[11px] text-slate-300"
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
                      <label className="text-[11px] text-slate-200">
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
                        className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder={tr('e.g. 850', 'उदाहरण: 850')}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-200">
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
                        className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              {tr('Phones & Recharge', 'फोन और रिचार्ज')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">
                  {tr('Number of Phones', 'फोनों की संख्या')}
                </label>
                <input
                  type="number"
                  value={data.num_phones}
                  onChange={handleNumPhonesChange}
                  placeholder={tr('Number of phones', 'फोनों की संख्या')}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {nPhones > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {Array.from({ length: nPhones }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 space-y-1"
                  >
                    <p className="text-[11px] text-slate-300 font-medium">
                      {tr('Phone', 'फोन')} {idx + 1}
                    </p>
                    <input
                      type="text"
                      value={data.phone_recharges[idx]?.avg || ''}
                      onChange={(e) =>
                        handlePhoneAvgChange(idx, e.target.value)
                      }
                      placeholder={tr('Average 6 months recharge (₹)', 'पिछले 6 महीनों का औसत रिचार्ज (₹)')}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/90">
          <p className="text-[11px] text-slate-500 max-w-xs">
            {tr(
              'These details help us understand your household situation and offer a suitable loan.',
              'ये विवरण हमें आपकी घरेलू स्थिति समझने और उपयुक्त ऋण सुझाने में मदद करते हैं।'
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
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

/* ---------- Loan popup ---------- */

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-blue-900/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-600/10 via-slate-900 to-slate-950">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400">
              {t.beneficiaryDashboard.newLoanApplication}
            </p>
            <h2 className="text-base font-semibold text-white mt-1">
              {t.beneficiaryDashboard.applyForAdditionalSupport}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-800 text-slate-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {/* Form */}
          {!isLoading && !applicationStatus && (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-3 mb-1">
                <p className="text-[11px] text-blue-300">
                  {t.beneficiaryDashboard.tip}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  {t.beneficiaryDashboard.loanAmountLabel}
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={onInputChange}
                  placeholder={t.beneficiaryDashboard.loanAmountPlaceholder}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  {t.beneficiaryDashboard.tenureLabel}
                </label>
                <select
                  name="tenure"
                  value={formData.tenure}
                  onChange={onInputChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <label className="text-xs font-medium text-slate-200">
                  {t.beneficiaryDashboard.purposeOfLoanLabel}
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={onInputChange}
                  rows={3}
                  placeholder={t.beneficiaryDashboard.purposePlaceholder}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
                  type="submit"
                  disabled={!isFormFilled}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition ${
                    !isFormFilled
                      ? 'bg-blue-400/40 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {t.beneficiaryDashboard.submit}
                </button>
              </div>
            </form>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <div className="rounded-full bg-slate-900/80 p-4 border border-slate-800">
                <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
              </div>
              <p className="text-sm text-slate-200">
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
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle className="w-11 h-11 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {t.beneficiaryDashboard.loanApproved}
              </h3>
              <p className="text-sm text-slate-300 text-center max-w-sm">
                {t.beneficiaryDashboard.approvedDescription}
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 transition"
              >
                {t.beneficiaryDashboard.close}
              </button>
            </div>
          )}

          {/* Pending */}
          {applicationStatus === 'pending' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                <Clock3 className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {t.beneficiaryDashboard.applicationUnderProcess}
              </h3>
              <p className="text-sm text-slate-300 text-center max-w-sm">
                {t.beneficiaryDashboard.pendingDescription}
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 transition"
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

export default BeneficiaryDashboard;
