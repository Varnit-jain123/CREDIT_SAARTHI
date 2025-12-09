"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CheckCircle,
  Shield,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/WhatsApp Image 2025-12-07 at 11.14.41 PM.jpeg";
import img2 from "../assets/WhatsApp Image 2025-12-07 at 11.20.10 PM.jpeg";
import img4 from "../assets/WhatsApp Image 2025-12-07 at 11.22.00 PM.jpeg";
import img3 from "../assets/WhatsApp Image 2025-12-07 at 11.22.37 PM.jpeg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const slides = [
    {
      id: 1,
      title: t.hero.slide1.title,
      subtitle: t.hero.slide1.subtitle,
      description: "",
      image: img1,
      bgColor: "from-blue-600 to-purple-700",
      cta: t.hero.slide1.cta,
      stats: [
        { value: "15+", label: t.hero.slide1.stats.schemes },
        { value: "8+", label: t.hero.slide1.stats.categories },
        { value: "200+", label: t.hero.slide1.stats.lenders },
      ],
      ctaAction: () => {
        navigate("/portal");
      },
    },
    {
      id: 2,
      title: t.hero.slide2.title,
      subtitle: t.hero.slide2.subtitle,
      description: "",
      image: img2,
      bgColor: "from-orange-600 to-yellow-600",
      cta: t.hero.slide2.cta,
      stats: [
        { value: "75", label: t.hero.slide2.stats.years },
        { value: "75M", label: t.hero.slide2.stats.target },
        { value: "100%", label: t.hero.slide2.stats.digital },
      ],
      ctaAction: () => {
        navigate("/portal");
      },
    },
    {
      id: 3,
      title: t.hero.slide3.title,
      subtitle: t.hero.slide3.subtitle,
      description: "",
      image: img3,
      bgColor: "from-green-600 to-teal-600",
      cta: t.hero.slide3.cta,
      stats: [
        { value: "2 min", label: t.hero.slide3.stats.checkTime },
        { value: "95%", label: t.hero.slide3.stats.accuracy },
        { value: "0", label: t.hero.slide3.stats.paperwork },
      ],
      ctaAction: () => {
        navigate("/portal");
      },
    },
    {
      id: 4,
      title: t.hero.slide4.title,
      subtitle: t.hero.slide4.subtitle,
      description: "",
      image: img4,
      bgColor: "from-purple-600 to-pink-600",
      cta: t.hero.slide4.cta,
      stats: [
        { value: "24H", label: t.hero.slide4.stats.approval },
        { value: "Real-time", label: t.hero.slide4.stats.tracking },
        { value: "Secure", label: t.hero.slide4.stats.process },
      ],
      ctaAction: () => {
        navigate("/portal");
      },
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        nextSlide();
      } else if (e.key === "ArrowUp") {
        prevSlide();
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

   return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20">
      {/* BANNER */}
      <div className="relative w-full h-96 md:h-[450px] lg:h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
          >
            <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:w-1/2 text-white text-center lg:text-left px-4 lg:px-0"
              >
                <h1 className="text-3xl md:text-4xl lg:text-3xl font-bold mb-3 leading-tight">
                  {slides[currentSlide].title}
                </h1>

                <h2 className="text-lg md:text-xl font-semibold mb-3 text-white/90">
                  {slides[currentSlide].subtitle}
                </h2>

                <p className="text-sm md:text-base mb-6 text-white/80 max-w-xl">
                  {slides[currentSlide].description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto lg:mx-0">
                  {slides[currentSlide].stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                    >
                      <div className="text-2xl font-bold mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/80 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button 
                    onClick={slides[currentSlide].ctaAction || (() => navigate("/"))}
                    className="group bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 justify-center text-sm md:text-base"
                  >
                    <span>
                      {slides[currentSlide].cta || "Check Eligibility"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => navigate("/")}
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 text-sm md:text-base"
                  >
                    {t.hero.viewDemo}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="lg:w-1/2 flex justify-end pr-8 mt-6 lg:mt-0"
              >
                <div className="relative w-70 h-70 md:w-96 md:h-96 lg:w-[480px] lg:h-[350px] rounded-2xl overflow-hidden shadow-2xl">
                  <motion.img
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white h-2 w-8"
                      : "bg-white/50 h-2 w-2 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all z-20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all z-20"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
            >
              <span className="text-xs text-white/70 font-bold ">
                {t.hero.scrollToView}
              </span>
              <ChevronDown className="w-5 h-5 text-white/70" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;

// "use client";

// import { useState, useEffect } from "react";
// import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   const slides = [
//     {
//       id: 1,
//       title: "National Portal for Credit-Linked Government Schemes",
//       subtitle: "One-stop digital platform for all government credit schemes",
//       description:
//         "Access 15+ government schemes, 8+ loan categories, and connect with 200+ lenders through a single platform. Digital approval within 24 hours.",
//       image: "🏛️",
//       bgColor: "from-blue-600 to-purple-700",
//       stats: [
//         { value: "15+", label: "Schemes" },
//         { value: "8+", label: "Categories" },
//         { value: "200+", label: "Lenders" },
//       ],
//     },
//     {
//       id: 2,
//       title: "Azadi Ka Amrit Mahotsav Initiative",
//       subtitle: "Celebrating 75 Years of Financial Inclusion",
//       description:
//         "Special government schemes to empower 75 million Indians with access to credit. Join the movement towards financial independence.",
//       image: "🎯",
//       bgColor: "from-orange-600 to-yellow-600",
//       stats: [
//         { value: "75", label: "Years" },
//         { value: "75M", label: "Target" },
//         { value: "100%", label: "Digital" },
//       ],
//     },
//     {
//       id: 3,
//       title: "Instant Eligibility Check",
//       subtitle: "No Paperwork, Just Results",
//       description:
//         "Check your eligibility for multiple government schemes in under 2 minutes. Our AI-powered system matches you with the best options.",
//       image: "⚡",
//       bgColor: "from-green-600 to-teal-600",
//       stats: [
//         { value: "2 min", label: "Check Time" },
//         { value: "95%", label: "Accuracy" },
//         { value: "0", label: "Paperwork" },
//       ],
//     },
//     {
//       id: 4,
//       title: "Digital Approval System",
//       subtitle: "Fast-track Loan Processing",
//       description:
//         "Get digital approval within 24 hours. Track your application in real-time with complete transparency at every step.",
//       image: "📱",
//       bgColor: "from-purple-600 to-pink-600",
//       stats: [
//         { value: "24H", label: "Approval" },
//         { value: "Real-time", label: "Tracking" },
//         { value: "Secure", label: "Process" },
//       ],
//     },
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 5000);
//   };

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, currentSlide]);

