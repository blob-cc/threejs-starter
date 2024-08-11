import * as THREE from 'three';

/**
 * Basic Material
 * A simple material with flat colors. Useful for non-lit objects or basic shapes.
 */
export function basicMaterial(color = 0xffffff) {
    return new THREE.MeshBasicMaterial({ color });
}

/**
 * Lambert Material
 * A non-shiny material that responds to light, providing a more realistic look than MeshBasicMaterial.
 */
export function lambertMaterial(color = 0xffffff) {
    return new THREE.MeshLambertMaterial({ color });
}

/**
 * Phong Material
 * A shiny material that reacts to light, creating specular highlights. Good for shiny surfaces.
 */
export function phongMaterial(color = 0xffffff, shininess = 30) {
    return new THREE.MeshPhongMaterial({ color, shininess });
}

/**
 * Standard Physical Material
 * A physically-based rendering (PBR) material that can simulate realistic surfaces like metal and rough surfaces.
 */
export function standardMaterial(options = {}) {
    return new THREE.MeshStandardMaterial({
        color: options.color || 0xffffff,
        metalness: options.metalness || 0.5,
        roughness: options.roughness || 0.5,
        emissive: options.emissive || 0x000000,
        map: options.map || null,
        normalMap: options.normalMap || null,
        roughnessMap: options.roughnessMap || null,
        metalnessMap: options.metalnessMap || null,
    });
}

/**
 * Toon Material
 * A cartoon-like material with flat shading, useful for stylized or non-photorealistic rendering.
 */
export function toonMaterial(color = 0xffffff) {
    return new THREE.MeshToonMaterial({ color });
}

/**
 * Custom Shader Material
 * A material that allows for custom vertex and fragment shaders, enabling more advanced and unique effects.
 */
export function customShaderMaterial(vertexShader, fragmentShader, uniforms = {}) {
    return new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            ...uniforms,
            time: { value: 0.0 }, // Example uniform
        },
        side: THREE.DoubleSide, // Ensures the material is visible from both sides
    });
}

/**
 * Environment Mapped Material
 * A material that reflects its environment, useful for metallic and reflective surfaces.
 */
export function envMappedMaterial(environmentMap, options = {}) {
    return new THREE.MeshStandardMaterial({
        color: options.color || 0xffffff,
        metalness: options.metalness || 1.0,
        roughness: options.roughness || 0.1,
        envMap: environmentMap,
        envMapIntensity: options.envMapIntensity || 1.0,
    });
}

/**
 * Wireframe Material
 * A material that displays the mesh as a wireframe, often used for debugging or artistic effects.
 */
export function wireframeMaterial(color = 0xffffff) {
    return new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
    });
}

/**
 * Depth Material
 * A material that visualizes the depth of the scene. Often used in post-processing effects.
 */
export function depthMaterial() {
    return new THREE.MeshDepthMaterial();
}

/**
 * Points Material
 * A material used for rendering particles or points in a PointCloud.
 */
export function pointsMaterial(size = 1, color = 0xffffff) {
    return new THREE.PointsMaterial({
        size,
        color,
        sizeAttenuation: true,
    });
}

/**
 * Reflective Material
 * A material with a reflection, useful for creating mirror-like surfaces.
 */
export function reflectiveMaterial(options = {}) {
    return new THREE.MeshPhongMaterial({
        color: options.color || 0xffffff,
        envMap: options.envMap || null,
        reflectivity: options.reflectivity || 1,
    });
}

/**
 * Transparent Material
 * A material with transparency, allowing objects to be seen through it.
 */
export function transparentMaterial(color = 0xffffff, opacity = 0.5) {
    return new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
    });
}