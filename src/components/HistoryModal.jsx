import { useGlobal } from "@/contexts/globalContext";
import React from "react";
import Modal from "react-modal";
import HistoryBg from "@/assets/historyBg.svg";
import Back from "@/assets/BackButton.svg";
import Coin from "@/assets/circularMoney.svg";
import Berry from "@/assets/rectangularMoney.svg";
import Down from "@/assets/Down.svg";
import Scan from "@/assets/Scan.svg";
import Up from "@/assets/Up.svg";
import toast from "react-hot-toast";
import { useSpin } from "@/contexts/spinContext";

const HistoryModal = ({ visible, setvisible, setTopup, setShare }) => {
  const { isMobile } = useGlobal();
  const { history, rate, bit } = useSpin();

  const customStylesModal = {
    content: {
      right: isMobile ? "0%" : "0%", // Ensure it's aligned to the right
      left: isMobile ? "0%" : "auto", // Set to auto to avoid interference on laptop
      height: isMobile ? "100%" : "100%", // Full height on both mobile and laptop
      width: isMobile ? "100%" : "400px", // Full width on mobile and fixed width on laptop
      zIndex: 450,
      overflow: "auto",
      position: "absolute", // Ensure absolute positioning
    },
    overlay: {
      zIndex: 440,
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
      <div className="relative">
        {/* Background Image */}
        <img
          src={HistoryBg.src}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0" // Full cover background
        />

        {/* Modal Content */}
        <div className="h-[350px] sticky top-0 rounded-b-[35px] successBg shadow-lg shadow-slate-500 z-10">
          <img
            src={Back.src}
            alt="Back Button"
            className="pt-[20px] ml-[18px] cursor-pointer z-20"
            onClick={() => {
              console.log("Back button clicked");
              setvisible(false);
            }}
          />
          <div className="mt-[44px] flex flex-col items-center w-full relative z-20">
            <p className="text-[12px]">BALANCE IN USD</p>
            <p className="mt-[8px] text-[40px] font-medium">
              $ {bit * rate.toFixed(2).split(".")[0]}.
              <span className="text-[23px]">
                {bit * rate.toFixed(2).split(".")[1]}
              </span>
            </p>
            <div className="mt-[35px] flex w-[340px] justify-between">
              <div
                className="bg-[#000000] w-[110px] py-[20px] rounded-md flex flex-col items-center rounded-bl-[24px] cursor-pointer z-20"
                onClick={() => {
                  console.log("Top-Up clicked");
                  setTopup(true);
                }}
              >
                <img src={Down.src} alt="Top-Up" />
                <p className="text-[12px] font-medium mt-[9px]">TOP-UP</p>
              </div>
              <div
                className="bg-[#000000] w-[110px] py-[20px] rounded-md flex flex-col items-center cursor-pointer z-20"
                onClick={() => {
                  console.log("Share clicked");
                  setShare(true);
                }}
              >
                <img src={Scan.src} alt="Share" />
                <p className="text-[12px] font-medium mt-[9px]">SHARE</p>
              </div>
              <div
                className="bg-[#000000] w-[110px] py-[20px] rounded-md flex flex-col items-center rounded-br-[24px] cursor-pointer z-20"
                onClick={() => {
                  console.log("Withdraw clicked");
                  toast("Can only be withdrawn after Pool Ends.");
                }}
              >
                <img src={Up.src} alt="Withdraw" />
                <p className="text-[12px] font-medium mt-[9px]">WITHDRAWL</p>
              </div>
            </div>
          </div>
        </div>
        {/* History List */}
        <div className="px-[8px] relative z-20">
          <p className="py-[12px] font-medium text-[18px] leading-[20px]">
            Recent Activity
          </p>
          {history.map((his, index) => (
            <div
              key={index}
              className="border border-[#333333] py-[17px] px-[12px] rounded-[16px] mb-[8px] flex justify-between"
            >
              <div className="flex items-center">
                <div className="bg-[#333333] rounded-[16px] flex justify-center items-center w-[40px] h-[40px]">
                  <img
                    src={his.type == "btc" ? Coin.src : Berry.src}
                    alt={his.type}
                    className="w-[20px] h-[20px]"
                  />
                </div>
                <div className="ml-[10px]">
                  <p className="text-[14px] font-medium mb-[2px]">
                    {his.points}
                  </p>
                  <p className="text-[12px] text-[#8A929A]">
                    {his.type == "btc" ? "Bitcoin" : "Berries"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-medium mb-[2px]">
                  {his.points * rate.toFixed(2)}
                </p>
                <p className="text-[12px] text-[#8A929A]">
                  {/* {new Intl.DateTimeFormat("en-GB").format(his.lastUpdated)} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;
