import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TextureLoader, CubeTextureLoader } from 'three';

/**
 * Load a Texture
 * Loads a texture from a given URL.
 * @param {string} url - The URL of the texture
 * @param {function} onLoad - Callback function when the texture is loaded
 * @param {function} onProgress - Callback function for loading progress
 * @param {function} onError - Callback function for errors
 * @returns {THREE.Texture} - The loaded texture
 */
export function loadTexture(url, onLoad = () => {}, onProgress = () => {}, onError = () => {}) {
    const loader = new TextureLoader();
    return loader.load(url, onLoad, onProgress, onError);
}

/**
 * Load a Cube Texture (Skybox)
 * Loads a cube texture for use as a skybox or environment map.
 * @param {Array<string>} urls - An array of 6 URLs corresponding to the 6 faces of the cube
 * @param {function} onLoad - Callback function when the texture is loaded
 * @param {function} onProgress - Callback function for loading progress
 * @param {function} onError - Callback function for errors
 * @returns {THREE.CubeTexture} - The loaded cube texture
 */
export function loadCubeTexture(urls, onLoad = () => {}, onProgress = () => {}, onError = () => {}) {
    const loader = new CubeTextureLoader();
    return loader.load(urls, onLoad, onProgress, onError);
}

/**
 * Load a GLTF Model
 * Loads a GLTF model from a given URL.
 * @param {string} url - The URL of the GLTF model
 * @param {function} onLoad - Callback function when the model is loaded
 * @param {function} onProgress - Callback function for loading progress
 * @param {function} onError - Callback function for errors
 * @returns {Promise<THREE.Group>} - The loaded GLTF model
 */
export function loadGLTFModel(url, onLoad = () => {}, onProgress = () => {}, onError = () => {}) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            onLoad(gltf.scene);
            resolve(gltf.scene);
        }, onProgress, (error) => {
            onError(error);
            reject(error);
        });
    });
}

/**
 * Load an OBJ Model
 * Loads an OBJ model from a given URL.
 * @param {string} url - The URL of the OBJ model
 * @param {function} onLoad - Callback function when the model is loaded
 * @param {function} onProgress - Callback function for loading progress
 * @param {function} onError - Callback function for errors
 * @returns {Promise<THREE.Group>} - The loaded OBJ model
 */
export function loadOBJModel(url, onLoad = () => {}, onProgress = () => {}, onError = () => {}) {
    return new Promise((resolve, reject) => {
        const loader = new OBJLoader();
        loader.load(url, (obj) => {
            onLoad(obj);
            resolve(obj);
        }, onProgress, (error) => {
            onError(error);
            reject(error);
        });
    });
}

/**
 * Load an FBX Model
 * Loads an FBX model from a given URL.
 * @param {string} url - The URL of the FBX model
 * @param {function} onLoad - Callback function when the model is loaded
 * @param {function} onProgress - Callback function for loading progress
 * @param {function} onError - Callback function for errors
 * @returns {Promise<THREE.Group>} - The loaded FBX model
 */
export function loadFBXModel(url, onLoad = () => {}, onProgress = () => {}, onError = () => {}) {
    return new Promise((resolve, reject) => {
        const loader = new FBXLoader();
        loader.load(url, (fbx) => {
            onLoad(fbx);
            resolve(fbx);
        }, onProgress, (error) => {
            onError(error);
            reject(error);
        });
    });
}

/**
 * Load a Custom Shader
 * Loads vertex and fragment shaders from external files.
 * @param {string} vertexShaderUrl - The URL of the vertex shader file
 * @param {string} fragmentShaderUrl - The URL of the fragment shader file
 * @returns {Promise<Object>} - An object containing the loaded vertex and fragment shaders
 */
export function loadCustomShader(vertexShaderUrl, fragmentShaderUrl) {
    return new Promise((resolve, reject) => {
        const vertexShaderPromise = fetch(vertexShaderUrl).then(response => response.text());
        const fragmentShaderPromise = fetch(fragmentShaderUrl).then(response => response.text());

        Promise.all([vertexShaderPromise, fragmentShaderPromise])
            .then(([vertexShader, fragmentShader]) => {
                resolve({ vertexShader, fragmentShader });
            })
            .catch(reject);
    });
}