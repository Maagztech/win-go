"use client";

import React, { useState, useEffect } from "react";
import Berry from "@/assets/berry.svg";
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
    <div className="mt-[18px] flex flex-col items-center">
      {showScore ? (
        <div className="relative mb-[20px]">
          <img
            src={ScoreFrame.src}
            alt="Score Frame"
            className="w-[350px]"
          />{" "}
          {/* Adjust width and height as needed */}
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
        <img src={Berry.src} alt="Berry " className="mb-[48px]" />
      )}
    </div>
  );
};

export default SlotMachine;
