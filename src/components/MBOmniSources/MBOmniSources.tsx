import React, { useState } from 'react';
import { P5Wrapper } from '../../utils/react-p5-wrapper';
import omniSourceSketch from './omniSourcesSketch';

export const MBOmniSources: React.FC<{}> = (props: {}) => {
  const [freq, setFreq] = useState<number>(81.5 * 4);

  return (
    <div>
      <input type="range" min="0" max="500" value={freq} className="frequency" onChange={e => setFreq(parseFloat(e.target.value))} />
      <P5Wrapper sketch={omniSourceSketch} sketchProps={{ freq }} />
    </div>
  );
};
