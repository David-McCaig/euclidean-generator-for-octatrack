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
  setTrackSelected
}: any) {

  const selectedTrack = (track: any) => {
    return track ? "text-green-400" : "text-red-500";
  };

  const trackonClick = (t: any) => {
    let newTrackSelected = trackSelected.map((track:any) => {
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
    setChangePageStart(0)
    setChangePageEnd(16)
  };

  return (
    <div className="relative">
      <Image
        className="rounded-t-md"
        src={octatrackImage}
        alt="Elektron Octatrack"
        width={1200}
        height={1200}
      ></Image>
      {trackSelected.map((button:any, i:any) => (
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
