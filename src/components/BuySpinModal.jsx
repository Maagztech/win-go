import { useGlobal } from "@/contexts/globalContext";
import React, { useState } from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Continue from "@/assets/continue.svg";
import LongLine from "@/assets/longLine.svg";
import Selected from "@/assets/filledRadio.svg";
import Refresh from "@/assets/refresh.svg";
import { useSpin } from "@/contexts/spinContext";
import Polygon from "@/assets/polygon.svg";
import { getProfileImage } from "@/data/globalData";
const BuySpinModal = ({ visible, setvisible, setTopup }) => {
  const { isMobile, userData } = useGlobal();
  const { balance, fetchBal, buySpin } = useSpin();
  const [s, setS] = useState(null);

  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "290px" : "100%",
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
      <div className="flex-1 px-4">
   
        <div className="flex justify-center">
          {isMobile && <img src={Line.src} alt="Line" />}
        </div>
        <div
          className={`flex gap-[8px] justify-start mb-[8px] items-center ${
            isMobile ? "text-center mt-5" : "mt-[40px]"
          }`}
        >
          {/* <button onClick={() => setvisible(false)}>
            <img src={Back.src} alt="" />
          </button> */}
          <p
            className={`text-[14px] text-white  leading-[18px] text-opacity-60`}
            style={{ letterSpacing: "-0.04em" }}
          >
            Enter Spin
          </p>
        </div>

        <div className="flex items-center gap-2 mb-[8px]">
          <div className="relative flex items-center">
            <input
              className="w-[2ch] font-medium text-[24px] leading-[30px] tracking-[-0.04em] bg-transparent text-white focus:outline-none"
              type="number"
              placeholder={0}
              value={s}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setS(value);
                }
              }}
            />
          </div>
          <div className="border-l-[3px] border-white h-[30px]"></div>
          <p className="text-white text-opacity-60">Spin</p>
        </div>
        <p className="font-bold text-[14px] leading-[18px] tracking-[-0.04em] mt-1">
          ${((s * 1) / 3).toFixed(5)}
        </p>
        <div className="border-b border-[#C9C5EB4D] mt-[16px] mb-[8px]"></div>
        <div className="px-[15px] flex items-center justify-between">
          <div className="flex items-center gap-[26px]">
            <div className="relative">
              <img
                src={getProfileImage(userData?.userId)}
                alt="User icon"
                className="rounded-[2px] h-[36px] w-[36px]"
              />
              <img
                src={Polygon.src}
                alt=""
                className="absolute bottom-[0px] right-0 mr-[-14px] h-[20px] w-[20px] rounded-full border border-white bg-white"
              />
            </div>
            <div>
              <p className="font-semibold text-[12px] leading-[18px] tracking-[-0.04em] mb-[2px]">
                {userData?.username}
              </p>
              <p className="text-white text-opacity-60 text-[12px] leading-[15px]">
                {userData?.address.substring(0, 4)}...
                {userData?.address.substring(
                  userData?.address.length - 4,
                  userData?.address.length
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[19px]">
            <div>
              <div className="flex items-center gap-1 mb-[4px]">
                <p className="text-white text-opacity-60 text-[12px] leading-[15px]">
                  Balance
                </p>
                <button onClick={() => fetchBal()}>
                  <img src={Refresh.src} alt="" />
                </button>
              </div>
              <p className="font-semibold text-[12px] leading-[18px] tracking-[-0.04em]">
                {balance} WBTC
              </p>
            </div>
            <img src={Selected.src} alt="" className="h-[20px] w-[20px]" />
          </div>
        </div>
      </div>
      <div
        className={`${
          !isMobile ? "bottomShadow" : ""
        } sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center px-[30px]`}
      >
        <img
          src={Continue.src}
          alt=""
          className="mt-3 cursor-pointer"
          onClick={() => {
            if (s) buySpin(s, setTopup);
          }}
        />
        <img src={LongLine.src} alt="" className="mt-7 mb-3" />
      </div>
    </Modal>
  );
};

export default BuySpinModal;