//   useEffect(() => {
//     const handleWheel = (e) => {
//       if (Math.abs(e.deltaY) > 50) {
//         if (e.deltaY > 0) {
//           nextSlide();
//         } else {
//           prevSlide();
//         }
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowDown") {
//         nextSlide();
//       } else if (e.key === "ArrowUp") {
//         prevSlide();
//       }
//     };

//     window.addEventListener("wheel", handleWheel);
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <section className="relative w-full overflow-hidden">
//       {/* Full Page Banner */}
//       <div className="relative w-full h-screen">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
//           >
//             {/* Background Blur Effect */}
//             <div className="absolute inset-0 overflow-hidden">
//               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
//               <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
//             </div>

//             {/* Content Container */}
//             <div className="relative z-10 h-full flex items-center justify-center">
//               <div className="max-w-7xl mx-auto w-full px-4 lg:px-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
//                   {/* Left Content */}
//                   <motion.div
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                     className="text-white"
//                   >
//                     <motion.h1
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.3 }}
//                       className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
//                     >
//                       {slides[currentSlide].title}
//                     </motion.h1>

//                     <motion.h2
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.4 }}
//                       className="text-2xl md:text-3xl font-semibold mb-6 text-white/90"
//                     >
//                       {slides[currentSlide].subtitle}
//                     </motion.h2>

