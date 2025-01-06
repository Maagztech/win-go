"use client";

import Berry from "@/assets/Berry.svg";
import Rupey from "@/assets/RectangleRupey.svg";
import Rules from "@/assets/Rules.svg";
import Success from "@/assets/Success.svg";
import Topup from "@/assets/Topup.svg";
import Bitcoin from "@/assets/bitcoin.jpg";
import Bobo from "@/assets/bobo.jpg";
import Brett from "@/assets/brett.svg";
import Bull from "@/assets/bull.jpeg";
import Collect from "@/assets/collect.svg";
import Deathskull from "@/assets/deathskull.jpg";
import Doge from "@/assets/doge.svg";
import Noreward from "@/assets/noreward.svg";
import Pepe from "@/assets/pepe.svg";
import Rocket from "@/assets/rocket.jpg";
import SpinButton from "@/assets/spinButton.svg";
import SpinFrame from "@/assets/spinFrame.svg";
import Thunder from "@/assets/thunder.jpg";
import { useGlobal } from "@/contexts/globalContext";
import { useSpin } from "@/contexts/spinContext";
import { eventTrack } from "@/data/googleAnalyticsTrack";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BuySpinModal from "./BuySpinModal";
import HistoryModal from "./HistoryModal";
import ReferalModal from "./ReferalModal";
import RulesModal from "./RulesModal";
import ScoreModal from "./Score";
import ShareModal from "./ShareModal";
import TimeandBar from "./TimeandBar";
import TopupModal from "./TopupModal";

const icons = [
  Bitcoin,
  Brett,
  Pepe,
  Bobo,
  Rocket,
  Berry,
  Doge,
  Bull,
  Deathskull,
  Thunder,
];

const cumulativeProbabilities = [
  0.01, // Bitcoin, Bitcoin, Bitcoin
  0.03, // Bitcoin, Bitcoin, Pepe
  0.06, // Bitcoin, Bitcoin, Brett
  0.11, // Bitcoin, Brett, Brett
  5.11, // Brett, Brett, Brett
  10.11, // Pepe, Pepe, Pepe
  20.11, // Berry, Berry, Berry
  30.11, // Doge, Doge, Doge
  60.11, // Any, Any, Deathskull
  90.11, // Any, Any, Thunder
  125.01, // Any other, Any other, Any other
  125.21, // Bobo, Bobo, Bobo
  125.41, // Bull, Bull, Bull
  125.61, // Rocket, Rocket, Rocket
  126.61, // Deathskull, Deathskull, Deathskull
  127.61, // Thunder, Thunder, Thunder
];

const cumulativeProbabilitiesNewUser = [
  0.01, // Bitcoin, Bitcoin, Bitcoin
  5, // Bitcoin, Bitcoin, Pepe
  17, // Bitcoin, Bitcoin, Brett
  26, // Bitcoin, Brett, Brett
  36, // Brett, Brett, Brett
  50, // Pepe, Pepe, Pepe
  70, // Berry, Berry, Berry
  80, // Doge, Doge, Doge
  100, // Deathskull, Deathskull, Deathskull
  110, // Thunder, Thunder, Thunder
  125.01, // Deathskull,Thunder, Deathskull
  125.21, // Bobo, Bobo, Bobo
  125.41, // Bull, Bull, Bull
  125.61, // Rocket, Rocket, Rocket
  127.61, // Any other, Any other, Any other
];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

