import React from "react";
import Banner1 from "@/assets/banner1.svg";
import Banner2 from "@/assets/banner2.svg";
import { useGlobal } from "@/contexts/globalContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banners = () => {
  const { isMobile } = useGlobal();

  return (
    <main className={`flex justify-center ${isMobile ? "mt-[10px] mx-[20px]" : ""}  `}>
      <Carousel
        className={`${
          isMobile ? "w-full" : "w-[400px]"
        }  overflow-hidden rounded`} // Ensure correct height
        autoPlay
        interval={3000}
        infiniteLoop
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={Banner1.src}
            className="h-full w-full object-fit" // Ensure image covers container
            alt="Banner 1"
          />
        </div>
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={Banner2.src}
            className="h-full w-full object-cover" // Ensure image covers container
            alt="Banner 2"
          />
        </div>
      </Carousel>
    </main>
  );
};

export default Banners;
