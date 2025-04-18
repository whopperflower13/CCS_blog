/** @jsx h */
import { h } from "preact";
import { useEffect } from "preact/hooks";

export default function ThreeCanvas() {
  useEffect(() => {
    (async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeeeeee);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const container = document.getElementById("threejs-canvas");
      if (container) {
        container.innerHTML = "";
        container.appendChild(renderer.domElement);
      }

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    })();
  }, []);

  return (
    <div id="threejs-canvas" style={{ width: "100%", height: "400px" }} />
  );
}