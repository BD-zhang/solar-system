import * as THREE from '../node_modules/three/build/three.module.js';
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('#afffff', 1.0)
document.body.appendChild(renderer.domElement)

const light = new THREE.PointLight(0xfa0e00, 100, 300)
light.position.set(50, 50, 50)

const geometry = new THREE.SphereGeometry(2, 32, 32)
const material = new THREE.MeshLambertMaterial({
    color: '#32afca'
})

material.flatShading = true
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
scene.add(light)


const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(2, 0, -2),
  new THREE.Vector3(2, 0, 2),
  new THREE.Vector3(-2, 0, 2),
  new THREE.Vector3(-2, 0, -2),
]);
curve.curveType = "centripetal"; // 曲线的类型
curve.closed = true; // 曲线是否闭合
// curve.tension = 0.1
const points = curve.getPoints(50); // 获取点列表，50为要将曲线划分为的分段数
const line = new THREE.LineLoop(
  new THREE.BufferGeometry().setFromPoints(points),
  new THREE.LineBasicMaterial({ color: 0x0000ff })
); // 一条头尾相接的连续的线(参数说明：顶点列表，材质)
scene.add(line); // 将曲线添加到场景中
  

camera.position.set(0, 1, 10)

function animate() {
    requestAnimationFrame(animate)

    sphere.rotation.x += 0.01
    sphere.rotation.y += 0.01
    // sphere.rotation.z += 0.01
    // line.rotation.x += 0.01
    // line.rotation.y += 0.01
    // line.rotation.z += 0.01
    renderer.render(scene, camera)
}

animate()
// renderer.render(scene, camera)