import { action, createStore } from 'easy-peasy';

const store = createStore({

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

  // A simple count example state.
  count: 0,
  // Increment this simple count.
  incrementCount: action((state) => {
    state.count += 1;
  }),

  // A simple string state.
  theme: 'light',
  // Toggle theme between light and dark.
  toggleTheme: action((state) => {
    state.theme = (state.theme === 'light' ? 'dark' : 'light');
  }),

  // A place to put errors that we wish to display to the user.
  errors: ["Must get permission to use AudioContext."],
  // Add an error to the list above.
  createError: action((state, payload) => {
    state.errors = [...state.errors, payload];
  }),
})

export default store;