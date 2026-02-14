import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

/**
 * Elekibear
 */
export class Elekibear {
  // asset paths.
  MODEL_FBX_PATH = "public/models/SM_Elekibear.fbx";
  BASE_COLOR_TEX_PATH = "public/textures/T_Elekibear.png";

  constructor() {
    this.animMixer = null;

    // create root.
    this.root = new THREE.Group();
    this.root.name = "Elekibear";

    // load model.
    this.loadModelAsync();
  }

  async loadModelAsync() {
    // エラー対処:
    // FBX内のテクスチャパスが無いとエラーになるので強制的に差し替え.

    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      if (/\.(png|jpe?g|tga|bmp|gif)$/i.test(url))
        return this.BASE_COLOR_TEX_PATH;
      return url;
    });

    // load mesh.
    const loader = new FBXLoader(manager);
    const model = await loader.loadAsync(this.MODEL_FBX_PATH);

    // load texture.
    const baseColorTex = await new THREE.TextureLoader().loadAsync(
      this.BASE_COLOR_TEX_PATH,
    );
    baseColorTex.colorSpace = THREE.SRGBColorSpace;

    // create material.
    const material = new THREE.MeshPhongMaterial({
      map: baseColorTex,
    });

    // replace materials.
    model.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });

    // create animation mixer.
    this.animMixer = new THREE.AnimationMixer(model);
    if (model.animations.length > 0) {
      // play animation.
      const clip = model.animations[0];
      const actionClip = this.animMixer.clipAction(clip);
      actionClip.setLoop(THREE.LoopPingPong);
      actionClip.play();
    }

    // add root.
    this.root.clear();
    this.root.add(model);
  }

  onUpdate(deltaTime) {
    // play animation.
    if (this.animMixer) {
      this.animMixer.update(deltaTime);
    }
  }
}
