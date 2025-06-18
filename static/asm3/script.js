import * as THREE from "https://esm.sh/three@0.150.1"
import { Box3, Vector3 } from "https://esm.sh/three@0.150.1"
import { OrbitControls } from "https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js"
import { CSS3DRenderer, CSS3DObject } from "https://esm.sh/three@0.150.1/examples/jsm/renderers/CSS3DRenderer.js"
import { GLTFLoader } from 'https://esm.sh/three@0.150.1/examples/jsm/loaders/GLTFLoader.js' 
import gsap from 'https://esm.sh/gsap@3.12.5'

//Global Variables 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(0, 0, 200)

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft white light
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // White light
directionalLight.position.set(1, 1, 1).normalize(); // Position it to shine from a direction
scene.add(directionalLight);

// Model placeholders
let closedPhoneModel = null;
let openPhoneModel = null;
let currentPhoneGLTF = null; // To keep track of which GLTF is in the scene

// State management
let currentPhoneMode = 'closed'; // 'closed' or 'open'
const body = document.body; // Get body reference for class toggling


//Models
const gltfLoader = new GLTFLoader()

// gltfLoader.load(
//     'phone_open.glb',
//     (gltf) =>
// {
//     console.log("gltf model loaded", gltf)
//     scene.add(gltf.scene)
//     //scale model
//     gltf.scene.scale.set(100, 100, 100)

// }
// ) 


// let foundMesh = null;
// scene.traverse(function (object) {
//     console.log("Traversing object:", object.name, object);
// });

// if (foundMesh) {
//     console.log("My specific mesh is:", foundMesh);
// }


//WEBGLRenderer
const webglRenderer = new THREE.WebGLRenderer({ alpha: true })
webglRenderer.setSize(window.innerWidth, window.innerHeight)
webglRenderer.domElement.style.position = "absolute"
webglRenderer.domElement.style.top = "0"
document.body.appendChild(webglRenderer.domElement)
webglRenderer.domElement.className = "webgl-canvas"

//CSS3DRenderer
const cssRenderer = new CSS3DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(cssRenderer.domElement)
cssRenderer.domElement.className = "css3d-canvas"


// Controls
const controls = new OrbitControls(camera, webglRenderer.domElement)
controls.enableDamping = true
// controls.enableZoom = false

//disable panning
controls.enablePan = false
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,    // Left button for rotation (default)
    MIDDLE: THREE.MOUSE.DOLLY,   // Middle button for zoom/dolly (default)
    RIGHT: THREE.MOUSE.ROTATE    // Right button for rotation
}

// Create iframe element
const iframe = document.createElement('iframe')
iframe.src = "https://whopperflower13.github.io/ggsite/" // Your desired website
iframe.style.width = "800px"
iframe.style.height = "600px"
iframe.style.border = "0"

// Wrap iframe to avoid clicks when turned away from camera
const wrapper = document.createElement("div");
wrapper.style.width = "800px"
wrapper.style.height = "600px"
wrapper.style.pointerEvents = "auto" // default
wrapper.style.display = "none"
wrapper.appendChild(iframe)

const cssObject = new CSS3DObject(wrapper)
cssObject.position.set(22.5, 19, 2)
// cssObject.rotation.y = Math.PI / 4; // Example rotation

//scale down 
cssObject.scale.set(0.15, 0.15, 0.15)

// scene.add(cssObject)

//group
// const group = new THREE.Group()

// group.add(cssObject)

// cube
// const geometry = new THREE.BoxGeometry(800, 600, 10)
// const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
// const cube = new THREE.Mesh(geometry, material)
// group.add(cube)

// Add the group to the scene
// scene.add(group)

// Group for model and cssObject
const phoneGroup = new THREE.Group() // Use a descriptive name
// phoneGroup.add(cssObject) // Add cssObject to the group
scene.add(phoneGroup) // Add the group to the scene

// --- Functions ---

/**
 * Loads a GLTF model and calls a callback with the loaded scene.
 * @param {string} path The path to the GLTF model.
 * @param {function} callback Function to call with the loaded GLTF scene.
 */
