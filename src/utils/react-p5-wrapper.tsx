import p5 from "p5";
import React, { useState, useRef, Component } from "react";
import { p5w } from "./p5w";

export interface P5WrapperProps {
  sketch: (p: p5w) => void;
  sketchProps?: object;
}

export const P5Wrapper: React.FC<P5WrapperProps> = ({
  sketch,
  sketchProps,
}) => {
  const wrapper = useRef(null);
  const [canvas, setCanvas] = useState<p5w | null>(null);

  const createCanvas = () => {
    console.log("creating canvas...");
    canvas?.remove();
    setCanvas(new p5w(sketch, wrapper.current));
  };

  React.useEffect(() => {
    if (!canvas && wrapper.current) {
      createCanvas();
    }
    return () => {
      if (canvas) {
        console.log(canvas);
        canvas?.remove();
      }
    };
  }, [wrapper, canvas]);

  React.useEffect(()=>{
    if(canvas){
      canvas.updateProps({test: "ip"});
    }
  },[sketchProps]);

  return <div ref={wrapper} style={{ position: "fixed" }}></div>;
};