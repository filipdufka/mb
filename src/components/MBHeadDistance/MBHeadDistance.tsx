import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions, Vector } from "p5";
import { DraggablePoint} from '../../utils/p5/draggablePoint'
import { circlesIntersection, getNormal } from "../../utils/p5/commonMath";
import P5Wrapper from "../../utils/react-p5-wrapper";
import headDistanceSketch from "./headDistanceSketch";

export const MBHeadDistance: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={headDistanceSketch} />
  );
};