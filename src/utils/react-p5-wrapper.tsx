import p5 from "p5";
import React, { useState, useRef } from "react";


export interface P5WrapperProps {
  sketch: (p: p5) => void;
}

export const P5Wrapper: React.FC<P5WrapperProps> = (props: P5WrapperProps) => {
  const [canvas, setCanvas] = useState(null);
  const wrapper = useRef(null);

  React.useEffect(() => {
    setCanvas(new p5(props.sketch, wrapper.current));
    return () => {
      //canvas.remove();
    }
  }, []);

  return <div ref={wrapper} style={{ position: 'fixed' }}></div>;
};



// export interface P5WrapperState {
//   sketch: (p: p5) => void;
//   canvas: p5;
//   wrapper: HTMLElement;
// }

// export default class P5Wrapper extends Component <P5WrapperProps, P5WrapperState> {

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