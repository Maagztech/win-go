import { useGlobal } from "@/contexts/globalContext";
import React from "react";
import Modal from "react-modal";
import Success from "@/assets/Success.svg";
import Collect from "@/assets/collect.svg";
import { useSpin } from "@/contexts/spinContext";
import Noreward from "@/assets/noreward.svg";
const ScoreModal = ({ visible, setvisible, outputText }) => {
  const { spinResult } = useSpin();
  const { isMobile } = useGlobal();
  const customStylesModal = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      //   height: "100%",
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
      className="Modal overflow-x-hidden successBg flex flex-col items-center px-[17px] pb-[36px] rounded-[15px]"
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      {spinResult?.type ? (
        <>
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
          </button>{" "}
        </>
      ) : (
        <>
          <img src={Noreward.src} alt="" className="my-[35px]"/>
          <p className="font-bold text-[16px] leading-[20px]">No Rewards! </p>
          <p className="font-bold text-[20px] leading-[25px] mt-[12px]">
            Better luck next time!
          </p>
        </>
      )}
    </Modal>
  );
};

export default ScoreModal;
