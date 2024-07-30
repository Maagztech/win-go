import { useGlobal } from "@/contexts/globalContext";
import React, { useEffect } from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Continue from "@/assets/continue.svg";
import LongLine from "@/assets/longLine.svg";
import Back from "@/assets/Back.svg";
import toast from "react-hot-toast";

const CreateUsernameModal = ({ visible, setvisible }) => {
  const { isMobile, handleSubmit, username, setUsername, available } =
    useGlobal();
  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "420px" : "100%",
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
          className={`flex gap-[8px] justify-start mb-[28px] items-center ${
            isMobile ? "text-center mt-5" : "mt-[80px]"
          }`}
        >
          <button onClick={() => setvisible(false)}>
            {!isMobile && <img src={Back.src} alt="Back" />}
          </button>
          <p
            className={`font-semibold text-2xl  leading-6 ${
              isMobile ? "text-center flex-1" : ""
            }`}
            style={{ letterSpacing: "-0.04em" }}
          >
            Choose your Username
          </p>
        </div>
        <div className="px-[20px] mt-[24px]">
          <h3
            className="font-normal sfRegular text-[14px] opacity-60"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: "18px",
            }}
          >
            Define Username
          </h3>
          <div className="flex justify-center w-full text-center space-x-2 mt-[8px]">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-[10px] px-[12px] text-opacity-60 rounded-[4px] font-medium text-[12px] leading-[15px] w-full bg-[#F1F0FA80] border border-[#C9C5EB4D] focus:outline-none"
              placeholder="Enter username"
            />
          </div>
          {available ? (
            <p
              className="text-[12px] mt-[8px] font-extrabold "
              style={{
                lineHeight: "21.48px",
              }}
            >
              <span
                className="gradientText"
                style={{ fontFamily: "Overpass, sans-serif" }}
              >
                Looks good, LFG
              </span>
              ⚡️
            </p>
          ) : (
            <p
              className="text-[12px] mt-[8px] font-extrabold "
              style={{
                lineHeight: "21.48px",
              }}
            >
              <span
                className="gradientText"
                style={{ fontFamily: "Overpass, sans-serif" }}
              >
                Unavailable
              </span>{" "}
              🧐
            </p>
          )}
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
          className="mt-3 cursor-pointer"
          onClick={() => {
            if (available) {
              handleSubmit();
              setvisible(false);
            } else {
              toast("Please Enter a Unique Username...");
            }
          }}
        />
        <img src={LongLine.src} alt="" className="mt-7 mb-3" />
      </div>
    </Modal>
  );
};

export default CreateUsernameModal;
