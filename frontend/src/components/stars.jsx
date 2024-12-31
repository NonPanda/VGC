import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect,useRef } from 'react';

function Stars(){
const refContainer = useRef(null);
useEffect(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  renderer.render(scene, camera);

  // Add stars
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 300;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 400;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, sizeAttenuation: true });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Add lights
  const light = new THREE.PointLight(0xffffff, 100, 100, 1.4);
  light.position.set(5, 0, 5);
  scene.add(light);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Load the image texture and add to the scene as a plane
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    '/src/assets/supermarket.png',
    (texture) => {
      const planeGeometry = new THREE.PlaneGeometry(30, 30);
      const planeMaterial = new THREE.MeshStandardMaterial({ map: texture, transparent: true });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);

      plane.position.set(0,0,-10); // Position the plane
      scene.add(plane);

      // Animate the hover effect
      function animateHover(time) {
        plane.position.y = Math.sin(time * 0.002) * 1-10; // Slight hover up and down
      }

      // Main animation loop
      function animate(time) {
        requestAnimationFrame(animate);

        stars.rotation.x += 0.001;
        stars.rotation.y += 0.001;

        starMaterial.size = 0.7 + 0.1 * Math.sin(time * 0.003);
        animateHover(time);

        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    },
    undefined,
    (error) => {
      console.error('Error loading texture:', error);
    }
  );

},[]);
return (
  <div ref={refContainer}></div>
);
}
export default Stars