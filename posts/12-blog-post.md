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

<script type="importmap">
			{
				"imports": {
					"three": "../scripts/three.module.js",
					console.log(three)
				}
			}
		</script>


<script type="module">
    import * as THREE from 'three';

    const container = document.getElementById (`three.js_container`)
    const 