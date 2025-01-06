import Back from "@/assets/Back.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import Okay from "@/assets/Okay.svg";
import { useGlobal } from "@/contexts/globalContext";
import Modal from "react-modal";

const RulesModal = ({ visible, setvisible, outcome }) => {
  const { isMobile } = useGlobal();

  const customStylesModal = {
    content: {
      top: isMobile ? "171px" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "auto" : "100%",
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

  const filteredOutcome = outcome.filter((icons) => icons.points !== 0);

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
        <div className="px-4 w-full overflow-y-scroll flex-grow mb-[20px]">
          <div className="flex justify-center">
            {isMobile && <img src={Line.src} alt="Line" />}
          </div>
          <div
            className={`flex gap-[8px] justify-start mb-[28px] items-center ${
              isMobile ? "text-center mt-5" : "mt-[40px]"
            }`}
          >
            <button
              onClick={() => setvisible(false)}
              className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              {!isMobile && <img src={Back.src} alt="Back" />}
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
          {/* <div className="mt-5 gradientText text-center">
            <p className="font-semibold">Paytable</p>
            <div className="pl-5 mt-3 grid grid-cols-2 gap-4">
              {filteredOutcome.map((icons, index) => (
                <div key={index} className="flex items-center gap-[4px]">
                  <div className="flex items-center gap-[-2px]">
                    {icons.combination.map((icon, idx) => (
                      <img
                        src={icon.src}
                        alt={`Icon ${idx}`}
                        key={idx}
                        className="w-[16px] h-[16px] rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-[11px]">
                    {icons.type === "btc" || icons.type === "berry"
                      ? `+ ${icons.type === "btc" ? "$" : ""} ${icons.points} ${
                          icons.type === "btc" ? "WBTC" : "Bery Points"
                        }`
                      : `+ ${icons.points} ${icons.type} `}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[35px] flex-1 overflow-y-auto">
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
          </div> */}
        </div>
        <div
          className={`${
            !isMobile ? "bottomShadow" : ""
          } sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center`}
        >
          <img
            src={Okay.src}
            alt="Okay"
            className="mt-3 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
            onClick={() => setvisible(false)}
          />
          <img src={LongLine.src} alt="Line" className="mt-7 mb-3" />
        </div>
      </div>
    </Modal>
  );
};

export default RulesModal;
