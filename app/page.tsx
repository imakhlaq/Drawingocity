"use client";

import { useDraw } from "../hooks/useDraw";

import { useState } from "react";
import Header from "./header";

const Page = () => {
  const [color, setColor] = useState<string>("#000");

  const [showPallet, setShowPallet] = useState(false);

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

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine, setShowPallet);

  return (
    <div className="space-y-10 flex flex-col justify-center">
      <Header
        color={color}
        setColor={setColor}
        clear={clear}
        setShowPallet={setShowPallet}
        showPallet={showPallet}
      />
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={width - 10}
        height={height - 130}
        className="border border-black rounded-md bg-[#F9F5E7]"
      />
    </div>
  );
};
export default Page;
