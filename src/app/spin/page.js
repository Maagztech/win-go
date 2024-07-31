"use client";
import { useEffect, useState } from "react";
import AccountHolding from "@/components/AcccontHolding";
import Ads from "@/components/Ads";
import JackpotGame from "@/components/JackpotGame";
import TimeandBar from "@/components/TimeandBar";
import { useGlobal } from "@/contexts/globalContext";
import PoweredBy from "@/assets/poweredBy.svg";
import OnMetaModal from "@/components/OnMeta";
import { useSpin } from "@/contexts/spinContext";
export default function Home() {
    const { isMobile, loading, setLoading } = useGlobal();
    const { onmeta, setOnmeta, opacity, setOpacity } = useSpin();
    useEffect(() => { setLoading(false) }, [])
    const change = () => {
        const widgetElement = document?.getElementById("widget");
        if (widgetElement) {
            widgetElement.innerHTML = "";
        }
        setOpacity(0);
    };
    if (isMobile === null || loading) return <></>;
    return (
        <main className="h-[100vh] bg-black bg-opacity-40 overflow-hidden flex flex-col w-full">
            {isMobile ? (
                <>
                    <div className="flex-grow overflow-auto z-[1]">
                        <AccountHolding />
                        <TimeandBar />
                        <Ads />
                        <JackpotGame />
                    </div>
                    <div className="w-full flex justify-center mb-3">
                        <img src={PoweredBy.src} alt="" />
                    </div>
                </>
            ) : (
                <div className="z-[1]">
                    <div className="bg-[#252A3E] flex justify-end items-center pr-[100px] pb-[20px]">
                        <AccountHolding />
                    </div>
                    <JackpotGame />
                </div>
            )}

            <OnMetaModal visible={onmeta} setvisible={setOnmeta} />
        </main >
    );
}
