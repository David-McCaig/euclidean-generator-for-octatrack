import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function HowToCard() {
  return (
    <Card className="m-6 p-6 h-[24rem]">
      <CardHeader className="pl-0">
        <CardTitle>How to use Octatrack Euclidean generator</CardTitle>
      </CardHeader>
      <CardDescription>
        This is a simple Euclidean Generator. It is a rhythm generator that uses
        the Euclidean algorithm to create rhythms.
      </CardDescription>
      <ol className="mt-4">
        <li className="mb-1">1. Select a track. You can click one of the T buttons on the Ocatatrack.</li>
        <li className="mb-1">2. Enter the number of trigs. This will space the trigs as evenly as possible using the Euclidean algorithm.</li>
        <li className="mb-1">3. Change pattern length. You can have different pattern lengths for each track.</li>
        <li className="mb-1">4. Click the play button on the Octatrack.</li>
        <li className="mb-1">5. Adjust the offset to taste.</li>
      </ol>
    </Card>
  );
}

export default HowToCard;
