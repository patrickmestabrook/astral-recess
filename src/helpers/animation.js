/*
 * This stuff is all for canvas pixel ratio.
 */
const getPixelRatio = context => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};


/**
 * @function
 * @name useVisualizer
 * @param {*} canvasRef
 * @param {*} visualizer
 */
export const useVisualizer = (canvasRef, visualizer) => (
  () => {
    if (!canvasRef || !canvasRef.current) return;
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');
    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let height = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    /*
    * Main canvas rendering function
    */
    let requestId;
    const render = () => {
      var bufferLength = visualizer.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      visualizer.getByteTimeDomainData(dataArray);
      context.fillStyle = "rgb(200, 200, 200)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = 6;
      context.strokeStyle = "rgb(0, 0, 0)";
      context.beginPath();
      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;
        if (i === 0) { context.moveTo(x, y); }
        else { context.lineTo(x, y); }
        x += sliceWidth;
      }
      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();
      requestId = requestAnimationFrame(render);
    }
    render();
    return () => { cancelAnimationFrame(requestId); }
  }
);