// src/pages/FormProcessContent.jsx
import React from 'react';
import { useForm } from '../context/FormContext';
import Stepper from '../components/Stepper/Stepper';
import FormCard from '../components/FormCard';

import Page1Eligibility from '../pages/Page1Eligibility';
import Page2Personal from '../pages/Page2Personal';
import Page3Background from '../pages/Page3Background';
import Page4Household from '../pages/Page4Household';
import Page5Submission from '../pages/page5Submission';
import Page5BusinessLoan from '../pages/Page5BusinessLoan';
import Page6UnderProgress from '../pages/Page6UnderProgress';

const AppContent = () => {
  const { state, goNext, goPrev, goToStep } = useForm();

  const renderPage = () => {
    switch (Number(state.currentStep)) {
      
      case 0:
        return <Page1Eligibility goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      case 1:
        return <Page2Personal goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      case 2:
        return <Page3Background goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      case 3:
        return <Page4Household goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      case 4:
        return <Page5BusinessLoan goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      case 5:
        return <Page5Submission goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      case 6:
        return <Page6UnderProgress goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
      default:
        return <Page1Eligibility goNext={goNext} goPrev={goPrev} goToStep={goToStep} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon"></span>
          <span className="logo-text">NBCFDC Loan Detail</span>
        </div>
      </header>

      <div className="stepper-container">
        <Stepper />
      </div>

      <div className="content-container">
        <FormCard>{renderPage()}</FormCard>
      </div>
    </div>
  );
};

export default AppContent;