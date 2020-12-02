/**
 * @file Provides functions that interface directly with the web audio API
 * @author Patrick Estabrook
 */


/**
 * @function
 * @name createAudioContext
 * @returns {void} Nothing
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


/**
 * @function
 * @name setMasterVolume
 * @param {AudioGainNode} masterGain - the node representing the master gain level
 * @param {BaseAudioContext} audioContext - global audio context object
 * @param {Number} action.payload - the gain value to set master gain to, between 0 and 1
 * @returns {void} Nothing
 */
export const setMasterVolume = (masterGain, audioContext, { payload }) => {
  masterGain.gain.linearRampToValueAtTime(payload, audioContext.currentTime + 0.1);
};


/**
 * @function
 * @name setAudioNodeParameter
 * @param {[AudioNode]} audioNodes - an array of AudioNodes whose parameters we can set
 * @param {Object} action.payload - an object specifying the AudioNode index, parameter name, and target value
 * @returns {void} Nothing
 */
export const setAudioNodeParameter = (audioNodes, { payload }) => {
  const { audioNodeIndex, parameter, value } = payload;
  audioNodes[audioNodeIndex][parameter].value = value;
};

export const setAllAudioParameters= (audioContext, masterGain, audioNodes, { payload }) => {
  const { mixer, audioNodes: newAudioNodes } = payload;
  masterGain.gain.linearRampToValueAtTime(mixer.masterVolume, audioContext.currentTime + 4);
  audioNodes.forEach((audioNode, i) => {
    if (newAudioNodes[i].frequency) {
      audioNode.frequency.linearRampToValueAtTime(newAudioNodes[i].frequency, audioContext.currentTime + 4);
    }
    if (newAudioNodes[i].detune) {
      audioNode.detune.linearRampToValueAtTime(newAudioNodes[i].detune, audioContext.currentTime + 4);
    }
    if (newAudioNodes[i].gain) {
      audioNode.gain.linearRampToValueAtTime(newAudioNodes[i].gain, audioContext.currentTime + 4);
    }
    if (newAudioNodes[i].Q) {
      audioNode.Q.linearRampToValueAtTime(newAudioNodes[i].Q, audioContext.currentTime + 4);
    }
  });
};

/**
 * @function
 * @name createOscillator
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
  } = {},
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

  return [oscillator, gainNode, analyser, stereoPanner];
};


/**
 * @function
 * @name createPinkNoiseNode
 * @param {BaseAudioContext} audioContext - the global web  audio context
 * @returns {AudioNode} the audio node representing the pink noise oscillator
 * @TODO audioContext.createScriptProcessor() is a bad pattern
 * opt for AudioWorklets once we can figure out how to get them working
 */
const createPinkNoiseNode = (audioContext) => {
  const bufferSize = 4096;
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
};


/**
 * @function
 * @name createPinkNoiseOscillator
 */
export const createPinkNoiseOscillator = (
  audioContext,
  destinationNode,
  {
    filterType = 'lowpass',
    filterFrequency = 5000,
    filterQ = 0,
    gain = 0.01,
  } = {},
) => {
  const pinkNoise = createPinkNoiseNode(audioContext);
  const biquadFilter = audioContext.createBiquadFilter();
  const gainNode =  audioContext.createGain();
  biquadFilter.type = filterType;
  biquadFilter.frequency.value = filterFrequency;
  biquadFilter.Q.value = filterQ;
  gainNode.gain.value = gain;
  pinkNoise.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(destinationNode);
  return [biquadFilter, gainNode];
};