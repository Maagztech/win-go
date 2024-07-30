import React from "react";
import CircularCoin from "@/assets/circularMoney.svg";
import RectangularMoney from "@/assets/rectangularMoney.svg";
import GreenLight from "@/assets/greenLight.svg";
import GreenStar from "@/assets/greenStar.svg";
import Logout from "@/assets/Logout.svg";
import { useGlobal } from "@/contexts/globalContext";
import { useSpin } from "@/contexts/spinContext";
const Group = ({ img, text }) => {
  const { setHistoryVisible } = useSpin();
  return (
    <div
      className="relative bg-[#262526] rounded-full py-[7px] pl-[20px] pr-[10px] text-[8px] leading-[10px] font-semibold text-[#CCCCCC]"
      style={{ fontFamily: "Oxanium" }}
    >
      <img
        src={img}
        alt=""
        className="absolute left-[-11px] w-[21.18px] top-0"
      />
      {text}
    </div>
  );
};

const AccountHolding = () => {
  const { logoutFromKomet } = useGlobal();
  const { bit, streak, multiplier, berry } = useSpin();
  return (
    <div className="flex justify-end items-center mt-[20px] mx-[18px] gap-[19px]">
      <Group img={CircularCoin.src} text={bit} />
      <Group img={RectangularMoney.src} text={berry} />
      <Group img={GreenLight.src} text={streak} />
      <Group img={GreenStar.src} text={multiplier} />
      <button onClick={() => setHistoryVisible(true)}>
        <img src={Logout.src} alt="" className="ml-3" />
      </button>
    </div>
  );
};

export default AccountHolding;
