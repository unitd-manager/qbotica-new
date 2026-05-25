"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./home-banner-with-rotating-cube.module.css";

export default function ThreeCubeLogo({
  src,
  size = 420,
}) {

  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {

    let mounted = true;

    let renderer;
    let scene;
    let camera;
    let cube;
    let animId;

    let paused = false;

    async function init() {

      try {

        const THREE = await import("three");

        const {
          WebGLRenderer,
          Scene,
          PerspectiveCamera,
          AmbientLight,
          DirectionalLight,
          TextureLoader,
          BoxGeometry,
          MeshPhysicalMaterial,
          Mesh,
          Color,
        } = THREE;

        const canvas = canvasRef.current;

        if (!canvas || !mounted) return;

        renderer = new WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });

        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, 2)
        );

        renderer.setSize(size, size, false);

        scene = new Scene();

        scene.background = null;

        camera = new PerspectiveCamera(
          45,
          size / size,
          0.1,
          1000
        );

        camera.position.z = 6;

        /* LIGHTS */

        const ambient = new AmbientLight(
          0xffffff,
          1.4
        );

        scene.add(ambient);

        const dirLight = new DirectionalLight(
          0xffffff,
          2
        );

        dirLight.position.set(5, 5, 5);

        scene.add(dirLight);

        const orangeLight =
          new DirectionalLight(
            0xff6a00,
            1.5
          );

        orangeLight.position.set(-5, -3, 5);

        scene.add(orangeLight);

        /* TEXTURE */

        const loader = new TextureLoader();

        loader.load(
          src,

          (texture) => {

            if (!mounted) return;

            texture.anisotropy =
              renderer.capabilities.getMaxAnisotropy();

            /* GEOMETRY */

            const geometry =
              new BoxGeometry(
                2.8,
                2.8,
                2.8,
                4,
                4,
                4
              );

            /* MATERIALS */

            const frontMaterial =
              new MeshPhysicalMaterial({
                map: texture,
                roughness: 0.25,
                metalness: 0.2,
                clearcoat: 1,
                clearcoatRoughness: 0.1,
              });

            const sideMaterial =
              new MeshPhysicalMaterial({
                color: new Color("#ff6a00"),
                roughness: 0.2,
                metalness: 0.3,
                clearcoat: 1,
              });

            const topMaterial =
              new MeshPhysicalMaterial({
                color: new Color("#ff8124"),
                roughness: 0.15,
                metalness: 0.25,
                clearcoat: 1,
              });

            /* 6 SIDES */

            const materials = [
              sideMaterial, // right
              sideMaterial, // left
              topMaterial, // top
              sideMaterial, // bottom
              frontMaterial, // front
              sideMaterial, // back
            ];

            cube = new Mesh(
              geometry,
              materials
            );

            cube.rotation.x = -0.4;
            cube.rotation.y = 0.6;

            scene.add(cube);

            animate();
          },

          undefined,

          () => {

            if (mounted)
              setFallback(true);

          }
        );

        function animate() {

          if (!mounted) return;

          animId =
            requestAnimationFrame(animate);

          if (!paused && cube) {

            cube.rotation.y += 0.008;
            cube.rotation.x += 0.0015;

          }

          renderer.render(
            scene,
            camera
          );
        }

        const container =
          canvas.parentElement;

        if (container) {

          container.addEventListener(
            "mouseenter",
            () => (paused = true)
          );

          container.addEventListener(
            "mouseleave",
            () => (paused = false)
          );
        }

      } catch (err) {

        console.warn(
          "Three.js failed.",
          err
        );

        if (mounted)
          setFallback(true);
      }
    }

    init();

    return () => {

      mounted = false;

      if (animId)
        cancelAnimationFrame(animId);

      if (renderer) {

        renderer.dispose();

        renderer.forceContextLoss &&
          renderer.forceContextLoss();
      }
    };

  }, [src, size]);

  if (fallback) {

    return (

      <img
        src={src}
        alt=""
        className={styles.rotatingLogo}
        draggable={false}
      />

    );
  }

  return (

    <div
      className={styles.cubeWrapper}
      style={{
        width: size,
        height: size,
      }}
    >

      {/* GLOW */}
      <div className={styles.glow} />

      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className={styles.canvas}
      />

    </div>

  );
}