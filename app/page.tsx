"use client";

import { useDraw } from "../hooks/useDraw";
import { ChromePicker } from "react-color";
import { useState } from "react";

const Page = () => {
  const [color, setColor] = useState<string>("#000");

  const drawLine = ({ prevPoint, currentPoint, ctx }: Draw) => {
    const { x: currX, y: currY } = currentPoint;

    const lineColor = color;

    const lineWidth = 5;

    let startingPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startingPoint.x, startingPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startingPoint.x, startingPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type="button"
          onClick={clear}
          className="p-2 rounded-lg border border-black w-full"
        >
          Clear
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={1000}
        height={1000}
        className="border border-black rounded-md"
      />
    </div>
  );
};
export default Page;
