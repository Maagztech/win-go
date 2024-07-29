"use client";
import { useEffect } from "react";
import AccountHolding from "@/components/AcccontHolding";
import Ads from "@/components/Ads";
import JackpotGame from "@/components/JackpotGame";
import TimeandBar from "@/components/TimeandBar";
import { useGlobal } from "@/contexts/globalContext";
import PoweredBy from "@/assets/poweredBy.svg";

export default function Home() {
    const { isMobile, loading, setLoading } = useGlobal();
    useEffect(() => { setLoading(false) }, [])
    if (isMobile === null || loading) return <></>;
    return (
        <main className="h-[100vh] bg-black bg-opacity-40 flex flex-col justify-between overflow-hidden">

            {isMobile ? (
                <>
                    <div className="flex-grow overflow-auto">
                        <AccountHolding />
                        <TimeandBar />
                        <Ads />
                        <JackpotGame />
                    </div>
                    <div className="w-full flex justify-center py-3">
                        <img src={PoweredBy.src} alt="" />
                    </div>
                </>
            ) : (
                <div>
                    <div className="bg-[#252A3E] flex justify-end items-center pr-[100px] pb-[20px]">
                        <AccountHolding />
                    </div>
                    <JackpotGame />
                </div>
            )}

        </main>
    );
}
