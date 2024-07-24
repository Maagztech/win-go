import AcccontHolding from "@/components/AcccontHolding";
import SlotMachine from "@/components/SlotMachine";
import Image from "next/image";
import PoweredBy from "@/assets/poweredBy.svg";
import JackpotGame from "@/components/Spin";
export default function Home() {
  return (
    <main className="flex h-[100vh] flex-col items-center justify-between">
      <div className='max-w-md w-full h-[100vh] mintDetailsContainer md:p-[2rem] fixed md:border flex flex-col items-center'>
        <AcccontHolding />
        <SlotMachine />
        <JackpotGame />
        <div className="absolute bottom-[70px] w-full flex justify-center">
          <img src={PoweredBy.src} alt="" />
        </div>
      </div>

    </main>
  );
}
