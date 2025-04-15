---
title: Week 6-1 blog!
published_at: 2025-04-08
snippet: Eleventh class blog. 
disable_html_sanitization: true
allow_math: true
---

importing three.js into the blog

i like 3d so three.js is very exiting!

<div id="three.js_container"></div>

<script type="module">
    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.175.0/+esm'

const container = document.getElementById (`three.js_container`)
const width = container.parentNode.scrollWidth
const height = width * 9 / 16

import { OrbitControls } from '/250408/scripts/OrbitControls.js'
import { TeapotGeometry } from '/250408/scripts/TeapotGeometry.js'

const teapotSize = 300

let teapot

const textureMap = new THREE.TextureLoader ()
   .load ('250408/textures/uv_grid_opengl.jpg')
textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping
textureMap.anisotropy = 16
textureMap.colorSpace = THREE.SRGBColorSpace

// REFLECTION MAP
const path = '250408/textures/pisa/'
const urls = [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ]
const textureCube = new THREE.CubeTextureLoader ().setPath (path).load (urls)

const materials = {
   wireframe: new THREE.MeshBasicMaterial ({ 
      wireframe: true 
   }),

   flat: new THREE.MeshPhongMaterial ({ 
      specular: 0x000000, 
      flatShading: true, 
      side: THREE.DoubleSide 
   }),

   smooth: new THREE.MeshLambertMaterial ({ 
      side: THREE.DoubleSide 
   }),

   glossy: new THREE.MeshPhongMaterial ({ 
      color: 0xc0c0c0, 
      specular: 0x404040, 
      shininess: 300, 
      side: THREE.DoubleSide
   }),

   textured: new THREE.MeshPhongMaterial ({ 
      map: textureMap, 
      side: THREE.DoubleSide
   }),

   reflective: new THREE.MeshPhongMaterial ({ 
      envMap: textureCube, 
      side: THREE.DoubleSide
   })
}

const rand_el = a => a[Math.floor (Math.random () * a.length)]

// random tessellation amount
const rand_tess = () => rand_el ([ 20, 30, 40, 50 ])

// CAMERA
const camera = new THREE.PerspectiveCamera (45, width / height, 1, 80000)
camera.position.set (-600, 550, 1300)

// LIGHTS
const ambientLight = new THREE.AmbientLight (0x7c7c7c, 2.0)

const light = new THREE.DirectionalLight (0xFFFFFF, 2.0)
light.position.set (0.32, 0.39, 0.7)

// RENDERER
const renderer = new THREE.WebGLRenderer ({ antialias: true })
renderer.setPixelRatio (window.devicePixelRatio)
renderer.setSize (width, height)
container.appendChild (renderer.domElement)

// CONTROLS
const cameraControls = new OrbitControls (camera, renderer.domElement)

// scene itself
const scene = new THREE.Scene ()
scene.background = new THREE.Color (0xAAAAAA)
scene.add (ambientLight)
scene.add (light)

let material = materials[ 'wireframe' ] 

const mutate_geometry = (g, p) => {
   const length = g.index.array.length
   const glitch_amount = Math.abs ((p * 2) - 1) ** 5
   const glitch_length = Math.floor (glitch_amount * length)   
   const glitch_location = Math.floor (
      Math.random () * (length - glitch_length)
   )

   const mutation = p >= 0.5
      // 65536
      // 8192 is 2 ** 13
      // largest number not to give errors
      ? () => Math.floor (Math.random () * 8192)
      // ? () => Math.floor (Math.random () * 65536)
      : () => 0

   const front = g.index.array.slice (0, glitch_location)
   const middle = new Uint16Array (glitch_length)
      .fill (0)
      .map (mutation)
   const back = g.index.array.slice (glitch_location + glitch_length)

   const mutated = new Uint16Array (length)
   mutated.set (front)
   mutated.set (middle, front.length)
   mutated.set (back, front.length + middle.length)

   g.index.array = mutated 
}

let next_glitch_time = 0
let is_glitching = false
let geometry = new TeapotGeometry (
   300, // teapotSize
   rand_tess (),
   true,
   true,
   true,
   true,
)

const draw_teapot = ms => {

   if (teapot !== undefined) {
      teapot.geometry.dispose ()
      scene.remove (teapot)
   }

   const t = ms * 0.001

   if (t > next_glitch_time) {
      const period = Math.random () ** 24 * 6
      next_glitch_time = t + period

      is_glitching = !is_glitching

      if (is_glitching) mutate_geometry (geometry, Math.random ())

      else {
         geometry = new TeapotGeometry (
            teapotSize,
            rand_tess (), 
            Math.random () < 0.8,
            Math.random () < 0.8,
            true,
            true,
            true 
         )

         const type = rand_el ([ 
            `wireframe`, 
            `flat`, 
            `smooth`, 
            `glossy`, 
            `textured`, 
            `reflective` 
         ])
         material = materials[ type ]

         scene.background = type === `reflective` 
            ? textureCube
            : null
      }
   }

   teapot = new THREE.Mesh (geometry, material)
   scene.add (teapot)

   renderer.render (scene, camera)

   requestAnimationFrame (draw_teapot)
}

requestAnimationFrame (draw_teapot)
		</script>
