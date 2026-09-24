"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HyperboloidFlowProps {
  width?: string;
  height?: string;
  className?: string;
  /** hex line color, e.g. 0xffffff for light lines on a black background */
  color?: number;
  /** overall speed multiplier for the flowing motion */
  speed?: number;
}

/**
 * A GPU-animated wireframe hyperboloid "wormhole" — the threads actually
 * flow: each ring/strand vertex is displaced live in the vertex shader
 * every frame (continuously spiraling angle + shimmering ripple), not
 * baked once into static geometry. This is the same "shader drives the
 * motion" approach as GLSLHills, just shaped into a hyperboloid tunnel
 * (narrow neck, flaring top and bottom) instead of a noise plane.
 */
export default function HyperboloidFlow({
  width = "100%",
  height = "100%",
  className,
  color = 0xffffff,
  speed = 1,
}: HyperboloidFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ---- Tunnel shape parameters ----
    const NECK_RADIUS = 13;
    const FLARE = 2.1; // how aggressively the hyperboloid flares top/bottom
    const HEIGHT = 420; // total Y extent
    const TWIST = 4.4; // how many radians of spiral twist across full height
    const FLOW_SPEED = 0.35; // how fast the spiral visibly rotates/flows
    const RIPPLE_SPEED = 0.6; // shimmer speed

    const col = new THREE.Color(color);
    const colorUniform = { value: new THREE.Vector3(col.r, col.g, col.b) };
    const timeUniform = { value: 0 };

    // Shared GLSL helpers — WebGL1-safe (no built-in cosh/sinh).
    const glslCommon = `
      float coshf(float x) { return (exp(x) + exp(-x)) * 0.5; }
    `;

    // ---- Ring shader: normY constant per ring, angle varies per vertex ----
    const ringVertex = `
      precision highp float;
      attribute float aAngle;
      uniform mat4 projectionMatrix;
      uniform mat4 modelViewMatrix;
      uniform float time;
      uniform float normY;
      uniform float neckRadius;
      uniform float flare;
      uniform float twist;
      uniform float heightSpan;
      uniform float flowSpeed;
      uniform float rippleSpeed;
      varying float vFade;
      ${glslCommon}
      void main() {
        float radius = neckRadius * coshf(normY * flare);
        float angle = aAngle + normY * twist + time * flowSpeed;
        float ripple = 1.0 + 0.035 * sin(angle * 9.0 + normY * 6.0 + time * rippleSpeed);
        float r = radius * ripple;
        vec3 pos = vec3(cos(angle) * r, normY * heightSpan * 0.5, sin(angle) * r);
        vFade = 1.0 - pow(min(abs(normY), 1.0), 2.4);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // ---- Strand shader: baseAngle constant per strand, normY varies per vertex ----
    const strandVertex = `
      precision highp float;
      attribute float aNormY;
      uniform mat4 projectionMatrix;
      uniform mat4 modelViewMatrix;
      uniform float time;
      uniform float baseAngle;
      uniform float neckRadius;
      uniform float flare;
      uniform float twist;
      uniform float heightSpan;
      uniform float flowSpeed;
      varying float vFade;
      ${glslCommon}
      void main() {
        float radius = neckRadius * coshf(aNormY * flare);
        float angle = baseAngle + aNormY * twist + time * flowSpeed;
        vec3 pos = vec3(cos(angle) * radius, aNormY * heightSpan * 0.5, sin(angle) * radius);
        vFade = 1.0 - pow(min(abs(aNormY), 1.0), 2.2);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uBaseOpacity;
      varying float vFade;
      void main() {
        gl_FragColor = vec4(uColor, uBaseOpacity * vFade);
      }
    `;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      3000
    );
    camera.position.set(0, 22, 128);
    camera.lookAt(new THREE.Vector3(0, -12, 0));

    const group = new THREE.Group();
    const materials: THREE.RawShaderMaterial[] = [];

    // ---- Rings ----
    const RING_COUNT = 130;
    const SEGMENTS = 220;
    for (let i = 0; i < RING_COUNT; i++) {
      const t = i / (RING_COUNT - 1);
      const normY = (t - 0.5) * 2;

      const angles = new Float32Array(SEGMENTS + 1);
      for (let s = 0; s <= SEGMENTS; s++) {
        angles[s] = (s / SEGMENTS) * Math.PI * 2;
      }
      const geometry = new THREE.BufferGeometry();
      // aAngle is the only per-vertex attribute driving the shape;
      // three.js requires a "position"-like attribute for the draw
      // range, so we reuse aAngle for that purpose too.
      geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));

      const edgeFade = 1 - Math.pow(Math.min(Math.abs(normY), 1), 2.4);
      const material = new THREE.RawShaderMaterial({
        vertexShader: ringVertex,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          time: timeUniform,
          normY: { value: normY },
          neckRadius: { value: NECK_RADIUS },
          flare: { value: FLARE },
          twist: { value: TWIST },
          heightSpan: { value: HEIGHT },
          flowSpeed: { value: FLOW_SPEED },
          rippleSpeed: { value: RIPPLE_SPEED },
          uColor: colorUniform,
          uBaseOpacity: { value: 0.05 + edgeFade * 0.4 },
        },
      });
      materials.push(material);

      const line = new THREE.LineLoop(geometry, material);
      line.frustumCulled = false;
      group.add(line);
    }

    // ---- Long strands running the full length ----
    const STRANDS = 70;
    const STRAND_STEPS = 200;
    for (let i = 0; i < STRANDS; i++) {
      const baseAngle = (i / STRANDS) * Math.PI * 2;

      const normYs = new Float32Array(STRAND_STEPS + 1);
      for (let s = 0; s <= STRAND_STEPS; s++) {
        normYs[s] = ((s / STRAND_STEPS) - 0.5) * 2;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("aNormY", new THREE.BufferAttribute(normYs, 1));

      const material = new THREE.RawShaderMaterial({
        vertexShader: strandVertex,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          time: timeUniform,
          baseAngle: { value: baseAngle },
          neckRadius: { value: NECK_RADIUS },
          flare: { value: FLARE },
          twist: { value: TWIST },
          heightSpan: { value: HEIGHT },
          flowSpeed: { value: FLOW_SPEED },
          uColor: colorUniform,
          uBaseOpacity: { value: 0.14 },
        },
      });
      materials.push(material);

      const line = new THREE.Line(geometry, material);
      line.frustumCulled = false;
      group.add(line);
    }

    scene.add(group);

    let frameId: number;
    let elapsed = 0;
    let lastTime = performance.now();

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += delta * speed;

      // Drives the actual flowing motion of every thread (GPU-side).
      timeUniform.value = elapsed;

      // Slow whole-tunnel rotation + gentle breathing tilt on top of that.
      group.rotation.y = elapsed * 0.04;
      group.rotation.z = Math.sin(elapsed * 0.09) * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      group.traverse((obj) => {
        if (obj instanceof THREE.Line || obj instanceof THREE.LineLoop) {
          obj.geometry.dispose();
        }
      });
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [color, speed]);

  return (
    <div ref={containerRef} style={{ position: "relative", width, height }} className={className}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}