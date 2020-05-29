import React, { useState, useRef } from 'react';
import { P5w } from './p5w';

export interface P5WrapperProps {
  sketchProps?: object;
  sketch: (p: P5w<{}>) => void;
}

export const P5Wrapper: React.FC<P5WrapperProps> = (pr : P5WrapperProps) => {
  const wrapper = useRef(null);
  const [canvas, setCanvas] = useState<P5w<typeof pr.sketchProps> | null>(null);

  const createCanvas = () => {
    console.log('creating canvas...');
    canvas?.remove();
    setCanvas(new P5w<typeof pr.sketchProps>(pr.sketch, wrapper.current));
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

  React.useEffect(() => {
    if (canvas) {
      canvas.updateProps(pr.sketchProps);
    }
  }, [pr.sketchProps]);

  return <div ref={wrapper} style={{ position: 'fixed' }}></div>;
};
