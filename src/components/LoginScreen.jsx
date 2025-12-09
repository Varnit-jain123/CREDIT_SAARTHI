import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, Building, Shield, BarChart3, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const getRoleConfig = (t) => ({
  beneficiary: {
    title: t.loginScreen.welcomeBack,
    badge: t.loginScreen.roles.beneficiary,
    accent: 'from-sky-500 to-blue-600',
    icon: Lock,
  },
  channelPartner: {
    title: t.loginScreen.welcomeBack,
    badge: t.loginScreen.roles.channelPartner,
    accent: 'from-indigo-500 to-blue-700',
    icon: Building,
  },
  nbcfdcAdmin: {
    title: t.loginScreen.welcomeBack,
    badge: t.loginScreen.roles.nbcfdcAdmin,
    accent: 'from-blue-700 to-sky-600',
    icon: Shield,
  },
  riskAnalytics: {
    title: t.loginScreen.welcomeBack,
    badge: t.loginScreen.roles.riskAnalytics,
    accent: 'from-sky-700 to-indigo-700',
    icon: BarChart3,
  },
});

// Validation functions
const isValidBankAccount = (account) => {
  if (!account) return false;
  const cleaned = account.replace(/\s/g, '');
  return /^\d{9,18}$/.test(cleaned);
};

const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= 4;
};

const isValid2FA = (code) => {
  if (!code) return true; // Optional field
  return /^\d{6}$/.test(code);
};

