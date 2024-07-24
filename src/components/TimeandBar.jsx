import React, { useState, useEffect } from "react";
import Bar from "@/assets/Bar.svg";
import Box from "@/assets/Box.svg";

const TimeandBar = () => {
  const [time, setTime] = useState({
    days: 20,
    hours: 15,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
        if (minutes > 0)
          return { days, hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0)
          return { days, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0)
          return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const Time = ({ time, label }) => {
    return (
      <div className="bg-[#06050D] px-[18px] pb-[10px] pt-[6px] w-[75px]">
        <p
          style={{ fontFamily: "Oxanium, sans-serif" }}
          className={`text-[30px] font-bold text-center ${
            label === "SEC" ? "text-[#999989]" : "text-[#FFFFE9]"
          }`}
        >
          {time.toString().padStart(2, "0")}
        </p>
        <p
          style={{
            fontFamily: "Overpass, sans-serif",
            background: "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
          className="text-[11.31px]"
        >
          {label}
        </p>
      </div>
    );
  };

  const barPercentage = 70; // Example percentage, update this value as needed

  return (
    <div className="mx-[24.58px] mt-[24px]">
      <div className="mx-[7.14px] flex justify-around">
        <Time time={time.days} label="DAYS" />
        <Time time={time.hours} label="HRS" />
        <Time time={time.minutes} label="MIN" />
        <Time time={time.seconds} label="SEC" />
      </div>
      <div className="w-full relative mt-[17px]">
        <div className="relative w-full">
          <img src={Bar.src} alt="Bar" className="w-full" />
          <div
            className="absolute top-[4px] bottom-[5px] left-[5px] right-[5px] bg-[#24B874] rounded-full"
            style={{ width: `${barPercentage}%`, boxSizing: "border-box", height: "calc(100% - 9px)" }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 relative mr-[43px]">
          <p
            className="text-[12px] font-medium leading-[15px] text-left"
            style={{ fontFamily: "Oxanium, sans-serif" }}
          >
            8.5Mn BTC
          </p>
          <p
            className="text-[12px] font-extrabold leading-[15px] text-right"
            style={{
              fontFamily: "Oxanium, sans-serif",
              background: "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            100K BTC
          </p>
        </div>
        <img src={Box.src} alt="" className="absolute right-0 top-[-13px]" />
      </div>
    </div>
  );
};

export default TimeandBar;
