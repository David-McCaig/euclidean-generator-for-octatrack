import TrigButton from "./components/trigButton";

interface MicroTiming {
  offSetDecimal: number;
  offSetFraction: string;
}

export default function Home() {

  const microTimingObject: MicroTiming[] = 
   [
    {
      offSetDecimal: .02,
      offSetFraction: "1/384"
    },
    {
      offSetDecimal: .05,
      offSetFraction: "+1/192"
    },
    {
      offSetDecimal: .07,
      offSetFraction: "1/128"
    },
    {
      offSetDecimal: .10,
      offSetFraction: "1/96"
    },
    {
      offSetDecimal: .13,
      offSetFraction: "5/384"
    },
    {
      offSetDecimal: .15,
      offSetFraction: "1/64"
    },
    {
      offSetDecimal: .18,
      offSetFraction: "7/384"
    },
    {
      offSetDecimal: .20,
      offSetFraction: "1/48"
    },
    {
      offSetDecimal: .23,
      offSetFraction: "3/128"
    },
    {
      offSetDecimal: .26,
      offSetFraction: "5/192"
    },
    {
      offSetDecimal: .28,
      offSetFraction: "11/384"
    },
    {
      offSetDecimal: .31,
      offSetFraction: "1/32"
    },
    {
      offSetDecimal: .33,
      offSetFraction: "13/384"
    },
    {
      offSetDecimal: .36,
      offSetFraction: "7/192"
    },
    {
      offSetDecimal: .39,
      offSetFraction: "5/128"
    },
    {
      offSetDecimal: .41,
      offSetFraction: "1/24"
    },
    {
      offSetDecimal: .44,
      offSetFraction: "17/384"
    },
    {
      offSetDecimal: .46,
      offSetFraction: "3/64"
    },
    {
      offSetDecimal: .49,
      offSetFraction: "19/384"
    },
    {
      offSetDecimal: .52,
      offSetFraction: "5/96"
    },
    {
      offSetDecimal: .54,
      offSetFraction: "7/128"
    },
    {
      offSetDecimal: .57,
      offSetFraction: "11/192"
    },
    {
      offSetDecimal: .80,
      offSetFraction: "23/284"
    },]

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
  
    // Method to compare which one is closer
    function getClosestValue(val1: number, val2: number, target: number): number {
      return Math.abs(target - val1) < Math.abs(target - val2) ? val1 : val2;
    }
  
    function createEuclideanRhythm(hits: number, length: number) {
      if (hits > length) {
        throw new Error("Number of hits cannot be greater than the length of the sequence.");
      }
  
      let hitPositions: { hit: number, micro: string }[] = [];
      let lastPosition = 1.0;
      const gap = (length - hits) / hits;
  
      for (let i = 0; i < hits; i++) {
        let parts = lastPosition.toString().split('.');
        let hit = parts[0];
        let offSet:any =
          typeof parts[1] === 'undefined' ? '0' : parseFloat('.' + parts[1].slice(0, 2));
  
        const fractionOffSet = findClosestMicroTimingDecimalforOctatrack(
          microTimingObject,
          offSet
        );
  
        const findFraction = microTimingObject.find((tes) => {
          return tes.offSetDecimal === fractionOffSet;
        });
  
        hitPositions = [
          ...hitPositions,
          { hit: parseInt(hit), micro: findFraction?.offSetFraction === undefined ? "" : findFraction?.offSetFraction },
        ];
        lastPosition += gap + 1;
      }
  
      return hitPositions;
    }
  
    // Example usage
    const hits = 6;
    const length = 16;
    const result = createEuclideanRhythm(hits, length);
  
    const trigsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  
    const addSquareToTrigOneFiveNineThirteen = (trig: number): string => {
      if (trig === 1 || trig === 5 || trig === 9 || trig === 13) {
        return 'border';
      } else {
        return '';
      }
    };
  
    const printColor = (res: any[], trigger: number): string => {
      const findTrig = res.find((tes) => {
        return tes.hit === trigger;
      });
      return findTrig ? 'red-600' : 'slate-200';
    };
  
    return (
      <div className='w-full h-screen flex items-end justify-center'>
        <div className='mb-16 gap-2 flex'>
          {trigsArray.map((trig, i) => (
            <div key={i}>
              <TrigButton
                trig={trig}
                result={printColor(result, trig)}
                border={addSquareToTrigOneFiveNineThirteen(trig)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
 
