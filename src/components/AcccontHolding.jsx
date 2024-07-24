import React from "react";
import CircularCoin from "@/assets/circularMoney.svg";
import RectangularMoney from "@/assets/rectangularMoney.svg";
import GreenLight from "@/assets/greenLight.svg";
import GreenStar from "@/assets/greenStar.svg";
import Logout from "@/assets/Logout.svg";
const Group = ({ img, text }) => (
  <div
    className="relative bg-[#262526] rounded-full py-[7px] pl-[20px] pr-[10px] text-[8px] leading-[10px] font-semibold text-[#CCCCCC]"
    style={{ fontFamily: "Oxanium" }}
  >
    <img src={img} alt="" className="absolute left-[-11px] w-[21.18px] top-0" />
    {text}
  </div>
);

const AccountHolding = () => (
  <div className="flex justify-end items-center mt-[30px] mx-[18px] gap-[19px]">
    <Group img={CircularCoin.src} text="17,44,213" />
    <Group img={RectangularMoney.src} text="300" />
    <Group img={GreenLight.src} text="15" />
    <Group img={GreenStar.src} text="15" />
    <img src={Logout.src} alt="" className="ml-3" />
  </div>
);

export default AccountHolding;
