import AcccontHolding from "@/components/AcccontHolding";
import SlotMachine from "@/components/SlotMachine";
import Image from "next/image";
import PoweredBy from "@/assets/poweredBy.svg";
import JackpotGame from "@/components/Spin";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='max-w-md w-full h-[100vh] mintDetailsContainer md:p-[2rem] relative'>
        <AcccontHolding />
        <SlotMachine />
        <JackpotGame />

      </div>
      <div className="absolute bottom-2 w-full flex justify-center">
        <img src={PoweredBy.src} alt="" />
      </div>
    </main>
  );
}
