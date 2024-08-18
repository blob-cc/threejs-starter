import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

/**
 * Initialize Orbit Controls
 * Allows the user to rotate around, zoom, and pan the camera.
 * @param {THREE.Camera} camera - The camera to control
 * @param {HTMLElement} domElement - The HTML element to attach the controls to
 * @returns {OrbitControls} - The initialized orbit controls
 */
export function initOrbitControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true; // Smooth the control movements
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false; // Panning works by moving the camera along the X and Y axis
    controls.maxPolarAngle = Math.PI / 2; // Prevent the camera from going below the ground level
    return controls;
}

/**
 * Initialize First-Person Controls
 * Allows the user to control the camera like a first-person shooter.
 * @param {THREE.Camera} camera - The camera to control
 * @param {HTMLElement} domElement - The HTML element to attach the controls to
 * @returns {FirstPersonControls} - The initialized first-person controls
 */
export function initFirstPersonControls(camera, domElement) {
    const controls = new FirstPersonControls(camera, domElement);
    controls.movementSpeed = 10; // Adjust the movement speed
    controls.lookSpeed = 0.1; // Adjust the look-around speed
    controls.lookVertical = true; // Allow vertical look-around
    return controls;
}

/**
 * Initialize Fly Controls
 * Allows the user to freely move and rotate the camera in 3D space.
 * @param {THREE.Camera} camera - The camera to control
 * @param {HTMLElement} domElement - The HTML element to attach the controls to
 * @returns {FlyControls} - The initialized fly controls
 */
export function initFlyControls(camera, domElement) {
    const controls = new FlyControls(camera, domElement);
    controls.movementSpeed = 20; // Adjust the movement speed
    controls.rollSpeed = Math.PI / 24; // Adjust the roll speed
    controls.autoForward = false; // Disable automatic forward movement
    controls.dragToLook = true; // Drag the mouse to look around
    return controls;
}

/**
 * Custom Keyboard Controls
 * A simple setup for custom keyboard-based camera controls.
 * @param {THREE.Camera} camera - The camera to control
 * @param {number} speed - The speed of the camera movement
 * @returns {function} - The function to be called in the render loop for updating the camera position
 */
export function initCustomKeyboardControls(camera, speed = 0.1) {
    const keys = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false
    };

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                keys.forward = true;
                break;
            case 's':
                keys.backward = true;
                break;
            case 'a':
                keys.left = true;
                break;
            case 'd':
                keys.right = true;
                break;
            case 'q':
                keys.up = true;
                break;
            case 'e':
                keys.down = true;
                break;
        }
    });

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
                keys.forward = false;
                break;
            case 's':
                keys.backward = false;
                break;
            case 'a':
                keys.left = false;
                break;
            case 'd':
                keys.right = false;
                break;
            case 'q':
                keys.up = false;
                break;
            case 'e':
                keys.down = false;
                break;
        }
    });

    return function updateCameraPosition() {
        if (keys.forward) camera.position.z -= speed;
        if (keys.backward) camera.position.z += speed;
        if (keys.left) camera.position.x -= speed;
        if (keys.right) camera.position.x += speed;
        if (keys.up) camera.position.y += speed;
        if (keys.down) camera.position.y -= speed;
    };
}

/**
 * Update Controls
 * Call this function in your animation loop to update the controls.
 * @param {OrbitControls|FirstPersonControls|FlyControls} controls - The controls to update
 */
export function updateControls(controls) {
    controls.update();
}