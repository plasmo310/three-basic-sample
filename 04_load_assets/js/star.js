import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Star
 */
export class Star {
  // asset paths.
  MODEL_GLB_PATH = "public/models/SM_Star.glb";

  constructor() {
    // create root.
    this.root = new THREE.Group();
    this.root.name = "Star";

    // load model.
    this.loadModelAsync();
  }

  async loadModelAsync() {
    // load mesh.
    const loader = new GLTFLoader();
    const model = await loader.loadAsync(this.MODEL_GLB_PATH);

    // create material.
    const material = new THREE.MeshPhongMaterial({
      color: "yellow",
    });

    // replace materials.
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
    model.scene.rotation.x = 90;

    // add root.
    this.root.clear();
    this.root.add(model.scene);
  }

  onUpdate(deltaTime) {
    // rotate.
    this.root.rotation.z += 2 * deltaTime;
  }
}
