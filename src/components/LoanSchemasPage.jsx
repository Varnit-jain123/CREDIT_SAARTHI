// src/pages/LoanSchemasPage.jsx
"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  CheckCircle,
  Percent,
  Clock,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SeasonalHoverCards } from "./Seasonal-hover-cards";
import businessImg from "../assets/business.jpeg";
import studentImg from "../assets/student.jpeg";
import selfhelpImg from "../assets/selfhelp.jpeg";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const LoanSchemasPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const loanCards = [
    {
      title: t.loanSchemas.educationLoan.title,
      subtitle: t.loanSchemas.educationLoan.subtitle,
      description: t.loanSchemas.educationLoan.description,
      imageSrc: studentImg,
      imageAlt: t.loanSchemas.educationLoan.title,
      onClick: () => navigate("/apply"),
    },
    {
      title: t.loanSchemas.businessLoan.title,
      subtitle: t.loanSchemas.businessLoan.subtitle,
      description: t.loanSchemas.businessLoan.description,
      imageSrc: businessImg,
      imageAlt: t.loanSchemas.businessLoan.title,
      onClick: () => navigate("/apply"),
    },
    {
      title: t.loanSchemas.selfHelpLoan.title,
      subtitle: t.loanSchemas.selfHelpLoan.subtitle,
      description: t.loanSchemas.selfHelpLoan.description,
      imageSrc: selfhelpImg,
      imageAlt: t.loanSchemas.selfHelpLoan.title,
      onClick: () => navigate("/apply"),
    },
  ];

  return (
    <section id="loan-schemas" className="py-20 bg-gray-50">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {t.loanSchemas.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                {t.loanSchemas.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.loanSchemas.subtitle}
            </p>
          </div>

          {/* Interactive Hover Cards Section */}
          <div className="mb-16">
            <SeasonalHoverCards cards={loanCards} />
          </div>

          {/* You can add more sections below if needed */}
        </div>
      </div>
    </section>
  );
};

export default LoanSchemasPage;
