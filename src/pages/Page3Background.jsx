// // src/pages/Page3Background.jsx
// import React from "react";
// import { useForm } from "../context/FormContext";
// import Select from "../components/form/Select";
// import MultiSelect from "../components/form/MultiSelect";
// import Textarea from "../components/form/Textarea";
// import FileUpload from "../components/form/FileUpload";
// import Input from "../components/form/Input";
// import "./Page3Background.css";

// function Page3Background() {
//   const { state, update, goNext, goPrev } = useForm();

//   const occupationOptions = [
//     { value: "agriculture", label: "Agriculture" },
//     { value: "daily_wage", label: "Daily Wage Labor" },
//     { value: "self_employed", label: "Self Employed" },
//     { value: "salaried", label: "Salaried" },
//     { value: "other", label: "Other" },
//   ];

//   const benefitOptions = [
//   { value: "ab_pmjAY", label: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)" },
//   { value: "pm_pension", label: "Pradhan Mantri Pension Yojana" },
//   { value: "pm_kisan", label: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)" },
//   { value: "pmuy", label: "Pradhan Mantri Ujjwala Yojana (PMUY)" },
//   { value: "other", label: "Other Scheme" },
//   ];

//   const rationCardOptions = [
//     { value: "apl", label: "APL" },
//     { value: "bpl", label: "BPL" },
//     { value: "aay", label: "AAY" },
//     { value: "none", label: "None" },
//   ];

//   const handleSeasonalChange = (val) => {
//     update({ seasonal_income: val });

//     if (val !== "yes") {
//       update({
//         peak_month_income: "",
//         lowest_month_income: "",
//       });
//     }
//   };

//   return (
//     <div className="page page--background">
//       <h2 className="page-title">📝 Background Information</h2>

//       <div className="container">
//         <div className="full-panel">
//           <div className="panel-header">
//             <div className="panel-title">
//               <span className="header-deco" aria-hidden>
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <rect x="3" y="3" width="18" height="18" rx="3" fill="#eef6ff" />
//                   <path
//                     d="M7 12h10M7 8h10"
//                     stroke="#0b63ff"
//                     strokeWidth="1.2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </span>
//               Background Details
//             </div>
//             <div className="panel-sub">Step 03 · Background</div>
//           </div>

//           <div className="panel-grid">

//             {/* Occupation */}
//             <div className="panel-card panel-card--span4">
//               <div className="card-heading"><span className="heading-emoji">🧑‍💼</span>Occupation</div>

//               <Select
//                 label="Primary Occupation"
//                 value={state.primary_occupation}
//                 onChange={(val) => update({ primary_occupation: val })}
//                 options={occupationOptions}
//                 placeholder="Select occupation"
//                 required
//               />

//               <Select
//                 label="Is your income seasonal?"
//                 value={state.seasonal_income}
//                 onChange={(val) => handleSeasonalChange(val)}
//                 options={[
//                   { value: "yes", label: "Yes" },
//                   { value: "no", label: "No" },
//                 ]}
//                 placeholder="Select"
//               />
//             </div>

//             {/* Reason
//             <div className="panel-card panel-card--span8 panel-card--tall">
//               <div className="card-heading"><span className="heading-emoji">📝</span>Reason</div>

//               <Textarea
//                 label="Reason for Applying"
//                 value={state.reason_for_applying}
//                 onChange={(val) => update({ reason_for_applying: val })}
//                 placeholder="Explain why you are applying for this benefit"
//                 rows={6}
//                 required
//               />
//             </div> */}

//             {/* Seasonal income fields (only if yes) */}
//             {state.seasonal_income === "yes" && (
//               <div className="panel-card panel-card--span4">
//                 <div className="card-heading"><span className="heading-emoji">📈</span>Income Details (₹)</div>

//                 <Input
//                   label="Peak month income (in Rs)"
//                   value={state.peak_month_income}
//                   onChange={(val) => {
//                     const digits = val.replace(/\D/g, "").slice(0, 12);
//                     update({ peak_month_income: digits });
//                   }}
//                   placeholder="e.g. 25000"
//                   inputMode="numeric"
//                   maxLength={12}
//                 />
//                 <p className="muted" style={{ marginTop: 6 }}>
//                   Highest income earned in any month of the year.
//                 </p>