const LoginScreen = ({ selectedRole, onBack, onLogin }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const roleConfig = getRoleConfig(t);
  const currentRole = roleConfig[selectedRole] || roleConfig.beneficiary;
  const navigate = useNavigate();
  const Icon = currentRole.icon;

  // Form state
  const [formData, setFormData] = useState({
    bankAccount: '',
    password: '',
    email: '',
    channelPartner: '',
    role: '',
    twoFA: '',
  });

  // Error state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when role changes
  useEffect(() => {
    setFormData({
      bankAccount: '',
      password: '',
      email: '',
      channelPartner: '',
      role: '',
      twoFA: '',
    });
    setErrors({});
    setTouched({});
  }, [selectedRole]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (selectedRole === 'beneficiary') {
      if (!formData.bankAccount) {
        newErrors.bankAccount = t.loginScreen.errors.bankAccountRequired;
      } else if (!isValidBankAccount(formData.bankAccount)) {
        newErrors.bankAccount = t.loginScreen.errors.bankAccountInvalid;
      }

      if (!formData.password) {
        newErrors.password = t.loginScreen.errors.passwordRequired;
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = t.loginScreen.errors.passwordMinLength;
      }
    }

    if (selectedRole === 'channelPartner') {
      if (!formData.email) {
        newErrors.email = t.loginScreen.errors.emailRequired;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = t.loginScreen.errors.emailInvalid;
      }

      if (!formData.password) {
        newErrors.password = t.loginScreen.errors.passwordRequired;
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = t.loginScreen.errors.passwordMinLength;
      }

      if (!formData.channelPartner || formData.channelPartner === t.loginScreen.selectPartner || formData.channelPartner === 'Select partner') {
        newErrors.channelPartner = t.loginScreen.errors.channelPartnerRequired;
      }
    }

    if (selectedRole === 'nbcfdcAdmin') {
      if (!formData.email) {
        newErrors.email = t.loginScreen.errors.emailRequired;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = t.loginScreen.errors.emailInvalid;
      }

      if (!formData.password) {
        newErrors.password = t.loginScreen.errors.passwordRequired;
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = t.loginScreen.errors.passwordMinLength;
      }

      if (!formData.role || formData.role === t.loginScreen.selectRole || formData.role === 'Select role') {
        newErrors.role = t.loginScreen.errors.roleRequired;
      }
    }

    if (selectedRole === 'riskAnalytics') {
      if (!formData.email) {
        newErrors.email = t.loginScreen.errors.emailRequired;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = t.loginScreen.errors.emailInvalid;
      }

      if (!formData.password) {
        newErrors.password = t.loginScreen.errors.passwordRequired;
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = t.loginScreen.errors.passwordMinLength;
      }

      if (formData.twoFA && !isValid2FA(formData.twoFA)) {
        newErrors.twoFA = t.loginScreen.errors.twoFAInvalid;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid
  const isFormValid = () => {
    if (selectedRole === 'beneficiary') {
      return isValidBankAccount(formData.bankAccount) && isValidPassword(formData.password);
    }
    if (selectedRole === 'channelPartner') {
      return isValidEmail(formData.email) && isValidPassword(formData.password) && 
             formData.channelPartner && formData.channelPartner !== 'Select partner';
    }
    if (selectedRole === 'nbcfdcAdmin') {
      return isValidEmail(formData.email) && isValidPassword(formData.password) && 
             formData.role && formData.role !== 'Select role';
    }
    if (selectedRole === 'riskAnalytics') {
      return isValidEmail(formData.email) && isValidPassword(formData.password) && 
             (!formData.twoFA || isValid2FA(formData.twoFA));
    }
    return false;
  };

  // Handle input change
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle blur (mark field as touched)
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Mark all fields as touched
    const allFields = selectedRole === 'beneficiary' 
      ? ['bankAccount', 'password']
      : selectedRole === 'channelPartner'
      ? ['email', 'password', 'channelPartner']
      : selectedRole === 'nbcfdcAdmin'
      ? ['email', 'password', 'role']
      : ['email', 'password', 'twoFA'];
    
    allFields.forEach(field => {
      setTouched(prev => ({ ...prev, [field]: true }));
    });

    if (validateForm() && isFormValid()) {
      onLogin();
      
      // Navigate channel partner to dashboard route
      if (selectedRole === 'channelPartner') {
        setTimeout(() => navigate('/dashboard'), 500);
      }
    }
  };

  const handleSignupClick = () => {
    navigate('/apply');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4 py-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT: FORM */}
        <div className="px-6 sm:px-10 py-8 sm:py-10 flex flex-col justify-center">
          {/* Top nav row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{t.loginScreen.back}</span>
            </button>

            <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${currentRole.accent} px-4 py-1.5 text-xs font-semibold text-white shadow-md`}>
              <Icon className="w-3.5 h-3.5" />
              {currentRole.badge}
            </span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
              {currentRole.title}
            </h2>
            <p className="text-slate-600 text-base">{t.loginScreen.signInToContinue}</p>
            <div className={`h-1.5 w-20 bg-gradient-to-r ${currentRole.accent} rounded-full mt-4`}></div>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {selectedRole === 'beneficiary' && (
              <>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.bankAccountNumber} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => handleChange('bankAccount', e.target.value)}
                      onBlur={() => handleBlur('bankAccount')}
                      placeholder={t.loginScreen.bankAccountPlaceholder}
                      className={`w-full rounded-xl border-2 ${
                        errors.bankAccount && touched.bankAccount
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.bankAccount && touched.bankAccount && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.bankAccount}</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.passwordMPIN} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder={t.loginScreen.passwordPlaceholder}
                      className={`w-full rounded-xl border-2 ${
                        errors.password && touched.password
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedRole === 'channelPartner' && (
              <>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.emailID} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder={t.loginScreen.emailPlaceholder}
                      className={`w-full rounded-xl border-2 ${
                        errors.email && touched.email
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.password} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder={t.loginScreen.passwordPlaceholder}
                      className={`w-full rounded-xl border-2 ${
                        errors.password && touched.password
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.channelPartner} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.channelPartner}
                    onChange={(e) => handleChange('channelPartner', e.target.value)}
                    onBlur={() => handleBlur('channelPartner')}
                    className={`w-full rounded-xl border-2 ${
                      errors.channelPartner && touched.channelPartner
                        ? 'border-red-300 bg-red-50/50'
                        : 'border-slate-200 bg-slate-50/50'
                    } px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                  >
                    <option>{t.loginScreen.selectPartner}</option>
                    <option>XYZ Cooperative Bank</option>
                    <option>ABC State Corporation</option>
                  </select>
                  {errors.channelPartner && touched.channelPartner && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.channelPartner}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedRole === 'nbcfdcAdmin' && (
              <>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.emailID} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder={t.loginScreen.emailPlaceholderAdmin}
                      className={`w-full rounded-xl border-2 ${
                        errors.email && touched.email
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.password} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder={t.loginScreen.passwordPlaceholder}
                      className={`w-full rounded-xl border-2 ${
                        errors.password && touched.password
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.role} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    onBlur={() => handleBlur('role')}
                    className={`w-full rounded-xl border-2 ${
                      errors.role && touched.role
                        ? 'border-red-300 bg-red-50/50'
                        : 'border-slate-200 bg-slate-50/50'
                    } px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                  >
                    <option>{t.loginScreen.selectRole}</option>
                    <option>{t.loginScreen.roleOptions.headOffice}</option>
                    <option>{t.loginScreen.roleOptions.regionalOffice}</option>
                  </select>
                  {errors.role && touched.role && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.role}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedRole === 'riskAnalytics' && (
              <>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.emailID} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder={t.loginScreen.emailPlaceholderAnalytics}
                      className={`w-full rounded-xl border-2 ${
                        errors.email && touched.email
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.password} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder={t.loginScreen.passwordPlaceholder}
                      className={`w-full rounded-xl border-2 ${
                        errors.password && touched.password
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/50'
                      } px-4 py-3.5 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.loginScreen.twoFACode} <span className="text-slate-400 font-normal">{t.loginScreen.optional}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.twoFA}
                    onChange={(e) => handleChange('twoFA', e.target.value)}
                    onBlur={() => handleBlur('twoFA')}
                    placeholder={t.loginScreen.twoFACodePlaceholder}
                    className={`w-full rounded-xl border-2 ${
                      errors.twoFA && touched.twoFA
                        ? 'border-red-300 bg-red-50/50'
                        : 'border-slate-200 bg-slate-50/50'
                    } px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all`}
                  />
                  {errors.twoFA && touched.twoFA && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.twoFA}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* CTA */}
            <div className="mt-8 space-y-4">
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full bg-gradient-to-r ${currentRole.accent} text-white py-4 rounded-xl text-base font-semibold shadow-lg shadow-sky-200/50 hover:shadow-xl hover:shadow-sky-300/50 transition-all duration-300 ${
                  isFormValid()
                    ? 'hover:-translate-y-0.5 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                } flex items-center justify-center gap-2`}
              >
                <span>{t.loginScreen.signIn}</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>

              <button
                type="button"
                onClick={handleSignupClick}
                className="w-full text-center text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
              >
                {t.loginScreen.newUserSignUp}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: DECORATIVE PANEL */}
        <div className={`hidden lg:flex flex-col justify-center items-center bg-gradient-to-br ${currentRole.accent} text-white relative overflow-hidden p-8`}>
          {/* Background decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
              <Icon className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold">Credit Saarthi</h3>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t.loginScreen.secureEncrypted}</span>
              </div>
              <div className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t.loginScreen.realTimeTracking}</span>
              </div>
              <div className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t.loginScreen.support24_7}</span>
              </div>
            </div>
          </div>

          {/* Floating sparkles */}
          <Sparkles className="absolute top-8 right-8 w-6 h-6 text-white/30 animate-pulse" />
          <Sparkles className="absolute bottom-12 left-8 w-5 h-5 text-white/20 animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
