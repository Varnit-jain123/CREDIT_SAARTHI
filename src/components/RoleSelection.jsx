import React from 'react';
import { User, Shield, BarChart3, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const RoleSelection = ({ onSelectRole }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const roles = [
    {
      role: 'beneficiary',
      title: t.roleSelection.beneficiary.title,
      subtitle: t.roleSelection.beneficiary.subtitle,
      icon: User,
      gradient: 'from-blue-500 to-sky-500',
      bgGradient: 'from-blue-50 to-sky-50',
    },
    {
      role: 'channelPartner',
      title: t.roleSelection.channelPartner.title,
      subtitle: t.roleSelection.channelPartner.subtitle,
      icon: Building2,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
    },
    {
      role: 'nbcfdcAdmin',
      title: t.roleSelection.nbcfdcAdmin.title,
      subtitle: t.roleSelection.nbcfdcAdmin.subtitle,
      icon: Shield,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
    },
    {
      role: 'riskAnalytics',
      title: t.roleSelection.riskAnalytics.title,
      subtitle: t.roleSelection.riskAnalytics.subtitle,
      icon: BarChart3,
      gradient: 'from-sky-500 to-blue-600',
      bgGradient: 'from-sky-50 to-blue-50',
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 mb-4">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
              {t.roleSelection.brand}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
            {t.roleSelection.title}
          </h1>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            {t.roleSelection.subtitle}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map(({ role, title, subtitle, icon: Icon, gradient, bgGradient }) => (
            <button
              key={role}
              onClick={() => onSelectRole(role)}
              className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 text-left hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="relative flex items-center gap-5">
                {/* Icon container */}
                <div className={`
                  h-16 w-16 rounded-xl bg-gradient-to-br ${gradient}
                  flex items-center justify-center shadow-lg
                  group-hover:scale-110 group-hover:rotate-3
                  transition-all duration-300
                `}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
                    {subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <div className={`
                  h-10 w-10 rounded-full bg-gradient-to-br ${gradient}
                  flex items-center justify-center
                  group-hover:translate-x-1 group-hover:scale-110
                  transition-all duration-300 opacity-0 group-hover:opacity-100
                  shadow-md
                `}>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </button>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-slate-400">
          {t.roleSelection.footerNote}
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
