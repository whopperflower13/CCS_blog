import * as THREE from "https://esm.sh/three@0.150.1"
import { OrbitControls } from "https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js"
import gsap from 'https://esm.sh/gsap@3.12.5'
import { CSS3DRenderer, CSS3DObject } from "https://esm.sh/three@0.161.0/examples/jsm/renderers/CSS3DRenderer.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(0, 0, 1000);


//WEBGLRenderer
const webglRenderer = new THREE.WebGLRenderer({ alpha: true });
webglRenderer.setSize(window.innerWidth, window.innerHeight);
webglRenderer.domElement.style.position = "absolute";
webglRenderer.domElement.style.top = "0";
document.body.appendChild(webglRenderer.domElement);
webglRenderer.domElement.className = "webgl-canvas";

//CSS3DRenderer
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(cssRenderer.domElement);
cssRenderer.domElement.className = "css3d-canvas";


// Controls
const controls = new OrbitControls(camera, webglRenderer.domElement)
controls.enableDamping = true
controls.enableZoom = false

// Create iframe element
const iframe = document.createElement('iframe');
iframe.src = "https://whopperflower13.github.io/ggsite/"; // Your desired website
iframe.style.width = "800px";
iframe.style.height = "600px";
iframe.style.border = "0";

// Wrap iframe to avoid clicks when turned away from camera
const wrapper = document.createElement("div");
wrapper.style.width = "800px";
wrapper.style.height = "600px";
wrapper.style.pointerEvents = "auto"; // default
wrapper.appendChild(iframe);

const cssObject = new CSS3DObject(wrapper);
cssObject.position.set(200, -150, 0)
// cssObject.rotation.y = Math.PI / 4; // Example rotation
scene.add(cssObject);


//group
const group = new THREE.Group();

group.add(cssObject);

// cube
const geometry = new THREE.BoxGeometry(800, 600, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
group.add(cube);

// 3. Add the group to the scene
scene.add(group);

/**
 * Animate
 */
const clock = new THREE.Clock()
const vector = new THREE.Vector3()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

     //Update objects (rotation)
     group.rotation.y = 0.1 * elapsedTime
    

    // Update controls
    controls.update()

    // Check facing direction
    group.getWorldDirection(vector)
    const dot = vector.dot(camera.getWorldDirection(new THREE.Vector3()))

    // dot < 0 means it's facing the camera
    if (dot < 0) {
        wrapper.style.pointerEvents = "auto";
    } else {
        wrapper.style.pointerEvents = "none"; // facing away, disable interaction
    }

    // Render cube 
    webglRenderer.render(scene, camera)

    // Render iframe
    cssRenderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// Handle window resize
        window.addEventListener('resize', () => {
            // Update camera aspect ratio
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            // Update renderer sizes
            webglRenderer.setSize(window.innerWidth, window.innerHeight);
            cssRenderer.setSize(window.innerWidth, window.innerHeight);
        });

tick()
