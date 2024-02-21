"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import octatrackImage from "../../public/elektron_octatrack_mkii-top_e0e0e0 copy 3.webp";
import { Button } from "@/components/ui/button";

function OctaTrack({
  setNumberOfHits,
  setPatternLength,
  setChangePageStart,
  setChangePageEnd,
  trackSelected,
  setTrackSelected,
  playSequencer,
  stopSequencer,
  setOffSet,
  offSet,
}: any) {
  const selectedTrack = (track: any) => {
    return track ? "text-green-400" : "text-red-500";
  };

  const trackonClick = (t: any) => {
    let newTrackSelected = trackSelected.map((track: any) => {
      return t === track.track
        ? { ...track, trackSelected: true }
        : { ...track, trackSelected: false };
    });
    setTrackSelected(newTrackSelected);
    const currentTrack = newTrackSelected?.filter(
      (track: { trackSelected: boolean }) => track.trackSelected === true
    );
    setNumberOfHits(currentTrack[0].numberOfTrigs);
    setPatternLength(currentTrack[0].patternLength);
    setOffSet(currentTrack[0].offSetArray[currentTrack[0]?.offSetArray?.length - 1]);
    setChangePageStart(0);
    setChangePageEnd(16);
  };

  const playOctatrackClick = () => {
    playSequencer();
  };

  const stopOctatrackClick = () => {
    stopSequencer();
  }

  return (
    <div className="relative">
      <Image
        className="rounded-t-md"
        src={octatrackImage}
        alt="Elektron Octatrack"
        width={1200}
        height={1200}
      ></Image>
      <Button
        className="absolute bottom-[.9rem] left-[35.65rem] w-[3.85rem]"
        onClick={playOctatrackClick}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
      <Button
        className="absolute bottom-[.9rem] left-[39.85rem] w-[3.85rem]"
        onClick={stopOctatrackClick}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44772 13 2 12.5523 2 12V3ZM12 3H3V12H12V3Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
      {trackSelected.map((button: any, i: any) => (
        <Button
          key={button.track}
          onClick={() => trackonClick(button.track)}
          className={`absolute ${button.PositionLeft} ${
            button.positionTop
          } ${selectedTrack(button.trackSelected)} w-[2.4rem] h-[2.4rem]`}
        >
          T{button.track}
        </Button>
      ))}
    </div>
  );
}

export default OctaTrack;
