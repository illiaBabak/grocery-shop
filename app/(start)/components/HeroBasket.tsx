'use client';

import { useEffect, useRef, useState } from 'react';
import '@babylonjs/loaders';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Animation,
  AbstractMesh,
  Vector3,
  ImportMeshAsync,
  CubicEase,
  TransformNode,
  EasingFunction,
  Color4,
  Color3,
  DirectionalLight,
  PointLight,
  CubeTexture,
} from '@babylonjs/core';

type Imported = { root: AbstractMesh; mesh: AbstractMesh };

const TARGET_SIZE = 2;

const importModuleToScene = async (module: string, scene: Scene): Promise<Imported | null> => {
  const res = await ImportMeshAsync(module, scene, {
    pluginExtension: '.glb',
  });

  const mesh = res.meshes.find((mesh) => mesh.getTotalVertices() > 0);

  if (!mesh) return null;

  mesh.computeWorldMatrix(true);

  const { min, max } = mesh.getHierarchyBoundingVectors(true);
  const size = max.subtract(min);

  const maxDim = Math.max(size.x, size.y, size.z);

  const root = res.meshes[0];

  if (maxDim <= 1e-6) return { root, mesh };

  const scale = TARGET_SIZE / maxDim;

  root.scaling = new Vector3(scale, scale, scale);
  root.computeWorldMatrix(true);

  return { root, mesh };
};

const changePosition = (mesh: AbstractMesh, position: Vector3) => {
  mesh.position.copyFrom(position);
  mesh.computeWorldMatrix(true);
};

const changeScale = (mesh: AbstractMesh, scale: number) => {
  mesh.scaling.y = scale;
  mesh.scaling.x = scale;
  mesh.scaling.z = scale;
  mesh.computeWorldMatrix(true);
};

const playRotationAnim = (scene: Scene, mesh: AbstractMesh) => {
  const fps = 60;
  const totalFrames = 90;

  const rotAnim = new Animation(
    'basketRotY',
    'rotation.y',
    fps,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  rotAnim.setKeys([
    { frame: 0, value: -0.6 },
    { frame: Math.floor(totalFrames * 0.6), value: 0.15 },
    { frame: Math.floor(totalFrames * 0.8), value: -0.05 },
    { frame: totalFrames, value: 0 },
  ]);

  scene.beginDirectAnimation(mesh, [rotAnim], 0, totalFrames, false);
};

export default function HeroBasket() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene>(null);
  const engine = useRef<Engine>(null);
  const camera = useRef<ArcRotateCamera>(null);
  const light = useRef<HemisphericLight>(null);
  const basketMeshRef = useRef<Imported | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Initialize Babylon.js
  useEffect(() => {
    const canvasElement = canvas.current;

    if (!canvasElement || engine.current) return;

    engine.current = new Engine(canvasElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      alpha: true,
    });
    scene.current = new Scene(engine.current);
    scene.current.clearColor = new Color4(0, 0, 0, 0);

    engine.current.runRenderLoop(() => {
      scene.current?.render();
    });

    camera.current = new ArcRotateCamera(
      'camera',
      -Math.PI / 7,
      Math.PI / 3,
      4.7,
      new Vector3(0, 2.2, -0.1),
      scene.current
    );

    camera.current.lowerBetaLimit = camera.current.beta;
    camera.current.upperBetaLimit = camera.current.beta;
    camera.current.attachControl(canvasElement, true);

    light.current = new HemisphericLight('hemiLight', new Vector3(-0.6, 1, 0.3), scene.current);
    light.current.intensity = 1.2;
    light.current.diffuse = new Color3(1.0, 0.96, 0.9);
    light.current.specular = new Color3(1.0, 0.97, 0.92);
    light.current.groundColor = new Color3(0.85, 0.76, 0.66);

    const keyLight = new DirectionalLight(
      'keyLight',
      new Vector3(-0.75, -0.55, 0.3),
      scene.current
    );
    keyLight.intensity = 0.9;
    keyLight.diffuse = new Color3(1.0, 0.94, 0.84);
    keyLight.specular = new Color3(1.0, 0.97, 0.92);

    const frontLight = new DirectionalLight(
      'frontLight',
      new Vector3(-0.5, -0.7, -0.4),
      scene.current
    );
    frontLight.intensity = 0.55;
    frontLight.diffuse = new Color3(1.0, 0.92, 0.82);
    frontLight.specular = new Color3(1.0, 0.96, 0.9);

    const fillLight = new PointLight('fillLight', new Vector3(-2, 6, 1), scene.current);
    fillLight.intensity = 0.4;
    fillLight.diffuse = new Color3(1.0, 0.9, 0.78);

    const rimLight = new DirectionalLight('rimLight', new Vector3(0.7, -0.4, -0.6), scene.current);
    rimLight.intensity = 0.9;
    rimLight.diffuse = new Color3(1.0, 0.88, 0.72);

    scene.current.environmentTexture = CubeTexture.CreateFromPrefilteredData(
      'https://assets.babylonjs.com/environments/environmentSpecular.env',
      scene.current
    );
    scene.current.environmentIntensity = 0.6;

    scene.current.imageProcessingConfiguration.contrast = 1;
    scene.current.imageProcessingConfiguration.exposure = 1.15;
    scene.current.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.current.imageProcessingConfiguration.toneMappingType = 1;

    return () => {
      engine.current?.dispose();
      engine.current = null;
      camera.current = null;
    };
  }, [canvas]);

  // Load the module and set up the scene
  useEffect(() => {
    const sceneElement = scene.current;

    if (!sceneElement) return;

    const loadModule = async () => {
      const worldRoot = new TransformNode('worldRoot', sceneElement);

      worldRoot.scaling = new Vector3(-1, 1, 1);

      worldRoot.computeWorldMatrix(true);

      const basketMesh = await importModuleToScene('/models/basket.glb', sceneElement);

      if (!basketMesh) return;

      basketMeshRef.current = basketMesh;

      changeScale(basketMesh.root, 3.3);

      changePosition(basketMesh.root, new Vector3(0, 2.62, 0));
      basketMesh.root.rotation.y = -0.6;

      basketMesh.root.parent = worldRoot;

      setLoaded(true);
      playRotationAnim(sceneElement, basketMesh.root);
    };

    loadModule();
  }, [scene]);

  return (
    <canvas
      ref={canvas}
      className={`w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.33,1,0.68,1)] ${
        loaded ? 'translate-x-0' : 'translate-x-[120%]'
      }`}
    />
  );
}
