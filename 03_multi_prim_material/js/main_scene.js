import * as THREE from "three";

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

    // material variation.
    const matVariation = [
      new THREE.MeshBasicMaterial({
        color: "white",
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
      }),
      new THREE.MeshLambertMaterial({
        color: "white",
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "white",
        side: THREE.DoubleSide,
        shininess: 80,
        specular: new THREE.Color("white"),
      }),
      new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
      }),
    ];

    // heart geometry.
    const heartShape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    heartShape.moveTo(x + 2.5, y + 2.5);
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    heartShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    heartShape.bezierCurveTo(
      x - 3,
      y + 5.5,
      x - 1.5,
      y + 7.7,
      x + 2.5,
      y + 9.5,
    );
    heartShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    heartShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    const heartExtrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2,
    };
    const heartGeometry = new THREE.ExtrudeGeometry(
      heartShape,
      heartExtrudeSettings,
    );
    heartGeometry.scale(0.075, 0.075, 0.075);

    // geometry variation.
    const geoVariation = [
      new THREE.BoxGeometry(0.65, 0.65, 0.65),
      new THREE.SphereGeometry(0.5, 12, 6),
      new THREE.CircleGeometry(0.5, 24, Math.PI * 0.25, Math.PI * 1.5),
      new THREE.CylinderGeometry(0.2, 0.35, 0.75),
      new THREE.TorusKnotGeometry(0.35, 0.15, 8, 10, 5, 5),
      heartGeometry,
    ];

    // created meshes.
    this.meshes = [];

    // offset values.
    const OFFSET_POS_UNIT_X = 1.75;
    const OFFSET_POS_UNIT_Y = 1.35;

    // create meshes.
    let posOffsetX = -(OFFSET_POS_UNIT_X * (geoVariation.length - 1)) / 2;
    for (const geometry of geoVariation) {
      let posOffsetY = (OFFSET_POS_UNIT_Y * (matVariation.length - 1)) / 2;
      for (const material of matVariation) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = posOffsetX;
        mesh.position.y = posOffsetY;

        this.scene.add(mesh);
        this.meshes.push(mesh);

        posOffsetY -= OFFSET_POS_UNIT_Y;
      }
      posOffsetX += OFFSET_POS_UNIT_X;
    }
  }

  onUpdate(deltaTime) {
    for (const mesh of this.meshes) {
      // rotate.
      mesh.rotation.x += 1 * deltaTime;
      mesh.rotation.y += 1 * deltaTime;
    }
  }

  onWindowResize(width, height) {
    // update camera aspect.
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
