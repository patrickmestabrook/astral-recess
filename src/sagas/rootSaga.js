import { put, takeEvery, all } from 'redux-saga/effects'
import {
  createAudioContext,
  createOscillator,
  setMasterVolume,
  setOscillatorParameter,
} from 'audio/helpers';

/*
 * INITIALIZE ALL THE WEB AUDIO TINGS
 */
function* initializeAudioSaga() {
  const [audioContext, masterGain, masterAnalyser] = createAudioContext();


  const [osc1, osc1Gain, osc1Analyser] = createOscillator(
    audioContext,
    masterGain,
    {
      frequency: 79,
      detune: -19,
      pan: -1,
    }
  );
  const [osc2, osc2Gain, osc2Analyser] = createOscillator(
    audioContext,
    masterGain,
    {
      frequency: 78,
      pan: 1,
    }
  );

  /*
   * Pink Noise + filter, gain
   */
  const bufferSize = 4096;
  const pinkNoise = (function() {
      var b0, b1, b2, b3, b4, b5, b6;
      b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
      const node = audioContext.createScriptProcessor(bufferSize, 1, 1);
      node.onaudioprocess = function(e) {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
              const white = Math.random() * 2 - 1;
              b0 = 0.99886 * b0 + white * 0.0555179;
              b1 = 0.99332 * b1 + white * 0.0750759;
              b2 = 0.96900 * b2 + white * 0.1538520;
              b3 = 0.86650 * b3 + white * 0.3104856;
              b4 = 0.55000 * b4 + white * 0.5329522;
              b5 = -0.7616 * b5 - white * 0.0168980;
              output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
              output[i] *= 0.11; // (roughly) compensate for gain
              b6 = white * 0.115926;
          }
      }
      return node;
  })();
  const pinkNoiseFilter = audioContext.createBiquadFilter();
  const pinkNoiseVolume =  audioContext.createGain();
  pinkNoise.connect(pinkNoiseFilter);
  pinkNoiseFilter.connect(pinkNoiseVolume);
  pinkNoiseFilter.type = 'lowpass';
  pinkNoiseFilter.frequency.value = 5000;
  pinkNoiseFilter.Q.value = 0;
  pinkNoiseVolume.gain.value = 0.01;
  pinkNoiseVolume.connect(masterGain);


  /*
   * Listen for incoming actions that affect audio nodes
   */
  const oscillators = [
    osc1,
    osc2,
    pinkNoiseVolume,
    pinkNoiseFilter,
    osc1Gain,
    osc2Gain
  ];

  // this is a terrible way of giving some canvas components access to the analyser nodes
  // @TODO fix this in a smart and good and sane way please
  yield put({type: '@action.createVisualizer', payload: masterAnalyser});
  yield put({type: '@action.createOsc1Visualizer', payload: osc1Analyser});
  yield put({type: '@action.createOsc2Visualizer', payload: osc2Analyser});

  // listen for parameter changes
  yield takeEvery('@action.mixer.setMasterVolume', setMasterVolume, masterGain, audioContext);
  yield takeEvery('@action.setOscillatorParameter', setOscillatorParameter, oscillators);
}

function* watchForUserPermissionForAudio() {
  yield takeEvery('@action.grantUserPermissionForAudio', initializeAudioSaga);
}

export default function* rootSaga() {
  yield all([
    watchForUserPermissionForAudio(),
  ])
}