let outcomes = [
  { combination: [Bitcoin, Bitcoin, Bitcoin], points: 10, type: "btc" },
  { combination: [Bitcoin, Bitcoin, Pepe], points: 5, type: "btc" },
  { combination: [Bitcoin, Bitcoin, Brett], points: 2.5, type: "btc" },
  { combination: [Bitcoin, Brett, Brett], points: 0.5, type: "btc" },
  { combination: [Brett, Brett, Brett], points: 1000, type: "berry" },
  { combination: [Pepe, Pepe, Pepe], points: 750, type: "berry" },
  { combination: [Berry, Berry, Berry], points: 500, type: "berry" },
  { combination: [Doge, Doge, Doge], points: 250, type: "berry" },
  {
    combination: [Deathskull, Deathskull, Deathskull],
    points: 50,
    type: "berry",
  },
  {
    combination: [Thunder, Thunder, Thunder],
    points: 25,
    type: "berry",
  },
  {
    combination: [Deathskull, Thunder, Deathskull],
    points: 5,
    type: "berry",
  },
  { combination: [Bobo, Bobo, Bobo], points: 2, type: "multiplier" },
  { combination: [Bull, Bull, Bull], points: 1.5, type: "multiplier" },
  { combination: [Rocket, Rocket, Rocket], points: 1, type: "spin" },
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

const JackpotGame = () => {
  const { isMobile, newUser, setNewUser, mustReward, setMustReward } =
    useGlobal();
  const {
    setSpinResult,
    spinResult,
    spin,
    balance,
    historyVisible,
    setHistoryVisible,
    collectReward,
    multiplier,
    low,
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
  const [imagesLoaded, setImagesLoaded] = useState({
    success: false,
    noreward: false,
  });
  const [spinning, setSpinning] = useState(false);
  const [ruleVisible, setRuleVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [topupVisible, setTopupVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [iconSize, setIconSize] = useState(["w-[38px]", "w-[90px]"]);
  const [buySpin, setBuySpin] = useState(false);
  const [showGradient, setshowGradient] = useState(false);

  const finalResult = () => {
    let probabilities = cumulativeProbabilities;
    if (mustReward) probabilities = cumulativeProbabilitiesNewUser;
    const rand = Math.random() * 127.61;

    for (let i = 0; i < probabilities.length; i++) {
      if (rand <= probabilities[i]) {
        if (i < 5) setMustReward(false);
        return i;
      }
    }
    return probabilities.length - 1;
  };

  useEffect(() => {
    const loadImage = (src, key) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [key]: true }));
          resolve();
        };
      });
    };

    Promise.all([
      loadImage(Success.src, "success"),
      loadImage(Noreward.src, "noreward"),
    ]).then(() => {
      // Optionally handle when all images are loaded
    });
  }, []);
  const handleSpinClick = () => {
    setScoreVisible(false);
    if (spinning) return;
    if (!spin) {
      toast("No spins left ,Buy spin.");
      return;
    }

    setSpinResult(null);
    setSpinning(true);
    const spinDurations = [4000, 4000, 4000];
    let spinIntervals = [];
    const spinColumn = (setIcons) => {
      const interval = setInterval(() => {
        setIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          newIcons.unshift(getRandomIcon());
          newIcons.pop();
          return newIcons;
        });
      }, 0.0001);
      return interval;
    };

    // Start spinning columns
    spinIntervals = [
      spinColumn(setLeftIcons),
      spinColumn(setMiddleIcons),
      spinColumn(setRightIcons),
    ];

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
          setMiddleIcons([
            getRandomIcon(),
            outcomes[jack].combination[1],
            getRandomIcon(),
          ]);
        else {
          setRightIcons([
            getRandomIcon(),
            outcomes[jack].combination[1],
            getRandomIcon(),
          ]);
          setSpinning(false);
          setSpinResult({
            points: outcomes[jack].points,
            type: outcomes[jack].type,
          });
          setshowGradient(true);
          setIconSize(["w-[46px]", "w-[120px]"]);
          setTimeout(() => {
            setOutputText(
              outcomes[jack].type === "btc" || outcomes[jack].type === "berry"
                ? `+ ${outcomes[jack].type === "btc" ? "$" : ""}${
                    outcomes[jack].points
                  } X ${multiplier} = ${(
                    outcomes[jack].points * multiplier
                  ).toFixed(2)} ${
                    outcomes[jack].type === "btc" ? "$ WBTC" : "Bery  Points"
                  }`
                : `+ ${outcomes[jack].points} ${outcomes[jack].type} `
            );
            setScoreVisible(true);
            setshowGradient(false);
            setIconSize(["w-[38px]", "w-[90px]"]);

            outcomes.pop();
            const newUniqueCombination = generateUniqueCombination(outcomes);
            outcomes.push({
              combination: newUniqueCombination,
              points: 0,
              type: null,
            });
          }, 2000);
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
            {/* <Ads /> */}
            <TimeandBar />
            {scoreVisible && (
              <div
                className={`mt-[15px] flex flex-col items-center px-[17px] pb-[15px] rounded-[15px] ${
                  !imagesLoaded.success || !imagesLoaded.noreward
                    ? "hidden"
                    : "successBg"
                }`}
              >
                {spinResult && (
                  <>
                    {spinResult.type ? (
                      <>
                        {imagesLoaded.success && (
                          <img
                            src={Success.src}
                            alt="Success"
                            className="w-[180px]"
                          />
                        )}
                        <p className="font-bold text-[20px] leading-[25px] mt-[-15px] mb-[15px]">
                          {outputText}
                        </p>
                        <button
                          onClick={async () => {
                            setScoreVisible(false);
                          }}
                          className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
                        >
                          <img src={Collect.src} alt="Collect" />
                        </button>
                      </>
                    ) : (
                      <>
                        {imagesLoaded.noreward && (
                          <>
                            <img
                              src={Noreward.src}
                              alt="No Reward"
                              className="my-[30px]"
                            />
                            <p className="font-bold text-[16px] leading-[20px]">
                              No Rewards!
                            </p>
                            <p className="font-bold text-[20px] leading-[25px] mt-[12px] mb-[7px]">
                              Better luck next time!
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
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
            className={`${isMobile ? "" : "w-full"} z-[0]`}
          />
          <div className="absolute z-20 flex items-center justify-center w-full h-full">
            {showGradient && (
              <div
                className="w-2/3 h-[8px] rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
                }}
              ></div>
            )}
          </div>

          {/* <div
            className={`flex items-center justify-center h-full py-[12px] w-full absolute ${
              isMobile ? "px-[10px] py-[12px]" : "px-[30px] py-[30px]"
            }`}
          >
            {[leftIcons, middleIcons, rightIcons].map((column, colIdx) => (
              <div
                key={colIdx}
                className={`w-1/3 h-full flex flex-col items-center justify-between overflow-hidden relative`}
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
                      className={`rounded-full z-20 ${
                        isMobile
                          ? `${idx === 1 ? iconSize[0] : "w-[38px]"}`
                          : `${idx === 1 ? iconSize[1] : "w-[90px]"}`
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div> */}
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
            className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out`}
            onClick={() => {
              eventTrack(
                "GAME_RULES",
                "GAME_RULES_INITIATED",
                "USER_INITIATED_VIEWING_GAME_RULES"
              );
              setRuleVisible(true);
            }}
          />
          {/* <img
            src={Share.src}
            alt="Share"
            className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out`}
            onClick={() => {
              eventTrack(
                "REFERRAL",
                "REFERRAL_INITIATED",
                "USER_STARTED_REFERRAL_PROCESS"
              );
              setShareVisible(true);
            }}
          /> */}
          <img
            src={Topup.src}
            alt="Topup"
            className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out `}
            onClick={() => {
              eventTrack(
                "SPIN",
                "SPIN_TOPUP_STARTED",
                "USER_STARTED_TOPUP_FOR_SPIN"
              );
              setBuySpin(true);
            }}
          />
        </div>
        <div
          className={`${
            !isMobile
              ? "flex justify-between flex-row-reverse items-center gap-[24px]"
              : "flex flex-col items-center mt-[16px]"
          }`}
        >
          <button
            onClick={() => {
              handleSpinClick();
              eventTrack(
                "SLOT_MACHINE",
                "SPIN_CLICKED",
                "USER_INITIATED_A_SLOT_SPIN"
              );
            }}
            className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
          >
            <img src={SpinButton.src} alt="Spin" />
          </button>
          {/* <p
            className={`text-[#737476] text-[8.41px] leading-[10.18px] ${
              isMobile ? "mt-[8px]" : ""
            }`}
          >
            {spin} spin left
          </p> */}
          <div
            className={`cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out relative ${
              isMobile ? "mt-[10px] mb-3" : ""
            } bg-[#262526] rounded-full py-[7px] pl-[20px] pr-[10px] text-[8px] leading-[10px] font-semibold flex items-center ${
              low ? "text-[#DE3150]" : "text-[#CCCCCC]"
            }`}
            style={{ fontFamily: "Oxanium" }}
            onClick={() => {
              eventTrack(
                "SPIN",
                "SPIN_TOPUP_STARTED",
                "USER_STARTED_TOPUP_FOR_SPIN"
              );
              setBuySpin(true);
            }}
          >
            <img
              src={Rupey.src}
              alt="Rupey"
              className="absolute left-[-11px] w-[21.18px] top-0"
            />
            ₹ {balance} {" "}
            {low && (
              <span className="font-normal underline ml-[2px]">
                Low on Balance
              </span>
            )}
          </div>
        </div>
      </div>

      <RulesModal
        visible={ruleVisible}
        setvisible={setRuleVisible}
        outcome={outcomes}
      />
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
        setTopup={setBuySpin}
        setShare={setShareVisible}
      />
      <ReferalModal visible={newUser} setvisible={setNewUser} />
      <BuySpinModal
        visible={buySpin}
        setvisible={setBuySpin}
        setTopup={setTopupVisible}
      />
    </div>
  );
};

export default JackpotGame;
