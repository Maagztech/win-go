import { useGlobal } from "@/contexts/globalContext";
import React, { useState } from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Onramp from "@/assets/onramp.svg";
import Onmeta from "@/assets/onmeta.svg";
import Moonpay from "@/assets/moonpay.svg";
import Continue from "@/assets/continue.svg";
import LongLine from "@/assets/LongLine.svg";
import Selected from "@/assets/filledRadio.svg";
import Unselected from "@/assets/unfillRadio.svg";
import Points from "@/assets/points.svg";
import GreenTick from "@/assets/ticklshare.svg";
const ShareModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();
  const [selectedProvider, setSelectedProvider] = useState(0);

  const providers = [
    {
      img: Onramp,
      name: "Onramp",
      description: "Bank transfer, UPI",
    },
    {
      img: Moonpay,
      name: "Moonpay",
      description: "Credit Card, Debit Card",
    },
    {
      img: Onmeta,
      name: "Onmeta",
      description: "Bank transfer, UPI, Cards",
    },
  ];

  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "467px" : "100%",
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
      <div className="flex-1 px-4 w-full">
        <div className="flex justify-center">
          {isMobile && <img src={Line.src} alt="Line" />}
        </div>
        <p
          className={`font-semibold text-2xl leading-6 mb-[16px] ${
            isMobile ? "text-center mt-5" : "mt-[80px]"
          }`}
          style={{ letterSpacing: "-0.04em" }}
        >
          Refer & Earn
        </p>
        <div className="flex items-center gap-[8px]">
          <img src={Points.src} alt="" />
          <p className="text-[14px] font-extrabold leading-[18px] tracking-[-0.04em] text-left">
            290
            <span className="ml-[2px] text-[12px] font-normal leading-[18px] tracking-[-0.04em] text-left opacity-40">
              Points Earned
            </span>
          </p>
        </div>
        <div className="border-b border-[#C9C5EB4D] my-[10px]"></div>
        <div className="flex mt-[20px] gap-[13px] items-start w-full">
          <img src={GreenTick.src} alt="" />
          <div className="font-medium text-[16px] leading-[18px] tracking-[-0.04em] flex-1">
            <p>Share to friends</p>
            <div className="border-b border-[#F5F5FA] my-[21px] w-full"></div>
            <p>Friends Sign Up Using Your Referral</p>
            <div className="border-b border-[#F5F5FA] my-[21px]  w-full"></div>
            <p>Earn Rewards</p>
          </div>
        </div>
      </div>
      <div className="bottomShadow sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center">
        <div className="px-[20px]  mt-[12px] w-full">
          <p className="py-[10px] px-[12px] text-opacity-60 rounded-[4px] font-medium text-[12px] leading-[15px] w-full bg-[#F1F0FA80] border border-[#C9C5EB4D]">20xceb494b5kt9gfb9fn</p>
        </div>
        <img
          src={Continue.src}
          alt=""
          className="mt-[8px] cursor-pointer"
          onClick={() => setvisible(false)}
        />
        <img src={LongLine.src} alt="" className="mt-7 mb-3" />
      </div>
    </Modal>
  );
};

export default ShareModal;
