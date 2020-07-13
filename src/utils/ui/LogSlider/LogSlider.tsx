import { useState, useEffect } from "react";
import React from "react";
import { getInvLogScale, getLogScale, LogScaleOptions } from "../../logScale";

interface LogSliderProps {
    label?: string;
    defaultValue? : number;
    onValueChange? : (newvalue : number) => void;
    scaleOptions : LogScaleOptions;
  }

export const LogSlider: React.FC<LogSliderProps> = (props: LogSliderProps) => {
    const [val, setVal] = useState<number>(props.defaultValue);

    const updateValue = (input : number) => {
      if(isNaN(input)){
        console.log("not a number");
      }else{
        setVal(input);
      }
    }

    useEffect(() => {
        if(props.onValueChange){
            props.onValueChange(val);
        }
    }, [val]);
  
    return (
      <span>        
        <label htmlFor="logslider">{props.label} </label>
        <input type="range" min={0} max={1} step = {0.00001} value={getInvLogScale(props.scaleOptions, val)} className="logslider" onChange={e => updateValue(getLogScale(props.scaleOptions, parseFloat(e.target.value)))} />
        <input type="number" min={props.scaleOptions.destMin} max={props.scaleOptions.destMax} value={val} className="logsliderN" onChange={e => updateValue(parseFloat(e.target.value))} />      
      </span>
    );
  };
