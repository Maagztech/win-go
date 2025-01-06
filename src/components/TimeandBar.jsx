"use client";

import { useSpin } from "@/contexts/spinContext";
import { useEffect, useState } from "react";

const TimeandBar = () => {
  const { pool } = useSpin();
  
  const calculateRemainingTime = () => {
    const currentDate = new Date();
    const targetDate = new Date("2025-02-01T23:59:59");

    const totalSeconds = Math.floor((targetDate - currentDate) / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const Time = ({ time, label }) => {
    return (
      <div className="bg-[#06050D] pb-[10px] pt-[6px] w-[75px]">
        <p
          style={{ fontFamily: "Oxanium, sans-serif" }}
          className={`text-[30px] font-bold text-center ${
            label === "SEC" ? "text-[#999989]" : "text-[#FFFFE9]"
          }`}
        >
          {time.toString().padStart(2, "0")}
        </p>
        <p
          className="text-[11.31px] gradientText text-center"
          style={{ fontFamily: "Overpass, sans-serif" }}
        >
          {label}
        </p>
      </div>
    );
  };

  const barPercentage = pool?.percentage || 0;

  return (
    <div className="mx-[24.58px] mt-[15px]">
      <div className="mx-[7.14px] flex justify-around gap-[7.14px]">
        <Time time={time.days} label="DAYS" />
        <Time time={time.hours} label="HRS" />
        <Time time={time.minutes} label="MIN" />
        <Time time={time.seconds} label="SEC" />
      </div>
      {/* <div className="w-full relative mt-[17px]">
        <div className="relative w-full">
          <img src={Bar.src} alt="Bar" className="w-full" />
          <div
            className="absolute top-[4px] bottom-[5px] left-[5px] right-[5px] bg-[#24B874] rounded-full animate-bar-fill"
            style={{
              "--bar-percentage": `${barPercentage}%`,
              width: `${barPercentage}%`,
              boxSizing: "border-box",
              height: "calc(100% - 9px)",
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 relative mr-[43px]">
          <p
            className="text-[12px] font-medium leading-[15px] text-left"
            style={{ fontFamily: "Oxanium, sans-serif" }}
          >
            ${pool?.total} BTC
          </p>
          <p
            className="text-[12px] font-extrabold leading-[15px] text-right gradientText"
            style={{ fontFamily: "Overpass, sans-serif" }}
          >
            $10,000 BTC
          </p>
        </div>
        <img src={Box.src} alt="" className="absolute right-0 top-[-13px]" />
      </div> */}
    </div>
  );
};

export default TimeandBar;
