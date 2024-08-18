import * as THREE from 'three';

/**
 * Handle Window Resize
 * Adjusts the renderer and camera when the window is resized.
 * @param {THREE.Camera} camera - The camera to adjust
 * @param {THREE.Renderer} renderer - The renderer to adjust
 */
export function handleWindowResize(camera, renderer) {
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

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
        renderer.setSize(width, height);
    });
}

/**
 * Handle Keyboard Input
 * Sets up listeners for keydown and keyup events.
 * @param {Object} actions - An object mapping keys to actions
 */
export function handleKeyboardInput(actions = {}) {
    window.addEventListener('keydown', (event) => {
        const action = actions[event.key.toLowerCase()];
        if (action && action.down) {
            action.down();
        }
    });

    window.addEventListener('keyup', (event) => {
        const action = actions[event.key.toLowerCase()];
        if (action && action.up) {
            action.up();
        }
    });
}

/**
 * Handle Mouse Input
 * Sets up listeners for mouse movement and clicks.
 * @param {HTMLElement} domElement - The DOM element to listen on
 * @param {function} onMove - Callback for mouse movement
 * @param {function} onClick - Callback for mouse clicks
 */
export function handleMouseInput(domElement, onMove = () => {}, onClick = () => {}) {
    domElement.addEventListener('mousemove', (event) => {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        onMove(mouse);
    });

    domElement.addEventListener('click', (event) => {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        onClick(mouse);
    });
}

/**
 * Handle Touch Input
 * Sets up listeners for touch movement and taps.
 * @param {HTMLElement} domElement - The DOM element to listen on
 * @param {function} onMove - Callback for touch movement
 * @param {function} onTap - Callback for touch taps
 */
export function handleTouchInput(domElement, onMove = () => {}, onTap = () => {}) {
    domElement.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            const touchPosition = new THREE.Vector2();
            touchPosition.x = (touch.clientX / window.innerWidth) * 2 - 1;
            touchPosition.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            onMove(touchPosition);
        }
    });

    domElement.addEventListener('touchstart', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            const touchPosition = new THREE.Vector2();
            touchPosition.x = (touch.clientX / window.innerWidth) * 2 - 1;
            touchPosition.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            onTap(touchPosition);
        }
    });
}

/**
 * Debounced Window Resize
 * Debounces the window resize event to prevent excessive function calls.
 * @param {function} callback - The function to call on resize
 * @param {number} delay - The debounce delay in milliseconds
 */
export function debounceWindowResize(callback, delay = 200) {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            callback();
        }, delay);
    });
}

/**
 * Custom Event Listener
 * Creates a custom event listener for any event.
 * @param {HTMLElement} domElement - The DOM element to listen on
 * @param {string} eventName - The name of the event to listen for
 * @param {function} callback - The function to call when the event occurs
 */
export function addCustomEventListener(domElement, eventName, callback) {
    domElement.addEventListener(eventName, callback);
}

/**
 * Remove Custom Event Listener
 * Removes a previously added custom event listener.
 * @param {HTMLElement} domElement - The DOM element to remove the listener from
 * @param {string} eventName - The name of the event to remove
 * @param {function} callback - The function to remove
 */
export function removeCustomEventListener(domElement, eventName, callback) {
    domElement.removeEventListener(eventName, callback);
}