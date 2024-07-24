import { useGlobal } from "@/contexts/globalContext";
import React from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Icon1 from "@/assets/icon1berry.svg";
import Icon2 from "@/assets/icon2.svg";
import Icon3 from "@/assets/icon3.svg";
import Icon4 from "@/assets/icon4.svg";
import Icon5 from "@/assets/icon5.svg";
import Okay from "@/assets/Okay.svg";
import LongLine from "@/assets/LongLine.svg";

const RulesModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();
  const iconsList = [
    { src: Icon1, value: 10 },
    { src: Icon2, value: 20 },
    { src: Icon3, value: 30 },
    { src: Icon4, value: 40 },
    { src: Icon5, value: 50 },
  ];

  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "650px" : "100%",
      width: isMobile ? "100%" : "400px",
      backgroundColor: "#252A3E",
      zIndex: 1050,
      fontFamily: "Oxanium",
      overflow: "auto", // Enable scrolling if content overflows
    },
    overlay: {
      zIndex: 1040,
    },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible}
      onRequestClose={() => setvisible(false)}
      style={customStylesModal}
      className="Modal overflow-x-hidden"
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      <div className="px-4">
        <div className="flex justify-center">
          {isMobile && <img src={Line.src} alt="Line" />}
        </div>
        <p
          className={`font-semibold text-2xl leading-6 ${
            isMobile ? "text-center mt-5" : "mt-[80px]"
          }`}
          style={{ letterSpacing: "-0.04em" }}
        >
          Rules & Regulation
        </p>
        <div
          style={{
            background: "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
          className="mt-5"
        >
          <p>Paytable</p>
          <div className="mt-3 grid grid-cols-2 gap-4 mx-[80px]">
            {iconsList.map((icon, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img
                  src={icon.src.src}
                  alt={`Icon ${index}`}
                  className="w-[16px] h-[16px]"
                />
                <span className="text-sm">{icon.value} Berry</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 mb-[50px]">
          <ul className="list-disc pl-5 space-y-3 text-base font-normal leading-6 text-left text-white">
            <li>
              Players should determine a fixed budget for their gameplay and
              stick to it. Once the budget is exhausted, they should stop
              playing to avoid overspending.
            </li>
            <li>
              Players should familiarize themselves with the paytable of the
              slot machine to understand the value of each symbol and the
              winning combinations.
            </li>
            <li>
              Players should take advantage of any bonuses, free spins, or
              promotional offers provided by the app. These can extend gameplay
              and increase the chances of winning without additional cost.
            </li>
            <li>
              Players should always play for fun and not as a way to make money.
              They should take regular breaks and avoid chasing losses. If they
              feel they are losing control, they should seek help or consider
              self-exclusion options provided by the app.
            </li>
          </ul>
        </div>
      </div>
      <div className="bottomShadow sticky bottom-[0px] w-full bg-[#252A3E] flex flex-col items-center">
        <img
          src={Okay.src}
          alt=""
          className="mt-3 cursor-pointer"
          onClick={() => setvisible(false)}
        />
        <img src={LongLine.src} alt="" className="mt-7 mb-3" />
      </div>
    </Modal>
  );
};

export default RulesModal;
