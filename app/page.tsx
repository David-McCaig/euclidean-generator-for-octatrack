"use client";
import TrigButton from "./components/trigButton";
import OctaTrack from "./components/octatrack";
import TrigInputForm from "./components/trigInputForm";
import PageButton from "./components/pageButton";
import { useEffect, useState } from "react";

export default function Home() {
  const trackButtonObject = [
    {
      track: 1,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[21.24rem]",
      trackSelected: true,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 2,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[17.7rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 3,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[14.15rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 4,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[10.65rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 5,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[21.24rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 6,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[17.7rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 7,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[14.15rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
    {
      track: 8,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[10.65rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array.from({ length: 64 }, () => 0),
    },
  ];
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [patternLength, setPatternLength] = useState(16);
  const [error, setError] = useState(false);

  const [changePageStart, setChangePageStart] = useState(0);
  const [changePageEnd, setChangePageEnd] = useState(16);
  const [trackSelected, setTrackSelected] = useState(trackButtonObject);

  const createEuclideanRhythm = (hits: number, length: number) => {
    if (hits > length) {
      setError(true);
      return;
    }
    setError(false);

    const hitPositions: number[] = [];
    let lastPosition = 1.0;
    const gap = (length - hits) / hits;

    for (let i = 0; i < hits; i++) {
      hitPositions.push(Math.floor(lastPosition));
      lastPosition += gap + 1;
    }

    const newArray = Array.from({ length }, (_, i) =>
      hitPositions.includes(i + 1) ? 1 : 0
    );

    return newArray;
  };
  console.log(numberOfHits, patternLength);
  useEffect(() => {
    const getEuclideanRythem = createEuclideanRhythm(
      numberOfHits,
      patternLength
    );

    const findeSelectedTrack = trackSelected?.find(
      (track) => track.trackSelected
    );
    const newTrackSelected = trackSelected.map((track: any) => {
      return findeSelectedTrack?.track === track.track
        ? {
            ...track,
            numberOfTrigs: numberOfHits,
            patternLength: patternLength,
            trigsArray: getEuclideanRythem,
          }
        : track;
    });
    setTrackSelected(newTrackSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfHits, patternLength]);

  const trigsArray = Array.from(
    new Set(Array.from({ length: 64 }, (_, i) => i + 1))
  );

  const addSquareToTrigOneFiveNineThirteen = (trig: number): string => {
    if (
      trig === 1 ||
      trig === 5 ||
      trig === 9 ||
      trig === 13 ||
      trig === 17 ||
      trig === 21 ||
      trig === 25 ||
      trig === 29 ||
      trig === 33 ||
      trig === 37 ||
      trig === 41 ||
      trig === 45 ||
      trig === 49 ||
      trig === 53 ||
      trig === 57 ||
      trig === 61
    ) {
      return "border";
    } else {
      return "";
    }
  };

  const printColor = (i: any) => {
    const findTrack = trackSelected?.find((track) => track.trackSelected);

    const trigsArray = findTrack?.trigsArray;
    console.log(i);
    if (trigsArray?.[i] === 1) {
      return "red-600";
    } else {
      return "slate-200";
    }
  };

  const handleNumberOfHitsData = (data: number) => {
    setNumberOfHits(data);
  };

  const handlePatternLengthData = (data: number) => {
    setPatternLength(data);
  };

  const changePage = () => {
    setChangePageStart(changePageStart + 16);
    setChangePageEnd(changePageEnd + 16);

    if (changePageEnd >= patternLength) {
      setChangePageStart(0);
      setChangePageEnd(16);
    }
    if (changePageEnd === 64) {
      setChangePageStart(0);
      setChangePageEnd(16);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-end pb-24 mt-12">
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full h-full mb-12">
          <div className="w-2/4 h-full">
            <h1>How to use</h1>
          </div>
          <TrigInputForm
            patternLengthOnInputChange={handlePatternLengthData}
            numberOfHitsOnInputChange={handleNumberOfHitsData}
            error={error}
            numberOfHits={numberOfHits}
            setNumberOfHits={setNumberOfHits}
            patternLength={patternLength}
            setPatternLength={setPatternLength}
          />
        </div>
        <OctaTrack
          trackSelected={trackSelected}
          setTrackSelected={setTrackSelected}
          setNumberOfHits={setNumberOfHits}
          numberOfHits={numberOfHits}
          setPatternLength={setPatternLength}
          patternLength={patternLength}
          setChangePageStart={setChangePageStart}
          setChangePageEnd={setChangePageEnd}
        ></OctaTrack>
        <div className="gap-2 flex items-start rounded-b-md justify-start w-[1200px] bg-[#5f5f5f] pl-2 pt-4 pb-4">
          {trigsArray.slice(changePageStart, changePageEnd).map((trig, i) => (
            <TrigButton
              key={i}
              trig={trig}
              result={printColor(changePageStart + i)}
              border={addSquareToTrigOneFiveNineThirteen(trig)}
            />
          ))}
          <PageButton
            changePage={changePage}
            changePageStart={changePageStart}
          />
        </div>
      </div>
    </div>
  );
}
