import * as THREE from 'three';
const scene = new THREE.Scene();
// Importing Things

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 3
scene.add(camera)

// Sitting the camera position in the windows

// const Geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const Geometry = new THREE.SphereGeometry( 10, 62, 32 ); 
const Meterial = new THREE.PointsMaterial({ size: 0.10})
const mesh = new THREE.Points(Geometry, Meterial)
mesh.position.set(0,0,-20)
scene.add(mesh)



const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 1000;
const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++){
  posArray[i]= (Math.random() - 0.5) * 5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
const partMeterial = new THREE.PointsMaterial({ size: 0.005})
const particlesMesh = new THREE.Points(particlesGeometry,partMeterial)
scene.add(particlesMesh)



// Adding Geometry shapes in the scene


const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('app').append(renderer.domElement)

// This do the were have to add canvas


document.addEventListener('mousemove',animateParticles);

let mouseX = 0
let mouseY = 0

function animateParticles(event) {
  mouseY = event.clientY
  mouseX = event.clientX
  mesh.rotation.y += 0.01
  // mesh.rotation.x = 0.01
  // mesh.rotation.y = event.clientX / window.innerHeight - 4.01
  // mesh.rotation.x = event.clientY / window.innerWidth - 2.01
  particlesMesh.rotation.y = event.clientX / window.innerHeight - 0.01
  particlesMesh.rotation.x = event.clientY / window.innerWidth - 0.01
}

// mouse moving





const tick = ()=>{
  window.requestAnimationFrame(tick)
  mesh.rotation.y += 0.01
  particlesMesh.rotation.y += 0.011

 
  renderer.render(scene, camera)
}
tick()

// That renders