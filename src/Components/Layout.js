import React, { useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, AudioNodeParameterRange, VerticalRange } from 'Components';
import { ControlGroup, ControlLabel, Controls, ControlsWrapper } from './Styled';
import { useVisualizer } from 'helpers/animation';


/**
 * @function
 * @name Layout
 */
function Layout() {
  const hasUserPermissionForAudio = useStoreState(state => state.hasUserPermissionForAudio);
  const grantUserPermissionForAudio = useStoreActions(actions => actions.grantUserPermissionForAudio);
  const masterVolume = useStoreState(state => state.activePreset.mixer.masterVolume);
  const setMasterVolume = useStoreActions(actions => actions.activePreset.mixer.setMasterVolume);
  const presets = useStoreState(state => state.presets);
  const changeActivePreset = useStoreActions(actions => actions.changeActivePreset);

  // @TODO this all needs changing
  const visualizer = useStoreState(state => state.visualizer);
  const oscillator1Visualizer = useStoreState(state => state.oscillator1Visualizer);
  const oscillator2Visualizer = useStoreState(state => state.oscillator2Visualizer);
  let canvasRef = useRef();
  let osc1Ref = useRef();
  let osc2Ref = useRef();
  useEffect(useVisualizer(canvasRef, visualizer));
  useEffect(useVisualizer(osc1Ref, oscillator1Visualizer));
  useEffect(useVisualizer(osc2Ref, oscillator2Visualizer));

  if (!hasUserPermissionForAudio) {
    return (
      <Button
        onClick={() => grantUserPermissionForAudio()}
      >
        Grant permission for audio
      </Button>
    );
  }

  return (
    <div>
      <div>
        <h3>presets</h3>
        <Button onClick={() => changeActivePreset(presets[0])}>1</Button>
        <Button onClick={() => changeActivePreset(presets[1])}>2</Button>
        <Button onClick={() => changeActivePreset(presets[2])}>3</Button>
        <Button onClick={() => changeActivePreset(presets[3])}>4</Button>
        <Button onClick={() => changeActivePreset(presets[4])}>5</Button>
        <Button onClick={() => changeActivePreset(presets[5])}>6</Button>

      </div>
      <ControlsWrapper>
        <ControlGroup>
          <ControlLabel>left oscillator</ControlLabel>
          <Controls>
            <AudioNodeParameterRange
              audioNodeIndex={0}
              parameter="frequency"
              step={0.0001}
              min={20}
              max={300}
            />
            <AudioNodeParameterRange
              audioNodeIndex={0}
              parameter="detune"
              step={0.0001}
              min={-50}
              max={50}
            />
            <AudioNodeParameterRange
              audioNodeIndex={4}
              parameter="gain"
              step={0.0001}
              min={0}
              max={0.5}
            />
          </Controls>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>right oscillator</ControlLabel>
          <Controls>
            <AudioNodeParameterRange
              audioNodeIndex={1}
              parameter="frequency"
              min={20}
              max={300}
            />
            <AudioNodeParameterRange
              audioNodeIndex={1}
              parameter="detune"
              min={-50}
              max={50}
            />
            <AudioNodeParameterRange
              audioNodeIndex={5}
              parameter="gain"
              min={0}
              max={0.5}
            />
          </Controls>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>pink noise</ControlLabel>
          <Controls>
            <AudioNodeParameterRange
              audioNodeIndex={3}
              parameter="frequency"
              step={0.0001}
              min={1}
              max={10000}
            />
            <AudioNodeParameterRange
              audioNodeIndex={3}
              parameter="Q"
              step={0.0001}
              min={0}
              max={15}
            />
            <AudioNodeParameterRange
              audioNodeIndex={2}
              parameter="gain"
              step={0.0001}
              min={0}
              max={0.25}
            />
          </Controls>
        </ControlGroup>

        <VerticalRange
          name="master volume"
          step={0.0001}
          min={0}
          max={1}
          values={[masterVolume]}
          onChange={([value]) => setMasterVolume(value)}
        />
      </ControlsWrapper>
      <canvas
        ref={osc1Ref}
        style={{ width: '500px', height: '500px' }}
      />
      <canvas
        ref={osc2Ref}
        style={{ width: '500px', height: '500px' }}
      />
      <canvas
        ref={canvasRef}
        id="visualizer"
        style={{ width: '500px', height: '500px' }}
      />
    </div>
  );
}

export default Layout;
