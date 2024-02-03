import React from "react";
import Image from "next/image";
import octatrackImage from "../../public/elektron_octatrack_mkii-top_e0e0e0 copy 3.webp";
import { Button } from "@/components/ui/button";

function OctaTrack() {
  const trackButtonObject = [
    {
      track: 1,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[21.24rem]",
    },
    {
      track: 2,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[17.7rem]",
    },
    {
      track: 3,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[14.15rem]",
    },
    {
      track: 4,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[10.65rem]",
    },
    {
      track: 5,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[21.24rem]",
    },
    {
      track: 6,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[17.7rem]",
    },
    {
      track: 7,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[14.15rem]",
    },
    {
      track: 8,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[10.65rem]",
    },
  ];

  return (
    <div className="relative">
      <Image
        className="rounded-t-md"
        src={octatrackImage}
        alt="Elektron Octatrack"
        width={1200}
        height={1200}
      ></Image>
      { trackButtonObject.map((button) => (
        <Button key={button.track} className={`absolute ${button.PositionLeft} ${button.positionTop} text-green-400 w-[2.4rem] h-[2.4rem]`}>
          T{button.track}
        </Button>
      ))}
     
    </div>
  );
}

export default OctaTrack;