//                 <Input
//                   label="Lowest month income (in Rs)"
//                   value={state.lowest_month_income}
//                   onChange={(val) => {
//                     const digits = val.replace(/\D/g, "").slice(0, 12);
//                     update({ lowest_month_income: digits });
//                   }}
//                   placeholder="e.g. 5000"
//                   inputMode="numeric"
//                   maxLength={12}
//                 />
//                 <p className="muted" style={{ marginTop: 6 }}>
//                   Lowest income earned in any month that year.
//                 </p>
//               </div>
//             )}

//             {/* Government benefits */}
//             <div className="panel-card panel-card--span4">
//               <div className="card-heading"><span className="heading-emoji">🎯</span>Government Benefits</div>

//               <MultiSelect
//                 label="Select Government Benefits"
//                 value={state.gov_benefits || []}
//                 onChange={(val) => update({ gov_benefits: val })}
//                 options={benefitOptions}
//               />
//                {/* Supporting Documents */}
//             <div className="panel-card panel-card--span8">
//               <div className="card-heading"><span className="heading-emoji">📤</span>Supporting Government Documents if you enroll in any Government Benfits</div>

//               <FileUpload
//                 label="Upload Supporting Govt Documents if you enroll in any Government Benefits"
//                 onChange={(file) => update({ support_documents: file })}
//                 accept=".pdf,.jpg,.jpeg,.png"
//               />
//             </div>
//             </div>

//             {/* Ration card type */}
//             <div className="panel-card panel-card--span4">
//               <div className="card-heading"><span className="heading-emoji">📇</span>Ration Card</div>

//               <Select
//                 label="Ration Card Type"
//                 value={state.ration_card_type}
//                 onChange={(val) => update({ ration_card_type: val })}
//                 options={rationCardOptions}
//                 placeholder="Select one"
//               />
//               {/* Supporting Documents */}
//             <div className="panel-card panel-card--span8">
//               <div className="card-heading"><span className="heading-emoji">📤</span>Upload PDF of Ration Card</div>

//               <FileUpload
//                 label="Upload Supporting Ration Documents"
//                 onChange={(file) => update({ support_documents: file })}
//                 accept=".pdf,.jpg,.jpeg,.png"
//               />
//             </div>
//             </div>

           

             

//             {/* Notes */}
//             <div className="panel-card panel-card--span4 panel-card--tall">
//               <div className="card-heading"><span className="heading-emoji">💡</span>Notes</div>
//               <div className="info-content">
//                 <p>Attach income certificate, ration card, pension slip etc.</p>
//                 <p className="muted">Tip: Combine images into a single PDF for faster upload.</p>
//               </div>
//             </div>

           
//           </div>

//           <div className="panel-actions">
//             <button className="btn btn-secondary" onClick={goPrev}>Back</button>
//             <button className="btn btn-primary" onClick={goNext}>Next</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page3Background;

// src/pages/Page3Background.jsx

// src/pages/Page3Background.jsx
import React from "react";
import { useForm } from "../context/FormContext";
import Select from "../components/form/Select";
import MultiSelect from "../components/form/MultiSelect";
import FileUpload from "../components/form/FileUpload";
import Input from "../components/form/Input";
import { useDualLanguage } from "../hooks/useDualLanguage";
import "./Page3Background.css";

