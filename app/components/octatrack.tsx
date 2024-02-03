"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import octatrackImage from "../../public/elektron_octatrack_mkii-top_e0e0e0 copy 3.webp";
import { Button } from "@/components/ui/button";

function OctaTrack({
  setNumberOfHits,
  numberOfHits,
  setPatternLength,
  patternLength,
  setChangePageStart,
  setChangePageEnd
}: any) {
  const trackButtonObject = [
    {
      track: 1,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[21.24rem]",
      trackSelected: true,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 2,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[17.7rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 3,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[14.15rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 4,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[10.65rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 5,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[21.24rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 6,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[17.7rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 7,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[14.15rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
    {
      track: 8,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[10.65rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
    },
  ];

  const [trackSelected, setTrackSelected] = useState(trackButtonObject);
  useEffect(() => {
    localStorage.setItem("trackSelected", JSON.stringify(trackSelected));
  }, [trackSelected]);

  useEffect(() => {
    const newTrackSelected = JSON.parse(
      localStorage.getItem("trackSelected") || "[]"
    );
    const currentTrack = newTrackSelected?.filter(
      (track: { trackSelected: boolean }) => {
        if (track.trackSelected === true) {
          return {
            ...track,
            numberOfTrigs: numberOfHits,
            patternLength: patternLength,
          };
        }
      }
    );

    const updateTrackData = trackSelected.map((track) => {
      if (currentTrack[0].track === track.track) {
        return {
          ...track,
          numberOfTrigs: numberOfHits,
          patternLength: patternLength,
        };
      } else {
        return track;
      }
    });
    setTrackSelected(updateTrackData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfHits, patternLength]);

  const selectedTrack = (track: any) => {
    return track ? "text-green-400" : "text-red-500";
  };

  const trackonClick = (t: any) => {
    let newTrackSelected = trackSelected.map((track) => {
      return t === track.track
        ? { ...track, trackSelected: true }
        : { ...track, trackSelected: false };
    });
    setTrackSelected(newTrackSelected);
    localStorage.setItem("trackSelected", JSON.stringify(trackSelected));
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
      {trackSelected.map((button, i) => (
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