function loadGLTFModel(path, callback) {
    gltfLoader.load(
        path,
        (gltf) => {
            // Apply scale or other initial transformations here if needed for specific models
            gltf.scene.scale.set(100, 100, 100); // Your existing scale
            callback(gltf.scene);
        },
        (xhr) => {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened loading GLTF:', path, error);
        }
    );
}

/**
 * Switches the displayed phone model and CSS object visibility.
 */
function togglePhoneMode() {
    // Toggle the body class
    body.classList.toggle('phone-open');
    currentPhoneMode = body.classList.contains('phone-open') ? 'open' : 'closed';

    // Remove current GLTF model from scene
    if (currentPhoneGLTF) {
        phoneGroup.remove(currentPhoneGLTF); // Remove from the group
        // If you need to dispose of resources explicitly:
        // currentPhoneGLTF.traverse(object => {
        //     if (object.isMesh) {
        //         object.geometry.dispose();
        //         object.material.dispose();
        //     }
        // });
    }

    if (currentPhoneMode === 'open') {
        console.log('Switching to OPEN mode');
        if (openPhoneModel) {
            phoneGroup.add(openPhoneModel); // Add to the group
            currentPhoneGLTF = openPhoneModel;
            phoneGroup.add(cssObject)
        }
        wrapper.style.display = 'block'; // Show the wrapper (and iframe)
        controls.enabled = false; // Disable OrbitControls for iframe interaction
        
        // Example: Animate camera to a good view for open phone if needed
        // gsap.to(camera.position, { x: 0, y: 0, z: 100, duration: 1, ease: "power2.out" });

    } else {
        console.log('Switching to CLOSED mode');
        if (closedPhoneModel) {
            phoneGroup.add(closedPhoneModel); // Add to the group
            phoneGroup.remove(cssObject)
            currentPhoneGLTF = closedPhoneModel;
        }
        wrapper.style.display = 'none'; // HIDE the wrapper (and iframe)
        wrapper.style.pointerEvents = "none"; // Ensure iframe is not interactive when hidden

        controls.enabled = true; // Re-enable OrbitControls for closed phone
        
        // Example: Animate camera back to a good view for closed phone if needed
        // gsap.to(camera.position, { x: 0, y: 0, z: 200, duration: 1, ease: "power2.out" });
    }
}

// --- Initial Setup ---
// Load both models once
Promise.all([
    new Promise(resolve => loadGLTFModel('phone_closed.glb', (model) => {
        closedPhoneModel = model;
        closedPhoneModel.scale.set(30, 30, 30);
        resolve();
    })),
    new Promise(resolve => loadGLTFModel('phone_open.glb', (model) => {
        openPhoneModel = model;
        resolve();
    }))
]).then(() => {
    // After both models are loaded, set initial state
    if (body.classList.contains('phone-closed')) {
        phoneGroup.add(closedPhoneModel);
        currentPhoneGLTF = closedPhoneModel;

        wrapper.style.display = 'none'; // Ensure iframe is hidden on start
        wrapper.style.pointerEvents = "none"; // Ensure iframe is not interactive
        controls.enabled = true; // Ensure controls are enabled for closed mode
    } else {
        phoneGroup.add(openPhoneModel);
        currentPhoneGLTF = openPhoneModel;
        wrapper.style.display = 'block'; // Ensure iframe is shown on start
        controls.enabled = false; // Ensure controls are disabled for open mode
    }
    // Add click listener to trigger the mode switch
    webglRenderer.domElement.addEventListener('click', togglePhoneMode);
    console.log("Initial phone mode set:", currentPhoneMode);
}).catch(error => {
    console.error("Failed to load one or both phone models:", error);
});




// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// const vector = new THREE.Vector3()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//      //Update objects (rotation)
//     //  group.rotation.y = 0.1 * elapsedTime
    

//     // Update controls
//     controls.update()

//     // Check facing direction
//     group.getWorldDirection(vector)
//     const dot = vector.dot(camera.getWorldDirection(new THREE.Vector3()))

