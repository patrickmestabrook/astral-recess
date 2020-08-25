import { put, takeEvery, all } from 'redux-saga/effects'

function* setMasterVolume(masterVolume, audioContext, { payload }) {
  console.log('masterVolume is', masterVolume);
  console.log('audioContext is', audioContext);
  console.log('payload is', payload);
  masterVolume.gain.linearRampToValueAtTime(payload, audioContext.currentTime + 0.2);
}

function* setOscillatorParameter(oscillators, { payload }) {
  console.log('setOscillatorParameter');
  console.log('oscillators is', oscillators);
  console.log('payload is', payload);
  const { oscillatorIndex, parameter, value } = payload;
  oscillators[oscillatorIndex][parameter].value = value;
}

function* initializeAudioSaga() {
  console.log('initSaga()');
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const oscillator1 = audioContext.createOscillator();
  const panner1 = audioContext.createStereoPanner();
  panner1.pan.setValueAtTime(-1, audioContext.currentTime);
  const oscillator2 = audioContext.createOscillator();
  const panner2 = audioContext.createStereoPanner();
  panner2.pan.setValueAtTime(1, audioContext.currentTime);
  const masterVolume = audioContext.createGain();
  masterVolume.gain.value = 0;
  oscillator1.type = 'sine';
  oscillator2.type = 'sine';
  oscillator1.frequency.value = 72; // value in hertz
  oscillator2.frequency.value = 71.6; // value in hertz
  oscillator1.detune.setValueAtTime(-19, audioContext.currentTime); // value in cents
  oscillator1.connect(panner1);
  oscillator2.connect(panner2);
  panner1.connect(masterVolume);
  panner2.connect(masterVolume);
  masterVolume.connect(audioContext.destination);
  oscillator1.start();
  oscillator2.start();
  masterVolume.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 5);
  const oscillators = [oscillator1, oscillator2];
  yield put({type: '@action.initializeApp'});
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