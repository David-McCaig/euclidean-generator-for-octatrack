"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function TrigInputForm({
  numberOfHitsOnInputChange,
  patternLengthOnInputChange,
  error,
  numberOfHits,
  setNumberOfHits,
  patternLength,
  setPatternLength,
}: any) {
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
    <>
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Euclidean Generator</CardTitle>
        <CardDescription>Add number of Trigs to get Euclidean patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Number of trigs</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Track length</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
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
    </>
  );
}

export default TrigInputForm;
