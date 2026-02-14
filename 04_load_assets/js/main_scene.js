import * as THREE from "three";
import { Elekibear } from "./elekibear.js";
import { Star } from "./star.js";

/**
 * Main Scene
 */
export class MainScene {
  constructor(width, height) {
    // create scene, camera.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // create lights.
    const aoLight = new THREE.AmbientLight({
      color: 0xffffff,
      intensity: 0.5,
    });
    this.scene.add(aoLight);

    const dirLight = new THREE.DirectionalLight({
      color: 0xffffff,
      intensity: 0.5,
      position: new THREE.Vector3(0, 10, 0),
      target: new THREE.Vector3(0, 0, 0),
    });
    this.scene.add(dirLight);

    // create objects.
    this.elekibear = new Elekibear();
    this.elekibear.root.position.set(0, -2, 0);
    this.elekibear.root.scale.set(2.5, 2.5, 2.5);
    this.scene.add(this.elekibear.root);

    // create stars.
    this.star = new Star();
    this.star.root.scale.set(0.5, 0.5, 0.5);
    this.star.root.position.set(3.5, 1, 0);
    this.scene.add(this.star.root);

    this.star_2 = new Star();
    this.star_2.root.scale.set(0.35, 0.35, 0.35);
    this.star_2.root.position.set(-3.5, -2, 0.5);
    this.scene.add(this.star_2.root);

    this.star_3 = new Star();
    this.star_3.root.scale.set(0.25, 0.25, 0.25);
    this.star_3.root.position.set(-3, 3, -1);
    this.scene.add(this.star_3.root);
  }

  onUpdate(deltaTime) {
    // update objects.
    this.elekibear.onUpdate(deltaTime);
    this.star.onUpdate(deltaTime);
    this.star_2.onUpdate(deltaTime);
    this.star_3.onUpdate(deltaTime);
  }

  onWindowResize(width, height) {
    // update camera aspect.
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
