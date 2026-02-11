import * as THREE from "three";

// create renderer and append to DOM.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create scene, camera.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

// add cube object.
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// update cube rotation.
function update(deltaTime) {
  cube.rotation.x += 1 * deltaTime;
  cube.rotation.y += 1 * deltaTime;
}

// start render.
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const deltaTime = clock.getDelta();
  update(deltaTime);
  renderer.render(scene, camera);
});
