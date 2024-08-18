import * as THREE from 'three';
import Stats from 'stats.js';

/**
 * Initialize Performance Monitoring
 * Sets up a Stats.js panel to monitor frame rate and performance.
 * @returns {Stats} - The Stats.js instance
 */
export function initPerformanceMonitor() {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms/frame, 2: memory (if available)
    document.body.appendChild(stats.dom);
    return stats;
}

/**
 * Optimize Render Loop with Request Animation Frame
 * Uses requestAnimationFrame to create an optimized render loop.
 * @param {function} renderFunction - The function to call each frame
 */
export function optimizeRenderLoop(renderFunction) {
    function loop() {
        requestAnimationFrame(loop);
        renderFunction();
    }
    loop();
}

/**
 * Limit Frame Rate
 * Limits the frame rate by skipping frames based on the desired fps.
 * @param {function} renderFunction - The function to call each frame
 * @param {number} fps - Desired frames per second (default: 30)
 */
export function limitFrameRate(renderFunction, fps = 30) {
    let lastTime = 0;
    const fpsInterval = 1000 / fps;

    function loop(time) {
        requestAnimationFrame(loop);
        const delta = time - lastTime;

        if (delta > fpsInterval) {
            lastTime = time - (delta % fpsInterval);
            renderFunction();
        }
    }
    loop(0);
}

/**
 * Optimize Shadow Map Settings
 * Adjusts shadow map settings to improve performance while maintaining quality.
 * @param {THREE.WebGLRenderer} renderer - The renderer to configure
 * @param {boolean} useHighQuality - Whether to use high-quality shadows (default: false)
 */
export function optimizeShadowMap(renderer, useHighQuality = false) {
    if (useHighQuality) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Higher quality, but slower
        renderer.shadowMap.enabled = true;
    } else {
        renderer.shadowMap.type = THREE.BasicShadowMap; // Lower quality, but faster
        renderer.shadowMap.enabled = true;
    }
}

/**
 * Dynamically Adjust Rendering Resolution
 * Reduces the rendering resolution during performance drops to maintain a stable frame rate.
 * @param {THREE.WebGLRenderer} renderer - The renderer to adjust
 * @param {Stats} stats - The Stats.js instance for monitoring performance
 */
export function dynamicResolutionScaling(renderer, stats) {
    const basePixelRatio = window.devicePixelRatio || 1;

    function adjustResolution() {
        const fps = stats.getFPS();

        if (fps < 30) {
            renderer.setPixelRatio(Math.max(0.5, basePixelRatio - 0.5));
        } else if (fps > 50) {
            renderer.setPixelRatio(Math.min(2, basePixelRatio + 0.5));
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        adjustResolution();
    }
    loop();
}

/**
 * Manage Resource-Intensive Objects
 * Disables or simplifies resource-intensive objects when they are not in view.
 * @param {THREE.Camera} camera - The camera used in the scene
 * @param {Array<THREE.Object3D>} objects - The objects to manage
 */
export function manageResourceIntensiveObjects(camera, objects) {
    const frustum = new THREE.Frustum();
    const cameraViewProjectionMatrix = new THREE.Matrix4();

    function update() {
        camera.updateMatrixWorld();
        camera.matrixWorldInverse.getInverse(camera.matrixWorld);
        cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

        objects.forEach(object => {
            if (!frustum.intersectsObject(object)) {
                object.visible = false; // Hide object if it's not in view
            } else {
                object.visible = true;
            }
        });
    }

    function loop() {
        requestAnimationFrame(loop);
        update();
    }
    loop();
}