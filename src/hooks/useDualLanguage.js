import { useLanguage } from '../context/LanguageContext';

/**
 * Simple helper hook to return Hindi strings when the user selects Hindi.
 * Falls back to the provided English copy for all other languages.
 */
export const useDualLanguage = () => {
  const { language } = useLanguage();

  const translate = (english, hindi) => {
    if (language === 'hi' && hindi) {
      return hindi;
    }
    return english;
  };

  return { language, translate };
};