function Page3Background() {
  const { state, update, goNext, goPrev } = useForm();
  const { translate: tr } = useDualLanguage();

  const occupationOptions = [
    { value: "agriculture", label: tr("Agriculture", "कृषि") },
    { value: "daily_wage", label: tr("Daily Wage Labor", "दैनिक मज़दूरी") },
    { value: "self_employed", label: tr("Self Employed", "स्वरोज़गार") },
    { value: "salaried", label: tr("Salaried", "नौकरीपेशा") },
    { value: "other", label: tr("Other", "अन्य") },
  ];

  const benefitOptions = [
    {
      value: "ab_pmjAY",
      label: tr(
        "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
        "आयुष्मान भारत – प्रधानमंत्री जन आरोग्य योजना (AB-PMJAY)"
      ),
    },
    {
      value: "pm_pension",
      label: tr("Pradhan Mantri Pension Yojana", "प्रधानमंत्री पेंशन योजना"),
    },
    {
      value: "pm_kisan",
      label: tr(
        "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)"
      ),
    },
    {
      value: "pmuy",
      label: tr(
        "Pradhan Mantri Ujjwala Yojana (PMUY)",
        "प्रधानमंत्री उज्ज्वला योजना (PMUY)"
      ),
    },
    { value: "other", label: tr("Other Scheme", "अन्य योजना") },
  ];

  const rationCardOptions = [
    { value: "apl", label: tr("APL", "APL") },
    { value: "bpl", label: tr("BPL", "BPL") },
    { value: "aay", label: tr("AAY", "AAY") },
    { value: "none", label: tr("None", "कोई नहीं") },
  ];

  const copy = {
    stepPill: tr("Step 03 of 05", "चरण 03 / 05"),
    mainTitle: tr("Background Information", "पृष्ठभूमि जानकारी"),
    subtitle: tr("Tell us about work, income and government support.", "हमें अपने काम, आय और सरकारी सहायता के बारे में बताएं।"),
    panelTitle: tr("Background Details", "पृष्ठभूमि विवरण"),
    panelSub: tr("Step 03 · Employment · Income · Benefits", "चरण 03 · रोजगार · आय · लाभ"),
    occupation: tr("Occupation", "रोजगार"),
    primaryOccupation: tr("Primary Occupation", "मुख्य व्यवसाय"),
    occupationPlaceholder: tr("Select occupation", "व्यवसाय चुनें"),
    seasonal: tr("Is your income seasonal?", "क्या आपकी आय मौसमी है?"),
    selectPlaceholder: tr("Select", "चुनें"),
    seasonalHint: tr(
      "Seasonal means your income is high in some months and low in others (e.g. agriculture, tourism).",
      "मौसमी आय का अर्थ है कुछ महीनों में आय अधिक और कुछ में कम होती है (जैसे कृषि, पर्यटन)।"
    ),
    incomeDetails: tr("Income Details (₹)", "आय विवरण (₹)"),
    peakIncome: tr("Peak month income (₹)", "सबसे अधिक मासिक आय (₹)"),
    peakPlaceholder: tr("e.g. 25000", "उदा. 25000"),
    peakHint: tr("Highest income earned in the best month of the year.", "साल के सबसे अच्छे महीने में मिलने वाली सबसे अधिक आय।"),
    lowIncome: tr("Lowest month income (₹)", "सबसे कम मासिक आय (₹)"),
    lowPlaceholder: tr("e.g. 5000", "उदा. 5000"),
    lowHint: tr("Lowest income earned in the weakest month.", "साल के सबसे कमजोर महीने में मिलने वाली सबसे कम आय।"),
    govBenefits: tr("Government Benefits", "सरकारी लाभ"),
    selectBenefits: tr("Select Government Benefits", "सरकारी योजनाएँ चुनें"),
    benefitsHint: tr("Select all schemes that any family member is currently receiving.", "वे सभी योजनाएँ चुनें जो परिवार के किसी सदस्य को मिल रही हैं।"),
    govDocs: tr("Govt Benefit Documents", "सरकारी लाभ दस्तावेज़"),
    govDocsHint: tr("Upload proof like Ayushman card, pension passbook, PM-Kisan letter, etc.", "आयुष्मान कार्ड, पेंशन पासबुक, पीएम-किसान पत्र जैसे प्रमाण अपलोड करें।"),
    govDocsLabel: tr("Upload Govt Benefit Documents", "सरकारी लाभ के दस्तावेज़ अपलोड करें"),
    rationCard: tr("Ration Card", "राशन कार्ड"),
    rationType: tr("Ration Card Type", "राशन कार्ड प्रकार"),
    selectOne: tr("Select one", "एक चुनें"),
    rationCopy: tr("Ration Card Copy", "राशन कार्ड की प्रति"),
    rationCopyHint: tr("Upload a clear front page of your ration card (PDF or image).", "राशन कार्ड का साफ़ पहला पृष्ठ (PDF या इमेज) अपलोड करें।"),
    rationUpload: tr("Upload Ration Card", "राशन कार्ड अपलोड करें"),
    tips: tr("Helpful Tips", "उपयोगी सुझाव"),
    tip1: tr("Attach income certificate, ration card, pension slip, etc.", "आय प्रमाणपत्र, राशन कार्ड, पेंशन स्लिप आदि संलग्न करें।"),
    tip2: tr("Make sure photos are bright and text is clearly readable.", "फोटो साफ़ हों और टेक्स्ट स्पष्ट दिखे।"),
    tip3: tr("If you have many photos, combine them into a single PDF for faster upload.", "यदि कई फ़ोटो हैं तो उन्हें एक PDF में जोड़कर तेज़ी से अपलोड करें।"),
    back: tr("← Back", "← वापस"),
    next: tr("Next →", "आगे →"),
  };

  const handleSeasonalChange = (val) => {
    update({ seasonal_income: val });

    if (val !== "yes") {
      update({
        peak_month_income: "",
        lowest_month_income: "",
      });
    }
  };

  return (
    <div className="page page--background">
      <h2 className="page-title">
        <span className="page-title-pill">{copy.stepPill}</span>
        <span className="page-title-main">
          <span className="page-title-emoji">📝</span>
          {copy.mainTitle}
        </span>
        <span className="page-title-sub">
          {copy.subtitle}
        </span>
      </h2>

      <div className="container">
        <div className="full-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="header-deco" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3"
                    fill="#eef6ff"
                  />
                  <path
                    d="M7 12h10M7 8h10"
                    stroke="#0b63ff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {copy.panelTitle}
            </div>
            <div className="panel-sub">
              {copy.panelSub}
            </div>
          </div>

          <div className="panel-grid">
            {/* Occupation */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">🧑‍💼</span>
                {copy.occupation}
              </div>

              <Select
                label={copy.primaryOccupation}
                value={state.primary_occupation}
                onChange={(val) => update({ primary_occupation: val })}
                options={occupationOptions}
                placeholder={copy.occupationPlaceholder}
                required
              />

              <Select
                label={copy.seasonal}
                value={state.seasonal_income}
                onChange={handleSeasonalChange}
                options={[
                  { value: "yes", label: tr("Yes", "हाँ") },
                  { value: "no", label: tr("No", "नहीं") },
                ]}
                placeholder={copy.selectPlaceholder}
              />
              <p className="muted small-note">
                {copy.seasonalHint}
              </p>
            </div>

            {/* Seasonal income fields (only if yes) */}
            {state.seasonal_income === "yes" && (
              <div className="panel-card panel-card--span4">
                <div className="card-heading">
                  <span className="heading-emoji">📈</span>
                  {copy.incomeDetails}
                </div>

                <Input
                  label={copy.peakIncome}
                  value={state.peak_month_income}
                  onChange={(val) => {
                    const digits = val.replace(/\D/g, "").slice(0, 12);
                    update({ peak_month_income: digits });
                  }}
                  placeholder={copy.peakPlaceholder}
                  inputMode="numeric"
                  maxLength={12}
                />
                <p className="muted small-note">
                  {copy.peakHint}
                </p>

                <Input
                  label={copy.lowIncome}
                  value={state.lowest_month_income}
                  onChange={(val) => {
                    const digits = val.replace(/\D/g, "").slice(0, 12);
                    update({ lowest_month_income: digits });
                  }}
                  placeholder={copy.lowPlaceholder}
                  inputMode="numeric"
                  maxLength={12}
                />
                <p className="muted small-note">
                  {copy.lowHint}
                </p>
              </div>
            )}

            {/* Government benefits */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">🎯</span>
                {copy.govBenefits}
              </div>

              <MultiSelect
                label={copy.selectBenefits}
                value={state.gov_benefits || []}
                onChange={(val) => update({ gov_benefits: val })}
                options={benefitOptions}
              />
              <p className="muted small-note">
                {copy.benefitsHint}
              </p>
            </div>

            {/* Govt benefit documents */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">📤</span>
                {copy.govDocs}
              </div>
              <p className="muted small-note">
                {copy.govDocsHint}
              </p>

              <FileUpload
                label={copy.govDocsLabel}
                onChange={(file) => update({ support_documents: file })}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>

            {/* Ration card type */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">📇</span>
                {copy.rationCard}
              </div>

              <Select
                label={copy.rationType}
                value={state.ration_card_type}
                onChange={(val) => update({ ration_card_type: val })}
                options={rationCardOptions}
                placeholder={copy.selectOne}
              />
            </div>

            {/* Ration card document */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">📤</span>
                {copy.rationCopy}
              </div>
              <p className="muted small-note">
                {copy.rationCopyHint}
              </p>

              <FileUpload
                label={copy.rationUpload}
                onChange={(file) => update({ ration_card_document: file })}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>

            {/* Notes */}
            <div className="panel-card panel-card--span4 panel-card--tall">
              <div className="card-heading">
                <span className="heading-emoji">💡</span>
                {copy.tips}
              </div>
              <div className="info-content">
                <ul className="tips-list">
                  <li>{copy.tip1}</li>
                  <li>{copy.tip2}</li>
                  <li>{copy.tip3}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel-actions">
            <button className="btn btn-secondary" onClick={goPrev}>
              {copy.back}
            </button>
            <button className="btn btn-primary" onClick={goNext}>
              {copy.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page3Background;
