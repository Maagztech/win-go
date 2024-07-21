"use client";

import React, { useState, useEffect } from "react";
import Berry from "@/assets/card header.png";
import BerryCard from "@/assets/berryCard.svg";
import ScoreFrame from "@/assets/scoreFrame.svg"; // Ensure this path is correct
import { useSpin } from "@/contexts/spinContext";

const SlotMachine = () => {
  const { spinResult, hasSpun } = useSpin();
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (hasSpun) {
      setShowScore(true);
    }
  }, [hasSpun]);

  return (
    <div className="mt-[18px] flex flex-col items-center w-full">
      {showScore ? (
        <div className="relative mb-[20px] w-full">
          <img src={ScoreFrame.src} alt="Score Frame" className="w-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <div className="text-[#C5C5C5] text-[13.9px] leading-[16.83px] font-semibold">
              You Won!
            </div>
            <div className="text-[28.6px] font-semibold mt-2 text-[#AB6D59] leading-[34.61px]">
              {spinResult}
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src={Berry.src} alt="Berry " />
          <img src={BerryCard.src} alt="" className="mt-[-13px] mb-[48px]" />
        </>
      )}
    </div>
  );
};

export default SlotMachine;
