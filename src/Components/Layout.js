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

function Layout() {

  const visualizer = useStoreState(state => state.visualizer);
  console.log('visualizer is', visualizer);

  /*
   * Canvas experiment
   */
  let canvasRef = useRef();
  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return ;
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');

    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let requestId,
        i = 0;

    /*
     * Main canvas rendering function
     */
    const render = () => {

      var bufferLength = visualizer.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      visualizer.getByteTimeDomainData(dataArray);

      visualizer.getByteTimeDomainData(dataArray);

      context.fillStyle = "rgb(200, 200, 200)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.lineWidth = 2;
      context.strokeStyle = "rgb(0, 0, 0)";

      context.beginPath();

      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        x += sliceWidth;
      }

      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();

      // ANIMATION TEST
      // context.clearRect(0, 0, canvas.width, canvas.height);
      // context.beginPath();
      // context.arc(
      //   canvas.width / 2,
      //   canvas.height / 2,
      //   (canvas.width / 2) * Math.abs(Math.cos(i)),
      //   0,
      //   2 * Math.PI
      // );
      // context.fill();
      // i += 0.05;

      requestId = requestAnimationFrame(render);
    }


    /*
     * Kick off canvas render with requestAnimationFrame()
     */
    render();

    /*
     * Return clean-up stuff for useEffect()
     */
    return () => {
      cancelAnimationFrame(requestId);
    }
  });



  const transport = {
    ...useStoreState(state => state.transport),
    ...useStoreActions(actions => actions.transport),
  };
  const mixer = {
    ...useStoreState(state => state.mixer),
    ...useStoreActions(actions => actions.mixer),
  };

  // example of using state and actions from easy-peasy
  const theme = useStoreState(state => state.theme);
  const toggleTheme = useStoreActions(actions => actions.toggleTheme);

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
              step={0.001}
              min={20}
              max={300}
            />
            <OscillatorParameterRange
              oscillatorIndex={0}
              parameter="detune"
              step={0.001}
              min={-50}
              max={50}
            />
          </Controls>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>right oscillator</ControlLabel>
          <Controls>
            <OscillatorParameterRange
              oscillatorIndex={1}
              parameter="frequency"
              step={0.001}
              min={20}
              max={300}
            />
            <OscillatorParameterRange
              oscillatorIndex={1}
              parameter="detune"
              step={0.001}
              min={-50}
              max={50}
            />
          </Controls>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>pink noise</ControlLabel>
          <Controls>
            <OscillatorParameterRange
              oscillatorIndex={3}
              parameter="frequency"
              step={0.001}
              min={1}
              max={10000}
            />
            <OscillatorParameterRange
              oscillatorIndex={3}
              parameter="Q"
              step={0.001}
              min={0}
              max={15}
            />
            <OscillatorParameterRange
              oscillatorIndex={2}
              parameter="gain"
              step={0.001}
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
        ref={canvasRef}
        id="visualizer"
        style={{ width: '500px', height: '500px' }}
      />
    </div>
  );
}

export default Layout;
