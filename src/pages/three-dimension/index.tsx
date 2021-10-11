import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Mesh,
  ArcRotateCamera,
  FollowCamera,
  UniversalCamera,
  Viewport,
  DeviceSourceManager,
  DeviceType,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
// import SceneComponent from "./SceneComponent"; // uses above component in same directory
import SceneComponent from "babylonjs-hook"; // if you install 'babylonjs-hook' NPM.
import "./app.css";
import { useSelector } from "react-redux";
import { selectYard } from "features/yard/yardSlice";
import { StockSaddle, Yard } from "boot/model";
import { CameraAlt, Height } from "@material-ui/icons";
import { AdvancedDynamicTexture, Control, TextBlock } from "@babylonjs/gui";
import { CreateCrane } from "./components/crane";

let focusBox: Mesh;
let box: Mesh;
var angular = Math.PI / 180;
let yard3d: Yard | any;
let ground: Mesh;
let camera: any;
const onSceneReady = (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  let cameraType = 3;

  camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(0, 0, 0),
    scene
  );
  const canvas = scene.getEngine().getRenderingCanvas();

  if (cameraType === 1) {
    camera = new FollowCamera("FollowCam", new Vector3(0, 10, -10), scene);
    camera.radius = 30;

    // The goal height of camera above local origin (centre) of target
    camera.heightOffset = 10;

    // The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = 0;

    //Acceleration of camera in moving from current to goal position
    camera.cameraAcceleration = 0.005;

    //The speed at which acceleration is halted
    camera.maxCameraSpeed = 10;

    //camera.target is set after the target's creation

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  } else if (cameraType == 2) {
    camera = new UniversalCamera("MyCamera", new Vector3(0, 1, 0), scene);
    camera.minZ = 0.0001;
    camera.attachControl(canvas, true);
    camera.speed = 0.02;
    camera.angularSpeed = 0.05;
    camera.angle = Math.PI / 2;
    camera.direction = new Vector3(
      Math.cos(camera.angle),
      0,
      Math.sin(camera.angle)
    );
    camera.viewport = new Viewport(0, 0.5, 1.0, 0.5);
    if (camera && scene.activeCameras) {
      scene.activeCameras.push(camera);
    }
  }
  camera.attachControl(canvas, true);

  // This targets the camera to scene origin
  // camera.setTarget(Vector3.Zero());

  // This attaches the camera to the canvas

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.5;

  // Our built-in 'box' shape.

  focusBox = MeshBuilder.CreateBox("box", {});

  // console.log(id,bay)
  if (yard3d.bays instanceof Map) {
    ground = MeshBuilder.CreateGround("LY", {
      width: yard3d.bays.get("LY").dimension.width / 1000,
      height: yard3d.bays.get("LY").dimension.height / 1000,
    });
    ground.position.z = yard3d.bays.get("LY").dimension.height / 1000 / 2;
    ground.position.x = yard3d.bays.get("ZY").dimension.width / 1000 / 2;
    ground = MeshBuilder.CreateGround("ZY", {
      width: yard3d.bays.get("ZY").dimension.width / 1000,
      height: yard3d.bays.get("ZY").dimension.height / 1000,
    });
    ground.position.z =
      yard3d.bays.get("LY").dimension.height / 1000 +
      yard3d.bays.get("ZY").dimension.height / 1000 / 2;
    ground.position.x = yard3d.bays.get("ZY").dimension.width / 1000 / 2;
    ground = MeshBuilder.CreateGround("PY", {
      width: yard3d.bays.get("PY").dimension.width / 1000,
      height: yard3d.bays.get("PY").dimension.height / 1000,
    });
    ground.position.z =
      yard3d.bays.get("ZY").dimension.height / 1000 +
      yard3d.bays.get("LY").dimension.height / 1000 +
      yard3d.bays.get("PY").dimension.height / 1000 / 2;
    ground.position.x = yard3d.bays.get("PY").dimension.width / 1000 / 2;
    if (yard3d.bays.get("LY").stockSaddles instanceof Array) {
      yard3d.bays.get("LY").stockSaddles.forEach((stockSaddle: StockSaddle) => {
        box = MeshBuilder.CreateBox(stockSaddle.id, {});
        box.position.z = stockSaddle.top / 1000;
        box.position.x = stockSaddle.left / 1000;
        box.position.y = stockSaddle.height / 2000;
      });
    }
    if (yard3d.bays.get("PY").stockSaddles instanceof Array) {
      yard3d.bays.get("PY").stockSaddles.forEach((stockSaddle: StockSaddle) => {
        box = MeshBuilder.CreateBox(stockSaddle.id, {});
        box.position.z =
          stockSaddle.top / 1000 +
          yard3d.bays.get("LY").dimension.height / 1000;
        box.position.x = stockSaddle.left / 1000;
        box.position.y = stockSaddle.height / 2000;
      });
    }
    if (yard3d.bays.get("ZY").stockSaddles instanceof Array) {
      yard3d.bays.get("ZY").stockSaddles.forEach((stockSaddle: StockSaddle) => {
        box = MeshBuilder.CreateBox(stockSaddle.id, {});
        box.position.z =
          stockSaddle.top / 1000 +
          yard3d.bays.get("LY").dimension.height / 1000 +
          yard3d.bays.get("ZY").dimension.height / 1000;
        box.position.x = stockSaddle.left / 1000;
        box.position.y = stockSaddle.height / 2000;
      });
    }
  }

  const referenceBox = MeshBuilder.CreateBox("referenceBox", {});
  const referenceBoxMat = new StandardMaterial("referenceBoxMat", scene);
  referenceBoxMat.emissiveColor = new Color3(1, 0, 0);
  referenceBox.material = referenceBoxMat;
  const dsm = new DeviceSourceManager(scene.getEngine());

  // Move the box upward 1/2 its height
  // box.position.y = 1;

  // Our built-in 'ground' shape.
  // setInterval(angular)
  const contextPlate = createTextPlate(
    `X : ${camera.position.x} \n Y : ${camera.position.y} \n Z : ${camera.position.z}`
  );

  scene.registerBeforeRender(() => {
    // skybox.rotate(ship.rotationQuaternion, moveSpeed);
    if (dsm.getDeviceSource(DeviceType.Keyboard)?.getInput(87) == 1) {
      camera.setTarget(focusBox.position);
      // let angular = getAngular(camera, focusBox)
      getPosition(1, camera, focusBox);
      referenceBox.position = camera.position;
    } else if (dsm.getDeviceSource(DeviceType.Keyboard)?.getInput(83) == 1) {
      camera.setTarget(focusBox.position);
      // let angular = getAngular(camera, focusBox)
      getPosition(1, camera, focusBox);
    }
    contextPlate.text = `X : ${camera.position.x} \n Y : ${camera.position.y} \n Z : ${camera.position.z}`;
  });

  let craneConfig = yard3d.bays.get("ZY").cranes[0];
  let crane = CreateCrane(scene, {
    height: 1,
    width: craneConfig.width / 1000,
    depth: craneConfig.height / 1000,
  });
  crane.position.y = 8;
  crane.position.z = yard3d.bays.get("ZY").dimension.height / 1000 / 2;
};

