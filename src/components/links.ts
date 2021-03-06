import {MBHeadDistance} from "./MBHeadDistance/MBHeadDistance";
import {MBHeadroom} from "./MBHeadroom/MBHeadroom";
import {MBPhasors} from "./MBPhasors/MBPhasors";
import {MBSinAdd} from "./MBSinAdd/MBSinAdd";
import {MBSinCos} from "./MBSinCos/MBSinCos";
import {MBSpaceWave} from "./MBSpaceWave/MBSpaceWave";
import {MBWrappingPhase} from "./MBWrappingPhase/MBWrappingPhase";
import {MBOmniSources} from "./MBOmniSources/MBOmniSources";
import {TitleScreen} from "./TitleScreen/TitleScreen";
import React from "react";

export const links: MenuItem[] = [
  { path: "/", name: "Logo", component: TitleScreen },
  { path: "/head_distance", name: "Head Distance", component: MBHeadDistance },
  { path: "/headroom", name: "Headroom", component: MBHeadroom },
  { path: "/omni_sources", name: "Omni Sources", component: MBOmniSources },
  { path: "/phasors", name: "Phasors", component: MBPhasors },
  { path: "/sin_add", name: "Sin Add", component: MBSinAdd },
  { path: "/sin_cos", name: "Sin Cos", component: MBSinCos },
  { path: "/space_wave", name: "Space Wave", component: MBSpaceWave },
  { path: "/wrapping_phase", name: "Wrapping Phase", component: MBWrappingPhase },
];

interface MenuItem {
  path: string;
  name: string;
  component: React.FunctionComponent;
}
