"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function TrigInputForm({
  numberOfHitsOnInputChange,
  patternLengthOnInputChange,
  error,
}: any) {
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [patternLength, setPatternLength] = useState(0);

  const numberOfHitsHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfHits(Number(e.target.value));
    numberOfHitsOnInputChange(e.target.value);
  };

  const PatternLengthHandleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10); // Parse as an integer
    setPatternLength(value);
    patternLengthOnInputChange(value);
  };

  return (
    <div className="w-2/4 h-48 font-normal">
      <h3 className="">Number of hits</h3>
      <Input
        className="w-1/2"
        value={numberOfHits}
        onChange={numberOfHitsHandleChange}
      />
      <h2 className="mt-4">Track length</h2>
      <Input
        className="w-1/2"
        type="number"
        value={patternLength}
        onChange={PatternLengthHandleChange}
      />
      {error && (
        <p className="mt-2 text-red-600 ">
          Track Length must be longer than number of trigs
        </p>
      )}
    </div>
  );
}

export default TrigInputForm;
