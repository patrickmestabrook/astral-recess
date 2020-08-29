import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { VerticalRange } from 'Components';

function OscillatorParameterRange({
  oscillatorIndex,
  parameter,
  step,
  min,
  max
}) {
  const oscillatorProps = { parameter, step, min, max };
  const oscillators = useStoreState(state => state.oscillators);
  const setOscillatorParameter = useStoreActions(actions => actions.setOscillatorParameter)
  return (
    <VerticalRange
      {...oscillatorProps}
      values={[oscillators[oscillatorIndex][parameter]]}
      onChange={([value]) => setOscillatorParameter({
        oscillatorIndex,
        parameter,
        value
      })}
    />
  );
}

export default OscillatorParameterRange;
