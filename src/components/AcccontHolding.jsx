import CircularCoin from "@/assets/circularCoin.png";
import GreenLight from "@/assets/greenLight.svg";
import GreenStar from "@/assets/greenStar.svg";
import Logout from "@/assets/Logout.svg";
import RectangularMoney from "@/assets/rectangularMoney.png";
import { useSpin } from "@/contexts/spinContext";
import { eventTrack } from "@/data/googleAnalyticsTrack";
const Group = ({ img, text }) => {
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
  const { setHistoryVisible } = useSpin();
  const { bit, streak, multiplier, berry } = useSpin();
  return (
    <div className="flex justify-end items-center mt-[20px] mx-[18px] gap-[19px]">
      <Group img={CircularCoin.src} text={bit} />
      <Group img={RectangularMoney.src} text={berry} />
      <Group img={GreenLight.src} text={streak} />
      <Group img={GreenStar.src} text={multiplier} />
      <button
        onClick={() => {
          eventTrack(
            "HISTORY",
            "HISTORY_TAB_CLICKED",
            "USER_CLICKED_ON_HISTORY_TAB"
          );
          setHistoryVisible(true);
        }}
        className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
      >
        <img src={Logout.src} alt="" className="ml-3" />
      </button>
    </div>
  );
};

export default AccountHolding;
