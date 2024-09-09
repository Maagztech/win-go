import Continue from "@/assets/continue.svg";
import Cross from "@/assets/cross.svg";
import LongLine from "@/assets/longLine.svg";
import Line from "@/assets/modalLine.svg";
import { useGlobal } from "@/contexts/globalContext";
import { useSpin } from "@/contexts/spinContext";
import { eventTrack } from "@/data/googleAnalyticsTrack";
import { useState } from "react";
import Modal from "react-modal";

const ReferalModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();
  const { refaral } = useSpin();
  const [referralCode, setReferralCode] = useState("");

  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "255px" : "100%",
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

  const handleInputChange = (e) => {
    setReferralCode(e.target.value);
  };

  const handleContinueClick = async () => {
    await refaral(referralCode, setvisible);
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
          className={`flex justify-between items-start mb-[16px] gap-[30px] ${
            isMobile ? "mt-5" : "mt-[40px]"
          }`}
        >
          <p
            className={`font-medium text-2xl leading-6 `}
            style={{ letterSpacing: "-0.04em" }}
          >
            Enter your referral code & get 1 Spin Extra
          </p>
          <button
            onClick={() => setvisible(false)}
            className="p-1 hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
          >
            <img src={Cross.src} alt="" />
          </button>
        </div>

        <div className="border-b border-[#C9C5EB4D] my-[10px]"></div>
        <div className="mt-[12px] w-full">
          <input
            className="py-[10px] px-[12px] text-opacity-60 rounded-[4px] font-medium text-[12px] leading-[15px] w-full bg-[#F1F0FA80] border border-[#C9C5EB4D] focus:outline-none"
            value={referralCode}
            onChange={handleInputChange}
            placeholder="Enter Friends Referal code"
          />
        </div>
      </div>
      <div
        className={`${
          !isMobile ? "bottomShadow" : ""
        } sticky bottom-0 w-full bg-[#252A3E] flex flex-col items-center`}
      >
        <img
          src={Continue.src}
          alt=""
          className="mt-[8px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out mb-2"
          onClick={() => {
            handleContinueClick();
            eventTrack(
              "REFERRAL",
              "REFERRAL_CONFIRMED",
              "USER_CONFIRMED_REFERRAL"
            );
          }}
        />
        <button className="opacity-60 text-[12px] leading-[15px] tracking-[-0.04em] hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out">
          Continue without Code
        </button>
        <img src={LongLine.src} alt="" className="mt-[5px] mb-3" />
      </div>
    </Modal>
  );
};

export default ReferalModal;
