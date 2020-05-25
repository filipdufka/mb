import React, { Component } from "react";
import {P5Wrapper} from "../../utils/react-p5-wrapper";
import headDistanceSketch from "./headDistanceSketch";

export const MBHeadDistance: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={headDistanceSketch} />
  );
};