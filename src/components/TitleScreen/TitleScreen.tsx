import React, { Component } from "react";
import {MBLogo} from "../MBLogo/MBLogo";
import "./TitleScreen.scss"

export const TitleScreen: React.FC<{}> = (props: {}) => {
    return (
        <div className="titleScreen">
            <MBLogo height={250} />
            <h1>Michal<br />Bruna</h1>
            <h2>Audio Consultant</h2>
        </div>
    );
};
