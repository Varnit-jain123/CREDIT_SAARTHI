import { Mail, Phone, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const CTASection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    income: '',
    state: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(language === 'en' ? 'Thank you! Our team will contact you soon.' : 'धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी।');
    setFormData({ name: '', phone: '', income: '', state: '' });
  };

  const states = [
    t.cta.form.selectState, 'Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal',
    'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat',
    'Andhra Pradesh', 'Odisha', 'Telangana', 'Kerala', 'Other'
  ];

  return (
    <section id="apply" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 md:p-12 bg-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-dark mb-4">
                  {t.cta.title}
                </h2>
                <p className="text-gray-600 mb-8">
                  {t.cta.subtitle}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.cta.form.fullName}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t.cta.form.fullNamePlaceholder}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.cta.form.mobileNumber}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t.cta.form.mobilePlaceholder}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.cta.form.annualIncome}
                      </label>
                      <select
                        value={formData.income}
                        onChange={(e) => setFormData({...formData, income: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                      >
                        <option value="">{t.cta.form.selectIncome}</option>
                        <option value="<1.5L">{t.cta.form.incomeOptions.lessThan15L}</option>
                        <option value="1.5-3L">{t.cta.form.incomeOptions.between15_3L}</option>
                        <option value="3-5L">{t.cta.form.incomeOptions.between3_5L}</option>
                        <option value=">5L">{t.cta.form.incomeOptions.above5L}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.cta.form.state}
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                      >
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center space-x-2 group"
                  >
                    <span>{t.cta.form.submit}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <p className="text-xs text-center text-gray-500">
                    {t.cta.form.terms}
                  </p>
                </form>
              </motion.div>
            </div>
            
            {/* Right Side - Information */}
            <div className="p-8 md:p-12 text-white">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="h-full flex flex-col justify-center"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4">
                    {t.cta.help.title}
                  </h3>
                  <p className="text-white/80">
                    {t.cta.help.subtitle}
                  </p>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{t.cta.help.callUs}</h4>
                      <p className="text-white/80">{t.cta.help.callNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{t.cta.help.emailSupport}</h4>
                      <p className="text-white/80">{t.cta.help.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{t.cta.help.whatsappSupport}</h4>
                      <p className="text-white/80">{t.cta.help.whatsapp}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{t.cta.help.documentsChecklist}</span>
                  </h4>
                  <ul className="space-y-2">
                    {t.cta.help.documents.map((doc, idx) => (
                      <li key={idx} className="flex items-center text-white/80">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;