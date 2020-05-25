import React from "react";
import {P5Wrapper} from "../../utils/react-p5-wrapper";
import spaceWaveSketch from "../MBSpaceWave/spaceWaveSketch";


export const MBTemplate: React.FC<{}> = (props: {}) => {
    return (
        <P5Wrapper sketch={spaceWaveSketch} />
    );
  };
  