import React, { useState } from 'react';
import { P5Wrapper } from '../../utils/react-p5-wrapper';
import templateSketch from './templateSketch';

export const MBTemplate: React.FC<{}> = (props: {}) => {
  const [num, setNum] = useState<number>(81.5 * 4);

  return (
    <div>
      <input type="range" min="0" max="500" value={num} className="frequency" onChange={e => setNum(parseFloat(e.target.value))} />
      <P5Wrapper sketch={templateSketch} sketchProps={{ freq: num }} />
    </div>
  );
};
