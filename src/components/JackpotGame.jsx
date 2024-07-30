"use client";

import React, { useState } from "react";
import { useSpin } from "@/contexts/spinContext";
import { useGlobal } from "@/contexts/globalContext";
import SpinButton from "@/assets/spinButton.svg";
import Icon1 from "@/assets/icon1Berry.svg";
import Icon2 from "@/assets/icon2.svg";
import Icon3 from "@/assets/icon3.svg";
import Icon4 from "@/assets/icon4.svg";
import Icon5 from "@/assets/icon5.svg";
import Icon6 from "@/assets/icon1Berry.svg";
import Icon7 from "@/assets/icon2.svg";
import Icon8 from "@/assets/icon3.svg";
import Icon9 from "@/assets/icon4.svg";
import Icon10 from "@/assets/icon5.svg";
import SpinFrame from "@/assets/spinFrame.svg";
import Rules from "@/assets/Rules.svg";
import Share from "@/assets/Share.svg";
import Topup from "@/assets/Topup.svg";
import Rupey from "@/assets/RectangleRupey.svg";
import RulesModal from "./RulesModal";
import ShareModal from "./ShareModal";
import TopupModal from "./TopupModal";
import ScoreModal from "./Score";
import HistoryModal from "./HistoryModal";
import ReferalModal from "./ReferalModal";
import Ads from "./Ads";
import TimeandBar from "./TimeandBar";
import Success from "@/assets/Success.svg";
import Collect from "@/assets/collect.svg";
import toast from "react-hot-toast";
const icons = [
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
];

const cumulativeProbabilities = [
  0.01, 0.04, 0.09, 0.59, 1.09, 1.11, 1.13, 2.13, 3.13, 3.15, 4.15, 5.15, 35.15,
  65.15, 100.05,
];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

let outcomes = [
  { combination: [Icon1, Icon1, Icon1], points: 10, type: "btc" },
  { combination: [Icon1, Icon1, Icon2], points: 5, type: "btc" },
  { combination: [Icon1, Icon2, Icon2], points: 2.5, type: "btc" },
  { combination: [Icon2, Icon2, Icon2], points: 10, type: "berry" },
  { combination: [Icon3, Icon3, Icon3], points: 10, type: "berry" },
  { combination: [Icon4, Icon4, Icon4], points: 2, type: "multiplier" },
  { combination: [Icon5, Icon5, Icon5], points: 1, type: "spin" },
  { combination: [Icon6, Icon6, Icon6], points: 5, type: "berry" },
  { combination: [Icon7, Icon7, Icon7], points: 5, type: "berry" },
  { combination: [Icon8, Icon8, Icon8], points: 1.5, type: "multiplier" },
  { combination: [Icon9, Icon9, Icon9], points: 0, type: null },
  { combination: [Icon10, Icon10, Icon10], points: 0, type: null },
  {
    combination: [getRandomIcon(), getRandomIcon(), Icon9],
    points: 0,
    type: null,
  },
  {
    combination: [getRandomIcon(), getRandomIcon(), Icon10],
    points: 0,
    type: null,
  },
];

const generateUniqueCombination = (existingCombinations) => {
  let newCombination;
  let isUnique = false;

  while (!isUnique) {
    newCombination = [getRandomIcon(), getRandomIcon(), getRandomIcon()];
    isUnique = !existingCombinations.some(
      (comb) =>
        comb.combination[0] === newCombination[0] &&
        comb.combination[1] === newCombination[1] &&
        comb.combination[2] === newCombination[2]
    );
  }

  return newCombination;
};

// Generate a unique combination and push it to outcomes
const newUniqueCombination = generateUniqueCombination(outcomes);
outcomes.push({ combination: newUniqueCombination, points: 0, type: null });

const finalResult = () => {
  const rand = Math.random() * 100;
  for (let i = 0; i < cumulativeProbabilities.length; i++) {
    if (rand <= cumulativeProbabilities[i]) {
      return i;
    }
  }
  return cumulativeProbabilities.length - 1;
};

