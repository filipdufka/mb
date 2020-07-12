import React, { useState } from 'react';
import { P5Wrapper } from '../../utils/react-p5-wrapper';
import omniSourceSketch from './omniSourcesSketch';
import { LogSlider } from '../../utils/ui/LogSlider/LogSlider';
import { VolumeSlider } from '../../utils/ui/volumeSlider/volumeSlider';
import { defaultFreqScaleOptions } from '../../utils/logScale';
import { getNormDBScale } from '../../utils/dbScale';

const Dropdown = ({
  options
}) => {
  const [selectedOption, setSelectedOption] = useState(options[1]);
  return (
    <span>
      
    </span>
  );
};

export const MBOmniSources: React.FC<{}> = (props: {}) => {
  const options = [1, 2, 3, 4, 5];
  const [numOfOmniSources, setNumOfOmniSources] = useState<number>(options[1]);
  const [freq, setFreq] = useState<number>(81.5 * 4);
  const [volume, setVolume] = useState<number>(3);
  const minFreq = 0;
  const maxFreq = 5000;

  const onFreqChange = (newFreq : number) =>{
    setFreq(newFreq);
  }

  const onVolumeChange = (newVolume : number) =>{
    setVolume(getNormDBScale(newVolume));
  }

  return (
    <div>

      <LogSlider label="Frekvence (Hz):" onValueChange={onFreqChange} defaultValue={freq} scaleOptions={defaultFreqScaleOptions}/>

      <VolumeSlider label="Hlasitost (dB):" onValueChange={onVolumeChange} defaultValue={0}/>
      
      {/* <label htmlFor="frequency">Frekvence (Hz): </label>
      <input type="range" min={minFreq} max={maxFreq} value={freq} className="frequency" onChange={e => setFreq(parseFloat(e.target.value))} />
      <input type="number" min={minFreq} max={maxFreq} value={freq} className="frequencyN" onChange={e => setFreq(parseFloat(e.target.value))} />       */}

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

      <P5Wrapper sketch={omniSourceSketch} sketchProps={{ freq, numOfOmniSources, volume }} />
    </div>
  );
};
