import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

/**
 * Initialize the EffectComposer and add basic passes
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer instance
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Camera} camera - The Three.js camera
 * @returns {EffectComposer} - The initialized composer with basic render pass
 */
export function initComposer(renderer, scene, camera) {
    const composer = new EffectComposer(renderer);

    // Add RenderPass (renders the scene into a texture)
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    return composer;
}

/**
 * Add a BloomPass for glowing effects
 * @param {EffectComposer} composer - The EffectComposer instance
 * @param {number} strength - Intensity of the bloom
 * @param {number} kernelSize - Size of the kernel used in the bloom
 * @param {number} sigma - Sigma value for the Gaussian blur
 * @param {number} resolution - Resolution of the bloom pass
 */
export function addBloomPass(composer, strength = 1.5, kernelSize = 25, sigma = 4.0, resolution = 256) {
    const bloomPass = new BloomPass(strength, kernelSize, sigma, resolution);
    composer.addPass(bloomPass);
}

/**
 * Add an UnrealBloomPass for more advanced bloom effects
 * @param {EffectComposer} composer - The EffectComposer instance
 * @param {number} strength - Bloom strength
 * @param {number} radius - Bloom radius
 * @param {number} threshold - Bloom threshold
 */
export function addUnrealBloomPass(composer, strength = 1.5, radius = 0.4, threshold = 0.85) {
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), strength, radius, threshold);
    composer.addPass(bloomPass);
}

/**
 * Add a FilmPass for a cinematic effect
 * @param {EffectComposer} composer - The EffectComposer instance
 * @param {number} noiseIntensity - Intensity of the noise
 * @param {number} scanlineIntensity - Intensity of the scanlines
 * @param {number} scanlineCount - Number of scanlines
 * @param {boolean} grayscale - Whether to render in grayscale
 */
export function addFilmPass(composer, noiseIntensity = 0.5, scanlineIntensity = 0.05, scanlineCount = 4096, grayscale = false) {
    const filmPass = new FilmPass(noiseIntensity, scanlineIntensity, scanlineCount, grayscale);
    composer.addPass(filmPass);
}

/**
 * Add an FXAA pass for anti-aliasing
 * @param {EffectComposer} composer - The EffectComposer instance
 */
export function addFXAAPass(composer) {
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(fxaaPass);
}

/**
 * Add a custom ShaderPass for effects like color correction or custom shaders
 * @param {EffectComposer} composer - The EffectComposer instance
 * @param {THREE.ShaderMaterial} shaderMaterial - The shader material to use in the pass
 */
export function addCustomShaderPass(composer, shaderMaterial) {
    const shaderPass = new ShaderPass(shaderMaterial);
    composer.addPass(shaderPass);
}

/**
 * Resize the composer when the window is resized
 * @param {EffectComposer} composer - The EffectComposer instance
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer instance
 */
export function onWindowResize(composer, renderer) {
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        composer.setSize(width, height);
    });
}

/**
 * Render loop with post-processing
 * @param {EffectComposer} composer - The EffectComposer instance
 * @param {function} customRender - Optional custom render function
 */
export function renderWithComposer(composer, customRender) {
    function render() {
        if (customRender) {
            customRender();
        }
        composer.render();
        requestAnimationFrame(render);
    }
    render();
}