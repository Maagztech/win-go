"use client";
import Modal from "react-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Back from "@/assets/Back.svg";
import { useGlobal } from "@/contexts/globalContext";
export default function MoonPayModal({ visible, setvisible }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const { userData, isMobile } = useGlobal();
  const fetchUrl = async () => {
    await axios
      .get(
        `https://sdk.komet.me/onramp/moonpay?walletAddress=${userData?.address}&theme=dark`
      )
      .then((res) => {
        setUrl(res.data?.url);
      });
  };

  useEffect(() => {
    if (userData?.address) {
      fetchUrl();
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
          className={`font-semibold text-2xl  leading-6`}
          style={{ letterSpacing: "-0.04em" }}
        >
          Moonpay
        </p>
      </div>
      <div className="mt-2 p-1 h-[100%] pb-[30px] w-[100%]  justify-start flex items-start self-center">
        <>
          {url && (
            <iframe
              src={url}
              allow="accelerometer; autoplay; camera; gyroscope; payment"
              width="100%"
              height="85%"
            />
          )}
        </>
      </div>
    </Modal>
  );
}
