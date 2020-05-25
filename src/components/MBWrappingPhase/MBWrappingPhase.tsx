import React from "react";
import {P5Wrapper} from "../../utils/react-p5-wrapper";
import wrappingPhaseSketch from "./wrappingPhaseSketch";

export const MBWrappingPhase: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={wrappingPhaseSketch} />
  );
};
