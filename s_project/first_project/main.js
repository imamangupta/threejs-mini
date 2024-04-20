import * as THREE from 'three';
import earth from './earth.jpg';

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('squre').appendChild(renderer.domElement);


const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 30);


const spheregeometry = new THREE.SphereGeometry(15, 32, 16);
const spherematerial = new THREE.MeshBasicMaterial({
    wireframe: true,
    map: textureLoader.load(earth),

});
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
scene.add(sphere);
sphere.position.set(3, 30, 2);


const boxGeometry = new THREE.BoxGeometry(15, 15, 5)
const boxMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color:0x22342F
})
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.set(-19, 25, 2)


function animate() {
    // sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera)
}

// change background color 
// renderer.setClearColor(0x86BF1F)


renderer.setAnimationLoop(animate);

window.onresize = function (e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}


let oldx = 0;
let oldy = 0;

window.onmousemove = function (ev) {
    let changex = ev.x - oldx;
    let changey = ev.y - oldy;
    camera.position.x += changex / 100
    camera.position.y -= changey / 100
    oldx = ev.x;
    oldy = ev.y;
}