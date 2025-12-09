import { Shield, Zap, Globe, Smartphone, Lock, TrendingUp, Users, FileText, Sparkles, Cpu, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const FeaturesSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Custom items for the CircularGallery
  const galleryItems = [
  ];
  return (
    <section id="features" className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Interactive Circular Gallery Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          <div 
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            style={{ height: '600px', position: 'relative' }}
          >
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5 z-0"></div>
            
            {/* Gallery Container */}
            <div className="absolute inset-0 z-10">
              <CircularGallery 
                bend={3} 
                textColor="#000000ff" 
                borderRadius={0.05} 
                scrollEase={0.02}
                items={galleryItems}
              />
            </div>
            
            {/* Overlay Instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.features.scrollToExplore}</span>
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
            </div>
            
            {/* Title Overlay */}
           
          </div>
          
          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
            

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-dark text-center mb-8">
            {t.features.comparisonTitle}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{t.features.traditional.title}</h4>
              </div>
              <ul className="space-y-4">
                {t.features.traditional.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{t.features.creditSaarthi.title}</h4>
              </div>
              <ul className="space-y-4">
                {t.features.creditSaarthi.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;