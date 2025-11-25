import React from "react";

export default function AgriculturalNews() {
  const cards = [
    {
      category: "MARKET TRENDS",
      title: "Navigating the 2025 Commodity Market",
      description:
        "Key predictions for wheat, corn, and soybean prices this coming quarter.",
      img: "/assets/2025CommodityMarket.jpg",
    },
    {
      category: "SUSTAINABILITY",
      title: "5 Regenerative Farming Practices to Try",
      description:
        "Improve soil health and boost your farm's resilience for the long term.",
      img: "/assets/5Regenerative.png",
    },
    {
      category: "TECHNOLOGY",
      title: "The Rise of AI in Precision Agriculture",
      description:
        "How artificial intelligence is helping farmers optimize yields and reduce waste.",
      img: "/assets/AIinPrecisionAgriculture.jpg",
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-500">
          Agricultural News & Insights
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition duration-300"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-600 font-semibold text-sm mb-2">
                  {card.category}
                </p>
                <h3 className="text-xl font-bold mb-3 text-green-500">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
