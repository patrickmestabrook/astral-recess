import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { VerticalRange } from 'Components';

function AudioNodeParameterRange({
  audioNodeIndex,
  parameter,
  step = 0.0001,
  min,
  max
}) {
  const props = { parameter, step, min, max };
  const audioNodes = useStoreState(state => state.activePreset.audioNodes);
  const setAudioNodeParameter = useStoreActions(actions => actions.activePreset.setAudioNodeParameter)
  return (
    <VerticalRange
      {...props}
      values={[audioNodes[audioNodeIndex][parameter]]}
      onChange={([value]) => setAudioNodeParameter({
        audioNodeIndex,
        parameter,
        value
      })}
    />
  );
}

export default AudioNodeParameterRange;
