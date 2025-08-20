import { LOWPERFORMANCE_SET } from "../types/application";
import Store from "../store/store";

declare global {
  interface Window {
    __fpsMonitorStarted?: boolean;
  }
}
let lastFrame = performance.now();
let frameCount = 0;
let fps: number | undefined = undefined;

function measureFPS() {
  const now = performance.now();
  frameCount++;
  if (now - lastFrame >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFrame = now;

    if(fps<15){
        Store.dispatch({ type: LOWPERFORMANCE_SET, payload: true });
    }
  }
  window.requestAnimationFrame(measureFPS);
}

if (typeof window !== 'undefined' && !window.__fpsMonitorStarted) {
  window.__fpsMonitorStarted = true;
  window.requestAnimationFrame(measureFPS);
}

export function isLowPerformance() {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|BlackBerry/i.test(window.navigator.userAgent);
  const lowFPS = fps !== undefined && fps < 15;
  return reducedMotion || isMobile || lowFPS;
}
