import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { languageOptions } from '../constants/languageOptions';

const GlobalLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="flex items-center space-x-2 rounded-2xl bg-white/90 px-3 py-2 shadow-lg ring-1 ring-black/5 backdrop-blur">
        <Globe className="w-5 h-5 text-gray-600" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent text-sm font-medium text-gray-800 outline-none"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GlobalLanguageSwitcher;