const JackpotGame = () => {
  const { isMobile, newUser, setNewUser } = useGlobal();
  const {
    setSpinResult,
    spinResult,
    spin,
    balance,
    historyVisible,
    setHistoryVisible,
    collectReward,
    multiplier,
  } = useSpin();
  const [outputText, setOutputText] = useState("");
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
  const handleSpinClick = () => {
    if (spinning) return;
    // if (!spin) {
    //   toast("No spins left ,Buy spin.");
    //   return;
    // }
    outcomes.pop();
    const newUniqueCombination = generateUniqueCombination(outcomes);
    outcomes.push({ combination: newUniqueCombination, points: 0, type: null });
    setSpinResult(null);
    setSpinning(true);
    const spinDurations = [3000, 4000, 5000];
    const spinIntervals = [];

    const spinColumn = (setIcons) => {
      const interval = setInterval(() => {
        setIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          newIcons.unshift(getRandomIcon());
          newIcons.pop();
          return newIcons;
        });
      }, 600);
      return interval;
    };

    // Start spinning columns
    spinIntervals.push(spinColumn(setLeftIcons));
    setTimeout(() => spinIntervals.push(spinColumn(setMiddleIcons)), 300);
    setTimeout(() => spinIntervals.push(spinColumn(setRightIcons)), 600);

    const jack = finalResult();

    // Stop spinning columns at different times
    spinDurations.forEach((duration, index) => {
      setTimeout(() => {
        clearInterval(spinIntervals[index]);
        if (index == 0)
          setLeftIcons([
            getRandomIcon(),
            outcomes[jack].combination[0],
            getRandomIcon(),
          ]);
        else if (index == 1)
          setLeftIcons([
            getRandomIcon(),
            outcomes[jack].combination[1],
            getRandomIcon(),
          ]);
        else {
          setLeftIcons([
            getRandomIcon(),
            outcomes[jack].combination[1],
            getRandomIcon(),
          ]);
          setSpinning(false);
          setSpinResult({
            points: outcomes[jack].points,
            type: outcomes[jack].type,
          });
          setOutputText(
            outcomes[jack].type === 'btc' || outcomes[jack].type === 'berry'
              ? `${outcomes[jack].points} X ${multiplier} = ${outcomes[jack].points * multiplier} ${outcomes[jack].type} Points`
              : `+ ${outcomes[jack].points} ${outcomes[jack].type} Points`
          );
          if (outcomes[jack].type) {
            setScoreVisible(true);
          } else {
            toast("Better Luck Next Time...");
          }
        }
      }, duration);
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isMobile ? "mt-[10px]" : "mt-[40px]"
      }`}
    >
      <div className={`flex items-start justify-between`}>
        {!isMobile && (
          <div>
            <Ads />
            <TimeandBar />
            {scoreVisible && (
              <div className="mt-[15px]  successBg flex flex-col items-center px-[17px] pb-[15px] rounded-[15px]">
                <img src={Success.src} alt="" className="w-[180px]" />
                <p className="font-bold text-[20px] leading-[25px] mt-[-15px] mb-[15px]">
                  {outputText}
                </p>
                <button
                  onClick={async () => {
                    setScoreVisible(false);
                  }}
                >
                  <img src={Collect.src} alt="" />
                </button>
              </div>
            )}
          </div>
        )}
        <div
          className={`flex items-center justify-center relative mx-[20px] ${
            isMobile ? "" : "w-full"
          }`}
        >
          <img
            src={SpinFrame.src}
            alt="Spin Frame"
            className={`${isMobile ? "" : "w-full"}`}
          />
          <div
            className={`flex items-center justify-center h-full py-[12px] w-full absolute ${
              isMobile ? "px-[10px] py-[12px]" : "px-[30px] py-[30px]"
            }`}
          >
            {[leftIcons, middleIcons, rightIcons].map((column, colIdx) => (
              <div
                key={colIdx}
                className={`w-1/3 h-full flex flex-col items-center justify-between overflow-hidden`}
              >
                {column.map((icon, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-center w-full ${
                      idx === 1 ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <img
                      src={icon.src}
                      alt={`Icon ${colIdx}-${idx}`}
                      className={` ${isMobile ? "w-[38px]" : "h-[90px]"}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`${
          !isMobile
            ? "bg-[#000000] bg-opacity-40 flex justify-between items-center w-screen px-[80px] py-[12px] fixed bottom-0"
            : "flex flex-col items-center px-[45px] mt-[20px] w-full"
        }`}
      >
        <div
          className={`flex ${
            !isMobile ? "justify-around gap-3" : "justify-between w-full"
          } items-center`}
        >
          <img
            src={Rules.src}
            alt="Rules"
            className={`cursor-pointer`}
            onClick={() => setRuleVisible(true)}
          />
          <img
            src={Share.src}
            alt="Share"
            className={`cursor-pointer`}
            onClick={() => setShareVisible(true)}
          />
          <img
            src={Topup.src}
            alt="Topup"
            className={`cursor-pointer `}
            onClick={() => setTopupVisible(true)}
          />
        </div>
        <div
          className={`${
            !isMobile
              ? "flex justify-between flex-row-reverse items-center gap-[24px]"
              : "flex flex-col items-center mt-[16px]"
          }`}
        >
          <button onClick={handleSpinClick} className="">
            <img src={SpinButton.src} alt="Spin" />
          </button>
          <p
            className={`text-[#737476] text-[8.41px] leading-[10.18px] ${
              isMobile ? "mt-[8px]" : ""
            }`}
          >
            {spin} spin left
          </p>
          <div
            className={`cursor-pointer relative ${
              isMobile ? "mt-[10px]" : ""
            } bg-[#262526] rounded-full py-[7px] pl-[20px] pr-[10px] text-[8px] leading-[10px] font-semibold text-[#CCCCCC] flex items-center`}
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
            {balance} WBTC
          </div>
        </div>
      </div>

      <RulesModal visible={ruleVisible} setvisible={setRuleVisible} />
      <ShareModal visible={shareVisible} setvisible={setShareVisible} />
      <TopupModal visible={topupVisible} setvisible={setTopupVisible} />
      {isMobile && (
        <ScoreModal
          visible={scoreVisible}
          setvisible={setScoreVisible}
          outputText={outputText}
        />
      )}
      <HistoryModal
        visible={historyVisible}
        setvisible={setHistoryVisible}
        setTopup={setTopupVisible}
        setShare={setShareVisible}
      />
      <ReferalModal visible={newUser} setvisible={setNewUser} />
    </div>
  );
};

export default JackpotGame;
