import GUI from 'lil-gui'; // Alternatively, you can use `dat.GUI` by importing `import * as dat from 'dat.gui';`

/**
 * Initialize the GUI
 * Creates a new GUI instance for controlling scene elements.
 * @returns {GUI} - The created GUI instance
 */
export function initGUI() {
    const gui = new GUI();
    return gui;
}

/**
 * Add Position Controls to the GUI
 * Allows the user to adjust the position of a Three.js object.
 * @param {GUI} gui - The GUI instance to add the controls to
 * @param {THREE.Object3D} object - The object whose position will be controlled
 * @param {string} folderName - The name of the folder to group the controls
 * @returns {GUI} - The folder containing the position controls
 */
export function addPositionControls(gui, object, folderName = 'Position') {
    const folder = gui.addFolder(folderName);
    folder.add(object.position, 'x', -10, 10).step(0.1).name('X Position');
    folder.add(object.position, 'y', -10, 10).step(0.1).name('Y Position');
    folder.add(object.position, 'z', -10, 10).step(0.1).name('Z Position');
    folder.open();
    return folder;
}

/**
 * Add Rotation Controls to the GUI
 * Allows the user to adjust the rotation of a Three.js object.
 * @param {GUI} gui - The GUI instance to add the controls to
 * @param {THREE.Object3D} object - The object whose rotation will be controlled
 * @param {string} folderName - The name of the folder to group the controls
 * @returns {GUI} - The folder containing the rotation controls
 */
export function addRotationControls(gui, object, folderName = 'Rotation') {
    const folder = gui.addFolder(folderName);
    folder.add(object.rotation, 'x', 0, Math.PI * 2).step(0.01).name('X Rotation');
    folder.add(object.rotation, 'y', 0, Math.PI * 2).step(0.01).name('Y Rotation');
    folder.add(object.rotation, 'z', 0, Math.PI * 2).step(0.01).name('Z Rotation');
    folder.open();
    return folder;
}

/**
 * Add Scale Controls to the GUI
 * Allows the user to adjust the scale of a Three.js object.
 * @param {GUI} gui - The GUI instance to add the controls to
 * @param {THREE.Object3D} object - The object whose scale will be controlled
 * @param {string} folderName - The name of the folder to group the controls
 * @returns {GUI} - The folder containing the scale controls
 */
export function addScaleControls(gui, object, folderName = 'Scale') {
    const folder = gui.addFolder(folderName);
    folder.add(object.scale, 'x', 0.1, 10).step(0.1).name('X Scale');
    folder.add(object.scale, 'y', 0.1, 10).step(0.1).name('Y Scale');
    folder.add(object.scale, 'z', 0.1, 10).step(0.1).name('Z Scale');
    folder.open();
    return folder;
}

/**
 * Add Color Controls to the GUI
 * Allows the user to adjust the color of a Three.js material.
 * @param {GUI} gui - The GUI instance to add the controls to
 * @param {THREE.Material} material - The material whose color will be controlled
 * @param {string} folderName - The name of the folder to group the controls
 * @returns {GUI} - The folder containing the color controls
 */
export function addColorControls(gui, material, folderName = 'Color') {
    const folder = gui.addFolder(folderName);
    folder.addColor({ color: material.color.getHex() }, 'color').onChange((value) => {
        material.color.set(value);
    }).name('Material Color');
    folder.open();
    return folder;
}

/**
 * Add Light Controls to the GUI
 * Allows the user to adjust the properties of a Three.js light.
 * @param {GUI} gui - The GUI instance to add the controls to
 * @param {THREE.Light} light - The light whose properties will be controlled
 * @param {string} folderName - The name of the folder to group the controls
 * @returns {GUI} - The folder containing the light controls
 */
export function addLightControls(gui, light, folderName = 'Light') {
    const folder = gui.addFolder(folderName);
    folder.addColor({ color: light.color.getHex() }, 'color').onChange((value) => {
        light.color.set(value);
    }).name('Light Color');
    folder.add(light, 'intensity', 0, 10).step(0.1).name('Intensity');
    if (light.position) {
        addPositionControls(folder, light, 'Position');
    }
    folder.open();
    return folder;
}

/**
 * Add Custom Controls to the GUI
 * Allows the user to add custom controls for any property.
 * @param {GUI} gui - The GUI instance to add the controls to
 * @param {Object} target - The object containing the properties to control
 * @param {string} property - The property name to control
 * @param {string} folderName - The name of the folder to group the controls
 * @param {Array} range - Optional range for the control [min, max]
 * @param {number} step - Optional step value for the control
 * @returns {GUI} - The folder containing the custom controls
 */
export function addCustomControls(gui, target, property, folderName = 'Custom Controls', range = [0, 1], step = 0.01) {
    const folder = gui.addFolder(folderName);
    folder.add(target, property, range[0], range[1]).step(step).name(property);
    folder.open();
    return folder;
}