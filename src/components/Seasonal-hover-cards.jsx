// src/components/Seasonal-hover-cards.jsx
"use client";

import React from "react";

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:w-1/2 cursor-pointer text-left ${className || ""}`}
    >
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt={imageAlt || title}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative md:absolute md:bottom-20 z-10">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm py-7 text-gray-300">{subtitle}</p>
      </div>
      <div className="mt-4 transform translate-y-6 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <p className="text-lg max-w-md text-white">{description}</p>
      </div>
    </button>
  );
};

export const SeasonalHoverCards = ({ cards, className }) => {
  return (
    <div
      className={`flex flex-wrap md:flex-nowrap gap-4 w-full px-4 ${
        className || ""
      }`}
    >
      {cards.map((card, index) => (
        <SeasonCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          className={card.className}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};

// (optional) demo stays same, no navigate
export const SeasonalHoverCardsDemo = () => {
  const defaultCards = [
    {
      title: "Education Loan",
      subtitle: "For Students",
      description:
        "Up to ₹50 Lakhs with special interest rates for meritorious students. Covers tuition, books, and living expenses.",
      imageSrc: "",
      imageAlt: "Education Loan",
    },
    {
      title: "Business Loan",
      subtitle: "For Entrepreneurs",
      description:
        "Up to ₹2 Crores for business expansion, working capital, or startup funding. Quick approval within 72 hours.",
      imageSrc: "",
      imageAlt: "Business Loan",
    },
  ];

  return <SeasonalHoverCards cards={defaultCards} />;
};
