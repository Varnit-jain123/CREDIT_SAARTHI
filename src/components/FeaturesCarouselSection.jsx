"use client";

import TeamCarousel from "./TeamCarousel";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";
import img6 from "../assets/6.jpeg";
import img7 from "../assets/7.jpeg";
import img8 from "../assets/8.jpeg";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const FeaturesCarouselSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = t.featuresCarousel.features.map((feature, index) => ({
    id: String(index + 1),
    name: feature.name,
    role: feature.role,
    image: [img1, img2, img3, img4, img5, img6, img7, img8][index],
    bio: feature.bio,
  }));

  return (
    <section
      id="features"
      className="py-7 px-2 bg-gradient-to-b from-white to-gray-50"
    >
      {/* Section Header */}
      <div className="text-center ">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.featuresCarousel.title}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {" "}
            {t.featuresCarousel.titleHighlight}
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.featuresCarousel.subtitle}
        </p>
      </div>

      {/* Features Carousel */}
      <TeamCarousel
        members={features}
        subtitle={t.featuresCarousel.cuttingEdge}
        title={t.featuresCarousel.keyFeatures}
        cardWidth={250}
        cardHeight={250}
        descriptionHeight={200}
        showArrows={true}
        showDots={true}
        autoPlay={4000}
        visibleCards={3}
        grayscaleEffect={false}
        onMemberChange={(feature, index) => {
          console.log("Active feature:", feature.name);
        }}
        onCardClick={(feature, index) => {
          console.log("Clicked feature:", feature.name);
          // You can add modal opening or navigation here
        }}
      />

     

      {/* CTA Section */}
    </section>
  );
};

export default FeaturesCarouselSection;
