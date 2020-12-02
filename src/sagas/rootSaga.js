/**
 * @file Presently the only file that contains any sagas.
 * @author Patrick Estabrook
 */


import { put, takeEvery, all } from 'redux-saga/effects'
import {
  createAudioContext,
  createOscillator,
  createPinkNoiseOscillator,
  setMasterVolume,
  setAudioNodeParameter,
  setAllAudioParameters,
} from 'helpers/audio';


/**
 * @generator
 * @name initializeAudioSaga
 */
function* initializeAudioSaga() {
  const [audioContext, masterGain, masterAnalyser] = createAudioContext();

  const [osc1, osc1Gain, osc1Analyser] = createOscillator(audioContext, masterGain,
    { frequency: 79, detune: -19, pan: -1 }
  );
  const [osc2, osc2Gain, osc2Analyser] = createOscillator(audioContext, masterGain,
    { frequency: 78, pan: 1 }
  );
  const [pinkNoiseGain, pinkNoiseFilter] = createPinkNoiseOscillator(audioContext, masterGain);

  const audioNodes = [osc1, osc2, pinkNoiseFilter, pinkNoiseGain, osc1Gain, osc2Gain];

  // listen for parameter changes
  yield takeEvery('@action.activePreset.mixer.setMasterVolume', setMasterVolume, masterGain, audioContext);
  yield takeEvery('@action.activePreset.setAudioNodeParameter', setAudioNodeParameter, audioNodes);
  yield takeEvery('@action.changeActivePreset', setAllAudioParameters, audioContext, masterGain, audioNodes);
  // @TODO fix this in a smart and good and sane way please
  yield put({type: '@action.createVisualizer', payload: masterAnalyser});
  yield put({type: '@action.createOsc1Visualizer', payload: osc1Analyser});
  yield put({type: '@action.createOsc2Visualizer', payload: osc2Analyser});
}


/**
 * @generator
 * @name watchForUserPermissionForAudio
 */
function* watchForUserPermissionForAudio() {
  yield takeEvery('@action.grantUserPermissionForAudio', initializeAudioSaga);
}


/**
 * @generator
 * @name rootSaga
 */
export default function* rootSaga() {
  yield all([
    watchForUserPermissionForAudio(),
  ])
}