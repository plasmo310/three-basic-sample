import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { CustomFilmGrainPass } from "./pass/film-grain-pass.js";
import { MainScene } from "./main-scene.js";

/**
 * Main Application
 */
class MainApp {
  GUI_PARAM = {
    useToonOutline: true,
    usePostFilmGrain: true,
    usePostGlitch: true,
  };

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

    // register gui parameters.
    const gui = new GUI();
    gui.add(this.GUI_PARAM, "useToonOutline").onChange(() => {
      this.main_scene.torus.setVisibleOutline(this.GUI_PARAM.useToonOutline);
    });
    gui.add(this.GUI_PARAM, "usePostFilmGrain").onChange(() => {
      this.filmGrainPass.enabled = this.GUI_PARAM.usePostFilmGrain;
    });
    gui.add(this.GUI_PARAM, "usePostGlitch").onChange(() => {
      this.glitchPass.enabled = this.GUI_PARAM.usePostGlitch;
    });

    // create clock.
    this.clock = new THREE.Clock();

    // create scene.
    this.main_scene = new MainScene(this.width, this.height);

    // create renderer and append to DOM.
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(() => {
      const deltaTime = this.clock.getDelta();
      this.onUpdate(deltaTime);
    });
    this.container.appendChild(this.renderer.domElement);

    // create composer.
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(
      this.main_scene.scene,
      this.main_scene.camera,
    );
    this.composer.addPass(renderPass);

    this.filmGrainPass = new CustomFilmGrainPass({
      strength: 0.1,
      speed: 0.05,
    });
    this.composer.addPass(this.filmGrainPass);

    this.glitchPass = new GlitchPass();
    this.composer.addPass(this.glitchPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    // create controls.
    this.orbit_controls = new OrbitControls(
      this.main_scene.camera,
      this.renderer.domElement,
    );

    // register resize event.
    this.onWindowResize(this.width, this.height);
    window.addEventListener("resize", () =>
      this.onWindowResize(this.width, this.height),
    );
  }

  get width() {
    return this.container.clientWidth;
  }

  get height() {
    return this.container.clientHeight;
  }

  onUpdate(deltaTime) {
    // update scene.
    this.main_scene.onUpdate(deltaTime);

    // update controls.
    this.orbit_controls.update(deltaTime);

    // update post process.
    this.filmGrainPass.onUpdate(deltaTime);

    // execute render.
    this.composer.render();
  }

  onWindowResize(width, height) {
    // resize renderer.
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // notify window resize.
    this.main_scene.onWindowResize(width, height);
  }
}

window.addEventListener("load", () => {
  const container = document.getElementById("container");
  new MainApp(container);
});
