import { useEffect, useRef } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    //handler
    const handler = (event: MouseEvent) => {
      const currentPoint = computePointsInCanvas(event);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);

  return { canvasRef };
};
