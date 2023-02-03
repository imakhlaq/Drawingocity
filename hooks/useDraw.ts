import { useEffect, useRef } from "react";

export const useDraw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    //handler
    const handler = (event: MouseEvent) => {
      const currentValue = computePointsInCanvas(event);
    };

    //computing poits
    const computePointsInCanvas = (event: MouseEvent) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const y = event.clientX - rect.left;
      const x = event.clientY - rect.top;

      return { x, y };
    };

    //add event listner
    canvasRef.current?.addEventListener("mousemove", handler);

    //cleanup

    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);

  return { canvasRef };
};
