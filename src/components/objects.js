import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

/**
 * Create a basic cube
 * @param {number} size - The size of the cube
 * @param {THREE.Material} material - The material to apply to the cube
 * @returns {THREE.Mesh} - The created cube mesh
 */
export function createCube(size = 1, material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}

/**
 * Create a basic sphere
 * @param {number} radius - The radius of the sphere
 * @param {THREE.Material} material - The material to apply to the sphere
 * @param {number} widthSegments - Number of horizontal segments
 * @param {number} heightSegments - Number of vertical segments
 * @returns {THREE.Mesh} - The created sphere mesh
 */
export function createSphere(radius = 1, material = new THREE.MeshBasicMaterial({ color: 0xff0000 }), widthSegments = 32, heightSegments = 32) {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sphere = new THREE.Mesh(geometry, material);
    return sphere;
}

/**
 * Create a basic plane
 * @param {number} width - The width of the plane
 * @param {number} height - The height of the plane
 * @param {THREE.Material} material - The material to apply to the plane
 * @returns {THREE.Mesh} - The created plane mesh
 */
export function createPlane(width = 10, height = 10, material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const plane = new THREE.Mesh(geometry, material);
    return plane;
}

/**
 * Create a torus (donut shape)
 * @param {number} radius - The radius of the torus
 * @param {number} tube - The radius of the tube
 * @param {THREE.Material} material - The material to apply to the torus
 * @param {number} radialSegments - Number of radial segments
 * @param {number} tubularSegments - Number of tubular segments
 * @returns {THREE.Mesh} - The created torus mesh
 */
export function createTorus(radius = 2, tube = 0.4, material = new THREE.MeshBasicMaterial({ color: 0xffff00 }), radialSegments = 16, tubularSegments = 100) {
    const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
    const torus = new THREE.Mesh(geometry, material);
    return torus;
}

/**
 * Create a custom geometry object (example: pyramid)
 * @param {number} size - The size of the pyramid
 * @param {THREE.Material} material - The material to apply to the pyramid
 * @returns {THREE.Mesh} - The created pyramid mesh
 */
export function createPyramid(size = 1, material = new THREE.MeshBasicMaterial({ color: 0xff00ff })) {
    const geometry = new THREE.ConeGeometry(size, size, 4);
    const pyramid = new THREE.Mesh(geometry, material);
    return pyramid;
}

/**
 * Load a GLTF model
 * @param {string} url - The URL of the GLTF model
 * @param {function} onLoad - Callback function to execute when model is loaded
 * @param {function} onProgress - Callback function to track loading progress
 * @param {function} onError - Callback function to handle errors during loading
 */
export function loadGLTFModel(url, onLoad, onProgress = undefined, onError = undefined) {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
        onLoad(gltf.scene);
    }, onProgress, onError);
}

/**
 * Load an OBJ model
 * @param {string} url - The URL of the OBJ model
 * @param {function} onLoad - Callback function to execute when model is loaded
 * @param {function} onProgress - Callback function to track loading progress
 * @param {function} onError - Callback function to handle errors during loading
 */
export function loadOBJModel(url, onLoad, onProgress = undefined, onError = undefined) {
    const loader = new OBJLoader();
    loader.load(url, (obj) => {
        onLoad(obj);
    }, onProgress, onError);
}

/**
 * Load an FBX model
 * @param {string} url - The URL of the FBX model
 * @param {function} onLoad - Callback function to execute when model is loaded
 * @param {function} onProgress - Callback function to track loading progress
 * @param {function} onError - Callback function to handle errors during loading
 */
export function loadFBXModel(url, onLoad, onProgress = undefined, onError = undefined) {
    const loader = new FBXLoader();
    loader.load(url, (fbx) => {
        onLoad(fbx);
    }, onProgress, onError);
}

/**
 * Create a group of objects
 * @param {THREE.Object3D[]} objects - An array of 3D objects to group
 * @returns {THREE.Group} - The created group containing the objects
 */
export function createGroup(objects = []) {
    const group = new THREE.Group();
    objects.forEach(object => {
        group.add(object);
    });
    return group;
}

/**
 * Create a particle system
 * @param {number} count - The number of particles
 * @param {THREE.Material} material - The material to apply to the particles
 * @returns {THREE.Points} - The created particle system
 */
export function createParticleSystem(count = 1000, material = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff })) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleSystem = new THREE.Points(geometry, material);
    return particleSystem;
}

/**
 * Create a line from a series of points
 * @param {THREE.Vector3[]} points - An array of Vector3 points defining the line
 * @param {THREE.Material} material - The material to apply to the line
 * @returns {THREE.Line} - The created line
 */
export function createLine(points = [], material = new THREE.LineBasicMaterial({ color: 0xffffff })) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    return line;
}

/**
 * Create a skybox using an array of six texture URLs
 * @param {string[]} urls - Array of six URLs corresponding to the cube map textures
 * @returns {THREE.Mesh} - The created skybox mesh
 */
export function createSkybox(urls = []) {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load(urls);
    const material = new THREE.MeshBasicMaterial({ envMap: texture, side: THREE.BackSide });
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const skybox = new THREE.Mesh(geometry, material);
    return skybox;
}

/**
 * Create a custom object with a provided geometry and material
 * @param {THREE.Geometry} geometry - The geometry of the object
 * @param {THREE.Material} material - The material to apply to the object
 * @returns {THREE.Mesh} - The created custom object mesh
 */
export function createCustomObject(geometry, material) {
    return new THREE.Mesh(geometry, material);
}