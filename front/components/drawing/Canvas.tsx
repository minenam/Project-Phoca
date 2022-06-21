import { useRef } from "react";
import { Canvas } from "./Drawing.style";

function CanvasComp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <Canvas ref={canvasRef} />;
}

export default CanvasComp;
