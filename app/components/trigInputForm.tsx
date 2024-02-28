"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function TrigInputForm({
  numberOfHitsOnInputChange,
  patternLengthOnInputChange,
  error,
  numberOfHits,
  setNumberOfHits,
  patternLength,
  setPatternLength,
  offSetValue,
  setOffSet,
  offSet,
  tempo,
  setTempo,
  handleTempoChange,
  changeTempo
}: any) {
  // const [offSet, setOffSet] = useState(0);

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

  const sliderChange = (e: any) => {
    setOffSet(e[0]);
    offSetValue(e[0]);
  };

  const tempoChange = (e: any) => { 
    setTempo(e[0])
    changeTempo(e[0])
  }



  return (
    <Card className="w-2/4 m-6">
      <div className="flex">
        <CardHeader className="w-2/4">
          <CardTitle>Euclidean Generator</CardTitle>
          <CardDescription>
            Add number of Trigs to get Euclidean patterns
          </CardDescription>
        </CardHeader>
        <div className="w-2/4 flex-col mt-5 pr-6">
          <Label htmlFor="name" className="h-full">Tempo</Label>
          <Slider
            className="mt-2"
            value={[tempo]}
            max={260}
            step={1}
            onValueChange={(e) => tempoChange(e)}
          />
          <div className="w-8 h-8 mt-2 p-4 flex items-center justify-center bg-white text-black border-2 rounded-md">
            {tempo}
          </div>
        </div>
      </div>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Number of trigs</Label>
              <Input
                className="w-1/2"
                value={numberOfHits}
                onChange={numberOfHitsHandleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Track length</Label>
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
            <Label htmlFor="name">Trigger offset</Label>
            <Slider
              value={[offSet]}
              max={16}
              step={1}
              onValueChange={(e)=> sliderChange(e)}
            />
            <div className="w-8 h-8 flex items-center justify-center bg-white text-black border-2 rounded-md">
              {offSet}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default TrigInputForm;
