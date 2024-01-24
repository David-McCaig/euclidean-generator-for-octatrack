import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TrigButtonProps {
  trig: number;
  result: string;
  border: string;
  microTiming?: {micro: string}
}

const TrigButton: React.FC<TrigButtonProps> = ({
  trig,
  result,
  border,
  microTiming
}) => {
    console.log(microTiming)
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="w-16 h-16 bg-black rounded-md flex justify-center items-center">
          <div
            className={`w-14 h-14 m-0 bg-black ${border} ${
              result === "red-600" ? "border-red-600" : "border-slate-200"
            } rounded-md flex justify-center items-center`}
          >
            <div
              className={`w-7 h-9 border-b-2 ${
                result === "red-600" ? "border-red-600" : "border-slate-200"
              } flex justify-center items-center`}
            >
              <p
                className={`text-3xl ${
                  result === "red-600" ? "text-red-600" : "text-slate-200"
                }`}
              >
                {trig}
              </p>
            </div>
          </div>
        </div>
        {microTiming === undefined ? <></> :
        <HoverCardContent>
           <p>Trig: {trig}</p> 
           <p>Micro Timing: {microTiming?.micro}</p> 
        </HoverCardContent>}
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default TrigButton;
