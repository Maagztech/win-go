import { useGlobal } from "@/contexts/globalContext";
import React from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Continue from "@/assets/continue.svg";
import LongLine from "@/assets/longLine.svg";
import Points from "@/assets/points.svg";
import Cross from "@/assets/cross.svg";
import GreenTick from "@/assets/ticklshare.svg";
import Back from "@/assets/Back.svg";
import Copy from "@/assets/Copy.svg";
import { useSpin } from "@/contexts/spinContext";
import toast from "react-hot-toast";

const ShareModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();
  const { referal } = useSpin();
  const siteMainUrl = "https://spin-the-wheel-seven.vercel.app"; // Replace with your site main URL

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

  const shareReferral = () => {
    const referralText = `Sign up on ${siteMainUrl} and win up to $10 free WBTC! Use my referral code ${referal} to get 1 extra spins.`;
    navigator.clipboard
      .writeText(referralText)
      .then(() => {
        if (navigator.share) {
          navigator
            .share({
              title: "Referral Code",
              text: referralText,
              url: siteMainUrl,
            })
            .catch((error) => console.log("Error sharing", error));
        } else {
          toast("Referral code copied to clipboard!");
        }
      })
      .catch((error) => console.log("Error copying text", error));
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
        <div
          className={`flex gap-[8px]  mb-[28px] items-center ${
            isMobile ? "mt-5 justify-between" : "mt-[40px]"
          }`}
        >
          {!isMobile && (
            <button onClick={() => setvisible(false)}>
              <img src={Back.src} alt="Back" />
            </button>
          )}

          <p
            className={`font-semibold text-2xl leading-6`}
            style={{ letterSpacing: "-0.04em" }}
          >
            Refer & Earn
          </p>
          {isMobile && (
            <button onClick={() => setvisible(false)} className="p-1">
              <img src={Cross.src} alt="" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <img src={Points.src} alt="Points" />
          <p className="text-[14px] font-extrabold leading-[18px] tracking-[-0.04em] text-left">
            290
            <span className="ml-[2px] text-[12px] font-normal leading-[18px] tracking-[-0.04em] text-left opacity-40">
              Points Earned
            </span>
          </p>
        </div>
        <div className="border-b border-[#C9C5EB4D] my-[10px]"></div>
        <div className="flex mt-[20px] gap-[13px] items-start w-full">
          <img src={GreenTick.src} alt="Green Tick" />
          <div className="font-medium text-[16px] leading-[18px] tracking-[-0.04em] flex-1">
            <p>Share to friends</p>
            <div className="border-b border-[#F5F5FA] my-[21px] w-full"></div>
            <p>Friends Sign Up Using Your Referral</p>
            <div className="border-b border-[#F5F5FA] my-[21px] w-full"></div>
            <p>Earn Rewards</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          !isMobile ? "bottomShadow" : ""
        } sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center`}
      >
        <div className="px-[20px] w-full">
          <div className="px-[12px] mt-[12px] w-full flex items-center justify-between bg-[#F1F0FA80] border border-[#C9C5EB4D] rounded-[4px]">
            <p className="py-[10px] text-opacity-60 font-medium text-[12px] leading-[15px]">
              {referal}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(referal);
                toast("Copied");
              }}
            >
              <img src={Copy.src} alt="" />
            </button>
          </div>
        </div>
        <img
          src={Continue.src}
          alt="Continue"
          className="mt-[8px] cursor-pointer"
          onClick={() => shareReferral()}
        />
        <img src={LongLine.src} alt="Long Line" className="mt-7 mb-3" />
      </div>
    </Modal>
  );
};

export default ShareModal;
