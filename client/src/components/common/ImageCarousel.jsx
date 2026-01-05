import { useEffect, useState } from "react";

function ImageCarousel({ images = [], interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // 🔁 Auto loop (single, stable interval)
  useEffect(() => {
    if (!images.length || images.length === 1) return;
    if (isHovering) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(id);
  }, [images.length, isHovering, interval]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`product-${index}`}
          className={`
            absolute inset-0
            w-full h-full object-cover
            transition-opacity duration-700
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}
    </div>
  );
}

export default ImageCarousel;
