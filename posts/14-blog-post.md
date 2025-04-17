---
title: Week 7-1 blog!
published_at: 2025-04-15
snippet: Thirteenth class blog. 
disable_html_sanitization: true
allow_math: true
---
I learned moire when I was drawing comics in elementary school. The traditional way of drawing manga were with pen and paper, and the shades expressed in screen tones. Screen tones are sticker sheets with patterns, attached to the page to express patterns, shadows, gradients, and color. I learned to unite the density of the tones to avoid the moire effect, a result of combining multiple tones of different densities. Since this was taught to be avoided, I had a overall negative impression toward moire. 

![alt text](moire.png)

<script type="module">
    import three from https://cdn.jsdelivr.net/npm/three@0.175.0/+esm

    
    const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );

</script>