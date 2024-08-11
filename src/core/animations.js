import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

/**
 * Basic Rotation Animation
 * Rotates an object around its axes at a specified speed.
 * @param {THREE.Object3D} object - The object to rotate
 * @param {number} speedX - Rotation speed around the X axis
 * @param {number} speedY - Rotation speed around the Y axis
 * @param {number} speedZ - Rotation speed around the Z axis
 */
export function rotateObject(object, speedX = 0.01, speedY = 0.01, speedZ = 0.01) {
    object.rotation.x += speedX;
    object.rotation.y += speedY;
    object.rotation.z += speedZ;
}

/**
 * Basic Scaling Animation
 * Scales an object back and forth between minScale and maxScale.
 * @param {THREE.Object3D} object - The object to scale
 * @param {number} minScale - The minimum scale factor
 * @param {number} maxScale - The maximum scale factor
 * @param {number} speed - The speed of the scaling animation
 * @param {number} time - The current time in milliseconds
 */
export function scaleObject(object, minScale = 0.5, maxScale = 1.5, speed = 0.002, time = 0) {
    const scale = minScale + (maxScale - minScale) * 0.5 * (1 + Math.sin(speed * time));
    object.scale.set(scale, scale, scale);
}

/**
 * Position Oscillation Animation
 * Moves an object back and forth along an axis.
 * @param {THREE.Object3D} object - The object to move
 * @param {string} axis - The axis to oscillate on ('x', 'y', or 'z')
 * @param {number} amplitude - The maximum distance to move from the origin
 * @param {number} speed - The speed of the oscillation
 * @param {number} time - The current time in milliseconds
 */
export function oscillateObject(object, axis = 'y', amplitude = 1, speed = 0.001, time = 0) {
    const offset = amplitude * Math.sin(speed * time);
    object.position[axis] = offset;
}

/**
 * Keyframe Animation using TWEEN.js
 * Animates an object between multiple keyframes using tweening.
 * @param {THREE.Object3D} object - The object to animate
 * @param {Array<Object>} keyframes - Array of keyframe objects with position, rotation, or scale properties
 * @param {number} duration - Duration of the animation
 * @param {function} onComplete - Callback function to execute when animation completes
 */
export function animateObjectWithKeyframes(object, keyframes, duration = 2000, onComplete = null) {
    let tweenChain = null;
    
    keyframes.forEach((keyframe, index) => {
        const tween = new TWEEN.Tween(object)
            .to(keyframe, duration / keyframes.length)
            .easing(TWEEN.Easing.Quadratic.InOut);

        if (index === 0) {
            tweenChain = tween;
        } else {
            tweenChain.chain(tween);
        }

        if (index === keyframes.length - 1 && onComplete) {
            tween.onComplete(onComplete);
        }
    });

    tweenChain.start();
}

/**
 * Circular Path Animation
 * Moves an object along a circular path.
 * @param {THREE.Object3D} object - The object to move
 * @param {number} radius - The radius of the circle
 * @param {number} speed - The speed of the movement
 * @param {number} time - The current time in milliseconds
 */
export function animateObjectInCircle(object, radius = 5, speed = 0.001, time = 0) {
    object.position.x = radius * Math.cos(speed * time);
    object.position.z = radius * Math.sin(speed * time);
}

/**
 * Simple Follow Path Animation
 * Moves an object along a predefined path of points.
 * @param {THREE.Object3D} object - The object to move
 * @param {Array<THREE.Vector3>} path - Array of points defining the path
 * @param {number} duration - Duration of the animation along the entire path
 */
export function followPath(object, path, duration = 5000) {
    let currentIndex = 0;

    function animate() {
        if (currentIndex < path.length - 1) {
            const nextIndex = currentIndex + 1;
            const tween = new TWEEN.Tween(object.position)
                .to({ x: path[nextIndex].x, y: path[nextIndex].y, z: path[nextIndex].z }, duration / path.length)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(() => {
                    currentIndex = nextIndex;
                    animate();
                })
                .start();
        }
    }

    animate();
}

/**
 * Pulse Animation
 * Pulses the material color of an object between two colors.
 * @param {THREE.Material} material - The material of the object
 * @param {THREE.Color} color1 - The first color
 * @param {THREE.Color} color2 - The second color
 * @param {number} speed - The speed of the color change
 * @param {number} time - The current time in milliseconds
 */
export function pulseColor(material, color1, color2, speed = 0.002, time = 0) {
    const color = new THREE.Color().lerpColors(color1, color2, 0.5 + 0.5 * Math.sin(speed * time));
    material.color.set(color);
}

/**
 * Animate Material Uniforms
 * Animates custom uniforms in a shader material.
 * @param {THREE.ShaderMaterial} material - The shader material
 * @param {Object} uniforms - Object containing the uniforms to animate
 * @param {number} speed - Speed of the animation
 * @param {number} time - The current time in milliseconds
 */
export function animateMaterialUniforms(material, uniforms, speed = 0.001, time = 0) {
    for (const uniform in uniforms) {
        if (material.uniforms[uniform]) {
            material.uniforms[uniform].value = uniforms[uniform](speed, time);
        }
    }
}

/**
 * Animate Camera LookAt
 * Animates the camera to smoothly look at a target.
 * @param {THREE.Camera} camera - The camera to animate
 * @param {THREE.Vector3} target - The target position to look at
 * @param {number} duration - Duration of the animation
 */
export function animateCameraLookAt(camera, target, duration = 2000) {
    const initialTarget = camera.getWorldDirection(new THREE.Vector3()).clone();
    const finalTarget = new THREE.Vector3().copy(target);

    const tween = new TWEEN.Tween(initialTarget)
        .to(finalTarget, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.lookAt(initialTarget);
        })
        .start();
}

/**
 * Animation loop handler
 * Handles all animations, including time updates for custom animations.
 * @param {function} customAnimations - A callback function that contains all custom animations to run each frame
 */
export function animate(customAnimations = null) {
    function loop(time) {
        if (customAnimations) {
            customAnimations(time);
        }
        TWEEN.update();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}