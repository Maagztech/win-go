"use client";

import { useGlobal } from "@/contexts/globalContext";
import OnboardMobile from "@/assets/onboardMobile.svg";
import OnboardMobileBg from "@/assets/onboardMobileBg.svg";
import EnterButton from "@/assets/enterButton.svg";
import EnterButtonComp from "@/assets/enterButtonComp.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isMobile } = useGlobal();
  const router = useRouter();

  return (
    <main className="h-[100vh]">
      {isMobile ? (
        <div className="bg-[#252A3E] w-full h-full flex flex-col overflow-hidden">
          <div className="flex-grow">
            <img src={OnboardMobile.src} alt="" className="w-full mt-[70px]" />
          </div>
          <div className="relative flex flex-col items-center">
            <img src={OnboardMobileBg.src} alt="" className="w-full absolute z-10" />
            <p style={{ fontFamily: "Overpass, sans-serif" }} className="font-medium text-[32px] leading-[38.4px] z-20 mt-[62.65px]">Bitcoin Cashout</p>
            <img src={EnterButton.src} alt="" className="z-20 mt-[28px] mb-[35px] cursor-pointer" onClick={() => {
              router.push("/spin");
            }} />
          </div>
        </div>
      ) : (
        <div className="bg-black bg-opacity-80 w-full h-full flex flex-col justify-center items-center overflow-hidden">
          <img src={OnboardMobile.src} alt="" className="w-[376px] mb-[50.78px]" />
          <p style={{ fontFamily: "Overpass, sans-serif" }} className="font-medium text-[56px] leading-[67.2px] mb-[66.47px]">Bitcoin Cashout</p>
          <img src={EnterButtonComp.src} alt="" className="cursor-pointer" onClick={() => {
            router.push("/spin");
          }} />
        </div>
      )}
    </main>
  );
}
