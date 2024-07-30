"use client";
import Modal from "react-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Back from "@/assets/Back.svg";
import { useGlobal } from "@/contexts/globalContext";

const OnMetaModal = ({ visible, setvisible }) => {
  const router = useRouter();
  const { userData, isMobile } = useGlobal();
  useEffect(() => {
    const address = userData?.address;
    let email = userData?.email;
    /* global onMetaWidget */
    // @ts-ignore
    if (document?.getElementById("widget")?.innerHTML === "") {
      // @ts-ignore
      let createWidget = new onMetaWidget({
        elementId: "widget",
        apiKey: "900971f7-56c8-4c66-a3e2-c687f3590e8b",
        walletAddress: address,
        userEmail: email,
        chainId: "137",
        theme: "dark",
      });
      createWidget.init();
      //createWidget.on("ALL_EVENTS", (status) => console.log(status));
      createWidget.on("SUCCESS", (status) => router.back());
      //console.log("OnMetaWidget");
    }
  }, [userData]);
  const customStylesModal = {
    content: {
      top: "0%",
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
      <div
        className={`flex gap-[8px] justify-start mb-[28px] items-center ${
          isMobile ? "text-center mt-5" : "mt-[80px]"
        }`}
      >
        <button onClick={() => setvisible(false)}>
          <img src={Back.src} alt="" />
        </button>
        <p
          className={`font-semibold text-2xl  leading-6 ${
            isMobile ? "text-center flex-1" : ""
          }`}
          style={{ letterSpacing: "-0.04em" }}
        >
          Onmeta
        </p>
      </div>
      <div className="mt-2 p-1 h-[100%] pb-[30px] w-[100%]  justify-start flex items-start self-center">
        <div className="w-[95%] mt-[30px]" id="widget"></div>
      </div>
    </Modal>
  );
};

export default OnMetaModal;
