"use client";

import { useDraw } from "../hooks/useDraw";

const Page = () => {
  const drawLine = ({ prevPoint, currentPoint, ctx }: Draw) => {
    const { x: currX, y: currY } = currentPoint;

    const lineColor = "#000";

    const lineWidth = 5;

    let startingPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
  };

  const { canvasRef } = useDraw(drawLine);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};
export default Page;
