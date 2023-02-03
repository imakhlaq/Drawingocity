"use client";

import { useDraw } from "../hooks/useDraw";

const Page = () => {
  const { canvasRef } = useDraw();
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
