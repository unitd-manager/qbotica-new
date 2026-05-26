"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./home-banner-with-rotating-cube.module.css";

export default function ThreeSphereLogo({
  src,
  size = 560,
}) {

  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {

    let mounted = true;

    let renderer;
    let scene;
    let camera;

    let globe;
    let cube;
    let ring;

    let animId;

    async function init() {

      try {

        const THREE = await import("three");

        const {
          WebGLRenderer,
          Scene,
          PerspectiveCamera,
          AmbientLight,
          DirectionalLight,
          SphereGeometry,
          BoxGeometry,
          TorusGeometry,
          MeshPhysicalMaterial,
          Mesh,
          Group,
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

        camera = new PerspectiveCamera(
          45,
          1,
          0.1,
          1000
        );

        camera.position.z = 8;

        /* LIGHTS */

        const ambient = new AmbientLight(
          0xffffff,
          2
        );

        scene.add(ambient);

        const whiteLight =
          new DirectionalLight(
            0xffffff,
            3
          );

        whiteLight.position.set(5, 5, 5);

        scene.add(whiteLight);

        const orangeLight =
          new DirectionalLight(
            0xff6a00,
            3
          );

        orangeLight.position.set(-5, -3, 5);

        scene.add(orangeLight);

        /* MAIN GROUP */

        const group = new Group();

        scene.add(group);

        /* =======================================
           GLOBE
        ======================================= */

        const globeGeometry =
          new SphereGeometry(
            3.3,
            128,
            128
          );

        const globeMaterial =
          new MeshPhysicalMaterial({

            color: new Color("#4db8ff"),

            transparent: true,
            opacity: 0.12,

            roughness: 0,
            metalness: 0,

            transmission: 1,

            clearcoat: 1,
            clearcoatRoughness: 0,

            thickness: 2,

            reflectivity: 1,

          });

        globe = new Mesh(
          globeGeometry,
          globeMaterial
        );

        group.add(globe);

        /* =======================================
           ORBIT RING
        ======================================= */

        const ringGeometry =
          new TorusGeometry(
            3.6,
            0.03,
            16,
            100
          );

        const ringMaterial =
          new MeshPhysicalMaterial({

            color: new Color("#ff6a00"),

            transparent: true,
            opacity: 0.8,

            emissive: new Color("#ff6a00"),
            emissiveIntensity: 1.5,

          });

        ring = new Mesh(
          ringGeometry,
          ringMaterial
        );

        ring.rotation.x = 1.2;

        group.add(ring);

        /* =======================================
           BIG 3D CUBE
        ======================================= */

        const cubeGeometry =
          new BoxGeometry(
            2.2,
            2.2,
            2.2,
            8,
            8,
            8
          );

        const cubeMaterial =
          new MeshPhysicalMaterial({

            color: new Color("#ff6a00"),

            roughness: 0.15,
            metalness: 0.3,

            clearcoat: 1,

            transmission: 0.05,

            emissive: new Color("#ff6a00"),
            emissiveIntensity: 0.4,

          });

        cube = new Mesh(
          cubeGeometry,
          cubeMaterial
        );

        cube.rotation.x = -0.5;
        cube.rotation.y = 0.6;

        group.add(cube);

        /* =======================================
           ANIMATION
        ======================================= */

        function animate() {

          if (!mounted) return;

          animId =
            requestAnimationFrame(animate);

          /* GLOBE */

          globe.rotation.y += 0.0015;

          /* RING */

          ring.rotation.z += 0.004;

          /* CUBE */

          cube.rotation.y += 0.01;
          cube.rotation.x += 0.003;

          /* FLOAT EFFECT */

          group.position.y =
            Math.sin(Date.now() * 0.0015)
            * 0.12;

          renderer.render(
            scene,
            camera
          );
        }

        animate();

      } catch (err) {

        console.warn(err);

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

      {/* BIG GLOW */}

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