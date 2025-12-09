// src/pages/Page1Eligibility.jsx
import React from 'react';
import { useForm } from '../context/FormContext';
import Select from '../components/form/Select';
import { isEligible } from '../utils/validators';
import { useDualLanguage } from '../hooks/useDualLanguage';
import './Page1Eligibility.css';

function Page1Eligibility() {
  const { state, update, goNext } = useForm();
  const { translate: tr } = useDualLanguage();

  const eligible = isEligible(state.obc_category, state.below_3_lakh);
  const showError =
    state.obc_category && state.below_3_lakh && !eligible;

  const handleNext = () => {
    if (eligible) goNext();
  };

  return (
    <div className="eligibility-overlay">
      <div className="eligibility-popup">
        <h2 className="popup-title">{tr('Eligibility Check', 'पात्रता जांच')}</h2>
        <p className="popup-subtitle">
          {tr('Please confirm the following details', 'कृपया निम्न विवरण की पुष्टि करें')}
        </p>

        <Select
          label={tr('Do you belong to OBC category?', 'क्या आप OBC वर्ग से हैं?')}
          value={state.obc_category}
          onChange={(val) => update({ obc_category: val })}
          options={[
            { value: 'yes', label: tr('Yes', 'हाँ') },
            { value: 'no', label: tr('No', 'नहीं') },
          ]}
          placeholder={tr('Select', 'चुनें')}
          required
        />

        <Select
          label={tr('Is your annual income below 3 Lakh?', 'क्या आपकी वार्षिक आय 3 लाख से कम है?')}
          value={state.below_3_lakh}
          onChange={(val) => update({ below_3_lakh: val })}
          options={[
            { value: 'yes', label: tr('Yes', 'हाँ') },
            { value: 'no', label: tr('No', 'नहीं') },
          ]}
          placeholder={tr('Select', 'चुनें')}
          required
        />

        {showError && (
          <div className="popup-error">
            {tr(
              'You are not eligible. Both answers must be Yes.',
              'आप पात्र नहीं हैं। दोनों उत्तर "हाँ" होने चाहिए।'
            )}
          </div>
        )}

        <div className="popup-actions">
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!eligible}
          >
            {tr('Next', 'आगे')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page1Eligibility;
