import { useGlobal } from "@/contexts/globalContext";
import React, { useState } from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Onmeta from "@/assets/onmeta.svg";
import LongLine from "@/assets/longLine.svg";
import Share from "@/assets/Scan.svg";
import buyhis from "@/assets/buyhis.svg";
import Back from "@/assets/Back.svg";
import OnMetaModal from "./OnMeta";
import toast from "react-hot-toast";
import WBTC from "@/assets/AddWBTC.svg";
import WBTClogo from "@/assets/btcLogo.svg";
import btcblack from "@/assets/btclogoblack.svg";
import { useSpin } from "@/contexts/spinContext";
const ShareModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();
  const { balance, low, rate } = useSpin();
  const [w, setW] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [onmeta, setOnmeta] = useState(false);

  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "550px" : "100%",
      width: isMobile ? "100%" : "400px",
      backgroundColor: "#252A3E",
      zIndex: 2000,
      fontFamily: "Oxanium",
      display: "flex",
      flexDirection: "column",
    },
    overlay: {
      zIndex: 2000,
    },
  };

  const handleProviderClick = (index) => {
    setSelectedProvider(index);
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
      <div className="flex-1 px-4">
        <div
          className={`flex gap-[8px] justify-start mb-[28px] items-center ${
            isMobile ? "mt-[32px]" : "mt-[40px]"
          }`}
        >
          <button onClick={() => setvisible(false)}>
            <img src={Back.src} alt="Back" />
          </button>
          <p
            className={` ${
              isMobile
                ? "flex-1 font-medium text-[16px]  leading-[20px] text-white text-opacity-60"
                : "font-semibold text-2xl  leading-6"
            }`}
            style={{ letterSpacing: "-0.04em" }}
          >
            Buy WBTC
          </p>
        </div>
        <div className="bg-[#353A4E] px-[12px] py-[23px]">
          <div className="flex items-center gap-[8px]">
            <img src={WBTClogo.src} alt="" />
            <p className="text-[#ED675C] font-bold text-[23.19px] leading-[17.39px] tracking-[-0.04em]">
              {balance}
              {low && (
                <span className="font-normal text-[15.46px] leading-[19.32px] ml-[2px]">
                  Low in Balance
                </span>
              )}
            </p>
          </div>
          <div className="border-b border-[#C9C5EB4D] mt-[12px] mb-[16px]"></div>
          <p className="font-semibold text-[10.93px] leading-[13.66px] mb-1">
            ADD WBTC
          </p>
          <div className="bg-[#06050D] px-[8px] py-[7px] mb-[12px] flex items-center gap-[8px] ">
            <img src={btcblack.src} alt="" />
            <input
              className="font-bold text-[24px] leading-[30px] tracking-[-0.04em] bg-transparent text-white focus:outline-none"
              type="text"
              placeholder="Enter in WBTC"
              value={w}
              onChange={(e) => {
                setW(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center gap-[12px]">
            <button
              className={`pt-[6px] pb-[4px] px-[8px] rounded-sm ${
                w === 0.1
                  ? "successBg text-white"
                  : "bg-[#F1F0FA80] text-[#333333]"
              } text-[11.59px]`}
              onClick={() => {
                setW(0.1);
              }}
            >
              0.1 WBTC
            </button>
            <button
              className={`pt-[6px] pb-[4px] px-[8px] rounded-sm ${
                w === 0.5
                  ? "successBg text-white"
                  : "bg-[#F1F0FA80] text-[#333333]"
              } text-[11.59px] `}
              onClick={() => {
                setW(0.5);
              }}
            >
              0.5 WBTC
            </button>
            <button
              className={`pt-[6px] pb-[4px] px-[8px] rounded-sm ${
                w === 1
                  ? "successBg text-white"
                  : "bg-[#F1F0FA80] text-[#333333]"
              } text-[11.59px]`}
              onClick={() => {
                setW(1);
              }}
            >
              1 WBTC
            </button>
          </div>
          <img
            src={WBTC.src}
            alt=""
            className="mt-3 cursor-pointer w-full px-[10px]"
            onClick={() => {
              setOnmeta(true);
            }}
          />
        </div>
        <div className="mt-[24px] rounded-[12px]  py-[12px] bg-[#353A4E] ">
          <button className="flex items-center gap-2 px-[30px]">
            <img src={buyhis.src} className="h-[16px] w-[16px]" alt="" />
            <p className="text-[16px] tracking-[-0.04em]">Payment History</p>
          </button>
          <div className="border-b border-white my-[12px] ml-[55px]"></div>
          <button className="flex items-center gap-2 px-[30px]">
            <img src={Share.src} className="h-[16px] w-[16px]" alt="" />
            <p className="text-[16px] tracking-[-0.04em]">Tell your Friends</p>
          </button>
        </div>
      </div>
      <div
        className={` bottomShadow
        sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center`}
      >
        <img src={LongLine.src} alt="" className="mt-7 mb-3" />
      </div>
      {onmeta && (
        <OnMetaModal
          visible={onmeta}
          setvisible={setOnmeta}
          fiatAmount={rate * 83 * w}
        />
      )}
    </Modal>
  );
};

export default ShareModal;
