import p5 from "p5";
import React, { useState, useRef } from "react";

export interface P5WrapperProps {
  sketch: (p: p5) => void;
  sketchProps?: object;
}

export const P5Wrapper: React.FC<P5WrapperProps> = ({ sketch, sketchProps }) => {
  const wrapper = useRef(null);
  const [canvas, setCanvas] = useState<p5 | null>(null);

  const createCanvas = () => {
    console.log("creating canvas...");
    canvas?.remove();
    setCanvas(new p5(sketch, wrapper.current));
  };

  React.useEffect(() => {
    if (!canvas) {
      createCanvas();
    }
    return () => {
      console.log("removing");
      canvas?.remove();
    };
  }, [wrapper]);

  return <div ref={wrapper} style={{ position: "fixed" }}></div>;
};

// export interface P5WrapperState {
//   sketch: (p: p5) => void;
//   canvas: p5;
//   wrapper: HTMLElement;
// }

// export class P5Wrapper extends Component <P5WrapperProps, P5WrapperState> {

//   constructor(props: any) {
//     super(props);
//     this.state  = {
//       sketch: props.sketch,
//       canvas: null,
//       wrapper: null
//     };
//   }

//   wrapper: HTMLElement;

//   componentDidMount() {
//     const canvas = new p5(this.state.sketch, this.wrapper);
//     this.setState({
//       canvas: canvas,
//       wrapper: this.wrapper
//     })
//   }

//   componentWillUnmount() {
// 		this.state.canvas.remove();
// 	}

//   render() {
//     return <div ref={wrapper => this.wrapper = wrapper} style={{position: 'fixed'}}></div>;
//   }
// }
