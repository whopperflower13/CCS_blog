/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

export default function StudyThreeJS() {
  return (
    <>
      <Head>
        <title>Three.js Test</title>
      </Head>
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">JS Test</h1>
        <div id="test-div">Waiting for JavaScript...</div>
        <script type="module">
          {`
            const el = document.getElementById("test-div");
            el.textContent = "🎉 JavaScript is working!";
            const testBox = document.createElement("div");
            testBox.style.width = "100px";
            testBox.style.height = "100px";
            testBox.style.background = "skyblue";
            testBox.style.marginTop = "10px";
            el.appendChild(testBox);
          `}
        </script>
      </div>
    </>
  );
}
