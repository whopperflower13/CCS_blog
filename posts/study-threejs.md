---
title: study post three.js
published_at: 2025-04-13
snippet: learning three.js but struggling
disable_html_sanitization: true
allow_math: true
---

hello

<script type="module" src="/static/threejs/threejs.js"></script>


<div id="test-div">Waiting for JavaScript...</div>

<script type="module">
  const el = document.getElementById("test-div");
  el.textContent = "🎉 JavaScript is working!";
  const testBox = document.createElement("div");
  testBox.style.width = "100px";
  testBox.style.height = "100px";
  testBox.style.background = "skyblue";
  testBox.style.marginTop = "10px";
  el.appendChild(testBox);
</script>