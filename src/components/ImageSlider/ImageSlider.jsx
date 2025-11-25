import { useState, useEffect } from "react";

const slides = [
  { img: "/assets/img1.jpg", text: "Fresh Organic Vegetables" },
  { img: "/assets/img2.jpg", text: "Farm to Home Delivery" },
  { img: "/assets/img3.jpg", text: "Best Quality Products" },
  { img: "/assets/img4.jpg", text: "Healthy & Natural" },
  { img: "/assets/img5.jpg", text: "Affordable Prices" },
  { img: "/assets/img6.jpg", text: "Trusted by Thousands" },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-lg mt-10 bg-[#1f1f1f]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            <img
              src={slide.img}
              className="w-full h-full object-cover"
              alt="slider"
            />

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 bg-black/50 px-4 py-2 rounded-lg text-white text-lg md:text-2xl font-semibold">
              {slide.text}
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
