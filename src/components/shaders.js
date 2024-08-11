import * as THREE from 'three';

/**
 * Basic Color Shader
 * A simple shader that outputs a solid color.
 */
export const BasicColorShader = {
    uniforms: {
        color: { value: new THREE.Color(0xff0000) }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

/**
 * Time-Based Color Shift Shader
 * A shader that changes color over time based on a sine wave.
 */
export const TimeColorShader = {
    uniforms: {
        time: { value: 0.0 }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;

        void main() {
            vec3 color = vec3(0.5 + 0.5 * sin(time), 0.5 + 0.5 * sin(time + 2.0), 0.5 + 0.5 * sin(time + 4.0));
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

/**
 * Wave Distortion Shader
 * A shader that distorts geometry with a sine wave.
 */
export const WaveDistortionShader = {
    uniforms: {
        time: { value: 0.0 },
        amplitude: { value: 0.1 },
        frequency: { value: 10.0 }
    },
    vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;

        void main() {
            vec3 pos = position;
            pos.z += sin(pos.x * frequency + time) * amplitude;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `
};

/**
 * Procedural Marble Shader
 * A shader that generates a marble-like pattern procedurally.
 */
export const MarbleShader = {
    uniforms: {
        time: { value: 0.0 },
        scale: { value: 5.0 }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform float scale;

        float noise(vec3 p) {
            return sin(p.x + p.y + p.z);
        }

        void main() {
            vec3 pos = gl_FragCoord.xyz / scale;
            float n = noise(pos + vec3(0.0, 0.0, time));
            vec3 color = vec3(1.0) * 0.5 + 0.5 * sin(vec3(10.0) * pos + n * 10.0);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

/**
 * Custom Gradient Shader
 * A shader that creates a smooth gradient between two colors.
 */
export const GradientShader = {
    uniforms: {
        color1: { value: new THREE.Color(0xff0000) },
        color2: { value: new THREE.Color(0x0000ff) }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;

        void main() {
            float mixValue = gl_FragCoord.y / 600.0; // Adjust based on resolution
            vec3 color = mix(color1, color2, mixValue);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

/**
 * Checkerboard Pattern Shader
 * A shader that creates a checkerboard pattern.
 */
export const CheckerboardShader = {
    uniforms: {
        color1: { value: new THREE.Color(0xffffff) },
        color2: { value: new THREE.Color(0x000000) },
        scale: { value: 10.0 }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float scale;

        void main() {
            vec2 coords = gl_FragCoord.xy / scale;
            float pattern = mod(floor(coords.x) + floor(coords.y), 2.0);
            vec3 color = mix(color1, color2, pattern);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

/**
 * Radial Gradient Shader
 * A shader that creates a radial gradient.
 */
export const RadialGradientShader = {
    uniforms: {
        color1: { value: new THREE.Color(0xffffff) },
        color2: { value: new THREE.Color(0x000000) }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;

        void main() {
            vec2 uv = gl_FragCoord.xy / vec2(600.0, 600.0); // Adjust based on resolution
            float dist = distance(uv, vec2(0.5, 0.5));
            vec3 color = mix(color1, color2, dist);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};