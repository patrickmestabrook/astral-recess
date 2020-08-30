import { action, createStore } from 'easy-peasy';
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const model = {
  theme: 'light',
  toggleTheme: action((state) => { state.theme = (state.theme === 'light' ? 'dark' : 'light'); }),

  hasUserPermissionForAudio: false,
  grantUserPermissionForAudio: action(state => { state.hasUserPermissionForAudio = true; }),

  errors: ["Must get permission to use AudioContext."],
  createError: action((state, payload) => { state.errors = [...state.errors, payload]; }),

  activePreset: {
    mixer: {
      masterVolume: 0, // between 0 and 1
      setMasterVolume: action((state, payload) => { state.masterVolume = payload; })
    },
    audioNodes: [
      { frequency: 72, detune: -19 },
      { frequency: 71.6, detune: 0 },
      { gain: 0.01 },
      { frequency: 5000, Q: 0 },
      { gain: 0.5 },
      { gain: 0.5 }
    ],
    setAudioNodeParameter: action((state, payload) => {
      const { audioNodeIndex, parameter, value } = payload;
      state.audioNodes[audioNodeIndex][parameter] = value;
    }),
  },

  changeActivePreset: action((state, payload) => {
    const { mixer, audioNodes } = payload;
    state.activePreset.mixer = mixer;
    state.activePreset.audioNodes = audioNodes;
  }),

  presets: [
    {
      mixer: { masterVolume: 0.5 },
      audioNodes: [
        { frequency: 163.733, detune: -19 },
        { frequency: 158.133, detune: 39.667 },
        { gain: 0.0103 },
        { frequency: 3367, Q: 0 },
        { gain: 0.5 },
        { gain: 0.5 }
      ],
    },
    {
      mixer: { masterVolume: 0 },
      audioNodes: [
        { frequency: 72, detune: -19 },
        { frequency: 71.6, detune: 0 },
        { gain: 0.01 },
        { frequency: 5000, Q: 0 },
        { gain: 0.5 },
        { gain: 0.5 }
      ],
    },
    {
      mixer: { masterVolume: 0 },
      audioNodes: [
        { frequency: 72, detune: -19 },
        { frequency: 71.6, detune: 0 },
        { gain: 0.01 },
        { frequency: 5000, Q: 0 },
        { gain: 0.5 },
        { gain: 0.5 }
      ],
    },

    {
      mixer: { masterVolume: 0 },
      audioNodes: [
        { frequency: 72, detune: -19 },
        { frequency: 71.6, detune: 0 },
        { gain: 0.01 },
        { frequency: 5000, Q: 0 },
        { gain: 0.5 },
        { gain: 0.5 }
      ],
    },

    {
      mixer: { masterVolume: 0 },
      audioNodes: [
        { frequency: 72, detune: -19 },
        { frequency: 71.6, detune: 0 },
        { gain: 0.01 },
        { frequency: 5000, Q: 0 },
        { gain: 0.5 },
        { gain: 0.5 }
      ],
    }
  ],



  // THIS IS ALL UGLY AND TERRIBLE
  // FIND A BETTER WAY HOMIE
  visualizer: null, // this is probably a bad idea.  Going to see if it works.
  createVisualizer: action((state, payload) => {
    state.visualizer = payload;
  }),
  oscillator1Visualizer: null, // this is probably a bad idea.  Going to see if it works.
  createOsc1Visualizer: action((state, payload) => {
    state.oscillator1Visualizer = payload;
  }),
  oscillator2Visualizer: null, // this is probably a bad idea.  Going to see if it works.
  createOsc2Visualizer: action((state, payload) => {
    state.oscillator2Visualizer = payload;
  }),
};

// Create the store
const store = createStore(model, { middleware });
// Start the saga middleware
sagaMiddleware.run(rootSaga);
// Export the store.
export default store;