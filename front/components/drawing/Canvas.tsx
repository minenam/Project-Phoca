import { useState, useEffect, useCallback } from "react";
import { Canvas } from "./Drawing.style";

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface Coordinate {
  x: number;
  y: number;
}

function CanvasComp({ canvasRef }: CanvasProps) {
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const [isDrawing, setIsDrawing] = useState(false);

  const getCoordinate = (e: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;

    return { x, y };
  };

  const drawLine = (prev: Coordinate, current: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = "black";
      context.lineJoin = "round";
      context.lineWidth = 3;

      context.beginPath();
      context.moveTo(prev.x, prev.y);
      context.lineTo(current.x, current.y);
      context.closePath();

      context.stroke();
    }
  };

  const startDrawing = useCallback((e: MouseEvent) => {
    const coordinate = getCoordinate(e);
    if (coordinate) {
      setIsDrawing(true);
      setMousePosition(coordinate);
    }
  }, []);

  const endDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const drawing = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isDrawing) {
        const current = getCoordinate(e);
        if (mousePosition && current) {
          drawLine(mousePosition, current);
          setMousePosition(current);
        }
      }
    },
    [isDrawing, mousePosition],
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mouseleave", endDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", drawing);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mouseleave", endDrawing);
    };
  }, [canvasRef, drawing, endDrawing, startDrawing]);

  return <Canvas ref={canvasRef} width="1300" height="700" />;
}

export default CanvasComp;
