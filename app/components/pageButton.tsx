import React from "react";
import { Button } from "@/components/ui/button";

interface PageButtonsProps {
  changePage: () => void;
  changePageStart: number;
}

function pageButton({ changePage, changePageStart }: PageButtonsProps) {
  console.log(changePageStart);
  const dotArray = [1, 2, 3, 4];

  const changePageClick = () => {
    changePage();
  };
  const currentPageSelected = (pageStart:number) => {
    if (pageStart === 0) {
      return 1;
    } else if (pageStart === 16) {
      return 2;
    } else if (pageStart === 32) {
      return 3;
    } else if (pageStart === 48) {
      return 4;
    }
  };

  return (
    <div className="flex-col">
      <p></p>
      <div className="flex gap-2">
        {dotArray.map((dot) => (
          <>
            {currentPageSelected(changePageStart) === dot ? (
              <div
                key={dot}
                className="rounded-full w-3 h-3 bg-red-600 mb-2 "
              ></div>
            ) : (
              <div
                key={dot}
                className="rounded-full w-3 h-3 bg-red-400 mb-2 "
              ></div>
            )}
          </>
        ))}
      </div>
      <Button className="bg-black" onClick={changePageClick}>
        Page
      </Button>
    </div>
  );
}

export default pageButton;
