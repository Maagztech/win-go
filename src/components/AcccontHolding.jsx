import React from "react";
import CircularCoin from "@/assets/circularMoney.svg";
import RectangularMoney from "@/assets/rectangularMoney.svg";
import GreenLight from "@/assets/greenLight.svg";
import GreenStar from "@/assets/greenStar.svg";

const Group = ({ img, text }) => (
  <div className="relative bg-[#252525] rounded-full py-[6px] pl-[20px] pr-[10px] text-[7.79px] leading-[9.42px] font-semibold text-[#CCCCCC]">
    <img src={img} alt="" className="absolute left-[-11px] w-[21.18px] top-0" />
    {text}
  </div>
);

const AccountHolding = () => (
  <div className="flex justify-center items-center gap-[27px] mt-[30px]">
    <Group img={CircularCoin.src} text="17,44,213" />
    <Group img={RectangularMoney.src} text="FO" />
    <Group img={GreenLight.src} text="0" />
    <Group img={GreenStar.src} text="26" />
  </div>
);

export default AccountHolding;
