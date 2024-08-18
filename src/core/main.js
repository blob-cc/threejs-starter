import * as THREE from 'three';
import { initScene, addGridHelper, addAxesHelper } from './scene.js';
import { initPerspectiveCamera } from './camera.js';
import { initRenderer, onWindowResize } from './renderer.js';
import { initOrbitControls } from './controls.js';
import { initAmbientLight, initDirectionalLight } from './lighting.js';
import { handleWindowResize } from './eventListeners.js';
import { initPerformanceMonitor, optimizeRenderLoop } from './performance.js';
import { loadGLTFModel } from './loader.js';

let scene, camera, renderer, controls, stats;

function init() {
    // Initialize the scene
    scene = initScene({ backgroundColor: 0x000000 });

    // Initialize the camera
    camera = initPerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // Initialize the renderer
    renderer = initRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);

    // Initialize controls
    controls = initOrbitControls(camera, renderer.domElement);

    // Initialize performance monitor
    stats = initPerformanceMonitor();

    // Add lights
    const ambientLight = initAmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = initDirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Add helpers
    addGridHelper(scene);
    addAxesHelper(scene);

    // Load models
    loadGLTFModel('path/to/your/model.gltf').then((model) => {
        scene.add(model);
    });

    // Handle window resize
    handleWindowResize(camera, renderer);

    // Start rendering loop
    optimizeRenderLoop(render);
}

function render() {
    stats.begin();

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);

    stats.end();
}

init();