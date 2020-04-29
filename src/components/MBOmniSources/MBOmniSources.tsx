import React, { Component } from "react";
import MBOmniSourcesWebGL from "./MBOmniSourcesWebGL";
import MBOmniSourcesP5 from "./MBOmniSourcesP5";
import "./MBOmniSources.scss"
import { Vector } from "p5";

export default class MBOmniSources extends Component {
    state = {
        positions : [new Vector(), new Vector(), new Vector(), new Vector(), new Vector()]
    }
    blobChangedPosition = (positions: Vector[]) : void  =>  {
        this.setState({positions});
    }

    render() {
        const res = [800, 800];
        return (
            <div className="blobs" style={{width:innerWidth, height:innerHeight}}>
                <MBOmniSourcesWebGL res={res} positions={this.state.positions}/>
                <MBOmniSourcesP5 res={res} blobMoved={this.blobChangedPosition} numOfOmniSources={5}/>
            </div>
        );
    }
}