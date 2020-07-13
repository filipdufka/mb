import React, { useState } from 'react';
import { P5Wrapper } from '../../utils/react-p5-wrapper';
import wrappingPhaseSketch from './wrappingPhaseSketch';

export const MBWrappingPhase: React.FC<{}> = (props: {}) => {
  const [test, setTest] = useState('');

  return (
    <div className="inside">
      <div className="options">
        <input type={'text'} onChange={(e) => { setTest(e.target.value); }} />

      </div>
      <div className="pageContent">
        <P5Wrapper sketch={wrappingPhaseSketch} sketchProps={{ test: test }} />
      </div>
    </div>


  );
};
