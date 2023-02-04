import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
  setShowPallet: Dispatch<SetStateAction<boolean>>
) => {
  //for checking if mouse is down
  const [mouseDown, setMouseDown] = useState(false);
  const prevPoint = useRef<null | Point>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onMouseDown = () => setMouseDown(true);

  //clear function
  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    //handler
    const handler = (event: MouseEvent) => {
      if (!mouseDown) return;

      const currentPoint = computePointsInCanvas(event);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    //computing poits
    const computePointsInCanvas = (event: MouseEvent) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      setShowPallet(false);
      prevPoint.current = null;
    };

    //add event listner
    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    //cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw, mouseDown, setShowPallet]);

  return { canvasRef, onMouseDown, clear };
};
