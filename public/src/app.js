import Sphere from '../../client/components/sphere.js';
import fallback from './fallback.js';

const canvas = document.getElementById('webgl');

if (canvas.getContext) {
  window.onload = () => {
    new Sphere(canvas);
  }
}
else {
  canvas.innerHTML = fallback;
}
