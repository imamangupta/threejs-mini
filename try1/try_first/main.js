import * as THREE from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 3
scene.add(camera)

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./matcaps.png')

const Geometry = new THREE.TorusKnotGeometry(0.5,0.2,100,20)
const Meterial = new THREE.MeshMatcapMaterial({matcap: texture})
const mesh = new THREE.Mesh(Geometry, Meterial)
scene.add(mesh)

const bGeometry = new THREE.BoxGeometry(1,1,1,10,10,10)
const bMeterial = new THREE.MeshBasicMaterial({ wireframe: true,color:'blue'})
const bmesh = new THREE.Mesh(bGeometry, bMeterial)
bmesh.position.set(-2, 0, 0);
scene.add(bmesh)

const b2Geometry = new THREE.BoxGeometry(1,1,1)
const b2Meterial = new THREE.MeshMatcapMaterial({color: 'green'})
const b2mesh = new THREE.Mesh(b2Geometry, b2Meterial)
b2mesh.position.set(2, 0, 0);
scene.add(b2mesh)



const renderer = new THREE.WebGLRenderer({alpha:true})
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.append(renderer.domElement)

const cursor = {x: 0, y: 0}

window.addEventListener('mousemove',(_event)=>{
  cursor.x = _event.clientX / window.innerWidth - 0.5
  cursor.y = _event.clientY / window.innerHeight - 0.5
})


const tick = ()=>{
  window.requestAnimationFrame(tick)
  mesh.rotation.y += 0.01
  bmesh.rotation.y -= 0.01
  b2mesh.rotation.y += 0.01

  const cameraX = - cursor.x
  const cameraY = cursor.y

  camera.position.x += (cameraX - camera.position.x)/10
  camera.position.y += (cameraY - camera.position.y)/10
 
  renderer.render(scene, camera)
}
tick()