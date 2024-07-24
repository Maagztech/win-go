"use client";

import React, { useState } from "react";
import { FaApple, FaBeer, FaCoffee, FaDice, FaHeart, FaStar } from "react-icons/fa";
import { useSpin } from "@/contexts/spinContext";
import SpinButton from "@/assets/spinButton.svg";

const icons = [FaApple, FaBeer, FaCoffee, FaDice, FaHeart, FaStar];

const iconValues = {
  [FaApple]: 10,
  [FaBeer]: 20,
  [FaCoffee]: 30,
  [FaDice]: 40,
  [FaHeart]: 50,
  [FaStar]: 60,
};

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

const JackpotGame = () => {
  const { handleSpin } = useSpin();
  const [leftIcons, setLeftIcons] = useState([
    getRandomIcon(),
    getRandomIcon(),
    getRandomIcon(),
  ]);
  const [middleIcons, setMiddleIcons] = useState([
    getRandomIcon(),
    getRandomIcon(),
    getRandomIcon(),
  ]);
  const [rightIcons, setRightIcons] = useState([
    getRandomIcon(),
    getRandomIcon(),
    getRandomIcon(),
  ]);
  const [spinning, setSpinning] = useState(false);

  const handleSpinClick = () => {
    if (spinning) return;
    setSpinning(true);

    const spinDurations = [2000, 3000, 4000]; // Different durations for each column
    const spinIntervals = [];
    let totalValue = 0;

    const spinColumn = (setIcons) => {
      const interval = setInterval(() => {
        setIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          newIcons.unshift(getRandomIcon());
          newIcons.pop();
          return newIcons;
        });
      }, 100);
      return interval;
    };

    // Start spinning columns
    spinIntervals.push(spinColumn(setLeftIcons));
    setTimeout(() => spinIntervals.push(spinColumn(setMiddleIcons)), 500);
    setTimeout(() => spinIntervals.push(spinColumn(setRightIcons)), 1000);

    // Stop spinning columns at different times
    spinDurations.forEach((duration, index) => {
      setTimeout(() => {
        clearInterval(spinIntervals[index]);
        if (index === 2) {
          setSpinning(false);
          const finalIcons = [leftIcons, middleIcons, rightIcons];
          totalValue = finalIcons.reduce(
            (acc, column) => acc + (iconValues[column[1]] || 0),
            0
          );
          handleSpin(totalValue);
        }
      }, duration);
    });
  };

  return (
    <div className="absolute bottom-[100px] flex flex-col items-center justify-center">
      <div className="spin-frame flex items-center justify-center">
        <div className="flex gap-[55px] items-center justify-center h-full py-[12px]">
          {[leftIcons, middleIcons, rightIcons].map((column, colIdx) => (
            <div
              key={colIdx}
              className="w-16 h-full flex flex-col items-center justify-between overflow-hidden"
            >
              {column.map((Icon, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center w-full ${
                    idx === 1 ? "text-yellow-500" : "text-red-500 opacity-50"
                  }`}
                >
                  <Icon size={idx === 1 ? 37 : 31} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="text-[#737476] text-[8.41px] leading-[10.18px] mt-[10px]">
        0/1 spin left
      </p>
      <button onClick={handleSpinClick} className="mt-[10px]">
        <img src={SpinButton.src} alt="Spin" />
      </button>
      
    </div>
  );
};

export default JackpotGame;
