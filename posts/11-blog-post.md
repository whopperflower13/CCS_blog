---
title: Week 5-2 blog!
published_at: 2025-04-03
snippet: Tenth class blog. 
disable_html_sanitization: true
allow_math: true
---

Im soooo tired and hungry omggg

<script src="./scripts/p5.js"></script>

<canvas id="p5_sample"></canvas>

<script>
const cnv = document.getElementById ("p5_sample")
const w = cnv.parentNode.scrollWidth
const h = w * 9 / 16

    function setup() {
  createCanvas(400, 400);
  noStroke ()
}

function draw() {
  background('turquoise');

  let x_pos = 25
  while (x_pos < width) {
    // while is a lofi for loop
    // continue to loop
    fill ('hotpink')
    const y_pos = noise (frameCount / 100, x_pos) * 300
    square (x_pos, y_pos, 100)
    x_pos += 125
  }
  
  // for (let x = 0; x < width; x += 20) {
  //   for (let y = 0; y < height; y += 20) {
  //     const g = noise (x / 100, y / 100, frameCount / 100) * 255
  //     fill (g)
  //     square (x, y, 20)
  //   }
  // }
}


</script>

ai images could be interpreted as non digital. 