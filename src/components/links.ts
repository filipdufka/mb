import { Component } from "react";
import MBLogo from "./MBLogo/MBLogo";
import MBHeadDistance from "./MBHeadDistance/MBHeadDistance";
import MBHeadroom from "./MBHeadroom/MBHeadroom";
import MBPhasors from "./MBPhasors/MBPhasors";
import MBSinAdd from "./MBSinAdd/MBSinAdd";

export const links: MenuItem[] = [
  { path: "/", name: "Logo", component: MBLogo },
  { path: "/head_distance", name: "Head Distance", component: MBHeadDistance },
  { path: "/headroom", name: "Headroom", component: MBHeadroom },
  { path: "/phasors", name: "Phasors", component: MBPhasors },
  { path: "/sin_add", name: "Sin Add", component: MBSinAdd },
];

interface MenuItem {
  path: string;
  name: string;
  component: typeof Component;
}
