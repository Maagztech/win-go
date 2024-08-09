"use client";
import { useGlobal } from "@/contexts/globalContext";
import OnboardMobile from "@/assets/onboardMobile.svg";
import OnboardMobileBg from "@/assets/onboardMobileBg.svg";
import EnterButton from "@/assets/enterButton.svg";
import EnterButtonComp from "@/assets/enterButtonComp.svg";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import CreateUsernameModal from "@/components/CreateUserNameModal";
import Head from "next/head";

export default function Home() {
  const { isMobile, getEmail, loading, userPannel, setUserPannel } = useGlobal();
  if (isMobile === null || loading) return <></>;
  return (
    <main className="h-[100vh] w-full overflow-hidden">
      {isMobile ? (
        <div className="bg-[#252A3E] w-full h-full flex flex-col fixed">
          <div className="flex-grow">
            <img src={OnboardMobile.src} alt="" className="w-full mt-[30px]" />
          </div>
          <div className="relative flex flex-col items-center">
            <img src={OnboardMobileBg.src} alt="" className="w-full absolute z-0 bottom-0" />
            <p style={{ fontFamily: "Overpass, sans-serif" }} className="font-medium text-[32px] leading-[38.4px] z-20 mt-[62.65px]">Bitcoin Cashout</p>
            <div className="relative h-[42px] w-[311px] mt-[28px] mb-[35px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out flex justify-center">
              <div
                style={{ zIndex: 3 }}
                className="opacity-0 absolute top-0 right-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
              >
                <GoogleLogin
                  width="300px"
                  onSuccess={(credentialResponse) => {
                    getEmail(credentialResponse);
                    localStorage.setItem(
                      "token",
                      credentialResponse.credential?.toString() || ""
                    );
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{ zIndex: 1 }}
                className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out opacity-100 rounded-[8px] flex flex-row justify-center items-center h-[42px] absolute top-[3px]"
              >
                <img src={EnterButton.src} alt="" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black bg-opacity-80 w-full h-full flex flex-col justify-center items-center overflow-hidden">
          <img src={OnboardMobile.src} alt="" className="w-[376px] mb-[50.78px]" />
          <p style={{ fontFamily: "Overpass, sans-serif" }} className="font-medium text-[56px] leading-[67.2px] mb-[66.47px]">Bitcoin Cashout</p>
          <div className="relative h-[42px] w-[311px] mb-[70px] mx-[44.5px]">
            <div
              style={{ zIndex: 3 }}
              className="opacity-0 absolute top-0 right-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              <GoogleLogin
                width="300px"
                onSuccess={(credentialResponse) => {
                  getEmail(credentialResponse);
                  localStorage.setItem(
                    "token",
                    credentialResponse.credential?.toString() || ""
                  );
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              style={{ zIndex: 1 }}
              className="opacity-100 rounded-[8px] flex flex-row justify-center items-center h-[42px] absolute top-[3px]"
            >
              <img src={EnterButtonComp.src} alt="" className="cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out" />
            </button>
          </div>

        </div>
      )}
      <CreateUsernameModal visible={userPannel} setvisible={setUserPannel} />
    </main>
  );
}
