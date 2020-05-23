import React, { Component } from "react";
import headroomSketch from "./headroomSketch";
import P5Wrapper from "../../utils/react-p5-wrapper";

export const MBHeadroom: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={headroomSketch} />
  );
};