import * as THREE from 'three';

/**
 * Initialize Ambient Light
 * Provides a soft, global illumination to the scene.
 * @param {number} color - The color of the ambient light
 * @param {number} intensity - The intensity of the ambient light
 * @returns {THREE.AmbientLight} - The created ambient light
 */
export function initAmbientLight(color = 0xffffff, intensity = 1) {
    const ambientLight = new THREE.AmbientLight(color, intensity);
    return ambientLight;
}

/**
 * Initialize Directional Light
 * Provides directional lighting that simulates sunlight.
 * @param {number} color - The color of the directional light
 * @param {number} intensity - The intensity of the directional light
 * @param {THREE.Vector3} position - The position of the light source
 * @returns {THREE.DirectionalLight} - The created directional light
 */
export function initDirectionalLight(color = 0xffffff, intensity = 1, position = new THREE.Vector3(5, 10, 7.5)) {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.copy(position);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    return directionalLight;
}

/**
 * Initialize Point Light
 * Emits light in all directions from a single point, similar to a light bulb.
 * @param {number} color - The color of the point light
 * @param {number} intensity - The intensity of the point light
 * @param {number} distance - The maximum range of the light
 * @param {number} decay - The rate at which the light diminishes
 * @param {THREE.Vector3} position - The position of the light source
 * @returns {THREE.PointLight} - The created point light
 */
export function initPointLight(color = 0xffffff, intensity = 1, distance = 0, decay = 2, position = new THREE.Vector3(5, 5, 5)) {
    const pointLight = new THREE.PointLight(color, intensity, distance, decay);
    pointLight.position.copy(position);
    pointLight.castShadow = true;
    return pointLight;
}

/**
 * Initialize Spot Light
 * Emits a cone of light in a specific direction.
 * @param {number} color - The color of the spot light
 * @param {number} intensity - The intensity of the spot light
 * @param {number} distance - The maximum range of the light
 * @param {number} angle - The angle of the cone
 * @param {number} penumbra - The softness of the light's edge
 * @param {number} decay - The rate at which the light diminishes
 * @param {THREE.Vector3} position - The position of the light source
 * @returns {THREE.SpotLight} - The created spot light
 */
export function initSpotLight(color = 0xffffff, intensity = 1, distance = 0, angle = Math.PI / 4, penumbra = 0.1, decay = 2, position = new THREE.Vector3(5, 10, 5)) {
    const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
    spotLight.position.copy(position);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 50;
    return spotLight;
}

/**
 * Initialize Hemisphere Light
 * A light source positioned above the scene, with a gradient color between sky and ground.
 * @param {number} skyColor - The color of the sky
 * @param {number} groundColor - The color of the ground
 * @param {number} intensity - The intensity of the light
 * @returns {THREE.HemisphereLight} - The created hemisphere light
 */
export function initHemisphereLight(skyColor = 0xffffbb, groundColor = 0x080820, intensity = 1) {
    const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    return hemisphereLight;
}

/**
 * Set up a basic lighting rig with ambient, directional, and point lights.
 * @param {THREE.Scene} scene - The scene to add the lights to
 */
export function setupBasicLighting(scene) {
    const ambientLight = initAmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = initDirectionalLight(0xffffff, 1, new THREE.Vector3(5, 10, 7.5));
    scene.add(directionalLight);

    const pointLight = initPointLight(0xffffff, 1, 50, 2, new THREE.Vector3(-5, 5, 5));
    scene.add(pointLight);
}

/**
 * Adjust Shadows for all lights in the scene.
 * @param {THREE.Scene} scene - The scene containing the lights
 * @param {boolean} enableShadows - Whether to enable or disable shadows
 */
export function adjustShadows(scene, enableShadows = true) {
    scene.traverse((object) => {
        if (object.isLight) {
            object.castShadow = enableShadows;
        }
    });
}

/**
 * Create a dynamic lighting rig with animated lights.
 * @param {THREE.Scene} scene - The scene to add the lights to
 * @returns {function} - The update function to animate the lights
 */
export function createDynamicLighting(scene) {
    const pointLight1 = initPointLight(0xff0000, 1, 100, 2, new THREE.Vector3(0, 5, 0));
    const pointLight2 = initPointLight(0x00ff00, 1, 100, 2, new THREE.Vector3(0, -5, 0));
    const pointLight3 = initPointLight(0x0000ff, 1, 100, 2, new THREE.Vector3(5, 0, 0));

    scene.add(pointLight1);
    scene.add(pointLight2);
    scene.add(pointLight3);

    return function update(time) {
        const t = time * 0.001;
        pointLight1.position.x = Math.sin(t) * 10;
        pointLight1.position.z = Math.cos(t) * 10;

        pointLight2.position.y = Math.sin(t) * 10;
        pointLight2.position.x = Math.cos(t) * 10;

        pointLight3.position.z = Math.sin(t) * 10;
        pointLight3.position.y = Math.cos(t) * 10;
    };
}