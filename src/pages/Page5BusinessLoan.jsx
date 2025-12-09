// // src/pages/Page5BusinessLoan.jsx
// import React from "react";
// import { useForm } from "../context/FormContext";
// import Textarea from "../components/form/Textarea";
// import Input from "../components/form/Input";
// // import "./Page5BusinessLoan.css";

// const PURPOSE_OPTIONS = [
//   { value: "start_business", label: "Start a new business" },
//   { value: "expand_business", label: "Expand existing business" },
//   { value: "purchase_machinery", label: "Purchase machinery/equipment" },
//   { value: "working_capital", label: "Working capital (raw material, stock)" },
//   { value: "shop_renovation", label: "Shop renovation" },
//   { value: "other", label: "Other" },
// ];

// function Page5BusinessLoan() {
//   const {
//     state,
//     setField,
//     goNext,
//     goPrev,
//     canProceedBusinessLoan,
//     layoutConfig,
//     errors,
//     validateBusinessLoan,
//   } = useForm();

//   const togglePurpose = (value) => {
//     const current = state.loan_purposes || [];
//     if (current.includes(value)) {
//       setField(
//         "loan_purposes",
//         current.filter((v) => v !== value)
//       );
//     } else {
//       setField("loan_purposes", [...current, value]);
//     }
//   };

//   return (
//     <div className="page page--business-loan">
//       {/* Top title / hero like Page 3 */}
//       <div className="page5-title">
//         <span className="page5-title-pill">Step 05 of 05</span>
//         <div className="page5-title-main">
//           <span className="page5-title-emoji">🏭</span>
//           <div>
//             <div className="page5-title-text">Business Loan Details</div>
//             <div className="page5-title-sub">
//               Tell us why you need the loan and how much amount you require.
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={layoutConfig?.containerClass ?? "container"}>
//         <div className="full-panel">
//           <div className="panel-header">
//             <div className="panel-title">
//               <span className="header-deco" aria-hidden>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                   <rect x="3" y="3" width="18" height="18" rx="4" fill="#eef2ff" />
//                   <path
//                     d="M8 12h8M8 9h5"
//                     stroke="#4f46e5"
//                     strokeWidth="1.2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </span>
//               Business Loan Requirements
//             </div>
//             <div className="panel-sub">Step 05 · Business Loan</div>
//           </div>

//           <div className="panel-grid">
//             {/* Card 1: Why do you need the loan? */}
//             <div className="panel-card panel-card--span8">
//               <div className="card-heading">
//                 <span className="heading-emoji">❓</span> Why do you need the loan?
//               </div>

//               <div className="checkbox-group">
//                 {PURPOSE_OPTIONS.map((opt) => (
//                   <label key={opt.value} className="checkbox-item">
//                     <input
//                       type="checkbox"
//                       checked={state.loan_purposes?.includes(opt.value) || false}
//                       onChange={() => togglePurpose(opt.value)}
//                     />
//                     <span className="checkbox-label">{opt.label}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.loan_purposes && (
//                 <p className="field-error">{errors.loan_purposes}</p>
//               )}

//               <Textarea
//                 label="Detailed Purpose of Loan"
//                 value={state.loan_purpose_detail}
//                 onChange={(val) => setField("loan_purpose_detail", val)}
//                 placeholder="Explain your business activity, how funds will be used, expected impact on income, etc."
//                 required
//               />
//               {errors.loan_purpose_detail && (
//                 <p className="field-error">{errors.loan_purpose_detail}</p>
//               )}
//             </div>

//             {/* Card 2: Loan Amount */}
//             <div className="panel-card panel-card--span4">
//               <div className="card-heading">
//                 <span className="heading-emoji">💰</span> Loan Amount Required
//               </div>

//               <Input
//                 label="Loan Amount Required (₹)"
//                 type="number"
//                 value={state.loan_amount_required}
//                 onChange={(val) =>
//                   setField("loan_amount_required", val.replace(/[^\d]/g, ""))
//                 }
//                 placeholder="Enter amount in rupees"
//                 required
//               />
//               {errors.loan_amount_required && (
//                 <p className="field-error">{errors.loan_amount_required}</p>
//               )}

//               <p className="muted" style={{ marginTop: 6 }}>
//                 As per scheme, loan amount may vary based on eligibility and project
//                 details. Enter the amount you realistically need.
//               </p>

//               <div className="info-box">
//                 <div className="info-box-title">Tip</div>
//                 <p className="info-box-text">
//                   Think about how much money you can repay comfortably from your
//                   business income. Do not overestimate.
//                 </p>
//               </div>
//             </div>

