// src/pages/Page2Personal.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "../context/FormContext";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import FileUpload from "../components/form/FileUpload";
import OTPInput from "../components/form/OTPInput";
import { useDualLanguage } from "../hooks/useDualLanguage";
import "./Page2Personal.css";
import {
  isValidAadhaar,
  isValidMobile,
  isValidPin,
  isValidPAN,
} from "../utils/validators";

function Page2Personal() {
  const {
    state,
    setField,
    goNext,
    goPrev,
    canProceedPersonal,
    layoutConfig,
    errors,
    validatePersonal,
  } = useForm();
  const { translate: tr } = useDualLanguage();

  const voiceCopy = {
    notSupported: tr("Voice input not supported. Please use Google Chrome.", "वॉयस इनपुट समर्थित नहीं है। कृपया Google Chrome का उपयोग करें।"),
    listening: tr("Listening...", "सुन रहा है..."),
    processing: tr("Processing...", "प्रसंस्करण..."),
    done: tr("Done!", "पूरा!"),
    noSpeech: tr("No speech detected.", "कोई आवाज़ नहीं मिली।"),
    network: tr("Network Error (Check HTTPS).", "नेटवर्क त्रुटि (HTTPS जांचें)।"),
    blocked: tr("Mic Blocked.", "माइक्रोफ़ोन अवरुद्ध है।"),
    genericError: tr("Error:", "त्रुटि:"),
    couldNotStart: tr("Could not start microphone.", "माइक्रोफ़ोन शुरू नहीं किया जा सका।"),
    tapToSpeak: tr("Tap to Speak", "टैप करके बोलें"),
    stopVoice: tr("Stop voice input for", "के लिए वॉइस इनपुट रोकें"),
    startVoice: tr("Start voice input for", "के लिए वॉइस इनपुट शुरू करें"),
  };

  const pageCopy = {
    stepPill: tr("Step 02 of 05", "चरण 02 / 05"),
    title: tr("Personal Information", "व्यक्तिगत जानकारी"),
    subtitle: tr("Fill in your identity, contact details and upload documents.", "अपनी पहचान, संपर्क विवरण भरें और दस्तावेज़ अपलोड करें।"),
    fillDetails: tr("Fill your Details", "अपनी जानकारी भरें"),
    stepLabel: tr("Step 02 · Personal Information & Documents", "चरण 02 · व्यक्तिगत जानकारी और दस्तावेज़"),
    identity: tr("Identity", "पहचान"),
    fullName: tr("Full Name", "पूरा नाम"),
    fullNamePlaceholder: tr("Enter your full name", "अपना पूरा नाम दर्ज करें"),
    mobileNumber: tr("Mobile Number", "मोबाइल नंबर"),
    mobilePlaceholder: tr("Enter mobile number", "मोबाइल नंबर दर्ज करें"),
    invalidMobile: tr("Enter a valid 10-digit mobile number.", "कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।"),
    addressHeading: tr("Address", "पता"),
    address: tr("Address", "पता"),
    addressPlaceholder: tr("House no, street, locality", "मकान संख्या, गली, क्षेत्र"),
    pinCode: tr("PIN Code", "पिन कोड"),
    pinPlaceholder: tr("6-digit PIN", "6 अंकों का पिन"),
    pinError: tr("PIN must be 6 digits.", "पिन 6 अंकों का होना चाहिए।"),
    aadhaar: tr("Aadhaar Number", "आधार नंबर"),
    aadhaarPlaceholder: tr("12-digit Aadhaar", "12 अंकों का आधार"),
    aadhaarError: tr("Aadhaar must be 12 digits.", "आधार 12 अंकों का होना चाहिए।"),
    pan: tr("PAN Card Number", "PAN कार्ड नंबर"),
    panPlaceholder: tr("ABCDE1234F", "ABCDE1234F"),
    panError: tr("Enter a valid PAN (ABCDE1234F).", "मान्य PAN दर्ज करें (ABCDE1234F)।"),
    documentsHeading: tr("Upload Documents", "दस्तावेज़ अपलोड करें"),
    uploadSelfie: tr("Upload Selfie", "सेल्फ़ी अपलोड करें"),
    selfiePreview: tr("Selfie Preview", "सेल्फ़ी पूर्वावलोकन"),
    casteUploadLabel: tr("Upload OBC, SC or ST Caste Certificate", "OBC, SC या ST जाति प्रमाणपत्र अपलोड करें"),
    casteUploadTitle: tr("OBC, SC or ST Caste Certificate", "OBC, SC या ST जाति प्रमाणपत्र"),
    casteNote: tr("If you belong to OBC, SC or ST, please upload the caste certificate to avail this scheme.", "यदि आप OBC, SC या ST से हैं तो योजना का लाभ लेने के लिए जाति प्रमाणपत्र अपलोड करें।"),
    important: tr("Important", "महत्वपूर्ण"),
    voiceTipTitle: tr("Voice Input:", "वॉयस इनपुट:"),
    voiceTip: tr('Tap the mic icon. If it says "Listening...", speak clearly.', 'माइक आइकन दबाएँ। "सुन रहा है..." दिखे तो साफ़ बोलें।'),
    docMatch: tr("Ensure your Aadhaar, PAN and mobile number match your official documents.", "सुनिश्चित करें कि आपका आधार, PAN और मोबाइल नंबर आधिकारिक दस्तावेज़ों से मेल खाएँ।"),
    back: tr("← Back", "← वापस"),
    next: tr("Next →", "आगे →"),
  };

  const [selfiePreview, setSelfiePreview] = useState(null);

  // Voice state
  const [activeField, setActiveField] = useState(null);
  const [statusText, _setStatusText] = useState(""); // visible status text
  const [isError, setIsError] = useState(false);

  // refs to avoid stale closures inside recognition handlers
  const recognitionRef = useRef(null);
  const statusRef = useRef("");
  const activeFieldRef = useRef(null);

  // wrapper to keep state + ref in sync for status
  const setStatus = useCallback((text) => {
    statusRef.current = text;
    _setStatusText(text);
  }, []);

  // keep activeField ref in sync
  useEffect(() => {
    activeFieldRef.current = activeField;
  }, [activeField]);

  /* ------------------ Selfie Preview ------------------ */
  useEffect(() => {
    if (state.selfie && typeof state.selfie !== "string") {
      const url = URL.createObjectURL(state.selfie);
      setSelfiePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (state.selfie && typeof state.selfie === "string") {
      setSelfiePreview(state.selfie);
      return;
    }
    setSelfiePreview(null);
  }, [state.selfie]);

  const handleSelfieChange = (file) => {
    setField("selfie", file);
  };

  const handleObcCertChange = (file) => {
    setField("obc_certificate", file);
  };

  /* ------------------ Robust voice logic ------------------ */
  const startListening = useCallback(
    (fieldName) => {
      // Browser check
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert(voiceCopy.notSupported);
        return;
      }

      // Abort any previous instance
      try {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
          recognitionRef.current = null;
        }
        if (window.recognitionInstance) {
          window.recognitionInstance.abort();
          window.recognitionInstance = null;
        }
      } catch (err) {
        // ignore abort errors
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      window.recognitionInstance = recognition; // keep alive

      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setActiveField(fieldName);
        setIsError(false);
        setStatus(voiceCopy.listening);
      };

      recognition.onresult = (event) => {
        setStatus(voiceCopy.processing);
        const transcript = event.results?.[0]?.[0]?.transcript ?? "";
        const cleanText = transcript.replace(/\.$/, "");

        // Format numbers for specific fields
        if (["mobile_number", "pin", "aadhaar_number", "pan_card_number"].includes(fieldName)) {
          setField(fieldName, cleanText.replace(/[\s-]/g, ""));
        } else {
          setField(fieldName, cleanText);
        }

        setStatus(voiceCopy.done);
        // small delay to show Done then clear
        setTimeout(() => {
          if (activeFieldRef.current === fieldName) {
            setActiveField(null);
            setStatus("");
          }
        }, 1500);
      };

      recognition.onerror = (event) => {
        console.error("Mic Error:", event.error);
        setIsError(true);

        if (event.error === "no-speech") {
          setStatus(voiceCopy.noSpeech);
        } else if (event.error === "network") {
          setStatus(voiceCopy.network);
        } else if (event.error === "not-allowed") {
          setStatus(voiceCopy.blocked);
        } else {
          setStatus(`${voiceCopy.genericError} ${event.error}`);
        }

        // Clear after a short while
        setTimeout(() => {
          setActiveField(null);
          setStatus("");
        }, 3000);
      };

      recognition.onend = () => {
        // If it ended while we expected listening, clear indicator
        if (statusRef.current === voiceCopy.listening) {
          setActiveField(null);
          setStatus("");
        }
      };

      try {
        recognition.start();
      } catch (e) {
        console.error("Could not start recognition:", e);
        alert(voiceCopy.couldNotStart);
      }
    },
    [setField, setStatus, voiceCopy]
  );

  // Clean up recognition on unmount
  useEffect(() => {
    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
          recognitionRef.current = null;
        }
        if (window.recognitionInstance) {
          window.recognitionInstance.abort();
          window.recognitionInstance = null;
        }
      } catch (err) {
        // ignore
      }
    };
  }, []);

  // Helper to render Mic + Status
  const renderMic = (fieldName) => {
    const isActive = activeField === fieldName;

    return (
      <>
        {isActive && (
          <span
            className="mic-status"
            style={{
              color: isError ? "red" : statusText === voiceCopy.done ? "green" : "#2563eb",
            }}
            aria-live="polite"
          >
            {statusText}
          </span>
        )}

        <button
          type="button"
          className={`mic-btn ${isActive && !isError && statusText !== voiceCopy.done ? "listening" : ""}`}
          onClick={() => startListening(fieldName)}
          title={voiceCopy.tapToSpeak}
          aria-pressed={isActive}
          aria-label={
            isActive ? `${voiceCopy.stopVoice} ${fieldName}` : `${voiceCopy.startVoice} ${fieldName}`
          }
        >
          {isActive ? "🛑" : "🎙️"}
        </button>
      </>
    );
  };

  return (
    <div className="page page--personal">
      <div className="page2-title">
        <span className="page2-title-pill">{pageCopy.stepPill}</span>
        <div className="page2-title-main">
          <span className="page2-title-emoji">👤</span>
          <div>
            <div className="page2-title-text">{pageCopy.title}</div>
            <div className="page2-title-sub">
              {pageCopy.subtitle}
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
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="#eef4ff" />
                  <path d="M8 12h8M8 9h8" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {pageCopy.fillDetails}
            </div>
            <div className="panel-sub">{pageCopy.stepLabel}</div>
          </div>

          <div className="panel-grid">
            {/* Identity */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">🪪</span> {pageCopy.identity}
              </div>

              <div className="input-with-mic">
                <Input
                  label={pageCopy.fullName}
                  value={state.full_name}
                  onChange={(val) => setField("full_name", val)}
                  placeholder={pageCopy.fullNamePlaceholder}
                  required
                />
                {renderMic("full_name")}
              </div>
              {errors.full_name && <p className="field-error">{errors.full_name}</p>}

              <div className="input-with-mic">
                <Input
                  label={pageCopy.mobileNumber}
                  type="tel"
                  value={state.mobile_number}
                  onChange={(val) => {
                    const digits = val.replace(/\D/g, "").slice(0, 10);
                    setField("mobile_number", digits);
                  }}
                  placeholder={pageCopy.mobilePlaceholder}
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
                {renderMic("mobile_number")}
              </div>
              {state.mobile_number && !isValidMobile(state.mobile_number) && (
                <p className="field-error">{pageCopy.invalidMobile}</p>
              )}

              <div className="otp-wrapper">
                <OTPInput mobile={state.mobile_number} onVerified={() => setField("status_otp", "verified")} />
              </div>
            </div>

            {/* Address */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">🏠</span> {pageCopy.addressHeading}
              </div>

              <div className="input-with-mic">
                <Textarea
                  label={pageCopy.address}
                  value={state.address}
                  onChange={(val) => setField("address", val)}
                  placeholder={pageCopy.addressPlaceholder}
                  required
                />
                {renderMic("address")}
              </div>
              {errors.address && <p className="field-error">{errors.address}</p>}

              <div className="two-cols">
                <div className="input-with-mic">
                  <Input
                    label={pageCopy.pinCode}
                    value={state.pin}
                    onChange={(val) => {
                      const digits = val.replace(/\D/g, "").slice(0, 6);
                      setField("pin", digits);
                    }}
                    placeholder={pageCopy.pinPlaceholder}
                    inputMode="numeric"
                    maxLength={6}
                    required
                  />
                  {renderMic("pin")}
                </div>

                <div className="input-with-mic">
                  <Input
                    label={pageCopy.aadhaar}
                    value={state.aadhaar_number}
                    onChange={(val) => {
                      const digits = val.replace(/\D/g, "").slice(0, 12);
                      setField("aadhaar_number", digits);
                    }}
                    placeholder={pageCopy.aadhaarPlaceholder}
                    inputMode="numeric"
                    maxLength={12}
                    required
                  />
                  {renderMic("aadhaar_number")}
                </div>
              </div>

              {state.pin && !isValidPin(state.pin) && <p className="field-error">{pageCopy.pinError}</p>}
              {state.aadhaar_number && !isValidAadhaar(state.aadhaar_number) && (
                <p className="field-error">{pageCopy.aadhaarError}</p>
              )}

              <div className="two-cols--full input-with-mic">
                <Input
                  label={pageCopy.pan}
                  value={state.pan_card_number}
                  onChange={(val) => setField("pan_card_number", val.toUpperCase().slice(0, 10))}
                  placeholder={pageCopy.panPlaceholder}
                  maxLength={10}
                  required
                />
                {renderMic("pan_card_number")}
              </div>
              {state.pan_card_number && !isValidPAN(state.pan_card_number) && (
                <p className="field-error">{pageCopy.panError}</p>
              )}
              {errors.pan_card_number && <p className="field-error">{errors.pan_card_number}</p>}
            </div>

            {/* Documents */}
            <div className="panel-card panel-card--span4">
              <div className="card-heading">
                <span className="heading-emoji">📸</span> {pageCopy.documentsHeading}
              </div>

              <FileUpload label={pageCopy.uploadSelfie} onChange={handleSelfieChange} accept="image/*" required />
              {errors.selfie && <p className="field-error">{errors.selfie}</p>}

              {selfiePreview && (
                <div className="selfie-preview">
                  <p className="muted">{pageCopy.selfiePreview}</p>
                  <img src={selfiePreview} alt="Selfie preview" className="selfie-img" />
                </div>
              )}

              <div className="divider" />

              <div className="caste-upload-block">
                <label className="input-label upload-label">{pageCopy.casteUploadLabel}</label>
                <FileUpload
                  label={pageCopy.casteUploadTitle}
                  onChange={handleObcCertChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {errors.obc_certificate && <p className="field-error">{errors.obc_certificate}</p>}
                <p className="muted caste-note">
                  {pageCopy.casteNote}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="panel-card panel-card--span4 panel-card--tall panel-card--info">
              <div className="card-heading">
                <span className="heading-emoji">💡</span> {pageCopy.important}
              </div>
              <div className="info-content">
                <ul className="tips-list">
                  <li>
                    <strong>{pageCopy.voiceTipTitle}</strong> {pageCopy.voiceTip}
                  </li>
                  <li>{pageCopy.docMatch}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel-actions">
            <button type="button" className="btn btn-secondary" onClick={goPrev}>
            {pageCopy.back}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => goNext(validatePersonal)}
              disabled={!canProceedPersonal}
            >
            {pageCopy.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2Personal;
