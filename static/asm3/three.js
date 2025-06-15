import * as THREE from "https://esm.sh/three@0.150.1"
import { OrbitControls } from "https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js"
import gsap from 'https://esm.sh/gsap@3.12.5'
import { CSS3DRenderer, CSS3DObject } from "https://esm.sh/three@0.161.0/examples/jsm/renderers/CSS3DRenderer.js";



// cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => 
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()
const cssScene = new THREE.Scene(); // CSS用別シーン

// Object
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane )

// add iframed website as a css3dobject
const iframe = document.createElement('iframe');
iframe.src = './screen.html';
iframe.style.width = '800px';
iframe.style.height = '600px';
iframe.style.border = 'none';

const cssObject = new CSS3DObject(iframe);
cssObject.position.set(0, 0, 0);
cssObject.scale.set(0.5, 0.5, 0.5);
cssScene.add(cssObject);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera =  new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//      1 * aspectRatio, 
//      1, 
//      -1, 
//      0.1,
//      100
//     )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(plane.position)
scene.add(camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//disable panning
controls.enablePan = false;

controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,    // Left button for rotation (default)
    MIDDLE: THREE.MOUSE.DOLLY,   // Middle button for zoom/dolly (default)
    RIGHT: THREE.MOUSE.ROTATE    // Right button for rotation
};

// Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)

// WebGL Renderer (for 3d object)
const webGLRenderer = new THREE.WebGLRenderer({ alpha: true });
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.domElement.style.position = 'absolute';

// CSS3D Renderer（for iframe and html）
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';

// add both to the domelement
const container = document.getElementById('container');
container.appendChild(webGLRenderer.domElement);
container.appendChild(cssRenderer.domElement);

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI *2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI *2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    //update controls
    controls.update()

    // Render
    webGLRenderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()