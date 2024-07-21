import AcccontHolding from "@/components/AcccontHolding";
import SlotMachine from "@/components/SlotMachine";
import Image from "next/image";
import PoweredBy from "@/assets/poweredBy.svg";
import JackpotGame from "@/components/Spin";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='max-w-md w-full h-[100vh] mintDetailsContainer md:p-[2rem] relative md:border flex flex-col items-center'>
        <AcccontHolding />
        <SlotMachine />
        <JackpotGame />
      </div>
      <div className="absolute bottom-[10px] w-full flex justify-center">
        <img src={PoweredBy.src} alt="" />
      </div>
    </main>
  );
}
