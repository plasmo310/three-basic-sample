import * as THREE from "three";

/**
 * Cube
 */
export class Cube {
  constructor() {
    // create mesh.
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  onUpdate(deltaTime, elapsedTime) {
    // rotate.
    this.mesh.rotation.x += 1 * deltaTime;
    this.mesh.rotation.y += 1 * deltaTime;
  }
}
