"use client";
import TrigButton from "./components/trigButton";
import OctaTrack from "./components/octatrack";
import TrigInputForm from "./components/trigInputForm";
import PageButton from "./components/pageButton";
import TrackButton from "./components/trackButton";
import { useEffect, useState } from "react";
import { parse } from "path";

interface MicroTiming {
  offSetDecimal: number;
  offSetFraction: string;
}

export default function Home() {
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [patternLength, setPatternLength] = useState(0);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const [changePageStart, setChangePageStart] = useState(0);
  const [changePageEnd, setChangePageEnd] = useState(16);

  // Method to compare which one is closer
  function getClosestValue(val1: number, val2: number, target: number): number {
    return Math.abs(target - val1) < Math.abs(target - val2) ? val1 : val2;
  }

  // Example usage

  useEffect(() => {
    const microTimingObject: MicroTiming[] = [
      {
        offSetDecimal: 0.02,
        offSetFraction: "1/384",
      },
      {
        offSetDecimal: 0.05,
        offSetFraction: "+1/192",
      },
      {
        offSetDecimal: 0.07,
        offSetFraction: "1/128",
      },
      {
        offSetDecimal: 0.1,
        offSetFraction: "1/96",
      },
      {
        offSetDecimal: 0.13,
        offSetFraction: "5/384",
      },
      {
        offSetDecimal: 0.15,
        offSetFraction: "1/64",
      },
      {
        offSetDecimal: 0.18,
        offSetFraction: "7/384",
      },
      {
        offSetDecimal: 0.2,
        offSetFraction: "1/48",
      },
      {
        offSetDecimal: 0.23,
        offSetFraction: "3/128",
      },
      {
        offSetDecimal: 0.26,
        offSetFraction: "5/192",
      },
      {
        offSetDecimal: 0.28,
        offSetFraction: "11/384",
      },
      {
        offSetDecimal: 0.31,
        offSetFraction: "1/32",
      },
      {
        offSetDecimal: 0.33,
        offSetFraction: "13/384",
      },
      {
        offSetDecimal: 0.36,
        offSetFraction: "7/192",
      },
      {
        offSetDecimal: 0.39,
        offSetFraction: "5/128",
      },
      {
        offSetDecimal: 0.41,
        offSetFraction: "1/24",
      },
      {
        offSetDecimal: 0.44,
        offSetFraction: "17/384",
      },
      {
        offSetDecimal: 0.46,
        offSetFraction: "3/64",
      },
      {
        offSetDecimal: 0.49,
        offSetFraction: "19/384",
      },
      {
        offSetDecimal: 0.52,
        offSetFraction: "5/96",
      },
      {
        offSetDecimal: 0.54,
        offSetFraction: "7/128",
      },
      {
        offSetDecimal: 0.57,
        offSetFraction: "11/192",
      },
      {
        offSetDecimal: 0.8,
        offSetFraction: "23/28",
      },
    ];

    const findClosestMicroTimingDecimalforOctatrack = (
      microTimingArray: MicroTiming[],
      target: number
    ): number => {
      let arr = microTimingArray.map((micro) => micro.offSetDecimal);

      let n = arr.length;

      // Corner cases
      if (target <= arr[0]) return arr[0];
      if (target >= arr[n - 1]) return arr[n - 1];

      // Doing binary search
      let i = 0,
        j = n,
        mid = 0;
      while (i < j) {
        mid = Math.floor((i + j) / 2);

        if (arr[mid] == target) return arr[mid];

        // If target is less than array element, then search in the left
        if (target < arr[mid]) {
          // If target is greater than the previous to mid, return the closest of two
          if (mid > 0 && target > arr[mid - 1])
            return getClosestValue(arr[mid - 1], arr[mid], target);

          // Repeat for the left half
          j = mid;
        } else {
          if (mid < n - 1 && target < arr[mid + 1])
            return getClosestValue(arr[mid], arr[mid + 1], target);

          i = mid + 1; // update i
        }
      }

      // Only single element left after the search
      return arr[mid];
    };

    function createEuclideanRhythm(hits: number, length: number) {
      if (hits > length) {
        setError(true);
        return;
      }
      setError(false);

      let hitPositions: { hit: number; micro: string }[] = [];
      let lastPosition = 1.0;
      const gap = (length - hits) / hits;

      for (let i = 0; i < hits; i++) {
        let parts = lastPosition.toString().split(".");
        let hit = parts[0];
        let offSet: any =
          typeof parts[1] === "undefined"
            ? "0"
            : parseFloat("." + parts[1].slice(0, 2));

        const fractionOffSet = findClosestMicroTimingDecimalforOctatrack(
          microTimingObject,
          offSet
        );

        const findFraction = microTimingObject.find((tes) => {
          return tes.offSetDecimal === fractionOffSet;
        });

        hitPositions = [
          ...hitPositions,
          {
            hit: parseInt(hit),
            micro:
              findFraction?.offSetFraction === undefined
                ? ""
                : findFraction?.offSetFraction,
          },
        ];
        lastPosition += gap + 1;
      }

      return hitPositions;
    }

    setResult(createEuclideanRhythm(numberOfHits, patternLength) || []);
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

  const printColor = (res: any[], trigger: number): string => {
    const findTrig = res?.find((tes) => {
      return tes.hit === trigger;
    });
    return findTrig ? "red-600" : "slate-200";
  };

  const showMicroTiming = (
    res: any[],
    trigger: number
  ): { micro: string } | undefined => {
    const findTrig = res?.find((tes) => tes.hit === trigger);

    if (findTrig) {
      return { micro: findTrig.micro };
    } else {
      return undefined;
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

    if(changePageEnd >= patternLength) {
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
          />
        </div>
        <OctaTrack ></OctaTrack>
        <div className="gap-2 flex items-start rounded-b-md justify-start w-[1200px] bg-[#5f5f5f] pl-2 pt-4 pb-4">
          {trigsArray.slice(changePageStart, changePageEnd).map((trig, i) => (
            <TrigButton
              key={i}
              trig={trig}
              result={printColor(result, trig)}
              border={addSquareToTrigOneFiveNineThirteen(trig)}
              microTiming={showMicroTiming(result, trig)}
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
