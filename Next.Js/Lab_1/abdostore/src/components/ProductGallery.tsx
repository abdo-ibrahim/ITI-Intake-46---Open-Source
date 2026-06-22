import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">No images available</div>;
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in" onClick={() => setIsModalOpen(true)}>
        <Image src={images[currentIndex]} alt={`${title} - Image ${currentIndex + 1}`} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" priority sizes="(max-width: 1024px) 100vw, 50vw" />

        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              ←
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${currentIndex === idx ? "border-gray-900 shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover bg-gray-50" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <button className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 z-50" onClick={() => setIsModalOpen(false)}>
            ×
          </button>

          <div className="relative w-full max-w-5xl aspect-video md:aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image src={images[currentIndex]} alt={`${title} - Fullscreen`} fill className="object-contain" />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full text-2xl transition">
                  ←
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full text-2xl transition">
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
