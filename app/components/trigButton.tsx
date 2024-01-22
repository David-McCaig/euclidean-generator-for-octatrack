import React from 'react';

interface TrigButtonProps {
  trig: number;
  result: string;
  border: string;
}

const TrigButton: React.FC<TrigButtonProps> = ({ trig, result, border }) => {

  return (
    <div className="w-16 h-16 bg-slate-800 rounded-md flex justify-center items-center">
      <div
        className={`w-14 h-14 m-0 bg-slate-800 ${border} ${
          result === 'red-600' ? 'border-red-600' : 'border-slate-200'
        } rounded-md flex justify-center items-center`}
      >
        <div
          className={`w-7 h-9 border-b-2 ${
            result === 'red-600' ? 'border-red-600' : 'border-slate-200'
          } flex justify-center items-center`}
        >
          <p className={`text-3xl ${result === 'red-600' ? 'text-red-600' : 'text-slate-200'}`}>
            {trig}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrigButton;
