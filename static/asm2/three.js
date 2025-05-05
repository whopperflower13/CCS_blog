import './style.css'
import * as THREE from "https://esm.sh/three@0.150.1"
import { OrbitControls } from "https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js"
import gsap from 'https://esm.sh/gsap@3.12.5'
import GUI from 'https://esm.sh/lil-gui@0.18.2'

//debug
const gui = new GUI({
    width: 300,
    title: 'cool gui',
    closeFolders: false   
})
//gui.close()
gui.hide()

const debugObject = {}



//textures
const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () =>
// {
//     console.log('onstart')
// }

// loadingManager.onLoad = () =>
// {
//     console.log('onload')
// }

// loadingManager.onProgress = () =>
// {
//     console.log('onProgress')
// }

// loadingManager.onError = () =>
// {
//     console.log('onErrpr')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('./textures/checkerboard-1024x1024.png')
// colorTexture.colorSpace = THREE.SRGBColorSpace
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// alphaTexture.colorSpace = THREE.SRGBColorSpace
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// heightTexture.colorSpace = THREE.SRGBColorSpace
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// normalTexture.colorSpace = THREE.SRGBColorSpace
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// metalnessTexture.colorSpace = THREE.SRGBColorSpace
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// roughnessTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.repeat.x = 2
// colorTexture.repeat.x = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.minFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object 1
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


debugObject.color = '#94ffd1'

const cubeTweaks = gui.addFolder('croissant')
// cubeTweaks.close()

cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

cubeTweaks
    .add(mesh, 'visible')

cubeTweaks
    .add(material, 'wireframe')


cubeTweaks
    .addColor(debugObject, 'color')
    .onChange(() =>
    {
        material.color.set(debugObject.color)
    })


debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>
    {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1, 
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Object2
 */
const geometry2 = new THREE.SphereGeometry(1, 1, 3)
const material2 = new THREE.MeshBasicMaterial({ map: colorTexture})
const mesh2 = new THREE.Mesh(geometry2, material2)
scene.add(mesh2)


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})