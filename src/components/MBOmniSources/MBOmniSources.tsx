import React, { useState, useRef, useLayoutEffect } from 'react';
import { P5Wrapper } from '../../utils/react-p5-wrapper';
import omniSourceSketch from './omniSourcesSketch';
import { LogSlider } from '../../utils/ui/LogSlider/LogSlider';
import { VolumeSlider } from '../../utils/ui/volumeSlider/volumeSlider';
import { defaultFreqScaleOptions } from '../../utils/logScale';
import { getNormDBScale } from '../../utils/dbScale';

export const MBOmniSources: React.FC<{}> = (props: {}) => {
  const options = [1, 2, 3, 4, 5];
  const [numOfOmniSources, setNumOfOmniSources] = useState<number>(options[1]);
  const [freq, setFreq] = useState<number>(81.5 * 4);
  const [volume, setVolume] = useState<number>(3);

  const onFreqChange = (newFreq : number) =>{
    setFreq(newFreq);
  }

  const onVolumeChange = (newVolume : number) =>{
    setVolume(getNormDBScale(newVolume));
  }


  return (
    <div className="inside">
      <div className="options">
      <LogSlider label="Frekvence (Hz):" onValueChange={onFreqChange} defaultValue={freq} scaleOptions={defaultFreqScaleOptions}/>

      <VolumeSlider label="Hlasitost (dB):" onValueChange={onVolumeChange} defaultValue={volume}/>
     
      <label htmlFor="numSources">Počet zdrojů: </label>
      <select
        id="numSources"
        className="numSources"
        value={numOfOmniSources}
        onChange={e => setNumOfOmniSources(+e.target.value)}>
        {options.map(o => (
          <option value={o} key={o}>{o}</option>
        ))}
      </select>
      </div>
      <div className="pageContent">        
        <P5Wrapper sketch={omniSourceSketch} sketchProps={{ freq, numOfOmniSources, volume }} /> 
      </div>
    </div>
  );
};
