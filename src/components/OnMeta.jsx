"use client";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useRef } from "react";
import { useGlobal } from "@/contexts/globalContext";
import Line from "@/assets/modalLine.svg";

const OnMetaModal = ({ visible, setvisible, fiatAmount }) => {
  const router = useRouter();
  const { userData, isMobile } = useGlobal();
  const widgetRef = useRef(null);

  useLayoutEffect(() => {
    const address = userData?.address;
    const email = userData?.email;

    console.log("Checking userData:", userData);

    // Ensure `onMetaWidget` is defined
    if (typeof onMetaWidget !== 'undefined') {
      if (widgetRef.current && widgetRef.current.innerHTML === "") {
        let createWidget = new onMetaWidget({
          elementId: "widget",
          apiKey: "900971f7-56c8-4c66-a3e2-c687f3590e8b",
          walletAddress: address,
          userEmail: email,
          chainId: "137",
          theme: "dark",
          fiatAmount: fiatAmount,
          fiatType: "inr",
          tokenAddress: "0xEcc24eab0fb83Ef0c536b35C44C578F750FDBB6E",
        });
        createWidget.init();
        createWidget.on("ALL_EVENTS", (status) => console.log('Event:', status));
        createWidget.on("SUCCESS", (status) => {
          console.log('Success:', status);
          router.back();
        });
      } else {
        console.error('Widget element not found');
      }
    } else {
      console.error('onMetaWidget is not defined');
    }
  }, [userData, fiatAmount, router]);

  const customStylesModal = {
    content: {
      top: isMobile ? "170px" : "0%",
      left: isMobile ? "0%" : "auto",
      right: "0%",
      bottom: "0%",
      height: "100%",
      width: isMobile ? "100%" : "400px",
      backgroundColor: "#252A3E",
      zIndex: 3000,
      fontFamily: "Oxanium",
      display: "flex",
      flexDirection: "column",
    },
    overlay: {
      zIndex: 3000,
    },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={visible}
      onRequestClose={() => setvisible(false)}
      style={customStylesModal}
      className="Modal overflow-x-hidden px-4"
      overlayClassName="Overlay"
      contentLabel="Modal"
    >
      <div className="flex justify-center">
        {isMobile && <img src={Line.src} alt="Line" />}
      </div>
      <div className="mt-2 p-1 h-[100%] pb-[30px] w-[100%] justify-start flex items-start self-center">
        <div className="w-[95%] mt-[30px]" ref={widgetRef}></div>
      </div>
    </Modal>
  );
};

export default OnMetaModal;
