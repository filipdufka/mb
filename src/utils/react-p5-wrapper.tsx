import React, { useState, useRef } from 'react';
import { P5w } from './p5w';

export interface P5WrapperProps {
  sketchProps?: object;
  sketch: (p: P5w) => void;
}

export const P5Wrapper: React.FC<P5WrapperProps> = (props : P5WrapperProps) => {
  const wrapper = useRef(null);
  const [canvas, setCanvas] = useState<P5w | null>(null);

  const createCanvas = () => {
    if (canvas) { canvas.remove(); }
    // eslint-disable-next-line new-cap
    setCanvas(new P5w(props.sketch, wrapper.current));
  };

  React.useEffect(() => {
    if (!canvas && wrapper.current) {
      createCanvas();
    }
    return () => {
      if (canvas) { canvas.remove(); }
    };
  }, [wrapper, canvas]);

  React.useEffect(() => {
    if (canvas) {
      canvas.updateProps(props.sketchProps);
    }
  }, [props.sketchProps]);

  return <div ref={wrapper} style={{ position: 'fixed' }}></div>;
};
