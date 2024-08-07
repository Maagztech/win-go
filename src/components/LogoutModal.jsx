import React from "react";
import Modal from "react-modal";
import Cancel from "@/assets/cancel.svg";
import LogoutButton from "@/assets/Logoutbutton.svg";
import LogoutImage from "@/assets/Logoutmodal.svg";
import { useGlobal } from "@/contexts/globalContext";
const LogoutModal = ({ visible, setvisible }) => {
  const { isMobile, logoutFromKomet } = useGlobal();
  const customStylesModal = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: isMobile ? "408px" : "366px",
      width: isMobile ? "320px" : "400px",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      backgroundColor: "#252A3E",
      fontFamily: "Oxanium",
    },
    overlay: { zIndex: 7000 },
  };
  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible}
      onRequestClose={() => setvisible(false)}
      style={customStylesModal}
      className="Modal overflow-hidden flex flex-col items-center rounded-[15px]"
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      <img
        src={LogoutImage.src}
        alt=""
        className={`w-[127.38px] h-[86.5px] ${
          isMobile ? "mt-[60px] mb-[40px]" : "mt-[65.8px] mb-[45px]"
        }`}
      />
      <p className="text-[16px] leading-[20px]">
        Are you sure you want to log out?
      </p>
      <button
        onClick={async () => {
          logoutFromKomet();
        }}
        className={isMobile ? "mt-[46px]" : "mt-[26px]"}
      >
        <img src={LogoutButton.src} alt="" />
      </button>
      <button
        onClick={async () => {
          setvisible(false);
        }}
        className={`mt-[24px] ${isMobile ? "mb-[60px]" : "mb-[35px]"}`}
      >
        <img src={Cancel.src} alt="" />
      </button>
    </Modal>
  );
};

export default LogoutModal;
