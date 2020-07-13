import { useState, useEffect } from "react";
import React from "react";
import { getDBScale, getNormDBScale } from "../../dbScale";
import { LogSlider } from "../LogSlider/LogSlider";
import { LogScaleOptions } from "../../logScale";

interface VolumeSliderProps {
    label?: string;
    defaultValue? : number;
    onValueChange? : (newvalue : number) => void;
  }

// Math.round(val*10)/10

const so : LogScaleOptions = {
  srcMin: 0,
  srcMax: 1,
  destMin: -40,
  destMax: 24,
  inValue: 0.5,
  outValue: 0
};

export const VolumeSlider : React.FC<VolumeSliderProps> = (props: VolumeSliderProps) => {
    const [val, setVal] = useState<number>(props.defaultValue);

    useEffect(() => {
        if(props.onValueChange){
            props.onValueChange(val);
        }
    }, [val]);
  
    return (
      <LogSlider label={props.label} scaleOptions={so} onValueChange={setVal} defaultValue={props.defaultValue}/>
    );
  };
