"use client";

import AccountHolding from "@/components/AcccontHolding";
import Ads from "@/components/Ads";
import JackpotGame from "@/components/Spin";
import TimeandBar from "@/components/TimeandBar";
import { useGlobal } from "@/contexts/globalContext";
import PoweredBy from "@/assets/poweredBy.svg";
export default function Home() {
    const { isMobile } = useGlobal();

    return (
        <main className="h-[100vh] bg-black bg-opacity-40 overflow-hidden relative">
            {isMobile ? (
                <div className="w-full h-full ">
                    <AccountHolding />
                    <TimeandBar />
                    <Ads />
                    <JackpotGame />
                </div>
            ) : (
                <div><JackpotGame /></div>
            )}
            <div className="absolute w-full flex justify-center bottom-3">
                <img src={PoweredBy.src} alt="" />
            </div>
        </main>
    );
}
