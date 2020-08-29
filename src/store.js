import { action, createStore } from 'easy-peasy';
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const model = {
  appIsInitialized: false,
  initializeApp: action(state => {
    state.appIsInitialized = true;
  }),

  transport: {
    isPlaying: false,
    isPaused: true,
    isStopped: true,

    play: action(state => {
      state.isPlaying = true;
      state.isPaused = false;
      state.isStopped = false;
    }),
    pause: action(state => {
      state.isPlaying = false;
      state.isPaused = true;
      state.isStopped = false;
    }),
    stop: action(state => {
      state.isPlaying = false;
      state.isPaused = true;
      state.isStopped = true;
    }),
  },

  mixer: {
    // tracks is an array of objects
    // each track in the mixer gets a volume and panning
    tracks: [],
    createTrack: action(state => {
      state.tracks = [...state.tracks, { volume: 0.5, panning: 0 }]
    }),
    setTrackVolume: action((state, payload) => {
      const { trackIndex, volume } = payload;
      state.tracks[trackIndex].volume = volume;
    }),
    setTrackPanning: action((state, payload) => {
      const { trackIndex, panning } = payload;
      state.tracks[trackIndex].panning = panning;
    }),

    // Master volume
    masterVolume: 0, // between 0 and 1
    setMasterVolume: action((state, payload) => {
      state.masterVolume = payload;
    })
  },

  oscillators: [
    {
      frequency: 72,
      detune: -19,
    },
    {
      frequency: 71.6,
      detune: 0,
    },
    {
      gain: 0.01,
    },
    {
      frequency: 5000,
      Q: 0,
    }
  ],
  setOscillatorParameter: action((state, payload) => {
    const { oscillatorIndex, parameter, value } = payload;
    state.oscillators[oscillatorIndex][parameter] = value;
  }),

  visualizer: null, // this is probably a bad idea.  Going to see if it works.
  createVisualizer: action((state, payload) => {
    state.visualizer = payload;
  }),

  // In order to do anything with an AudioContext,
  // we first need user permission. [Web Audio API]
  hasUserPermissionForAudio: false,
  grantUserPermissionForAudio: action(state => {
    state.hasUserPermissionForAudio = true;
  }),


  theme: 'light',
  toggleTheme: action((state) => {
    state.theme = (state.theme === 'light' ? 'dark' : 'light');
  }),

  errors: ["Must get permission to use AudioContext."],

  createError: action((state, payload) => {
    state.errors = [...state.errors, payload];
  }),
};

// Create the store
const store = createStore(model, { middleware });
// Start the saga middleware
sagaMiddleware.run(rootSaga);
// Export the store.
export default store;