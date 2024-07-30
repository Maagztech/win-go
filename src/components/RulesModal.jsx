import { useGlobal } from "@/contexts/globalContext";
import React from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Okay from "@/assets/Okay.svg";
import LongLine from "@/assets/longLine.svg";
import Back from "@/assets/Back.svg";

const RulesModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();

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
      display: "flex",
      flexDirection: "column",
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
      <div className="flex flex-col h-full relative">
        <div className="px-4 w-full overflow-Y-scroll flex-grow mb-[100px]">
          <div className="flex justify-center">
            {isMobile && <img src={Line.src} alt="Line" />}
          </div>
          <div
            className={`flex gap-[8px] justify-start mb-[28px] items-center ${
              isMobile ? "text-center mt-5" : "mt-[80px]"
            }`}
          >
            <button onClick={() => setvisible(false)}>
              <img src={Back.src} alt="Back" />
            </button>
            <p
              className={`font-semibold text-2xl leading-6 ${
                isMobile ? "text-center flex-1" : ""
              }`}
              style={{ letterSpacing: "-0.04em" }}
            >
              Rules & Regulation
            </p>
          </div>
          <div className="mt-5 flex-1 overflow-y-auto">
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
                promotional offers provided by the app. These can extend
                gameplay and increase the chances of winning without additional
                cost.
              </li>
              <li>
                Players should always play for fun and not as a way to make
                money. They should take regular breaks and avoid chasing losses.
                If they feel they are losing control, they should seek help or
                consider self-exclusion options provided by the app.
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${
            !isMobile ? "bottomShadow" : ""
          } sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center`}
        >
          <img
            src={Okay.src}
            alt="Okay"
            className="mt-3 cursor-pointer"
            onClick={() => setvisible(false)}
          />
          <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
        </div>
      </div>
    </Modal>
  );
};

export default RulesModal;
