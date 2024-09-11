"use client";
import PoweredBy from "@/assets/poweredBy.svg";
import AccountHolding from "@/components/AcccontHolding";
import Ads from "@/components/Ads";
import JackpotGame from "@/components/JackpotGame";
import OnMetaModal from "@/components/OnMeta";
import TimeandBar from "@/components/TimeandBar";
import { useGlobal } from "@/contexts/globalContext";
import { useSpin } from "@/contexts/spinContext";
import { useEffect } from "react";
export default function Home() {
    const { isMobile, loading, setLoading } = useGlobal();
    const { onmeta, setOnmeta } = useSpin();
    useEffect(() => { setLoading(false) }, [])
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
