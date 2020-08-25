import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, VerticalRange } from 'Components';



function Layout() {
  const transport = {
    ...useStoreState(state => state.transport),
    ...useStoreActions(actions => actions.transport),
  };
  const mixer = {
    ...useStoreState(state => state.mixer),
    ...useStoreActions(actions => actions.mixer),
  };
  const oscillators = useStoreState(state => state.oscillators);
  const setOscillatorParameter = useStoreActions(actions => actions.setOscillatorParameter)

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
      {/* <Button
        theme={theme}
        onClick={() => {
          toggleTheme();
        }}
      >
        This is the {theme} theme
      </Button>

      <Button onClick={() => mixer.createTrack()}>
        Create Track
      </Button>
      <Button
        disabled={transport.isPlaying}
        onClick={() => transport.play()}
      >
        play
      </Button>
      <Button
        disabled={transport.isPaused}
        onClick={() => transport.pause()}
      >
        pause
      </Button>
      <Button
        disabled={transport.isStopped}
        onClick={() => transport.stop()}
      >
        stop
      </Button> */}
      <div style={{ display: 'flex', flexDirection: 'row', margin: '20px', padding: '20px'}}>
        {/* oscillator frequencies */}
        <div style={{ marginRight: '100px' }}>
          <label style={{ display: 'block', textAlign: 'center' }}>left oscillator</label>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <VerticalRange
              name="frequency"
              step={0.001}
              min={20}
              max={300}
              values={[oscillators[0].frequency]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 0,
                parameter: 'frequency',
                value
              })}
            />
            <VerticalRange
              name="detune"
              step={0.001}
              min={-50}
              max={50}
              values={[oscillators[0].detune]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 0,
                parameter: 'detune',
                value
              })}
            />
          </div>
        </div>

        <div style={{ marginRight: '100px'}}>
          <label style={{ display: 'block', textAlign: 'center' }}>right oscillator</label>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <VerticalRange
              name="frequency"
              step={0.001}
              min={20}
              max={300}
              values={[oscillators[1].frequency]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 1,
                parameter: 'frequency',
                value
              })}
            />
            <VerticalRange
              name="detune"
              step={0.001}
              min={-50}
              max={50}
              values={[oscillators[1].detune]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 1,
                parameter: 'detune',
                value
              })}
            />
          </div>
        </div>
        <div style={{ marginRight: '100px'}}>
          <label style={{ display: 'block', textAlign: 'center' }}>pink noise</label>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
          <VerticalRange
              name="filter freq"
              step={0.002}
              min={1}
              max={10000}
              values={[oscillators[3].frequency]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 3,
                parameter: 'frequency',
                value
              })}
            />
            <VerticalRange
              name="filter q"
              step={0.001}
              min={0}
              max={15}
              values={[oscillators[3].Q]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 3,
                parameter: 'Q',
                value
              })}
            />
            <VerticalRange
              name="volume"
              step={0.001}
              min={0}
              max={0.25}
              values={[oscillators[2].gain]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 2,
                parameter: 'gain',
                value
              })}
            />
            {/* <VerticalRange
              name="detune"
              step={0.001}
              min={-50}
              max={50}
              values={[oscillators[1].detune]}
              onChange={([value]) => setOscillatorParameter({
                oscillatorIndex: 1,
                parameter: 'detune',
                value
              })}
            /> */}
          </div>
        </div>
        <VerticalRange
          name="master volume"
          step={0.0001}
          min={0}
          max={1}
          values={[mixer.masterVolume]}
          onChange={([value]) => mixer.setMasterVolume(value)}
        />
      </div>
    </div>
  );
}

export default Layout;
