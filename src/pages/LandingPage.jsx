// src/pages/LandingPage.jsx
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import FeaturesSection from '../components/FeaturesSection';
import ScoreSection from '../components/ScoreSection';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import FeaturesCarouselSection from '../components/FeaturesCarouselSection';
import LoanSchemasPage from '../components/LoanSchemasPage';
import ChatbotWidget from '../components/ChatbotWidget';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesCarouselSection />
      <LoanSchemasPage />
      <ScoreSection />
      <CTASection />
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default LandingPage;