//     // dot < 0 means it's facing the camera
//     if (dot < 0) {
//         wrapper.style.pointerEvents = "auto"
//     } else {
//         wrapper.style.pointerEvents = "none" // facing away, disable interaction
//     }

//     // Render cube 
//     webglRenderer.render(scene, camera)

//     // Render iframe
//     cssRenderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// // Handle window resize
//         window.addEventListener('resize', () => {
//             // Update camera aspect ratio
//             camera.aspect = window.innerWidth / window.innerHeight
//             camera.updateProjectionMatrix()

//             // Update renderer sizes
//             webglRenderer.setSize(window.innerWidth, window.innerHeight)
//             cssRenderer.setSize(window.innerWidth, window.innerHeight)
//         })


//Audio
// Get references to the audio element and the button
        const backgroundAudio = document.getElementById('backgroundAudio');
        const toggleAudioButton = document.getElementById('toggleAudioButton');

        let isPlaying = false; // Track current audio state

// Function to toggle audio play/pause
        function toggleAudio() {
            try {
                if (isPlaying) {
                    backgroundAudio.pause();
                    toggleAudioButton.textContent = 'Play Music';
                    isPlaying = false;
                    showMessage('Music Paused', 'success');
                } else {
                    // Attempt to play and unmute
                    backgroundAudio.muted = false; // Unmute the audio
                    backgroundAudio.play()
                        .then(() => {
                            toggleAudioButton.textContent = 'Pause Music';
                            isPlaying = true;
                            showMessage('Music Playing', 'success');
                        })
                        .catch(error => {
                            // Handle cases where play() might fail (e.g., autoplay policies)
                            console.error('Error playing audio:', error);
                            showMessage('Failed to play music. Please try again.', 'error');
                            // If play fails, ensure the button state reflects reality
                            backgroundAudio.muted = true; // Mute it back if it failed to play
                            isPlaying = false; // Mark as not playing
                            toggleAudioButton.textContent = 'Play Music';
                        });
                }
            } catch (error) {
                console.error('An error occurred during audio toggle:', error);
                showMessage('An unexpected error occurred.', 'error');
            }
        }

        // Add event listener to the button
        toggleAudioButton.addEventListener('click', toggleAudio);


/**
 * Animate
 */
const clock = new THREE.Clock();
const vector = new THREE.Vector3(); // For dot product check

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update controls only if enabled
    if (controls.enabled) {
        controls.update();
    }
    
    // Check facing direction for the iframe's interactivity only if phone is open
    if (currentPhoneMode === 'open') {
        
        // The dot product should check the current GLTF model, not the group itself
        // if the group just contains the cssObject.
        // It's probably better to check the camera's relationship to the iframe's world position.
        // Or, more simply, if controls are enabled, allow interaction, otherwise not.
        // Given your previous usage, let's keep it related to the *group* which contains the iframe.
        phoneGroup.getWorldDirection(vector); // Gets the direction the group is "looking"
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection); // Gets the direction the camera is "looking"

        const dot = vector.dot(cameraDirection);

        // dot < 0 means the front of the group (and thus iframe) is facing the camera
        // Note: You might need to adjust the condition (dot < 0 or dot > 0)
        // based on the initial orientation of your GLTF models and cssObject.
        // A small threshold can help prevent flickering at the exact boundary.
        if (dot < -0.1) { // -0.1 for a small buffer
            wrapper.style.pointerEvents = "auto";
        } else {
            wrapper.style.pointerEvents = "none"; // facing away or not fully facing, disable interaction
        }
    } else {
        // When phone is closed, always disable iframe pointer events
        wrapper.style.pointerEvents = "none";
    }

    // Render WebGL scene
    webglRenderer.render(scene, camera);

    // Render CSS3D scene
    cssRenderer.render(scene, camera); // Note: CSS3DRenderer also renders using the main scene, not cssScene in your code

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

// Handle window resize
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer sizes
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
});

tick(); // Start the animation loop

