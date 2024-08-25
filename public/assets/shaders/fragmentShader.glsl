// Basic Fragment Shader
varying vec3 vNormal;
void main() {
    gl_FragColor = vec4(abs(vNormal), 1.0);
}