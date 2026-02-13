import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { Cube } from "./cube.js";

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

    // create lights.
    const aoLight = new THREE.AmbientLight({
      color: 0xFFFFFF,
      intensity: 0.5
    });
    this.scene.add(aoLight);
    const dirLight = new THREE.DirectionalLight({
      color: 0xFFFFFF,
      intensity: 0.5,
      position: new THREE.Vector3(0, 10, 0),
      target: new THREE.Vector3(0, 0, 0)
    });
    this.scene.add(dirLight);

    // create renderer and append to DOM.
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(() => {
      const deltaTime = this.clock.getDelta();
      this.onUpdate(deltaTime);
      this.renderer.render(this.scene, this.camera);
    });
    this.container.appendChild(this.renderer.domElement);

    // TODO: material variation.
    this.materials = [
      new THREE.MeshBasicMaterial({
        color: 'white',
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 'white'
      }),
      new THREE.MeshLambertMaterial({
        color: 'white',
      }),
      new THREE.MeshPhongMaterial({
        color: 'white',
        metalness: 10.0,
        specular: new THREE.Color('white'),
      }),
      new THREE.MeshNormalMaterial({
        color: 'white'
      }),
    ];

    // TODO: geometry variation.
    this.geometries = [];

    // created actors.
    this.actors = [];

    // offset values.
    const OFFSET_POS_UNIT_Y = 1.25;
    let posOffsetY = OFFSET_POS_UNIT_Y * (this.materials.length - 1) / 2;

    for (const material of this.materials) {
      const actor = new Cube(material);
      this.scene.add(actor.mesh);
      this.actors.push(actor);

      actor.mesh.position.y = posOffsetY;
      posOffsetY -= OFFSET_POS_UNIT_Y;
    }

    // adjust window size.
    this.onWindowResize();
  }

  onUpdate(deltaTime) {
    // update objects.
    for (const actor of this.actors) {
      actor.onUpdate(deltaTime);
    }
  }
}

window.addEventListener("load", () => {
  const container = document.getElementById("container");
  new MainApp(container);
});
