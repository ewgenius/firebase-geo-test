import THREE, {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh
}
from 'three';
import Firebase from 'firebase';
import GeoFire from 'geofire';
import orbitControlsFactory from 'three-orbit-controls';
const OrbitControls = orbitControlsFactory(THREE);

class App {
  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.firebaseRef = new Firebase("https://firegeo-test.firebaseio.com/");
    this.geoFire = new GeoFire(this.firebaseRef);
    this.controls = new OrbitControls(this.camera);
    document.body.appendChild(this.renderer.domElement);

    window.onresize = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resize();
      }, 500);
    };
  }

  render() {
    requestAnimationFrame((() => this.render()));
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initSphereDemo() {
    var geometry = new SphereGeometry(15, 8, 8);
    var material = new MeshBasicMaterial({
      color: 0xffff00
    });
    var sphere = new Mesh(geometry, material);
    this.scene.add(sphere);
    this.camera.position.z = 100;
  }
}

window.onload = () => {
  window.app = new App();
  window.app.initSphereDemo();
  window.app.render();
};
