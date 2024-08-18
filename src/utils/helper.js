import * as THREE from 'three';

/**
 * Convert Screen Coordinates to World Coordinates
 * Converts 2D screen coordinates to 3D world coordinates.
 * @param {THREE.Vector2} screenCoords - The screen coordinates (range: -1 to 1)
 * @param {THREE.Camera} camera - The camera used in the scene
 * @param {number} zDepth - The z-depth value for the world coordinates
 * @returns {THREE.Vector3} - The calculated world coordinates
 */
export function screenToWorld(screenCoords, camera, zDepth = 0) {
    const vector = new THREE.Vector3(screenCoords.x, screenCoords.y, 0.5); // 0.5 is default depth (center of near and far planes)
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = (zDepth - camera.position.z) / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(distance));
}

/**
 * Convert World Coordinates to Screen Coordinates
 * Converts 3D world coordinates to 2D screen coordinates.
 * @param {THREE.Vector3} worldCoords - The world coordinates
 * @param {THREE.Camera} camera - The camera used in the scene
 * @param {THREE.WebGLRenderer} renderer - The renderer to get the screen size
 * @returns {THREE.Vector2} - The calculated screen coordinates
 */
export function worldToScreen(worldCoords, camera, renderer) {
    const vector = worldCoords.clone().project(camera);
    const halfWidth = renderer.domElement.clientWidth / 2;
    const halfHeight = renderer.domElement.clientHeight / 2;
    return new THREE.Vector2(
        (vector.x * halfWidth) + halfWidth,
        -(vector.y * halfHeight) + halfHeight
    );
}

/**
 * Generate a Random Color
 * Generates a random hexadecimal color value.
 * @returns {number} - The generated color in hexadecimal format
 */
export function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}

/**
 * Generate a Random Position within a Given Range
 * Generates a random position vector within a specified range.
 * @param {number} range - The range for the random position (default: 10)
 * @returns {THREE.Vector3} - The generated random position
 */
export function getRandomPosition(range = 10) {
    return new THREE.Vector3(
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range
    );
}

/**
 * Calculate the Distance Between Two 3D Points
 * Calculates the Euclidean distance between two 3D vectors.
 * @param {THREE.Vector3} point1 - The first point
 * @param {THREE.Vector3} point2 - The second point
 * @returns {number} - The calculated distance
 */
export function getDistanceBetweenPoints(point1, point2) {
    return point1.distanceTo(point2);
}

/**
 * Calculate the Angle Between Two 3D Vectors
 * Calculates the angle in radians between two vectors.
 * @param {THREE.Vector3} vector1 - The first vector
 * @param {THREE.Vector3} vector2 - The second vector
 * @returns {number} - The calculated angle in radians
 */
export function getAngleBetweenVectors(vector1, vector2) {
    return vector1.angleTo(vector2);
}

/**
 * Normalize a Vector
 * Returns a normalized version of a 3D vector.
 * @param {THREE.Vector3} vector - The vector to normalize
 * @returns {THREE.Vector3} - The normalized vector
 */
export function normalizeVector(vector) {
    return vector.clone().normalize();
}

/**
 * Linearly Interpolate Between Two Values
 * Returns the linear interpolation between two values.
 * @param {number} start - The starting value
 * @param {number} end - The ending value
 * @param {number} alpha - The interpolation factor (range: 0 to 1)
 * @returns {number} - The interpolated value
 */
export function lerp(start, end, alpha) {
    return THREE.MathUtils.lerp(start, end, alpha);
}

/**
 * Map a Value from One Range to Another
 * Maps a value from one range to another.
 * @param {number} value - The value to map
 * @param {number} inMin - The minimum of the input range
 * @param {number} inMax - The maximum of the input range
 * @param {number} outMin - The minimum of the output range
 * @param {number} outMax - The maximum of the output range
 * @returns {number} - The mapped value
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
    return THREE.MathUtils.mapLinear(value, inMin, inMax, outMin, outMax);
}

/**
 * Clamp a Value Between a Minimum and Maximum
 * Clamps a value to be within a specified range.
 * @param {number} value - The value to clamp
 * @param {number} min - The minimum allowed value
 * @param {number} max - The maximum allowed value
 * @returns {number} - The clamped value
 */
export function clamp(value, min, max) {
    return THREE.MathUtils.clamp(value, min, max);
}

/**
 * Create a Random Unit Vector
 * Creates a random unit vector (length 1).
 * @returns {THREE.Vector3} - The generated random unit vector
 */
export function getRandomUnitVector() {
    return new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
    ).normalize();
}

/**
 * Rotate a Vector Around an Axis
 * Rotates a vector around a given axis by a specified angle.
 * @param {THREE.Vector3} vector - The vector to rotate
 * @param {THREE.Vector3} axis - The axis to rotate around
 * @param {number} angle - The angle in radians to rotate by
 * @returns {THREE.Vector3} - The rotated vector
 */
export function rotateVectorAroundAxis(vector, axis, angle) {
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis.normalize(), angle);
    return vector.clone().applyQuaternion(quaternion);
}

/**
 * Check if a Point is Inside a Bounding Box
 * Checks whether a 3D point is inside a bounding box.
 * @param {THREE.Vector3} point - The point to check
 * @param {THREE.Box3} boundingBox - The bounding box to check against
 * @returns {boolean} - True if the point is inside the bounding box, false otherwise
 */
export function isPointInsideBoundingBox(point, boundingBox) {
    return boundingBox.containsPoint(point);
}