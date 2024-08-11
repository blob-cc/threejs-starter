import GUI from 'lil-gui';

export function initGUI(params) {
    const gui = new GUI();

    gui.add(params, 'rotationSpeed', 0, 0.1);
    gui.addColor(params, 'color');
    gui.add(params, 'wireframe');
}