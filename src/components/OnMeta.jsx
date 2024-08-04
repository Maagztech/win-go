"use client";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import React from "react";
import { useGlobal } from "@/contexts/globalContext";
import Line from "@/assets/modalLine.svg";
import Cross from "@/assets/cross.svg";
import Back from "@/assets/Back.svg";
const OnMetaModal = ({ visible, setvisible }) => {
  const router = useRouter();
  const { isMobile } = useGlobal();
  const customStylesModal = {
    content: {
      top: isMobile ? "auto" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: isMobile ? "auto" : "100%",
      width: isMobile ? "100%" : "400px",
      backgroundColor: "#252A3E",
      zIndex: 1800,
      fontFamily: "Oxanium",
      display: "flex",
      flexDirection: "column",
    },
    overlay: {
      zIndex: 1800,
    },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible}
      onRequestClose={() => setvisible(false)}
      style={customStylesModal}
      className={`Modal overflow-x-hidden px-4 flex flex-col items-center justify-center`}
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      <div className="flex justify-center">
        {isMobile && <img src={Line.src} alt="Line" />}
      </div>
      <div
        className={`flex w-full gap-[8px]  mb-[28px] items-center ${
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
          Add WBTC
        </p>
        {isMobile && (
          <button onClick={() => setvisible(false)} className="p-1">
            <img src={Cross.src} alt="" />
          </button>
        )}
      </div>
      <div id="widget" className=" w-full h-full pb-3"></div>
    </Modal>
  );
};

export default OnMetaModal;
