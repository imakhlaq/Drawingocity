import { useEffect, useRef } from "react";

export const useDraw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    //handler
    const handler = (event: MouseEvent) => {};

    //add event listner
    canvasRef.current?.addEventListener("mousemove", handler);

    //cleanup

    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);

  return { canvasRef };
};
