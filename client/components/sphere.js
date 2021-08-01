import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import addStarsToGalaxy from './createGalaxy';
import dogeImg from '../assets/textures/doge.jpg';


export default class Sphere {
  constructor(canvas) {
    this.canvas = canvas;

    // SCENE
    this.scene = new THREE.Scene();

    this.aspectRatio = window.innerWidth / window.innerHeight;

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 0.1, 1000);
    this.camera.position.setZ(30);

    // WEBGL RENDERER
    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // CONTROLS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Lights
    this.pointLight = new THREE.PointLight(0xffffff);
    this.pointLight.position.set(5, 5, 5);

    this.ambientLight = new THREE.AmbientLight(0xffffff);

    // Helpers
    this.lightHelper = new THREE.PointLightHelper(this.pointLight);
    this.gridHelper = new THREE.GridHelper(100, 100);

    // Sphere
    this.geometry = new THREE.SphereGeometry(15, 64, 32);
    this.material = new THREE.MeshStandardMaterial({ color: 0x4af2a1, wireframe: true });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.name = 'sphere';

    // SphereDoge
    this.dogeTexture = new THREE.TextureLoader().load(dogeImg);
    this.wireframeDoge = true;
    this.materialDoge = new THREE.MeshStandardMaterial({
      map: this.dogeTexture,
      wireframe: this.wireframeDoge
    });
    this.sphereDoge = new THREE.Mesh(this.geometry, this.materialDoge);
    this.sphereDoge.name = 'sphereDoge';

    // External function call - add stars
    addStarsToGalaxy(this.scene, 3000);

    // CLASS METHOD BINDINGS & Executions

    this.addToScene = this.addToScene.bind(this);
    this.addToScene();

    this.animate = this.animate.bind(this);
    this.animate();
  }

  addToScene() {
    this.scene.add(this.pointLight, this.ambientLight);
    // this.scene.add(this.lightHelper, this.gridHelper);
    this.scene.add(this.sphere);
    // this.scene.add(this.sphereDoge);
  }

  animate() {
    window.requestAnimationFrame(this.animate);

    const sphereDoge = this.scene.children.find(mesh => mesh.name === 'sphereDoge');
    const sphereToRender = sphereDoge ? this.sphereDoge : this.sphere;
    sphereToRender.rotation.x += 0.001;
    sphereToRender.rotation.y += 0.003;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
};

