import { useGlobal } from "@/contexts/globalContext";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Success from "@/assets/WBTCcredited.svg";
import Collect from "@/assets/collect.svg";
import { useSpin } from "@/contexts/spinContext";
import Noreward from "@/assets/noreward.svg";
import wbtc from "@/assets/wbtc.svg";
const ScoreModal = ({ visible, setvisible, outputText }) => {
  const { spinResult } = useSpin();
  const { isMobile } = useGlobal();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Noreward.src;
    img.onload = () => setImageLoaded(true);
  }, []);

  const customStylesModal = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "374px",
      width: "327px",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      backgroundColor: "transparent",
      fontFamily: "Oxanium",
    },
    overlay: { zIndex: 1000 },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible}
      onRequestClose={() => setvisible(false)}
      style={customStylesModal}
      className={`Modal overflow-x-hidden flex flex-col items-center px-[17px] pb-[36px] rounded-[15px] ${
        !imageLoaded ? "hidden" : "successBg"
      }`}
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      <img src={Success.src} alt="" />
      <p className="font-bold text-[20px] leading-[25px] mt-[-12px] mb-[19px]">
        {outputText}
      </p>
      <button
        onClick={async () => {
          setvisible(false);
        }}
      >
        <img src={Collect.src} alt="" />
      </button>
    </Modal>
  );
};

export default ScoreModal;
