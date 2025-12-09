// src/pages/Page6UnderProgress.jsx
import React from 'react';
import './Page6UnderProgress.css';

function Page6UnderProgress() {
  return (
    <div className="page page--under-progress">
      <div className="progress-container">
        <div className="progress-card">
          <div className="progress-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" strokeDasharray="60" strokeDashoffset="30" className="progress-circle">
                <animate attributeName="stroke-dashoffset" values="60;0;60" dur="2s" repeatCount="indefinite" />
              </circle>
              <path d="M12 6V12L16 14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="progress-title">⏳ Your Form is Under Progress</h2>
          <p className="progress-message">
            Your form is under progress. Please check it after some time.
          </p>
          <div className="progress-actions">
            <button
              onClick={() => {
                // Send user to landing (home) instead of restarting at eligibility
                window.location.href = '/';
              }}
              className="btn btn-primary"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page6UnderProgress;

