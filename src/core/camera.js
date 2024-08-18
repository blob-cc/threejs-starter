import * as THREE from 'three';

/**
 * Initialize a Perspective Camera
 * @param {number} fov - Field of view in degrees
 * @param {number} aspect - Aspect ratio (typically width/height)
 * @param {number} near - Near clipping plane
 * @param {number} far - Far clipping plane
 * @param {THREE.Vector3} position - Initial position of the camera
 * @returns {THREE.PerspectiveCamera} - The created perspective camera
 */
export function initPerspectiveCamera(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000, position = new THREE.Vector3(0, 0, 5)) {
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.copy(position);
    return camera;
}

/**
 * Initialize an Orthographic Camera
 * @param {number} left - Left boundary of the view frustum
 * @param {number} right - Right boundary of the view frustum
 * @param {number} top - Top boundary of the view frustum
 * @param {number} bottom - Bottom boundary of the view frustum
 * @param {number} near - Near clipping plane
 * @param {number} far - Far clipping plane
 * @param {THREE.Vector3} position - Initial position of the camera
 * @returns {THREE.OrthographicCamera} - The created orthographic camera
 */
export function initOrthographicCamera(left = -5, right = 5, top = 5, bottom = -5, near = 0.1, far = 1000, position = new THREE.Vector3(0, 0, 5)) {
    const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    camera.position.copy(position);
    return camera;
}

/**
 * Initialize a Camera Rig with multiple cameras
 * @param {THREE.PerspectiveCamera} perspectiveCamera - The perspective camera to include in the rig
 * @param {THREE.OrthographicCamera} orthographicCamera - The orthographic camera to include in the rig
 * @returns {Object} - An object containing both cameras and methods to switch between them
 */
export function initCameraRig(perspectiveCamera, orthographicCamera) {
    let currentCamera = perspectiveCamera;

    const switchToPerspective = () => {
        currentCamera = perspectiveCamera;
    };

    const switchToOrthographic = () => {
        currentCamera = orthographicCamera;
    };

    return {
        perspectiveCamera,
        orthographicCamera,
        getCurrentCamera: () => currentCamera,
        switchToPerspective,
        switchToOrthographic
    };
}

/**
 * Handle Window Resize to adjust camera aspect ratio
 * @param {THREE.Camera} camera - The camera to adjust
 * @param {THREE.WebGLRenderer} renderer - The renderer to adjust
 */
export function onWindowResize(camera, renderer) {
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
 * Smoothly transition between two camera positions and orientations
 * @param {THREE.Camera} camera - The camera to animate
 * @param {THREE.Vector3} targetPosition - The target position to move to
 * @param {THREE.Vector3} targetLookAt - The target point to look at
 * @param {number} duration - The duration of the transition in milliseconds
 */
export function transitionCamera(camera, targetPosition, targetLookAt, duration = 2000) {
    const startPosition = camera.position.clone();
    const startLookAt = camera.getWorldDirection(new THREE.Vector3()).clone();

    const positionTween = new TWEEN.Tween(startPosition)
        .to(targetPosition, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.copy(startPosition);
        });

    const lookAtTween = new TWEEN.Tween(startLookAt)
        .to(targetLookAt, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.lookAt(startLookAt);
        });

    positionTween.start();
    lookAtTween.start();
}

/**
 * Lock Camera to an object, making the camera follow the object's position and rotation
 * @param {THREE.Camera} camera - The camera to lock
 * @param {THREE.Object3D} object - The object to follow
 */
export function lockCameraToObject(camera, object) {
    const updateCamera = () => {
        camera.position.copy(object.position);
        camera.quaternion.copy(object.quaternion);
    };

    const renderLoop = () => {
        updateCamera();
        requestAnimationFrame(renderLoop);
    };

    renderLoop();
}