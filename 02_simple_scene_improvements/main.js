import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

/**
 * Main Application
 */
class MainApp {
  constructor(container) {
    // check container.
    if (!container) {
      console.log("not found MainApp container.");
      return;
    }
    this.container = container;

    // check available WebGL.
    if (!WebGL.isWebGL2Available()) {
      this.container.appendChild(WebGL.getWebGLErrorMessage());
      return;
    }

    // on start.
    this.onStart();
    window.addEventListener("resize", () => this.onWindowResize());
  }

  get width() {
    return this.container.clientWidth;
  }

  get height() {
    return this.container.clientHeight;
  }

  onWindowResize() {
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  onStart() {
    // create clock.
    this.clock = new THREE.Clock();

    // create scene, camera.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000,
    );
    this.camera.position.z = 5;

    // create renderer and append to DOM.
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(() => {
      const deltaTime = this.clock.getDelta();
      const elapsedTime = this.clock.getElapsedTime();
      this.onUpdate(deltaTime, elapsedTime);
      this.renderer.render(this.scene, this.camera);
    });
    this.container.appendChild(this.renderer.domElement);

    // create objects.
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.scene.add(this.cube);

    // adjust window size.
    this.onWindowResize();
  }

  onUpdate(deltaTime, elapsedTime) {
    // rotate cube.
    this.cube.rotation.x += 1 * deltaTime;
    this.cube.rotation.y += 1 * deltaTime;
  }
}

window.addEventListener("load", () => {
  const container = document.getElementById("container");
  new MainApp(container);
});
