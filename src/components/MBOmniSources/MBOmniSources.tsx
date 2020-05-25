import React from "react";
import "./MBOmniSources.scss"
import omniSourcesSketch from "./omniSourcesSketch";
import P5Wrapper from "../../utils/react-p5-wrapper";


export const MBOmniSources: React.FC<{}> = (props: {}) => {
    return (
        <P5Wrapper sketch={omniSourcesSketch} />
    );
  };

// export default class MBOmniSources extends Component {
//     state = {
//         positions : [new Vector(), new Vector(), new Vector(), new Vector(), new Vector()]
//     }
//     blobChangedPosition = (positions: Vector[]) : void  =>  {
//         this.setState({positions});
//     }

//     render() {
//         const res = [800, 800];
//         return (
//             <div className="blobs" style={{width:innerWidth, height:innerHeight}}>
//                 <MBOmniSourcesWebGL res={res} positions={this.state.positions}/>
//                 <MBOmniSourcesP5 res={res} blobMoved={this.blobChangedPosition} numOfOmniSources={5}/>
//             </div>
//         );
//     }
// }