"use client";

import React, { useState } from "react";
import { useSpin } from "@/contexts/spinContext";
import SpinButton from "@/assets/spinButton.svg";
import Icon1 from "@/assets/icon1Berry.svg";
import Icon2 from "@/assets/icon2.svg";
import Icon3 from "@/assets/icon3.svg";
import Icon4 from "@/assets/icon4.svg";
import Icon5 from "@/assets/icon5.svg";
import SpinFrame from "@/assets/spinFrame.png";
import Rules from "@/assets/Rules.svg";
import Share from "@/assets/Share.svg";
import Topup from "@/assets/Topup.svg";
import Rupey from "@/assets/RectangleRupey.svg";
import RulesModal from "./RulesModal";
import ShareModal from "./ShareModal";
import TopupModal from "./TopupModal";
import ScoreModal from "./Score";
import HistoryModal from "./HistoryModal";

const icons = [Icon1, Icon2, Icon3, Icon4, Icon5];

const iconValues = {
  [Icon1]: 10,
  [Icon2]: 20,
  [Icon3]: 30,
  [Icon4]: 40,
  [Icon5]: 50,
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
  const [ruleVisible, setRuleVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [topupVisible, setTopupVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);

  const handleSpinClick = () => {
    if (spinning) return;
    setSpinning(true);

    const spinDurations = [2000, 3000, 4000]; // Longer durations for each column
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
      }, 50); // Faster interval time for quicker spinning
      return interval;
    };

    // Start spinning columns
    spinIntervals.push(spinColumn(setLeftIcons));
    setTimeout(() => spinIntervals.push(spinColumn(setMiddleIcons)), 300);
    setTimeout(() => spinIntervals.push(spinColumn(setRightIcons)), 600);

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
          setScoreVisible(true); // Show the ScoreModal after calculating the score
        }
      }, duration);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[25px]">
      <div className="flex items-center justify-center relative mx-[20px]">
        <img src={SpinFrame.src} alt="Spin Frame" />
        <div className="flex gap-[55px] items-center justify-center h-full py-[12px] absolute">
          {[leftIcons, middleIcons, rightIcons].map((column, colIdx) => (
            <div
              key={colIdx}
              className="w-16 h-full flex flex-col items-center justify-between overflow-hidden"
            >
              {column.map((icon, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center w-full ${
                    idx === 1 ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <img
                    src={icon.src}
                    alt={`Icon ${colIdx}-${idx}`}
                    className={`h-${idx === 1 ? "9" : "7"}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-[25px] w-full px-[45px]">
        <img
          src={Rules.src}
          alt="Rules"
          className="cursor-pointer"
          onClick={() => setRuleVisible(true)}
        />
        <img
          src={Share.src}
          alt="Share"
          className="cursor-pointer"
          onClick={() => setShareVisible(true)}
        />
        <img
          src={Topup.src}
          alt="Topup"
          className="cursor-pointer"
          onClick={() => setTopupVisible(true)}
        />
      </div>
      <button onClick={handleSpinClick} className="mt-[16px]">
        <img src={SpinButton.src} alt="Spin" />
      </button>
      <p className="text-[#737476] text-[8.41px] leading-[10.18px] mt-[8px]">
        0/1 spin left
      </p>
      <div
        className="cursor-pointer relative mt-[16px] bg-[#262526] rounded-full py-[7px] pl-[20px] pr-[10px] text-[8px] leading-[10px] font-semibold text-[#CCCCCC]"
        style={{ fontFamily: "Oxanium" }}
        onClick={() => {
          setHistoryVisible(true);
        }}
      >
        <img
          src={Rupey.src}
          alt="Rupey"
          className="absolute left-[-11px] w-[21.18px] top-0"
        />
        20,331
      </div>
      <RulesModal visible={ruleVisible} setvisible={setRuleVisible} />
      <ShareModal visible={shareVisible} setvisible={setShareVisible} />
      <TopupModal visible={topupVisible} setvisible={setTopupVisible} />
      <ScoreModal visible={scoreVisible} setvisible={setScoreVisible} />
      <HistoryModal
        visible={historyVisible}
        setvisible={setHistoryVisible}
        setTopup={setTopupVisible}
        setShare={setShareVisible}
      />
    </div>
  );
};

export default JackpotGame;
