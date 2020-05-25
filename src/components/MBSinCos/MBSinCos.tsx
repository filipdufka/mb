import React, { Component } from "react";
import P5Wrapper from "../../utils/react-p5-wrapper";
import phasorsSketch from "../MBPhasors/phasorSketch";
import sinCosSketch from "./sinCosSketch";

export const MBSinCos: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={sinCosSketch} />
  );
};
