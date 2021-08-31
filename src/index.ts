import { CanvasManager } from "./canvas/canvasManager";
import { Canvas } from "./canvas/canvas";

const canvasManager = new CanvasManager();

function init() {
  const dimensions = { width: 720, height: 540 },
    containerId = 'canvasContainer';
  canvasManager.init(containerId, dimensions);
  canvasManager.add("canvasLayerId", Canvas.create(containerId, "canvasLayerId", dimensions));
}

window.onload = () => {
  init();
  var mainloop_updateLast = performance.now();
  (function mainLoop(nowTime) {
    canvasManager.update(nowTime - mainloop_updateLast);
    canvasManager.display();
    mainloop_updateLast = nowTime;
    requestAnimationFrame(mainLoop);
  })(performance.now());
}

export {};