//             {/* Card 3: Quick Notes */}
//             <div className="panel-card panel-card--span4 panel-card--info">
//               <div className="card-heading">
//                 <span className="heading-emoji">📌</span> Notes
//               </div>
//               <div className="info-content">
//                 <ul className="tips-list">
//                   <li>
//                     Be clear about how the loan will help your business grow or
//                     become stable.
//                   </li>
//                   <li>
//                     If you select <strong>Other</strong>, mention details in the
//                     description box.
//                   </li>
//                   <li>
//                     Keep your estimates realistic. This helps faster approval and
//                     better planning.
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="panel-actions">
//             <button className="btn btn-secondary" onClick={goPrev} type="button">
//               ← Back
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={() => goNext(validateBusinessLoan)}
//               disabled={!canProceedBusinessLoan}
//               type="button"
//             >
//               Submit →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page5BusinessLoan;


// src/pages/Page5BusinessLoan.jsx
import React from "react";
import { useForm } from "../context/FormContext";
import Textarea from "../components/form/Textarea";
import Input from "../components/form/Input";
import "./Page5BusinessLoan.css";

const PURPOSE_OPTIONS = [
  { value: "start_business", label: "Start a new business" },
  { value: "expand_business", label: "Expand existing business" },
  { value: "purchase_machinery", label: "Purchase machinery/equipment" },
  { value: "working_capital", label: "Working capital (raw material, stock)" },
  { value: "shop_renovation", label: "Shop renovation" },
  { value: "other", label: "Other" },
];

function Page5BusinessLoan() {
  const {
    state,
    setField,
    goNext,
    goPrev,
    canProceedBusinessLoan,
    layoutConfig,
    errors,
    validateBusinessLoan,
  } = useForm();

  const togglePurpose = (value) => {
    const current = state.loan_purposes || [];
    if (current.includes(value)) {
      setField(
        "loan_purposes",
        current.filter((v) => v !== value)
      );
    } else {
      setField("loan_purposes", [...current, value]);
    }
  };

  return (
    <div className="page page--business-loan">
      {/* Top title – matches Page 3 style */}
      <div className="page5-title">
        <span className="page5-title-pill">Step 05 of 05</span>
        <div className="page5-title-main">
          <span className="page5-title-emoji">🏭</span>
          <div>
            <div className="page5-title-text">Business Loan Details</div>
            <div className="page5-title-sub">
              Tell us how this loan will support your business.
            </div>
          </div>
        </div>
      </div>

      <div className={layoutConfig?.containerClass ?? "container"}>
        <div className="full-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="header-deco" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="#eef6ff" />
                  <path
                    d="M8 12h8M8 9h5"
                    stroke="#0b63ff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Business Loan Requirements
            </div>
            <div className="panel-sub">Step 05 · Business Loan</div>
          </div>

          {/* GRID */}
          <div className="panel-grid">
            {/* Card 1: Why do you need the loan? */}
            <div className="panel-card panel-card--span8">
              <div className="card-heading">
                <span className="heading-emoji">❓</span> Why do you need the loan?
              </div>

              <div className="checkbox-group">
                {PURPOSE_OPTIONS.map((opt) => (
                  <label key={opt.value} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={state.loan_purposes?.includes(opt.value) || false}
                      onChange={() => togglePurpose(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.loan_purposes && (
                <p className="field-error">{errors.loan_purposes}</p>
              )}

              <Textarea
                label="Detailed Purpose of Loan"
                value={state.loan_purpose_detail}
                onChange={(val) => setField("loan_purpose_detail", val)}
                placeholder="Explain your business, how funds will be used, expected impact on income, etc."
                required
              />
              {errors.loan_purpose_detail && (
                <p className="field-error">{errors.loan_purpose_detail}</p>
              )}
            </div>

            {/* Card 2: Loan Amount */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">💰</span> Loan Amount Required
              </div>

              <Input
                label="Loan Amount Required (₹)"
                type="number"
                value={state.loan_amount_required}
                onChange={(val) =>
                  setField("loan_amount_required", val.replace(/[^\d]/g, ""))
                }
                placeholder="Enter amount in rupees"
                required
              />
              {errors.loan_amount_required && (
                <p className="field-error">{errors.loan_amount_required}</p>
              )}

              <p className="muted" style={{ marginTop: 6 }}>
                Final loan amount will depend on eligibility and project
                details as per scheme guidelines.
              </p>

              <div className="info-box">
                <div className="info-box-title">Tip</div>
                <p className="info-box-text">
                  Be realistic with your amount – think about how much you
                  actually need and can repay comfortably from your business
                  income.
                </p>
              </div>
            </div>
          </div>

          <div className="panel-actions">
            <button className="btn btn-secondary" onClick={goPrev}>
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => goNext(validateBusinessLoan)}
              disabled={!canProceedBusinessLoan}
            >
              Submit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page5BusinessLoan;
