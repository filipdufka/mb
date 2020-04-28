import { Component } from "react";
import MBLogo from "./MBLogo/MBLogo";
import MBHeadDistance from "./MBHeadDistance/MBHeadDistance";
import MBHeadroom from "./MBHeadroom/MBHeadroom";


export const links : MenuItem[]= [
    { path: "/", name: "Logo", component: MBLogo },
    { path: "/head_distance", name: "Head Distance", component: MBHeadDistance },
    { path: "/headroom", name: "Headroom", component: MBHeadroom },
  ];

  
interface MenuItem {
    path: string;
    name: string;
    component: typeof Component;
}
