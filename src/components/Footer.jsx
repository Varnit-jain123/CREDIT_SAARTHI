import { Mail, Phone, MapPin, Shield, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const quickLinks = [
    { name: t.footer.links.home, href: "#" },
    { name: t.footer.links.howItWorks, href: "#how-it-works" },
    { name: t.footer.links.features, href: "#features" },
    { name: t.footer.links.scoring, href: "#scoring" },
    { name: t.footer.links.apply, href: "#apply" },
  ];

  const legalLinks = [
    { name: t.footer.legalLinks.privacy, href: "#" },
    { name: t.footer.legalLinks.terms, href: "#" },
    { name: t.footer.legalLinks.help, href: "#" },
    { name: t.footer.legalLinks.contact, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-6 border-t border-slate-700">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 mb-4">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">CREDIT SAARTHI</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-blue-400">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-blue-400">{t.footer.legal}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-blue-400">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{t.footer.phone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {t.footer.email}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{t.footer.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-4"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-xs">
            {t.footer.copyright.replace('{year}', new Date().getFullYear())}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-700 hover:bg-slate-600 transition px-2 py-1 rounded text-gray-300">
              {t.footer.rbiCompliant}
            </span>
            <span className="text-xs bg-slate-700 hover:bg-slate-600 transition px-2 py-1 rounded text-gray-300">
              {t.footer.iso27001}
            </span>
            <span className="text-xs bg-slate-700 hover:bg-slate-600 transition px-2 py-1 rounded text-gray-300">
              {t.footer.gdprReady}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
