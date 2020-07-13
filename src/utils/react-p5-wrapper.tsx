import React, { useState, useRef } from 'react';
import { P5w } from './p5w';
import ReactResizeDetector from 'react-resize-detector';

export interface P5WrapperProps {
  sketchProps?: object;
  sketch: (p: P5w<object>) => void;
}

export const P5Wrapper: React.FC<P5WrapperProps> = (props: P5WrapperProps) => {
  const wrapper = useRef(null);
  const [canvas, setCanvas] = useState<P5w<typeof props.sketchProps> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const createCanvas = () => {
    if (canvas) { canvas.remove(); }
    setCanvas(new P5w<typeof props.sketchProps>(props.sketch, wrapper.current));
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

  React.useEffect(() => {
    if (canvas) {
      canvas.resize(dimensions.width, dimensions.height);
    }
  }, [dimensions]);

  return <div className="react-p5-wrapper">
    <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => { setDimensions({ width, height }); }} />
    <div ref={wrapper} style={{ position: 'fixed' }}></div>
  </div>;
};
