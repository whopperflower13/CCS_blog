import * as THREE from "https://esm.sh/three@0.150.1"
import { OrbitControls } from "https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js"
import gsap from 'https://esm.sh/gsap@3.12.5'
import { CSS3DRenderer, CSS3DObject } from "https://esm.sh/three@0.161.0/examples/jsm/renderers/CSS3DRenderer.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(0, 0, 1000);

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create iframe element
const iframe = document.createElement('iframe');
iframe.src = "https://whopperflower13.github.io/ggsite/"; // Your desired website
iframe.style.width = "800px";
iframe.style.height = "600px";
iframe.style.border = "0";

const cssObject = new CSS3DObject(iframe);
cssObject.position.set(0, 0, 0);
// cssObject.rotation.y = Math.PI / 4; // Example rotation
scene.add(cssObject);

renderer.render(scene, camera);
