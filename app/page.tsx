"use client";
import TrigButton from "./components/trigButton";
import OctaTrack from "./components/octatrack";
import TrigInputForm from "./components/trigInputForm";
import PageButton from "./components/pageButton";
import * as Tone from "tone/build/esm/index";

import { useEffect, useState } from "react";
import { get } from "http";

export default function Home() {
  const kick = new Tone.Player("/bd.wav").toDestination();
  const highat = new Tone.Player("/ch.wav").toDestination();
  const clap = new Tone.Player("/clap.wav").toDestination();
  let test = "";

  const trackButtonObject = [
    {
      track: 1,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[21.24rem]",
      trackSelected: true,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      note: "C4",
      sample: kick,
      timing: 0,
    },
    {
      track: 2,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[17.7rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      note: "A1",
      sample: clap,
      timing: 0.00001,
    },
    {
      track: 3,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[14.15rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      sample: highat,
      timing: 0.00002,
    },
    {
      track: 4,
      PositionLeft: "left-[23.14rem]",
      positionTop: "bottom-[10.65rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      sample: test,
      timing: 0.00003,
    },
    {
      track: 5,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[21.24rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      sample: test,
      timing: 0.00004,
    },
    {
      track: 6,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[17.7rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      sample: test,
      timing: 0.00005,
    },
    {
      track: 7,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[14.15rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      sample: test,
      timing: 0.00006,
    },
    {
      track: 8,
      PositionLeft: "left-[45.5rem]",
      positionTop: "bottom-[10.65rem]",
      trackSelected: false,
      numberOfTrigs: 0,
      patternLength: 16,
      trigsArray: Array(16).fill(0),
      offSetArray: [0],
      sample: clap,
      timing: 0.00007,
    },
  ];
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [patternLength, setPatternLength] = useState(16);
  const [offSet, setOffSet] = useState(0);

  const [error, setError] = useState(false);

  const [changePageStart, setChangePageStart] = useState(0);
  const [changePageEnd, setChangePageEnd] = useState(16);
  const [trackSelected, setTrackSelected] = useState(trackButtonObject);

  // useEffect(() => {
  //   const findTrack = trackSelected?.find((track) => track.trackSelected);
  //   setCurrentTrack(findTrack);
  // }, [trackSelected]);

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
  useEffect(() => {
    const getEuclideanRythem = createEuclideanRhythm(
      numberOfHits,
      patternLength
    );

    const findeSelectedTrack = trackSelected?.find(
      (track) => track.trackSelected
    );

    const updateTrigsArrayIfnoOffSet = (arr: any) => {
      if (arr.length === 1) {
      }
    };
    //conditional if number of hits does not === number of hits recorded then set offset to 0
    if (offSet === 0) {
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
    } else if (numberOfHits !== findeSelectedTrack?.numberOfTrigs || patternLength !== findeSelectedTrack?.patternLength) {
      const newTrackSelected = trackSelected.map((track: any) => {
        setOffSet(0);
        return findeSelectedTrack?.track === track.track
          ? {
              ...track,
              numberOfTrigs: numberOfHits,
              patternLength: patternLength,
              trigsArray: getEuclideanRythem,
              offSetArray: [0],
            }
          : track;
      });
      setTrackSelected(newTrackSelected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfHits, patternLength]);

  const trigsArray = Array.from(
    new Set(Array.from({ length: patternLength }, (_, i) => i + 1))
  );

  const addSquareToTrig = (trigSet:number[]) => (trig:number) => {
    if (trigSet.includes(trig)) {
      return "border";
    } else {
      return "";
    }
  };

  const trigSet = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61];

  
  const addSquareBorder = addSquareToTrig(trigSet);
 

  const printColor = (i: any) => {
    const findTrack = trackSelected?.find((track) => track.trackSelected);

    const trigsArray = findTrack?.trigsArray;
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120); // Initial tempo

  const playSequencer = () => {
    Tone.Transport.start();
    setIsPlaying(true);
  };

  useEffect(() => {
    // Function to play the sequencer
    if (isPlaying) {
      // Stop any existing transport
      Tone.Transport.cancel();

      // Tone.Transport.stop();

      // Iterate over each track
      trackSelected.forEach((track) => {
        const { trigsArray, sample } = track;

        // Create a sequence for each track
        const sequence = new Tone.Sequence(
          (time, value) => {
            if (value === 1) {
              // Trigger the sample at the correct time
              (sample as Tone.Player).start(time + track.timing);
            }
          },
          trigsArray,
          "16n"
        ).start(0); // Start the sequence at time 0

        // Set the loop to loop indefinitely
        sequence.loop = true;
      });

      // Set the BPM
      // Tone.Transport.bpm.value = tempo;

      // Start the Transport
      Tone.Transport.start();
      setIsPlaying(true);
    }
  }, [isPlaying, trackSelected]);

  // Function to stop the sequencer
  function stopSequencer() {
    Tone.Transport.stop();
    setIsPlaying(false);
  }

  // Function to handle tempo change
  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTempo = parseInt(event.target.value);
    setTempo(newTempo);
    if (isPlaying) {
      Tone.Transport.bpm.value = newTempo;
    }
  };

  const sliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findTrack = trackSelected?.find((track) => track.trackSelected);
    ///how to track if number is increasing or decreasing. Create an arraywhich records the offset numbers.
    const offSetArray = (arr: any) => [
      ...arr.slice(arr.length - 1),
      ...arr.slice(0, arr.length - 1),
    ];

    const newTrigsArray = offSetArray(findTrack?.trigsArray);

    const getOffSetArray =
      findTrack?.offSetArray.map((num: number) => num) ?? [];

    const editOffSetArray = (arr: number[]) => {
      const event: any = e;
      return event > arr[arr.length - 1]
        ? [...arr, e]
        : [...arr.slice(0, arr.length - 1)];
    };
    const newTrackSelected = trackSelected.map((track: any) => {
      return findTrack?.track === track.track
        ? {
            ...track,
            trigsArray: newTrigsArray,
            offSetArray: editOffSetArray(getOffSetArray),
          }
        : track;
    });
    setTrackSelected(newTrackSelected);
  };
  console.log(trackSelected);

  return (
    <main className="flex w-full justify-center items-end pb-24 mt-6">
      {/* <button onClick={startToneAudioContext}>Start Audio</button> */}
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
            offSetValue={sliderChange}
            setOffSet={setOffSet}
            offSet={offSet}
            trackSelected={trackSelected}
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
          playSequencer={playSequencer}
          stopSequencer={stopSequencer}
          setOffSet={setOffSet}
          offSet={offSet}
        ></OctaTrack>
        <div className="gap-2 flex items-start rounded-b-md justify-start w-[1200px] bg-[#5f5f5f] pl-2 pt-4 pb-4">
          {trigsArray.slice(changePageStart, changePageEnd).map((trig, i) => (
            <TrigButton
              key={i}
              trig={trig}
              result={printColor(changePageStart + i)}
              border={addSquareBorder(trig)}
            />
          ))}
          <PageButton
            changePage={changePage}
            changePageStart={changePageStart}
          />
        </div>
      </div>

      <div>
        <h1>Drum Machine</h1>
        <div>
          {/* {isPlaying ? (
            <button onClick={stopSequencer}>Stop</button>
          ) : (
            <button onClick={playSequencer}>Play</button>
          )} */}
          <input
            type="number"
            value={tempo}
            onChange={handleTempoChange}
            min="60"
            max="300"
          />
          <label htmlFor="tempo">Tempo (BPM): </label>
        </div>
      </div>
    </main>
  );
}