//                     <motion.p
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.5 }}
//                       className="text-lg md:text-xl mb-10 text-white/80 max-w-xl leading-relaxed"
//                     >
//                       {slides[currentSlide].description}
//                     </motion.p>

//                     {/* Stats Grid */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.6 }}
//                       className="grid grid-cols-3 gap-4 mb-10 max-w-md"
//                     >
//                       {slides[currentSlide].stats.map((stat, index) => (
//                         <div
//                           key={index}
//                           className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
//                         >
//                           <div className="text-3xl font-bold mb-2">
//                             {stat.value}
//                           </div>
//                           <div className="text-white/70 text-sm font-medium">
//                             {stat.label}
//                           </div>
//                         </div>
//                       ))}
//                     </motion.div>

//                     {/* CTA Buttons */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.7 }}
//                       className="flex flex-col sm:flex-row gap-4"
//                     >
//                       <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 justify-center">
//                         <span>Check Eligibility</span>
//                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                       </button>

//                       <button className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3 justify-center">
//                         <span>Learn More</span>
//                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </motion.div>
//                   </motion.div>

//                   {/* Right Image */}
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                     className="hidden lg:flex justify-center items-center"
//                   >
//                     <motion.div
//                       animate={{ y: [0, 20, 0] }}
//                       transition={{ duration: 4, repeat: Infinity }}
//                       className="relative"
//                     >
//                       {/* Animated Circles Background */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{
//                             duration: 20,
//                             repeat: Infinity,
//                             ease: "linear",
//                           }}
//                           className="w-96 h-96 border-4 border-white/20 rounded-full"
//                         />
//                         <motion.div
//                           animate={{ rotate: -360 }}
//                           transition={{
//                             duration: 15,
//                             repeat: Infinity,
//                             ease: "linear",
//                           }}
//                           className="absolute w-72 h-72 border-4 border-white/30 rounded-full"
//                         />
//                       </div>

//                       {/* Large Emoji Icon */}
//                       <div className="relative z-10 w-64 h-64 flex items-center justify-center text-9xl">
//                         {slides[currentSlide].image}
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-full transition-all duration-300 z-20 group"
//             >
//               <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-full transition-all duration-300 z-20 group"
//             >
//               <ArrowRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
//             </button>

//             {/* Slide Indicators */}
//             <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`transition-all duration-300 rounded-full ${
//                     index === currentSlide
//                       ? "bg-white h-3 w-12"
//                       : "bg-white/50 h-3 w-3 hover:bg-white/70"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Scroll Indicator */}
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
//             >
//               <div className="text-white/70 text-center mb-2 text-sm font-medium">
//                 Scroll or Use Arrow Keys
//               </div>
//               <ChevronDown className="w-6 h-6 text-white/70 mx-auto" />
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Information Section */}
//       <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               How It Works
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Get instant access to government-backed loans in just 3 simple
//               steps
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "01",
//                 title: "Check Eligibility",
//                 description:
//                   "Enter basic details to instantly check eligibility across 15+ government schemes with AI-powered matching.",
//                 color: "from-blue-500 to-blue-600",
//               },
//               {
//                 step: "02",
//                 title: "Select Scheme",
//                 description:
//                   "Choose from the best-matched schemes with detailed comparison, benefits, and interest rates.",
//                 color: "from-purple-500 to-purple-600",
//               },
//               {
//                 step: "03",
//                 title: "Get Approval",
//                 description:
//                   "Receive digital approval within 24 hours with real-time tracking and complete transparency.",
//                 color: "from-green-500 to-green-600",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className="relative group"
//               >
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
//                   <div
//                     className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-bold`}
//                   >
//                     {item.step}
//                   </div>

//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                     {item.title}
//                   </h3>

//                   <p className="text-gray-600 leading-relaxed">
//                     {item.description}
//                   </p>

//                   {/* Decorative line */}
//                   {index < 2 && (
//                     <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* CTA Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="mt-16 text-center"
//           >
//             <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3">
//               <span>Start Your Journey Now</span>
//               <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </motion.div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default HeroSection;
