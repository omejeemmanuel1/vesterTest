import React, { useState, useEffect } from "react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";

const images = [image1, image2, image3];

const imageTexts = [
  "Connecting you<br />to the right<br />start up",
  "Making sure you<br />are investing<br />ready",
  "Making your startup<br />stand out for<br />the right investors",
];

const Header: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-blue-900">
      <div className="container">
        <div className="w-[100vw] h-[550px] overflow-hidden shadow-md relative">
          <div
            className="w-full h-full flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full object-cover relative"
                style={{ flex: "0 0 100%" }}
              >
                <div className="w-full h-full absolute bg-black opacity-40" />
                <img src={image} alt={`Slide ${index + 1}`} />
                <p
                  className="text-6xl drop-shadow-md shadow-black font-bold absolute top-32 left-24 transition-opacity duration-500 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                  dangerouslySetInnerHTML={{ __html: imageTexts[index] }}
                ></p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={prevImage}
            className="text-white text-3xl hover:text-blue-300"
          >
            &#8249;
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={nextImage}
            className="text-white text-3xl hover:text-blue-300"
          >
            &#8250;
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
