import React, { Component } from "react";
import MBOmniSourcesWebGL from "./MBOmniSourcesWebGL";
import MBOmniSourcesP5 from "./MBOmniSourcesP5";
import "./MBOmniSources.scss"

export default class MBOmniSources extends Component {
    state = {
        positions : [[0,100],[100,100],[200,100],[300,100],[400,100],[500,100]]
    }
    blobChangedPosition = (positions: number[][]) : void  =>  {
        this.setState({positions});
    }

    render() {
        const res = [window.innerWidth-5,window.innerHeight-5];
        return (
            <div className="blobs" style={{width:innerWidth, height:innerHeight}}>
                <MBOmniSourcesWebGL res={res} positions={this.state.positions}/>
                <MBOmniSourcesP5 res={res} blobMoved={this.blobChangedPosition}/>
            </div>
        );
    }
}