
/*
 * createAudioContext()
 */
export const createAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    throw new Error('It appears that this browser does not support the Web Audio API.  Please switch to a modern browser.');
  }
  const audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  const masterAnalyser = audioContext.createAnalyser();

  masterGain.gain.value = 0;

  masterGain.connect(masterAnalyser);
  masterAnalyser.connect(audioContext.destination);
  return [audioContext, masterGain, masterAnalyser];
}

/*
 * setMasterVolume()
 */
export const setMasterVolume = (masterVolume, audioContext, { payload }) => {
  masterVolume.gain.linearRampToValueAtTime(payload, audioContext.currentTime + 0.1);
};

/*
 * setOscillatorParameter()
 */
export const setOscillatorParameter = (oscillators, { payload }) => {
  const { oscillatorIndex, parameter, value } = payload;
  oscillators[oscillatorIndex][parameter].value = value;
};

/*
 * createOscillator()
 */
export const createOscillator = (
  audioContext,
  destinationNode,
  {
    type = 'sine',
    frequency = 200,
    detune = 0,
    gain = 0.5,
    pan = 0,
  }
) => {
  if (!audioContext || !audioContext.createOscillator) {
    throw new Error('Please provide an AudioContext.');
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const analyser = audioContext.createAnalyser();
  const stereoPanner = audioContext.createStereoPanner();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.detune.value = detune;
  gainNode.gain.value = gain;
  stereoPanner.pan.value = pan;

  oscillator.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(stereoPanner);

  oscillator.start();
  stereoPanner.connect(destinationNode);

  return [oscillator, gain, analyser, stereoPanner];
};
