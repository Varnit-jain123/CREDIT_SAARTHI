// src/pages/Page5Submission.jsx
import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { supabase } from '../supabaseClient';
import { uploadAllApplicationFiles } from '../utils/storageUploader';
import './Page5Submission.css';

function Page5Submission() {
  const { state, reset, goPrev, goToStep } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState('pending');
  const [errorMsg, setErrorMsg] = useState(null);

  const getCleanData = (formData) => {
    const excludeKeys = new Set([
      'selfie',
      'obc_certificate',
      'bank_statement',
      'electricity_bill_upload_last_month',
      'support_documents',
      'additional_files',
      'additional_household_files',
      'other_land_document',

      'electricity_bill_upload_last_month_url',
      'selfie_url',
      'obc_certificate_url',
      'bank_statement_url',
      'support_documents_url',
      'additional_files_url',

      'peak_months',
      'total_land_holding',
      'certificate_income_type',
      'reason_for_applying',
      'status_mobile',
      'application_id',
      'currentStep',
      'layoutConfig',
      'errors',
      'canProceedPersonal',
      'status_otp',
      
      // 🚫 DO NOT STORE BUSINESS-LOAN PAGE FIELDS IN DB
    'loan_purposes',
    'loan_purpose_detail',
    'loan_amount_required',

    // 🚫 DO NOT STORE PAN IN DB (since you said "i ignore this in db")
    'pan_card_number',
    ]);

    const numericFields = new Set([
      'peak_month_income',
      'lowest_month_income',
      'avg_monthly_family_income',
      'other_land_size_hectare',
      'electricity_month1_amount',
      'electricity_month1_units',
      'electricity_month2_amount',
      'electricity_month2_units',
      'electricity_month3_amount',
      'electricity_month3_units',
    ]);

    const integerFields = new Set([
      'household_size',
      'num_earners',
      'lpg_refills_per_year',
      'num_phones',
    ]);

    const filteredEntries = Object.entries(formData).filter(
      ([key]) => !excludeKeys.has(key)
    );

    let data = Object.fromEntries(filteredEntries);

    for (const key of numericFields) {
      if (data[key] === '' || data[key] === undefined) {
        data[key] = null;
      }
    }

    for (const key of integerFields) {
      if (data[key] === '' || data[key] === undefined) {
        data[key] = null;
      }
    }

    data.submission_status = 'processing_pending';

    if (Array.isArray(data.phone_recharges)) {
      data.phone_recharges = data.phone_recharges.map((p) => ({
        avg: p.avg && p.avg !== '' ? p.avg : null,
      }));
    }

    return data;
  };

  const handleSubmit = async () => {
    if (submissionStatus !== 'pending') return;

    setSubmissionStatus('submitting');
    const applicationData = getCleanData(state);

    let newId = null;
    try {
      const { data: insertedData, error: dbError } = await supabase
        .from('loan_applications')
        .insert([applicationData])
        .select('id')
        .single();

      if (dbError) throw dbError;

      newId = insertedData.id;

      await uploadAllApplicationFiles(newId, state);

      setSubmissionStatus('success');
      // Navigate to the under progress page instead of resetting
      goToStep(6);
    } catch (error) {
      console.error('Submission failed:', error.message);
      let message = error.message;

      if (message && message.includes('Storage Upload Failed')) {
        message = `File upload failed after saving application data. You must configure RLS policies for the loan-documents bucket. Error: ${error.message}`;
      } else if (error.code === '42703') {
        message = `A schema mismatch occurred. The problematic key was likely sent to the database. Console shows the full error.`;
      }

      if (newId) {
        message = `Data saved (ID: ${newId}), but file upload failed. Error: ${message}`;
      }

      setErrorMsg(`Submission failed: ${message}`);
      setSubmissionStatus('error');
    }
  };

  const s = state;

  const formatArray = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr.join(', ') : '-';

  // Success state is now handled by navigating to Page6UnderProgress
  // This check is kept for safety but should not be reached
  if (submissionStatus === 'success') {
    return null;
  }

  if (submissionStatus === 'error') {
    return (
      <div className="page page--error">
        <h2 className="page-title">❌ Submission Error</h2>
        <p className="alert alert-error">{errorMsg}</p>
        <button
          onClick={() => setSubmissionStatus('pending')}
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="page page--final-review">
      <div className="review-title">
        <span className="review-title-pill">Step 06 of 06</span>
        <div className="review-title-main">
          <span className="review-title-emoji">✅</span>
          <div>
            <div className="review-title-text">Review &amp; Submit</div>
            <div className="review-title-sub">
              Please check all details below before submitting your application.
            </div>
          </div>
        </div>
      </div>

      <div className="review-container">
        <div className="review-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="header-deco" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="#eef6ff" />
                  <path
                    d="M8 12h8M8 9h6"
                    stroke="#2563eb"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Final Review
            </div>
            <div className="panel-sub">Confirm all sections before submit</div>
          </div>

          <div className="alert alert-info">
            <span className="alert-icon">ℹ️</span>
            <div>
              Please review your details below carefully. Clicking{" "}
              <b>"Confirm and Submit Application"</b> will save your data and upload
              all documents for processing.
            </div>
          </div>

          <div className="review-grid">
            {/* Loan Details */}
            <section className="review-card">
              <h3>Loan Details</h3>
              <p><strong>Loan Type:</strong> {s.loan_type || '-'}</p>
              <p>
                <strong>Loan Purposes:</strong> {formatArray(s.loan_purposes)}
              </p>
              <p>
                <strong>Detailed Purpose of Loan:</strong>{" "}
                {s.loan_purpose_detail || '-'}
              </p>
              <p>
                <strong>Loan Amount Required (₹):</strong>{" "}
                {s.loan_amount_required || '-'}
              </p>
            </section>

            {/* Personal */}
            <section className="review-card">
              <h3>Personal Information</h3>
              <p><strong>Full Name:</strong> {s.full_name || '-'}</p>
              <p><strong>Mobile Number:</strong> {s.mobile_number || '-'}</p>
              <p><strong>Address:</strong> {s.address || '-'}</p>
              <p><strong>PIN Code:</strong> {s.pin || '-'}</p>
              <p><strong>Aadhaar Number:</strong> {s.aadhaar_number || '-'}</p>
              <p>
                <strong>PAN Card Number:</strong>{" "}
                {s.pan_card_number || s.pan_number || '-'}
              </p>
              <p><strong>OBC Category:</strong> {s.obc_category || '-'}</p>
              <p><strong>Below 3 Lakh Income:</strong> {s.below_3_lakh || '-'}</p>
            </section>

            {/* Background */}
            <section className="review-card">
              <h3>Background Information</h3>
              <p>
                <strong>Primary Occupation:</strong>{" "}
                {s.primary_occupation || '-'}
              </p>
              <p>
                <strong>Seasonal Income:</strong>{" "}
                {s.seasonal_income || '-'}
              </p>
              <p>
                <strong>Peak Month Income (₹):</strong>{" "}
                {s.peak_month_income || '-'}
              </p>
              <p>
                <strong>Lowest Month Income (₹):</strong>{" "}
                {s.lowest_month_income || '-'}
              </p>
              <p>
                <strong>Government Benefits:</strong>{" "}
                {Array.isArray(s.gov_benefits) && s.gov_benefits.length
                  ? s.gov_benefits.join(', ')
                  : '-'}
              </p>
              <p>
                <strong>Ration Card Type:</strong>{" "}
                {s.ration_card_type || '-'}
              </p>
            </section>

            {/* Household */}
            <section className="review-card">
              <h3>Household &amp; Income</h3>
              <p>
                <strong>Household Size:</strong>{" "}
                {s.household_size || '-'}
              </p>
              <p>
                <strong>Number of Earners:</strong>{" "}
                {s.num_earners || '-'}
              </p>
              <p>
                <strong>Average Monthly Family Income (₹):</strong>{" "}
                {s.avg_monthly_family_income || '-'}
              </p>
              <p>
                <strong>Has Children:</strong>{" "}
                {s.has_children || '-'}
              </p>
              <p>
                <strong>Children School Type:</strong>{" "}
                {s.children_school_type || '-'}
              </p>
            </section>

            {/* Assets */}
            <section className="review-card">
              <h3>Assets &amp; Utilities</h3>
              <p><strong>AC:</strong> {s.ac ? 'Yes' : 'No'}</p>
              <p><strong>Fridge:</strong> {s.fridge ? 'Yes' : 'No'}</p>
              <p><strong>Car:</strong> {s.car ? 'Yes' : 'No'}</p>
              <p><strong>Two Wheeler:</strong> {s.two_wheeler ? 'Yes' : 'No'}</p>
              <p><strong>TV:</strong> {s.tv ? 'Yes' : 'No'}</p>
              <p><strong>Smartphone:</strong> {s.smartphone ? 'Yes' : 'No'}</p>
              <p><strong>Cooking Fuel:</strong> {s.cooking_fuel || '-'}</p>
              <p>
                <strong>LPG Refills Per Year:</strong>{" "}
                {s.lpg_refills_per_year || '-'}
              </p>
            </section>

            {/* House & Land */}
            <section className="review-card">
              <h3>House &amp; Land</h3>
              <p><strong>House Type:</strong> {s.house_type || '-'}</p>
              <p><strong>Has Other Land:</strong> {s.has_other_land || '-'}</p>
              <p>
                <strong>Other Land Size (Hectare):</strong>{" "}
                {s.other_land_size_hectare || '-'}
              </p>
            </section>

            {/* Electricity */}
            <section className="review-card">
              <h3>Electricity Details</h3>
              <p><strong>Meter Number:</strong> {s.meter_number || '-'}</p>
              <p>
                <strong>Input Method:</strong>{" "}
                {s.electricity_input_method || '-'}
              </p>
              <p>
                <strong>Month 1 Amount / Units:</strong>{" "}
                {s.electricity_month1_amount || '-'} /{" "}
                {s.electricity_month1_units || '-'}
              </p>
              <p>
                <strong>Month 2 Amount / Units:</strong>{" "}
                {s.electricity_month2_amount || '-'} /{" "}
                {s.electricity_month2_units || '-'}
              </p>
              <p>
                <strong>Month 3 Amount / Units:</strong>{" "}
                {s.electricity_month3_amount || '-'} /{" "}
                {s.electricity_month3_units || '-'}
              </p>
            </section>

            {/* Phones */}
            <section className="review-card">
              <h3>Phones &amp; Recharge</h3>
              <p><strong>Number of Phones:</strong> {s.num_phones || '-'}</p>
              {Array.isArray(s.phone_recharges) && s.phone_recharges.length > 0 ? (
                <ul className="review-list">
                  {s.phone_recharges.map((p, idx) => (
                    <li key={idx}>
                      Phone {idx + 1}: ₹{p.avg || '-'} (average 6-month recharge)
                    </li>
                  ))}
                </ul>
              ) : (
                <p><strong>Recharges:</strong> -</p>
              )}
            </section>
          </div>

          <div className="panel-actions review-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goPrev}
            >
              ← Back 
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting'
                ? 'Submitting Data & Files...'
                : 'Confirm and Submit Application'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page5Submission;
