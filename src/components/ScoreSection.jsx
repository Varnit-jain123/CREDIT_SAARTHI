"use client";

import { TrendingUp, Shield, BarChart3, Target, Info, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const ScoreSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const scores = [
    {
      name: t.scoreSection.incomeScore.name,
      value: 92,
      description: t.scoreSection.incomeScore.description,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-green-400 to-green-500",
      bgColor: "bg-green-500"
    },
    {
      name: t.scoreSection.repaymentScore.name,
      value: 78,
      description: t.scoreSection.repaymentScore.description,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-500"
    },
    {
      name: t.scoreSection.safetyScore.name,
      value: 15,
      description: t.scoreSection.safetyScore.description,
      icon: <Shield className="w-5 h-5" />,
      color: "from-red-400 to-red-500",
      bgColor: "bg-red-500"
    }
  ];

  const decisions = [
    {
      range: t.scoreSection.decisions.autoApproved.range,
      title: t.scoreSection.decisions.autoApproved.title,
      description: t.scoreSection.decisions.autoApproved.description,
      color: "bg-gradient-to-r from-green-500 to-green-400",
      icon: <Zap className="w-5 h-5" />
    },
    {
      range: t.scoreSection.decisions.manualReview.range,
      title: t.scoreSection.decisions.manualReview.title,
      description: t.scoreSection.decisions.manualReview.description,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-400",
      icon: <Target className="w-5 h-5" />
    },
    {
      range: t.scoreSection.decisions.improveScore.range,
      title: t.scoreSection.decisions.improveScore.title,
      description: t.scoreSection.decisions.improveScore.description,
      color: "bg-gradient-to-r from-red-500 to-red-400",
      icon: <Info className="w-5 h-5" />
    }
  ];

  return (
    <section id="scoring" className="py-12 px-4 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
         
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            {t.scoreSection.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-3">{t.scoreSection.titleHighlight}</span>
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            {t.scoreSection.subtitle}
          </p>
        </motion.div>

        {/* Main Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-semibold">{t.scoreSection.compositeScore}</span>
                </div>
                <div className="text-5xl md:text-6xl font-bold mb-2">85</div>
                <div className="text-lg opacity-90">{t.scoreSection.outOf}</div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Auto-Approve</div>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Recommended</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="mt-6 relative">
              <div className="h-2 bg-white/30 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                  style={{ width: '85%' }}
                />
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
          </motion.div>

          {/* Decision Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Decision Guide
            </h3>
            
            <div className="space-y-4">
              {decisions.map((decision, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${decision.color} rounded-full flex items-center justify-center text-white`}>
                    {decision.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{decision.range}</div>
                    <div className="text-sm text-gray-600">{decision.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scores.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${score.color} rounded-xl flex items-center justify-center`}>
                    <div className="text-white">
                      {score.icon}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{score.name}</div>
                    <div className="text-xs text-gray-500">{score.description}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{score.value}</div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${score.bgColor} rounded-full`}
                    style={{ width: `${score.value}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
       

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <Info className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              Scores update in real-time as you submit more information
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScoreSection;