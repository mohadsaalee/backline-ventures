"use client";

import {
  useEffect,
  useRef,
} from "react";

import * as THREE from "three";

import {
  FlowFieldConfig,
  pickConfigForWidth,
} from "./flowField/constants";

import {
  ringVertexShader,
  strandVertexShader,
  lineFragmentShader,

  particleVertexShader,
  particleFragmentShader,

  lightDotVertexShader,
  lightDotFragmentShader,
} from "./flowField/shaders";


interface FlowFieldBackgroundProps {

  config?: Partial<FlowFieldConfig>;

  interactive?: boolean;

  className?: string;
}


export default function FlowFieldBackground({

  config,

  interactive = true,

  className,

}: FlowFieldBackgroundProps) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);


  useEffect(() => {

    const container =
      containerRef.current;

    const canvas =
      canvasRef.current;


    if (
      !container ||
      !canvas
    ) {
      return;
    }


    /*
    |--------------------------------------------------------------------------
    | REDUCED MOTION
    |--------------------------------------------------------------------------
    */

    const reducedMotion =
      window
        .matchMedia(
          "(prefers-reduced-motion: reduce)"
        )
        .matches;


    /*
    |--------------------------------------------------------------------------
    | RESPONSIVE CONFIG
    |--------------------------------------------------------------------------
    */

    const baseConfig =
      pickConfigForWidth(
        container.clientWidth ||
        window.innerWidth
      );


    const cfg =
      {
        ...baseConfig,
        ...config,
      } as FlowFieldConfig;


    /*
    |--------------------------------------------------------------------------
    | WEBGL
    |--------------------------------------------------------------------------
    */

    let renderer:
      THREE.WebGLRenderer;


    try {

      renderer =
        new THREE.WebGLRenderer({

          canvas,

          antialias: true,

          alpha: true,

          powerPreference:
            "high-performance",

        });

    } catch {

      return;

    }


    renderer.setClearColor(
      0x000000,
      0
    );


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        1.75
      )
    );


    /*
    |--------------------------------------------------------------------------
    | SCENE
    |--------------------------------------------------------------------------
    */

    const scene =
      new THREE.Scene();


    /*
    |--------------------------------------------------------------------------
    | CAMERA
    |--------------------------------------------------------------------------
    */

    const camera =
      new THREE.PerspectiveCamera(

        cfg.cameraFov,

        Math.max(
          container.clientWidth,
          1
        ) /
        Math.max(
          container.clientHeight,
          1
        ),

        1,

        2500

      );


    camera.position.set(
      ...cfg.cameraPosition
    );


    const lookAt =
      new THREE.Vector3(
        ...cfg.cameraLookAt
      );


    camera.lookAt(
      lookAt
    );


    /*
    |--------------------------------------------------------------------------
    | TIME
    |--------------------------------------------------------------------------
    */

    const uTime = {
      value: 0,
    };


    /*
    |--------------------------------------------------------------------------
    | MOUSE
    |--------------------------------------------------------------------------
    */

    const uMouse = {
      value:
        new THREE.Vector2(
          0,
          0
        ),
    };


    const mouseTarget =
      new THREE.Vector2(
        0,
        0
      );


    /*
    |--------------------------------------------------------------------------
    | COLOR
    |--------------------------------------------------------------------------
    */

    const color =
      new THREE.Color(
        cfg.color
      );


    const uColor = {
      value:
        new THREE.Vector3(
          color.r,
          color.g,
          color.b
        ),
    };


    /*
    |--------------------------------------------------------------------------
    | SHARED FIELD UNIFORMS
    |--------------------------------------------------------------------------
    */

    const fieldUniforms =
      () => ({

        uTime,

        uNeckRadius: {
          value:
            cfg.neckRadius,
        },

        uTopRadius: {
          value:
            cfg.topRadius,
        },

        uBottomRadius: {
          value:
            cfg.bottomRadius,
        },

        uHeightSpan: {
          value:
            cfg.heightSpan,
        },

        uUpperTwist: {
          value:
            cfg.upperTwist,
        },

        uLowerTwist: {
          value:
            cfg.lowerTwist,
        },

        uLowerVortex: {
          value:
            cfg.lowerVortex,
        },

        uLowerFlatten: {
          value:
            cfg.lowerFlatten,
        },

        uLowerLift: {
          value:
            cfg.lowerLift,
        },

        uNoiseStrength: {
          value:
            cfg.noiseStrength,
        },

        uNoiseScale: {
          value:
            cfg.noiseScale,
        },

        uNoiseSpeed: {
          value:
            cfg.noiseSpeed,
        },

        uFlowSpeed: {
          value:
            cfg.flowSpeed,
        },

        uMouse,

        uInteractionStrength: {
          value:
            interactive
              ? cfg.interactionStrength
              : 0,
        },

      });


    /*
    |--------------------------------------------------------------------------
    | RESOURCE TRACKING
    |--------------------------------------------------------------------------
    */

    const geometries:
      THREE.BufferGeometry[] =
      [];


    const materials:
      THREE.Material[] =
      [];


    /*
    |--------------------------------------------------------------------------
    | MAIN FIELD GROUP
    |--------------------------------------------------------------------------
    */

    const fieldGroup =
      new THREE.Group();


    scene.add(
      fieldGroup
    );


    /*
    |--------------------------------------------------------------------------
    | HORIZONTAL FILAMENT RINGS
    |--------------------------------------------------------------------------
    */

    for (
      let i = 0;
      i < cfg.ringCount;
      i++
    ) {

      const normY =
        (
          i /
          (
            cfg.ringCount - 1
          )
        ) *
        2 -
        1;


      const angles =
        new Float32Array(
          cfg.ringSegments + 1
        );


      const randoms =
        new Float32Array(
          cfg.ringSegments + 1
        );


      const ringYs =
        new Float32Array(
          cfg.ringSegments + 1
        );


      for (
        let s = 0;
        s <= cfg.ringSegments;
        s++
      ) {

        angles[s] =
          (
            s /
            cfg.ringSegments
          ) *
          Math.PI *
          2;


        randoms[s] =
          Math.random();


        ringYs[s] =
          normY;

      }


      const geometry =
        new THREE.BufferGeometry();


      /*
       * Dummy position attribute.
       *
       * Real positions are calculated in GLSL.
       */
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(

          new Float32Array(
            (cfg.ringSegments + 1) * 3
          ),

          3

        )
      );


      geometry.setAttribute(
        "aNormY",
        new THREE.BufferAttribute(
          ringYs,
          1
        )
      );


      geometry.setAttribute(
        "aAngle",
        new THREE.BufferAttribute(
          angles,
          1
        )
      );


      geometry.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(
          randoms,
          1
        )
      );


      const material =
        new THREE.RawShaderMaterial({

          vertexShader:
            ringVertexShader,

          fragmentShader:
            lineFragmentShader,

          transparent: true,

          depthWrite: false,

          depthTest: true,

          blending:
            THREE.NormalBlending,

          uniforms: {

            ...fieldUniforms(),

            uColor,

            uOpacityMin: {
              value:
                cfg.lineOpacityMin,
            },

            uOpacityMax: {
              value:
                cfg.lineOpacityMax,
            },

            uCenterMaskStrength: {
              value:
                cfg.centerMaskStrength,
            },

            uCenterMaskWidth: {
              value:
                cfg.centerMaskWidth,
            },

          },

        });


      const line =
        new THREE.LineLoop(
          geometry,
          material
        );


      line.frustumCulled =
        false;


      fieldGroup.add(
        line
      );


      geometries.push(
        geometry
      );


      materials.push(
        material
      );
    }


    /*
    |--------------------------------------------------------------------------
    | LONG VERTICAL STRANDS
    |--------------------------------------------------------------------------
    */

    for (
      let i = 0;
      i < cfg.strandCount;
      i++
    ) {

      const baseAngle =
        (
          i /
          cfg.strandCount
        ) *
        Math.PI *
        2;


      const normYs =
        new Float32Array(
          cfg.strandSteps + 1
        );


      const randoms =
        new Float32Array(
          cfg.strandSteps + 1
        );


      const angles =
        new Float32Array(
          cfg.strandSteps + 1
        );


      for (
        let s = 0;
        s <= cfg.strandSteps;
        s++
      ) {

        normYs[s] =
          (
            s /
            cfg.strandSteps
          ) *
          2 -
          1;


        angles[s] =
          baseAngle;


        randoms[s] =
          Math.random();

      }


      const geometry =
        new THREE.BufferGeometry();


      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(

          new Float32Array(
            (cfg.strandSteps + 1) * 3
          ),

          3

        )
      );


      geometry.setAttribute(
        "aNormY",
        new THREE.BufferAttribute(
          normYs,
          1
        )
      );


      geometry.setAttribute(
        "aAngle",
        new THREE.BufferAttribute(
          angles,
          1
        )
      );


      geometry.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(
          randoms,
          1
        )
      );


      const material =
        new THREE.RawShaderMaterial({

          vertexShader:
            strandVertexShader,

          fragmentShader:
            lineFragmentShader,

          transparent: true,

          depthWrite: false,

          depthTest: true,

          blending:
            THREE.NormalBlending,

          uniforms: {

            ...fieldUniforms(),

            uColor,

            uOpacityMin: {
              value:
                cfg.lineOpacityMin *
                0.65,
            },

            uOpacityMax: {
              value:
                cfg.lineOpacityMax *
                0.82,
            },

            uCenterMaskStrength: {
              value:
                cfg.centerMaskStrength,
            },

            uCenterMaskWidth: {
              value:
                cfg.centerMaskWidth,
            },

          },

        });


      const line =
        new THREE.Line(
          geometry,
          material
        );


      line.frustumCulled =
        false;


      fieldGroup.add(
        line
      );


      geometries.push(
        geometry
      );


      materials.push(
        material
      );
    }


    /*
    |--------------------------------------------------------------------------
    | NORMAL SMALL PARTICLES
    |--------------------------------------------------------------------------
    */

    const particleCount =
      cfg.particleCount;


    const particleGeometry =
      new THREE.BufferGeometry();


    const particlePositions =
      new Float32Array(
        particleCount * 3
      );


    const particleAngles =
      new Float32Array(
        particleCount
      );


    const particleProgress =
      new Float32Array(
        particleCount
      );


    const particleSpeeds =
      new Float32Array(
        particleCount
      );


    const particleSizes =
      new Float32Array(
        particleCount
      );


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      particleAngles[i] =
        Math.random() *
        Math.PI *
        2;


      particleProgress[i] =
        Math.random();


      particleSpeeds[i] =
        0.55 +
        Math.random() *
        0.80;


      particleSizes[i] =
        0.45 +
        Math.random() *
        1.15;

    }


    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );


    particleGeometry.setAttribute(
      "aBaseAngle",
      new THREE.BufferAttribute(
        particleAngles,
        1
      )
    );


    particleGeometry.setAttribute(
      "aProgress",
      new THREE.BufferAttribute(
        particleProgress,
        1
      )
    );


    particleGeometry.setAttribute(
      "aSpeedFactor",
      new THREE.BufferAttribute(
        particleSpeeds,
        1
      )
    );


    particleGeometry.setAttribute(
      "aSizeFactor",
      new THREE.BufferAttribute(
        particleSizes,
        1
      )
    );


    const particleMaterial =
      new THREE.RawShaderMaterial({

        vertexShader:
          particleVertexShader,

        fragmentShader:
          particleFragmentShader,

        transparent: true,

        depthWrite: false,

        depthTest: true,

        blending:
          THREE.AdditiveBlending,

        uniforms: {

          ...fieldUniforms(),

          uColor,

          uParticleSize: {
            value:
              cfg.particleSize,
          },

          uParticleSpeed: {
            value:
              cfg.particleSpeed,
          },

          uHighlightOpacity: {
            value:
              cfg.highlightOpacity,
          },

        },

      });


    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );


    particles.frustumCulled =
      false;


    scene.add(
      particles
    );


    geometries.push(
      particleGeometry
    );


    materials.push(
      particleMaterial
    );


    /*
    |--------------------------------------------------------------------------
    | TRAVELING LIGHT DOTS
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    |
    | These are POINTS.
    |
    | They are NOT line segments.
    |
    | Each point travels along the same flow field as the
    | surrounding filaments.
    |--------------------------------------------------------------------------
    */

    const lightDotCount =
      cfg.lightDotCount;


    const lightDotGeometry =
      new THREE.BufferGeometry();


    const lightDotPositions =
      new Float32Array(
        lightDotCount * 3
      );


    const lightDotAngles =
      new Float32Array(
        lightDotCount
      );


    const lightDotProgress =
      new Float32Array(
        lightDotCount
      );


    const lightDotSpeeds =
      new Float32Array(
        lightDotCount
      );


    const lightDotSizes =
      new Float32Array(
        lightDotCount
      );


    const lightDotBrightness =
      new Float32Array(
        lightDotCount
      );


    for (
      let i = 0;
      i < lightDotCount;
      i++
    ) {

      /*
       * Random filament angle.
       */
      lightDotAngles[i] =
        Math.random() *
        Math.PI *
        2;


      /*
       * Random position along that filament.
       */
      lightDotProgress[i] =
        Math.random();


      /*
       * Different speeds.
       *
       * This prevents all dots from moving together.
       */
      lightDotSpeeds[i] =
        (
          1 -
          cfg.lightDotSpeedVariation
        )
        +
        Math.random() *
        (
          cfg.lightDotSpeedVariation *
          2
        );


      /*
       * Very small size variation.
       */
      lightDotSizes[i] =
        0.65 +
        Math.random() *
        0.75;


      /*
       * Brightness variation.
       */
      lightDotBrightness[i] =
        (
          1 -
          cfg.lightDotBrightnessVariation
        )
        +
        Math.random() *
        (
          cfg.lightDotBrightnessVariation
        );

    }


    /*
     * Dummy positions.
     *
     * Actual positions are calculated by the shader.
     */
    lightDotGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        lightDotPositions,
        3
      )
    );


    lightDotGeometry.setAttribute(
      "aBaseAngle",
      new THREE.BufferAttribute(
        lightDotAngles,
        1
      )
    );


    lightDotGeometry.setAttribute(
      "aProgress",
      new THREE.BufferAttribute(
        lightDotProgress,
        1
      )
    );


    lightDotGeometry.setAttribute(
      "aSpeedFactor",
      new THREE.BufferAttribute(
        lightDotSpeeds,
        1
      )
    );


    lightDotGeometry.setAttribute(
      "aSizeFactor",
      new THREE.BufferAttribute(
        lightDotSizes,
        1
      )
    );


    lightDotGeometry.setAttribute(
      "aBrightness",
      new THREE.BufferAttribute(
        lightDotBrightness,
        1
      )
    );


    /*
    |--------------------------------------------------------------------------
    | LIGHT DOT MATERIAL
    |--------------------------------------------------------------------------
    */

    const lightDotMaterial =
      new THREE.RawShaderMaterial({

        vertexShader:
          lightDotVertexShader,

        fragmentShader:
          lightDotFragmentShader,

        transparent: true,

        depthWrite: false,

        depthTest: true,

        blending:
          THREE.AdditiveBlending,

        uniforms: {

          ...fieldUniforms(),

          uColor,

          uLightDotSize: {
            value:
              cfg.lightDotSize,
          },

          uLightDotSpeed: {
            value:
              cfg.lightDotSpeed,
          },

          uLightDotOpacity: {
            value:
              cfg.lightDotOpacity,
          },

        },

      });


    /*
    |--------------------------------------------------------------------------
    | LIGHT DOT POINTS
    |--------------------------------------------------------------------------
    */

    const lightDots =
      new THREE.Points(
        lightDotGeometry,
        lightDotMaterial
      );


    lightDots.frustumCulled =
      false;


    scene.add(
      lightDots
    );


    geometries.push(
      lightDotGeometry
    );


    materials.push(
      lightDotMaterial
    );


    /*
    |--------------------------------------------------------------------------
    | POINTER
    |--------------------------------------------------------------------------
    */

    const handlePointerMove =
      (
        event: PointerEvent
      ) => {

        const rect =
          container.getBoundingClientRect();


        if (
          rect.width <= 0 ||
          rect.height <= 0
        ) {
          return;
        }


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        mouseTarget.x =
          THREE.MathUtils.clamp(
            x * 2 - 1,
            -1,
            1
          );


        mouseTarget.y =
          THREE.MathUtils.clamp(
            -(y * 2 - 1),
            -1,
            1
          );

      };


    const handlePointerLeave =
      () => {

        mouseTarget.set(
          0,
          0
        );

      };


    if (
      interactive
    ) {

      window.addEventListener(
        "pointermove",
        handlePointerMove,
        {
          passive: true,
        }
      );


      window.addEventListener(
        "pointerleave",
        handlePointerLeave
      );

    }


    /*
    |--------------------------------------------------------------------------
    | RESIZE
    |--------------------------------------------------------------------------
    */

    const resize =
      () => {

        const width =
          Math.max(
            container.clientWidth,
            1
          );


        const height =
          Math.max(
            container.clientHeight,
            1
          );


        renderer.setSize(
          width,
          height,
          false
        );


        camera.aspect =
          width /
          height;


        camera.updateProjectionMatrix();

      };


    resize();


    window.addEventListener(
      "resize",
      resize
    );


    /*
    |--------------------------------------------------------------------------
    | ANIMATION LOOP
    |--------------------------------------------------------------------------
    */

    let frameId =
      0;


    let lastTime =
      performance.now();


    let cameraX =
      0;


    let cameraY =
      0;


    /*
    |--------------------------------------------------------------------------
    | PAUSE WHEN OFF-SCREEN / TAB HIDDEN
    |--------------------------------------------------------------------------
    |
    | This scene draws 600+ individual line objects every frame. Previously
    | it rendered non-stop for as long as the tab was open, even long after
    | the hero had been scrolled past — a major, constant drag on scroll
    | smoothness across the whole site. Now it stops rendering (and stops
    | scheduling new frames) whenever the hero isn't visible or the tab
    | isn't active, and resumes cleanly when it is.
    |
    */

    let isPaused =
      false;

    let isIntersecting =
      true;


    const resumeLoop =
      () => {

        if (
          reducedMotion ||
          isPaused
        ) {
          return;
        }

        if (
          frameId !==
          0
        ) {
          return;
        }

        lastTime =
          performance.now();

        frameId =
          requestAnimationFrame(
            render
          );

      };


    const stopLoop =
      () => {

        if (
          frameId !==
          0
        ) {
          cancelAnimationFrame(
            frameId
          );

          frameId =
            0;
        }

      };


    const render =
      () => {

        const now =
          performance.now();


        const delta =
          Math.min(
            (
              now -
              lastTime
            ) /
              1000,
            0.05
          );


        lastTime =
          now;


        /*
        |--------------------------------------------------------------------------
        | MOTION
        |--------------------------------------------------------------------------
        */

        if (
          !reducedMotion
        ) {

          /*
           * Main animation clock.
           */
          uTime.value +=
            delta;


          /*
           * --------------------------------------------------------
           * SMOOTH CURSOR
           * --------------------------------------------------------
           */

          uMouse.value.x +=
            (
              mouseTarget.x -
              uMouse.value.x
            ) *
            0.025;


          uMouse.value.y +=
            (
              mouseTarget.y -
              uMouse.value.y
            ) *
            0.025;


          /*
           * --------------------------------------------------------
           * CAMERA PARALLAX
           * --------------------------------------------------------
           */

          const targetCameraX =
            uMouse.value.x *
            cfg.interactionDepth;


          const targetCameraY =
            uMouse.value.y *
            cfg.interactionDepth *
            0.45;


          cameraX +=
            (
              targetCameraX -
              cameraX
            ) *
            0.025;


          cameraY +=
            (
              targetCameraY -
              cameraY
            ) *
            0.025;


          /*
           * --------------------------------------------------------
           * IDLE FLOAT
           * --------------------------------------------------------
           */

          const idleX =
            Math.sin(
              uTime.value *
              0.055
            ) *
            1.8;


          const idleY =
            Math.sin(
              uTime.value *
              0.045
            ) *
            1.2;


          camera.position.x =
            cfg.cameraPosition[0] +
            cameraX +
            idleX;


          camera.position.y =
            cfg.cameraPosition[1] +
            cameraY +
            idleY;


          /*
           * --------------------------------------------------------
           * SUBTLE CAMERA TILT
           * --------------------------------------------------------
           */

          camera.rotation.z =
            -uMouse.value.x *
            cfg.interactionRotation;


          camera.rotation.x =
            uMouse.value.y *
            cfg.interactionRotation *
            0.5;


          camera.lookAt(
            lookAt
          );

        }


        /*
        |--------------------------------------------------------------------------
        | RENDER
        |--------------------------------------------------------------------------
        */

        renderer.render(
          scene,
          camera
        );


        /*
        |--------------------------------------------------------------------------
        | NEXT FRAME
        |--------------------------------------------------------------------------
        */

        if (
          !reducedMotion &&
          !isPaused
        ) {

          frameId =
            requestAnimationFrame(
              render
            );

        } else {

          frameId =
            0;

        }

      };


    render();


    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {

          isIntersecting =
            entry.isIntersecting;

          isPaused =
            !isIntersecting ||
            document.hidden;

          if (
            isPaused
          ) {
            stopLoop();
          } else {
            resumeLoop();
          }

        },
        {
          rootMargin:
            "150px",
        }
      );

    visibilityObserver.observe(
      container
    );


    const handleVisibilityChange =
      () => {

        isPaused =
          document.hidden ||
          !isIntersecting;

        if (
          isPaused
        ) {
          stopLoop();
        } else {
          resumeLoop();
        }

      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );


    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {

      cancelAnimationFrame(
        frameId
      );


      visibilityObserver.disconnect();


      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );


      window.removeEventListener(
        "resize",
        resize
      );


      if (
        interactive
      ) {

        window.removeEventListener(
          "pointermove",
          handlePointerMove
        );


        window.removeEventListener(
          "pointerleave",
          handlePointerLeave
        );

      }


      /*
       * Dispose geometry.
       */
      geometries.forEach(
        (
          geometry
        ) => {

          geometry.dispose();

        }
      );


      /*
       * Dispose materials.
       */
      materials.forEach(
        (
          material
        ) => {

          material.dispose();

        }
      );


      /*
       * Dispose renderer.
       */
      renderer.dispose();

    };

  }, [
    config,
    interactive,
  ]);


  /*
  |--------------------------------------------------------------------------
  | BACKGROUND CONTAINER
  |--------------------------------------------------------------------------
  */

  return (

    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",

        inset: 0,

        width: "100%",

        height: "100%",

        overflow: "hidden",

        background: "#000",

        pointerEvents: "none",

        zIndex: 0,
      }}
    >

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",

          inset: 0,

          width: "100%",

          height: "100%",

          display: "block",
        }}
      />

    </div>

  );
}