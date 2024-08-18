import * as THREE from 'three';

/**
 * Initialize the Scene
 * Sets up the basic scene with optional background color or environment map.
 * @param {Object} options - Configuration options for the scene
 * @param {number} options.backgroundColor - Hex color for the background
 * @param {THREE.Texture} options.backgroundTexture - Texture for the background
 * @param {THREE.CubeTexture} options.environmentMap - Environment map for reflections
 * @returns {THREE.Scene} - The created scene
 */
export function initScene(options = {}) {
    const scene = new THREE.Scene();

    // Set background color or texture
    if (options.backgroundColor) {
        scene.background = new THREE.Color(options.backgroundColor);
    } else if (options.backgroundTexture) {
        scene.background = options.backgroundTexture;
    } else if (options.environmentMap) {
        scene.environment = options.environmentMap;
    }

    return scene;
}

/**
 * Add Fog to the Scene
 * Creates a fog effect to give depth to the scene.
 * @param {THREE.Scene} scene - The scene to add fog to
 * @param {number} color - Hex color of the fog
 * @param {number} near - Distance at which the fog starts
 * @param {number} far - Distance at which the fog ends
 */
export function addFog(scene, color = 0xffffff, near = 1, far = 1000) {
    scene.fog = new THREE.Fog(color, near, far);
}

/**
 * Create and Add a Grid Helper to the Scene
 * A visual grid that can be used as a reference point in the scene.
 * @param {THREE.Scene} scene - The scene to add the grid helper to
 * @param {number} size - The size of the grid
 * @param {number} divisions - The number of divisions in the grid
 * @param {number} colorCenterLine - The color of the center line
 * @param {number} colorGrid - The color of the grid lines
 * @returns {THREE.GridHelper} - The created grid helper
 */
export function addGridHelper(scene, size = 10, divisions = 10, colorCenterLine = 0x444444, colorGrid = 0x888888) {
    const gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
    scene.add(gridHelper);
    return gridHelper;
}

/**
 * Create and Add an Axis Helper to the Scene
 * A visual representation of the 3 axes in the scene.
 * @param {THREE.Scene} scene - The scene to add the axis helper to
 * @param {number} size - The length of the axes
 * @returns {THREE.AxesHelper} - The created axes helper
 */
export function addAxesHelper(scene, size = 5) {
    const axesHelper = new THREE.AxesHelper(size);
    scene.add(axesHelper);
    return axesHelper;
}

/**
 * Add an Object to the Scene
 * Adds a Three.js object to the scene.
 * @param {THREE.Scene} scene - The scene to add the object to
 * @param {THREE.Object3D} object - The object to add to the scene
 */
export function addObjectToScene(scene, object) {
    scene.add(object);
}

/**
 * Remove an Object from the Scene
 * Removes a Three.js object from the scene.
 * @param {THREE.Scene} scene - The scene to remove the object from
 * @param {THREE.Object3D} object - The object to remove from the scene
 */
export function removeObjectFromScene(scene, object) {
    scene.remove(object);
    object.geometry.dispose();
    if (object.material) {
        if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
        } else {
            object.material.dispose();
        }
    }
}

/**
 * Clear the Scene
 * Removes all objects from the scene.
 * @param {THREE.Scene} scene - The scene to clear
 */
export function clearScene(scene) {
    while (scene.children.length > 0) {
        const object = scene.children[0];
        removeObjectFromScene(scene, object);
    }
}

/**
 * Update Scene Environment Map
 * Dynamically updates the environment map of the scene.
 * @param {THREE.Scene} scene - The scene to update
 * @param {THREE.CubeTexture} environmentMap - The new environment map texture
 */
export function updateEnvironmentMap(scene, environmentMap) {
    scene.environment = environmentMap;
    scene.background = environmentMap;
}