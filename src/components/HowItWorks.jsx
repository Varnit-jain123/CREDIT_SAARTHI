import { FileText, Upload, Cpu, BarChart3, CheckCircle, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const HowItWorks = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];
  
  // Get scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to height for the progress line
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // Check if timeline is in view for animation
  const timelineInView = useInView(containerRef, { once: true });

  const steps = [
    {
      step: "01",
      icon: <FileText className="w-7 h-7" />,
      title: t.howItWorks.step1.title,
      description: t.howItWorks.step1.description,
      color: "from-blue-500 to-cyan-500",
      accent: "bg-gradient-to-r from-blue-500 to-cyan-500",
      time: t.howItWorks.step1.time
    },
    {
      step: "02",
      icon: <Upload className="w-7 h-7" />,
      title: t.howItWorks.step2.title,
      description: t.howItWorks.step2.description,
      color: "from-green-500 to-emerald-500",
      accent: "bg-gradient-to-r from-green-500 to-emerald-500",
      time: t.howItWorks.step2.time
    },
    {
      step: "03",
      icon: <Cpu className="w-7 h-7" />,
      title: t.howItWorks.step3.title,
      description: t.howItWorks.step3.description,
      color: "from-purple-500 to-pink-500",
      accent: "bg-gradient-to-r from-purple-500 to-pink-500",
      time: t.howItWorks.step3.time
    },
    {
      step: "04",
      icon: <BarChart3 className="w-7 h-7" />,
      title: t.howItWorks.step4.title,
      description: t.howItWorks.step4.description,
      color: "from-orange-500 to-amber-500",
      accent: "bg-gradient-to-r from-orange-500 to-amber-500",
      time: t.howItWorks.step4.time
    },
    {
      step: "05",
      icon: <CheckCircle className="w-7 h-7" />,
      title: t.howItWorks.step5.title,
      description: t.howItWorks.step5.description,
      color: "from-indigo-500 to-blue-500",
      accent: "bg-gradient-to-r from-indigo-500 to-blue-500",
      time: t.howItWorks.step5.time
    }
  ];

  return (
    <section ref={scrollRef} id="how-it-works" className="py-5 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Header - Compact Style like Loan Page */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            {t.howItWorks.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">{t.howItWorks.works}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Compact Timeline */}
        <div className="relative">
          {/* Static Main Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-indigo-500/20 -translate-x-1/2"></div>
          
          {/* === ADDED: Animated Progress Line with Glow Effect === */}
          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 z-10">
            <motion.div
              style={{
                height: progressHeight,
                width: 4,
                borderRadius: "9999px",
                background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
                boxShadow: `
                  0 0 15px rgba(99,102,241,0.5),
                  0 0 25px rgba(168,85,247,0.3)
                `,
              }}
            />
          </div>
          
          {/* === ADDED: Traveling Glow Comet === */}
          <motion.div
            className="hidden lg:block absolute z-20"
            style={{
              top: progressHeight,
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <motion.div
              className="w-5 h-5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                boxShadow: `
                  0 0 15px 4px rgba(168, 85, 247, 0.6),
                  0 0 25px 8px rgba(99, 102, 241, 0.4),
                  0 0 40px 15px rgba(34, 211, 238, 0.2)
                `,
              }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Steps Container */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:gap-8`}
              >
                {/* Step Card - More Compact */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                          <div className="text-white">
                            {step.icon}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500">{t.howItWorks.step} {step.step}</span>
                            <div className={`w-2 h-2 rounded-full ${step.accent}`}></div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mt-1">{step.title}</h3>
                        </div>
                      </div>
                      <div className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-700 rounded-lg">
                        {step.time}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Timeline Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="w-14 h-14 bg-white border-4 border-white rounded-full flex items-center justify-center shadow-xl">
                      <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}>
                        <span className="text-sm font-bold text-white">{step.step}</span>
                      </div>
                    </div>
                    {/* Pulsing Ring Effect */}
                    <div className={`absolute inset-0 ${step.color.replace('from-', 'bg-').replace(' to-', '/20')} rounded-full animate-ping opacity-75`}></div>
                  </motion.div>
                </div>

                {/* Empty Space for alternating side */}
                <div className="lg:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Stats - Compact */}
             </div>
    </section>
  );
};

export default HowItWorks;