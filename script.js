// Three.js background effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a wireframe torus knot
const torusKnotGeometry = new THREE.TorusKnotGeometry(50, 3, 100, 16);
const torusKnotMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x1a1a2e, 
    wireframe: true,
    transparent: true,
    opacity: 0.7
});
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
scene.add(torusKnot);

// Create star field
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0x16213e,
    size: 0.1,
    transparent: true
});

const starVertices = [];
for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 50;


// Animation
function animate() {
    requestAnimationFrame(animate);

    // Rotate torus knot
    torusKnot.rotation.x += 0.002;
    torusKnot.rotation.y += 0.003;

    // Rotate stars slightly
    stars.rotation.y += 0.0001;


    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});