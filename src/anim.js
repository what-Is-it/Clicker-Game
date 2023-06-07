import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {RectAreaLightHelper} from 'three/addons/helpers/RectAreaLightHelper.js'
import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'

function init() {
    let container = document.getElementById('welcome')

    //Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#ffffff')

    //Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    )
    camera.position.set(-2, 5, 10)

    //render
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        logarithmicDepthBuffer: true,
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    /* let plain
    {
        plain = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshBasicMaterial({color: '#E2DFE1'})
        )
        plain.reciveShadow = true
        plain.position.set(0, -1, 0)
        plain.rotateX(-Math.PI / 2)
        scene.add(plain)
    } */

    // Model
    {
        const loader = new GLTFLoader()
        const texture = new THREE.TextureLoader().load(
            '../model/skybackground/textures/Material__25__background_JPG_002_emissive.jpeg'
        )
        texture.flipY = false

        loader.load(
            '../model/skybackground/scene.gltf',
            (gltf) => {
                const model = gltf.scene
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material.map = texture
                    }
                    scene.add(model)
                })
            },
            function (error) {
                console.log('Error: ' + error)
            }
        )
    }

    {
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(-2, 0, 10)
        light.lookAt(0, -1, 0)
        scene.add(light)
        // Helper
        // const helper = new THREE.DirectionalLightHelper(light, 5)
        // scene.add(helper)
    }

    {
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(2, 0, 5)
        light.lookAt(0, 1, 0)
        scene.add(light)

        // Helper
        // const helper = new THREE.DirectionalLightHelper(light, 5)
        // scene.add(helper)
    }

    {
        const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100)
        rectLight.position.set(-10, 0, 0)
        rectLight.rotation.y = Math.PI + Math.PI / 4
        scene.add(rectLight)

        /* const rectLightHelper = new RectAreaLightHelper(rectLight)
        rectLight.add(rectLightHelper) */
    }

    {
        const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100)
        rectLight.position.set(10, 0, 0)
        rectLight.rotation.y = Math.PI - Math.PI / 4
        scene.add(rectLight)

        /* const rectLightHelper = new RectAreaLightHelper(rectLight)
        rectLight.add(rectLightHelper) */
    }
    RectAreaLightUniformsLib.init()

    //OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
    controls.enableDamping = true
    controls.minDistance = 1
    controls.maxDistance = 1

    //Resize
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Animate
    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }
    animate()
}

export default init
