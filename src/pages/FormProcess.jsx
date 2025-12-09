// src/pages/FormProcess.jsx
import React from 'react';
import { FormProvider } from '../context/FormContext';
import AppContent from './FormProcessContent';

const FormProcess = () => {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
};

export default FormProcess;