const getPosition = (step: number, camera: ArcRotateCamera, focusBox: Mesh) => {
  let x = focusBox.position.x - camera.position.x;
  let y = focusBox.position.z - camera.position.z;
  let length = Math.sqrt(x * x + y * y);
  // if (focusBox.position.x > 0) {
  console.log(Math.PI);
  console.log(angular);

  focusBox.position.x += (step * x) / length;
  // }
  // if (focusBox.position.x < 250) {
  focusBox.position.z += (step * y) / length;

  if (focusBox.position.x > 270) {
    focusBox.position.x = 270;
  }
  if (focusBox.position.x < -2) {
    focusBox.position.x = -2;
  }
  if (focusBox.position.z < -2) {
    focusBox.position.z = -2;
  }
  if (focusBox.position.z > 100) {
    focusBox.position.z = 100;
  }
  // }
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  if (box !== undefined) {
    // var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    // console.log(deltaTimeInMillis)
    // angular += 0.1
    // if (angular > 360) {
    //     angular = Math.PI / 180;
    // }
    // box.position.x = Math.sin(angular) * 4
    // box.position.y = Math.cos(angular) * 4
    // const rpm = 10;
    // box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    // console.log(camera.position);
  }
  if (camera.position.y < 0) {
    camera.position.y = 0;
  }
};

const createTextPlate = (text: string) => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
  const controlsText = new TextBlock();
  controlsText.text = text;
  controlsText.color = "white";
  controlsText.fontStyle = "bold";
  controlsText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  controlsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  controlsText.fontSize = 24;
  advancedTexture.addControl(controlsText);
  return controlsText;
};

const Index = () => {
  yard3d = useSelector(selectYard);
  console.log(yard3d);

  return (
    <div>
      {yard3d.bays.size > 0 ? (
        <SceneComponent
          antialias
          onSceneReady={onSceneReady}
          onRender={onRender}
          id="my-canvas"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Index;
