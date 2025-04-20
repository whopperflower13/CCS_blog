
<<<<<<< HEAD
import { h } from "https://esm.sh/preact@10.15.1?dts";
import { useEffect, useRef } from "https://esm.sh/preact@10.15.1/hooks?dts";
import * as THREE from "https://esm.sh/three@0.150.1";
=======
// islands/ThreeCanvas.tsx
import { useEffect, useRef } from "preact/hooks";
import * as THREE from "https://esm.sh/three@0.150.1";
>>>>>>> parent of 1336ab9 (aaaaa)
=======
import { h } from "https://esm.sh/preact@10.15.1";
import { useEffect, useRef } from "https://esm.sh/preact@10.15.1/hooks";
import * as THREE from "https://esm.sh/three@0.150.1";
>>>>>>> parent of 81f0ca4 (aaaaaaaaa)

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "400px", backgroundColor: "#000" }}
    />
  );
}