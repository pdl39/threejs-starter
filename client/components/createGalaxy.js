import * as THREE from 'three';

const addStar = (scene) => {
  const geometryStar = new THREE.SphereGeometry(0.05, 8, 8);
  const materialStar = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometryStar, materialStar);

  const [x, y, z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

const addStarsToGalaxy = (scene, numStars) => {
  for (let i = 0; i < numStars; i++) {
    addStar(scene);
  }
}

export default addStarsToGalaxy;
