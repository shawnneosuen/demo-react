import * as React from 'react'
import {FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, ArcRotateCamera} from "@babylonjs/core";
// import SceneComponent from "./SceneComponent"; // uses above component in same directory
import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./app.css";


let box: Mesh;
var angular = Math.PI / 180;
const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);


    // This targets the camera to scene origin
    // camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'box' shape.

    box = MeshBuilder.CreateBox("box", {});
    // Move the box upward 1/2 its height
    // box.position.y = 1;

    // Our built-in 'ground' shape.
    // setInterval(angular)
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
    if (box !== undefined) {
        // var deltaTimeInMillis = scene.getEngine().getDeltaTime();


        // console.log(deltaTimeInMillis)
        angular += 0.1
        console.log(angular)
        if (angular > 360) {
            angular = Math.PI / 180;
        }
        box.position.x = Math.sin(angular) * 4
        box.position.y = Math.cos(angular) * 4

        // const rpm = 10;
        // box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
};

const Index = () => {
    return <div>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas"/>
    </div>
}

export default Index