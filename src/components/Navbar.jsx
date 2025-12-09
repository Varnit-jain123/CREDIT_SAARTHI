// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Shield, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { languageOptions } from '../constants/languageOptions';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const t = translations[language];

  const navItems = [
    { name: t.navbar.home, href: '/' },
    { name: t.navbar.features, href: '#features' },
    { name: t.navbar.loans, href: '#loan-schemas' },
    { name: t.navbar.scoring, href: '#scoring' },
  ];

 

  // Scroll effect (inside useEffect so it doesn't re-attach on every render)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);

    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.location.href = `/${href}`;
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // 👉 LOGIN CLICK: go to the application portal (swap)
  const handleLoginClick = () => {
    navigate("/portal");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="relative">
        {/* Top bar */}
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-10">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Shield className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CREDIT SAARTHI
                </h1>
                <p className="text-xs text-gray-500 tracking-wider">
                  {t.common.smartLendingPlatform}
                </p>
              </div>
            </Link>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="hidden md:block">
                <div className="relative group/language">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300">
                    <div className="relative">
                      <Globe className="w-5 h-5 text-gray-700 group-hover/language:text-blue-600 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                    </div>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent border-none outline-none font-medium text-gray-700 group-hover/language:text-blue-600 transition-colors cursor-pointer appearance-none pr-6 pl-1"
                        style={{
                          backgroundImage: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none'
                        }}
                      >
                        {languageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-hover/language:text-blue-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Officer Login Button -> /apply */}
              <button
                onClick={handleLoginClick}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center space-x-2">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden md:inline">{t.navbar.login}</span>
                  <span className="md:hidden">{t.navbar.login}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Floating nav */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4">
          <div
            className={`hidden md:flex items-center space-x-1 bg-white-200 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-gray transition-all duration-500 ${
              scrolled ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
            }`}
          >
            {navItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="group relative px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <span className="text-black font-medium group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <span className="text-black font-medium group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-200/50 animate-slideDown">
          <div className="container mx-auto px-6 py-8">
            <div className="space-y-4">
              {navItems.map((item) =>
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                  >
                    <span className="text-gray-800 font-medium text-lg">
                      {item.name}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                  >
                    <span className="text-gray-800 font-medium text-lg">
                      {item.name}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                )
              )}

              {/* Language Selector Mobile */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-6 h-6 text-blue-600" />
                    <span className="font-medium text-gray-800">{t.navbar.language}</span>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-white px-4 py-2 rounded-lg border border-gray-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .backdrop-blur-lg { backdrop-filter: blur(12px); }
      `}</style>
    </nav>
  );
};

export default Navbar;
