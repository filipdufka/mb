import React, { Component } from "react";
import MBOmniSourcesWebGL from "./MBOmniSourcesWebGL";
import MBOmniSourcesP5 from "./MBOmniSourcesP5";
import "./MBOmniSources.scss"
import { Vector } from "p5";

export default class MBOmniSources extends Component {
    state = {
        positions : [[0,100],[100,100],[200,100],[300,100],[400,100],[500,100]]
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