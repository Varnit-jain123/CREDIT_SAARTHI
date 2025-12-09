
import React, { createContext, useContext, useState, useMemo } from 'react';
import { isValidAadhaar, isValidMobile, isValidPin, isValidPAN } from "../utils/validators";

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }
  return context;
};

const getInitialState = () => ({
  currentStep: 0,

  // Page 0
  loan_type: '', // 'student' | 'business'

  // Page 1 + 2 base fields
  obc_category: '',
  below_3_lakh: '',
  full_name: '',
  mobile_number: '',
  address: '',
  pin: '',
  aadhaar_number: '',
  pan_card_number: '',   // ✅ use this consistently

  primary_occupation: '',
  seasonal_income: '',
  peak_months: [],
  reason_for_applying: '',
  gov_benefits: [],

  // household
  household_size: '',
  num_earners: '',
  children_school_type: '',
  cooking_fuel: '',
  certificate_income_type: '',

  // assets
  ac: false,
  fridge: false,
  car: false,
  two_wheeler: false,
  tv: false,
  smartphone: false,

  // electricity & meter
  meter_number: '',
  electricity_input_method: '',
  electricity_bill_upload_last_month: null,
  electricity_bill_upload_last_month_url: null,

  electricity_month1_amount: '',
  electricity_month1_units: '',
  electricity_month2_amount: '',
  electricity_month2_units: '',
  electricity_month3_amount: '',
  electricity_month3_units: '',

  // phones & recharge
  num_phones: '',
  phone_recharges: [],

  // LPG
  lpg_refills_per_year: '',

  // land / documents
  total_land_holding: '',
  has_other_land: '',
  other_land_size_hectare: '',
  other_land_document: null,

  // uploads
  bank_statement: null,
  obc_certificate: null,
  selfie: null,
  support_documents: null,
  additional_household_files: null,
  status_otp: '',

  // Business loan fields (used on Business page)
  loan_purposes: [],          // checkboxes
  loan_purpose_detail: "",
  loan_amount_required: "",

  // Status page
  status_mobile: '',
  application_id: ''
});

export const FormProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState());
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const update = (patch) => {
    setState((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => {
        if (next[k]) delete next[k];
      });
      return next;
    });
  };

  const goToStep = (stepIndex) => {
    setState((prev) => ({ ...prev, currentStep: Number(stepIndex) }));
  };

  const goNext = (validateFn) => {
    if (typeof validateFn === 'function') {
      const res = validateFn(state);
      if (!res.ok) {
        setErrors(res.errors || {});
        return false;
      }
    }
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    return true;
  };

  const goPrev = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  };

  const reset = () => {
    setState(getInitialState());
    setErrors({});
  };

  const layoutConfig = useMemo(
    () => ({
      containerClass: 'panel panel--rounded',
      columns: 3,
      cardClass: 'panel-card'
    }),
    []
  );

  // ---------- PERSONAL PAGE GATING ----------
  const canProceedPersonal = useMemo(() => {
    return (
      !!state.full_name &&
      !!state.mobile_number &&
      !!state.address &&
      isValidPin(state.pin) &&
      isValidAadhaar(state.aadhaar_number) &&
      !!state.pan_card_number &&
      isValidPAN(state.pan_card_number) &&
      !!state.selfie
    );
  }, [
    state.full_name,
    state.mobile_number,
    state.address,
    state.pin,
    state.aadhaar_number,
    state.pan_card_number,
    state.selfie
  ]);

  const validatePersonal = (s = state) => {
    const e = {};
    if (!s.full_name) e.full_name = 'Full name is required';
    if (!s.mobile_number) e.mobile_number = 'Mobile number is required';
    if (!s.address) e.address = 'Address is required';
    if (!isValidPin(s.pin)) e.pin = 'PIN must be 6 digits';
    if (!isValidAadhaar(s.aadhaar_number)) e.aadhaar_number = 'Aadhaar must be 12 digits';

    if (!s.pan_card_number || !isValidPAN(s.pan_card_number)) {
      e.pan_card_number = 'Valid PAN number is required';
    }

    if (!s.selfie) e.selfie = 'Selfie is required';

    // ❌ DO NOT validate business-loan fields here
    return { ok: Object.keys(e).length === 0, errors: e };
  };

  // ---------- BUSINESS LOAN PAGE VALIDATION ----------
  const canProceedBusinessLoan = useMemo(() => {
    if (state.loan_type !== "business") return true; // gate only when business
    if (!state.loan_purposes || state.loan_purposes.length === 0) return false;
    if (!state.loan_purpose_detail?.trim()) return false;
    if (!state.loan_amount_required) return false;
    if (Number.isNaN(Number(state.loan_amount_required))) return false;
    return true;
  }, [
    state.loan_type,
    state.loan_purposes,
    state.loan_purpose_detail,
    state.loan_amount_required
  ]);

  const validateBusinessLoan = (s = state) => {
    const e = {};
    if (s.loan_type === "business") {
      if (!s.loan_purposes || s.loan_purposes.length === 0) {
        e.loan_purposes = "Select at least one purpose for the loan.";
      }
      if (!s.loan_purpose_detail?.trim()) {
        e.loan_purpose_detail = "Please describe how you will use the loan.";
      }
      if (!s.loan_amount_required) {
        e.loan_amount_required = "Enter the loan amount required.";
      } else if (Number.isNaN(Number(s.loan_amount_required))) {
        e.loan_amount_required = "Loan amount must be a number.";
      }
    }
    return { ok: Object.keys(e).length === 0, errors: e };
  };

  return (
    <FormContext.Provider
      value={{
        state,
        setField,
        update,
        goNext,
        goPrev,
        goToStep,
        reset,
        errors,
        setErrors,
        layoutConfig,
        canProceedPersonal,
        validatePersonal,
        // ✅ now actually defined:
        validateBusinessLoan,
        canProceedBusinessLoan
      }}
    >
      {children}
    </FormContext.Provider>
  );
};



