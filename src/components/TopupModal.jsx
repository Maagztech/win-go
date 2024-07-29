import { useGlobal } from "@/contexts/globalContext";
import React, { useState } from "react";
import Modal from "react-modal";
import Line from "@/assets/modalLine.svg";
import Onramp from "@/assets/onramp.svg";
import Onmeta from "@/assets/onmeta.svg";
import Moonpay from "@/assets/moonpay.svg";
import Continue from "@/assets/continue.svg";
import LongLine from "@/assets/longLine.svg";
import Selected from "@/assets/filledRadio.svg";
import Unselected from "@/assets/unfillRadio.svg";
import Back from "@/assets/Back.svg";
const ShareModal = ({ visible, setvisible }) => {
  const { isMobile } = useGlobal();
  const [selectedProvider, setSelectedProvider] = useState(0);

  const providers = [
    {
      img: Onramp,
      name: "Onramp",
      description: "Bank transfer, UPI",
    },
    {
      img: Moonpay,
      name: "Moonpay",
      description: "Credit Card, Debit Card",
    },
    {
      img: Onmeta,
      name: "Onmeta",
      description: "Bank transfer, UPI, Cards",
    },
  ];

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

  const handleProviderClick = (index) => {
    setSelectedProvider(index);
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
            <img src={Back.src} alt="" />
          </button>
          <p
            className={`font-semibold text-2xl  leading-6 ${
              isMobile ? "text-center flex-1" : ""
            }`}
            style={{ letterSpacing: "-0.04em" }}
          >
            Choose your provider
          </p>
        </div>
        {providers.map((provider, index) => (
          <div key={index}>
            <div
              className="flex items-center justify-between cursor-pointer p-[12px]"
              onClick={() => handleProviderClick(index)}
            >
              <div className="flex items-center">
                <img src={provider.img.src} alt={provider.name} />
                <div className="ml-3">
                  <p className="font-medium text-[14px] leading-[18px] mb-[2px]">
                    {provider.name}
                  </p>
                  <p
                    className="text-[12px] leading-[15px]"
                    style={{ opacity: 0.6 }}
                  >
                    {provider.description}
                  </p>
                </div>
              </div>
              <img
                src={selectedProvider === index ? Selected.src : Unselected.src}
                alt=""
              />
            </div>
            {index < providers.length - 1 && (
              <div className="border-b border-[#C9C5EB4D] my-[10px]"></div>
            )}
          </div>
        ))}
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
            setvisible(false);
          }}
        />
        <img src={LongLine.src} alt="" className="mt-7 mb-3" />
      </div>
    </Modal>
  );
};

export default ShareModal;
