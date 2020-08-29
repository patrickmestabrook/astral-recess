import { call, delay, put, takeEvery, all } from 'redux-saga/effects'

function doSetMasterVolume(masterVolume, audioContext, value) {
  console.log('doSetMasterVolume');
  console.log('audioContext.currentTime is', audioContext.currentTime);
  masterVolume.gain.linearRampToValueAtTime(value, audioContext.currentTime + 0.1);
}

function* setMasterVolume(masterVolume, audioContext, { payload }) {
  yield call(doSetMasterVolume, masterVolume, audioContext, payload);
}

function* setOscillatorParameter(oscillators, { payload }) {
  const { oscillatorIndex, parameter, value } = payload;
  oscillators[oscillatorIndex][parameter].value = value;
}


/*
 * INITIALIZE ALL THE WEB AUDIO TINGS
 */
function* initializeAudioSaga() {

  // create audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();


  /*
   * Oscillator 1 + panner, visualizer
   */
  const oscillator1 = audioContext.createOscillator();
  const oscillator1Gain = audioContext.createGain();
  const oscillator1Visualizer = audioContext.createAnalyser();
  const oscillator1Panner = audioContext.createStereoPanner();
  oscillator1.type = 'sine';
  oscillator1.frequency.value = 72; // value in hertz
  oscillator1Gain.gain.value = 0.5;
  oscillator1Panner.pan.setValueAtTime(-1, audioContext.currentTime);
  // connections
  oscillator1.connect(oscillator1Gain);
  oscillator1Gain.connect(oscillator1Visualizer);
  oscillator1Visualizer.connect(oscillator1Panner);
  oscillator1.start();


  /*
   * Oscillator 2 + panner, visualizer
   */
  const oscillator2 = audioContext.createOscillator();
  const oscillator2Gain = audioContext.createGain();
  const oscillator2Visualizer = audioContext.createAnalyser();
  const oscillator2Panner = audioContext.createStereoPanner();
  oscillator2.type = 'sine';
  oscillator2.frequency.value = 71.6; // value in hertz
  oscillator2Gain.gain.value = 0.5;
  oscillator2Panner.pan.setValueAtTime(1, audioContext.currentTime);
  // connections
  oscillator2.connect(oscillator2Gain);
  oscillator2Gain.connect(oscillator2Visualizer);
  oscillator2Visualizer.connect(oscillator2Panner);
  oscillator2.start();


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


  /*
   * Master Volume Gain Node, connections
   */
  const masterVolume = audioContext.createGain();
  masterVolume.gain.value = 0;
  oscillator1.detune.setValueAtTime(-19, audioContext.currentTime); // value in cents
  oscillator1Panner.connect(masterVolume);
  oscillator2Panner.connect(masterVolume);
  pinkNoiseVolume.connect(masterVolume);

  // masterVolume.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 2);


  /*
   * Visualizer, animation
   */
  const visualizer = audioContext.createAnalyser();
  masterVolume.connect(visualizer);
  visualizer.connect(audioContext.destination);

  /*
   * Listen for incoming actions that affect audio nodes
   */
  const oscillators = [
    oscillator1,
    oscillator2,
    pinkNoiseVolume,
    pinkNoiseFilter,
    oscillator1Gain,
    oscillator2Gain
  ];
  yield put({type: '@action.initializeApp'});
  yield put({type: '@action.createVisualizer', payload: visualizer});
  yield put({type: '@action.createOsc1Visualizer', payload: oscillator1Visualizer});
  yield put({type: '@action.createOsc2Visualizer', payload: oscillator2Visualizer});
  yield takeEvery('@action.mixer.setMasterVolume', setMasterVolume, masterVolume, audioContext);
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