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
    ctx.moveTo(startingPoint.x, startingPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startingPoint.x, startingPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const { canvasRef, onMouseDown } = useDraw(drawLine);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};
export default Page;
