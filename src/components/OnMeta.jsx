"use client";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import React from "react";
import { useGlobal } from "@/contexts/globalContext";
import Line from "@/assets/modalLine.svg";

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
      <div className={`mt-4 pb-[30px] flex-1 justify-start flex items-center`}>
        <div id="widget"></div>
      </div>
    </Modal>
  );
};

export default OnMetaModal;
