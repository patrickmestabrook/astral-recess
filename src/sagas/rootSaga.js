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
   * Oscillator 1 + panner
   */
  const oscillator1 = audioContext.createOscillator();
  oscillator1.type = 'sine';
  oscillator1.frequency.value = 72; // value in hertz
  const panner1 = audioContext.createStereoPanner();
  panner1.pan.setValueAtTime(-1, audioContext.currentTime);
  oscillator1.connect(panner1);
  oscillator1.start();


  /*
   * Oscillator 2 + panner
   */
  const oscillator2 = audioContext.createOscillator();
  oscillator2.type = 'sine';
  oscillator2.frequency.value = 71.6; // value in hertz
  const panner2 = audioContext.createStereoPanner();
  panner2.pan.setValueAtTime(1, audioContext.currentTime);
  oscillator2.connect(panner2);
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
  panner1.connect(masterVolume);
  panner2.connect(masterVolume);
  pinkNoiseVolume.connect(masterVolume);

  // masterVolume.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 2);


  /*
   * Visualizer, animation
   */
  const visualizer = audioContext.createAnalyser();
  visualizer.fftSize = 2048;
  masterVolume.connect(visualizer);
  visualizer.connect(audioContext.destination);

  /*
   * Listen for incoming actions that affect audio nodes
   */
  const oscillators = [oscillator1, oscillator2, pinkNoiseVolume, pinkNoiseFilter];
  yield put({type: '@action.initializeApp'});
  yield put({type: '@action.createVisualizer', payload: visualizer});
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