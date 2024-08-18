import * as THREE from 'three';

/**
 * Initialize the WebGL Renderer
 * Sets up the renderer with basic configurations like antialiasing and shadow map support.
 * @param {Object} options - Options for configuring the renderer
 * @param {boolean} options.antialias - Whether to enable antialiasing (default: true)
 * @param {boolean} options.shadowMap - Whether to enable shadow map (default: true)
 * @param {HTMLElement} container - The HTML container element to append the renderer to
 * @returns {THREE.WebGLRenderer} - The created WebGL renderer
 */
export function initRenderer(options = {}, container = document.body) {
    const renderer = new THREE.WebGLRenderer({
        antialias: options.antialias !== undefined ? options.antialias : true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = options.shadowMap !== undefined ? options.shadowMap : true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Default shadow map type
    container.appendChild(renderer.domElement);

    return renderer;
}

/**
 * Handle Window Resize for Renderer
 * Adjusts the renderer and camera aspect ratio when the window is resized.
 * @param {THREE.Renderer} renderer - The renderer to adjust
 * @param {THREE.Camera} camera - The camera to adjust
 */
export function onWindowResize(renderer, camera) {
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);

        if (camera.isPerspectiveCamera) {
            camera.aspect = width / height;
        } else if (camera.isOrthographicCamera) {
            const aspect = width / height;
            camera.left = -5 * aspect;
            camera.right = 5 * aspect;
            camera.top = 5;
            camera.bottom = -5;
        }

        camera.updateProjectionMatrix();
    });
}

/**
 * Toggle Fullscreen Mode
 * Enables or disables fullscreen mode for the renderer.
 * @param {HTMLElement} container - The HTML container element of the renderer
 */
export function toggleFullscreen(container = document.body) {
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * Enable VR Mode
 * Configures the renderer for VR mode using WebXR.
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer to configure for VR
 */
export function enableVR(renderer) {
    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));
}

/**
 * Enable Stereo Rendering (Anaglyph 3D)
 * Configures the renderer for stereo anaglyph rendering.
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer to configure
 * @param {THREE.Camera} camera - The camera to use for stereo rendering
 * @returns {THREE.AnaglyphEffect} - The configured anaglyph effect
 */
export function enableStereoRendering(renderer, camera) {
    const effect = new THREE.AnaglyphEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);
    
    function render() {
        effect.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    render();
    return effect;
}

/**
 * Update Renderer
 * This function is called in the animation loop to render the scene.
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer
 * @param {THREE.Scene} scene - The scene to render
 * @param {THREE.Camera} camera - The camera to use for rendering
 */
export function updateRenderer(renderer, scene, camera) {
    renderer.render(scene, camera);
}