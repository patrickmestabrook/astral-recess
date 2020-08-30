import React, { useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, OscillatorParameterRange, VerticalRange } from 'Components';
import { ControlGroup, ControlLabel, Controls, ControlsWrapper } from './Styled';


/*
 * This stuff is all for canvas pixel ratio.
 */
const getPixelRatio = context => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

const useVisualizer = (canvasRef, visualizer) => (
  () => {
    if (!canvasRef || !canvasRef.current) return;
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');
    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let height = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    /*
    * Main canvas rendering function
    */
    let requestId;
    const render = () => {
      var bufferLength = visualizer.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      visualizer.getByteTimeDomainData(dataArray);
      context.fillStyle = "rgb(200, 200, 200)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = 10;
      context.strokeStyle = "rgb(0, 0, 0)";
      context.beginPath();
      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;
        if (i === 0) { context.moveTo(x, y); }
        else { context.lineTo(x, y); }
        x += sliceWidth;
      }
      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();
      requestId = requestAnimationFrame(render);
    }
    render();
    return () => { cancelAnimationFrame(requestId); }
  }
);

function Layout() {

  const visualizer = useStoreState(state => state.visualizer);
  const oscillator1Visualizer = useStoreState(state => state.oscillator1Visualizer);
  const oscillator2Visualizer = useStoreState(state => state.oscillator2Visualizer);

  /*
   * Canvas experiment
   */
  let canvasRef = useRef();
  let osc1Ref = useRef();
  let osc2Ref = useRef();
  useEffect(useVisualizer(canvasRef, visualizer));
  useEffect(useVisualizer(osc1Ref, oscillator1Visualizer));
  useEffect(useVisualizer(osc2Ref, oscillator2Visualizer));

  const mixer = {
    ...useStoreState(state => state.mixer),
    ...useStoreActions(actions => actions.mixer),
  };

  const hasUserPermissionForAudio = useStoreState(state => state.hasUserPermissionForAudio);
  const grantUserPermissionForAudio = useStoreActions(
    actions => actions.grantUserPermissionForAudio
  );

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
      <ControlsWrapper>

        <ControlGroup>
          <ControlLabel>left oscillator</ControlLabel>
          <Controls>
            <OscillatorParameterRange
              oscillatorIndex={0}
              parameter="frequency"
              step={0.0001}
              min={20}
              max={300}
            />
            <OscillatorParameterRange
              oscillatorIndex={0}
              parameter="detune"
              step={0.0001}
              min={-50}
              max={50}
            />
            <OscillatorParameterRange
              oscillatorIndex={4}
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
            <OscillatorParameterRange
              oscillatorIndex={1}
              parameter="frequency"
              min={20}
              max={300}
            />
            <OscillatorParameterRange
              oscillatorIndex={1}
              parameter="detune"
              min={-50}
              max={50}
            />
            <OscillatorParameterRange
              oscillatorIndex={5}
              parameter="gain"
              min={0}
              max={0.5}
            />
          </Controls>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>pink noise</ControlLabel>
          <Controls>
            <OscillatorParameterRange
              oscillatorIndex={3}
              parameter="frequency"
              step={0.0001}
              min={1}
              max={10000}
            />
            <OscillatorParameterRange
              oscillatorIndex={3}
              parameter="Q"
              step={0.0001}
              min={0}
              max={15}
            />
            <OscillatorParameterRange
              oscillatorIndex={2}
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
          values={[mixer.masterVolume]}
          onChange={([value]) => mixer.setMasterVolume(value)}
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
