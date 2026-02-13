import * as THREE from "three";

/**
 * Cube
 */
export class Cube {
  constructor(material) {
    // create mesh.
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.mesh = new THREE.Mesh(geometry, material);
  }

  onUpdate(deltaTime) {
    // rotate.
    this.mesh.rotation.x += 1 * deltaTime;
    this.mesh.rotation.y += 1 * deltaTime;
  }
}
