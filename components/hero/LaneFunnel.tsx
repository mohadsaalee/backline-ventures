"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * LaneFunnel
 * ------------------------------------------------------------------
 * A GPU-drawn "lane" funnel: hundreds of hair-thin threads spiral out of a
 * narrow neck — flaring wide at the top and spreading into a flat orbital
 * floor at the bottom. Every thread is a real lane. Small glowing "bulb"
 * dots (with short comet trails) ride those lanes from the bottom, through
 * the neck, and up and out toward the top — exactly the motion in the
 * reference recording.
 *
 * One shared GLSL surface function (`surf`) positions the lane vertices AND
 * the travelling dots, so a dot can never drift off its lane.
 */

interface LaneFunnelProps {
  className?: string;
  interactive?: boolean;
}

/* ------------------------------------------------------------------ */
/* Shape constants (world units)                                       */
/* ------------------------------------------------------------------ */

const SHAPE = {
  NECK: 19.0, // neck radius
  TOP_R: 235.0, // radius at the top rim
  BOT_R: 300.0, // radius at the outer floor edge
  H_UP: 190.0, // neck -> top height
  H_LOW: 44.0, // neck -> floor drop (kept low so the floor reads as a disc)
  TN: 0.4, // where the neck sits along t (0 = floor edge, 1 = top rim)
  TWIST_UP: 5.4, // radians of swirl from neck to top
  TWIST_LOW: 3.4, // radians of swirl from neck to floor edge
};

const GLSL_CONSTS = `
  #define NECK ${SHAPE.NECK.toFixed(2)}
  #define TOP_R ${SHAPE.TOP_R.toFixed(2)}
  #define BOT_R ${SHAPE.BOT_R.toFixed(2)}
  #define H_UP ${SHAPE.H_UP.toFixed(2)}
  #define H_LOW ${SHAPE.H_LOW.toFixed(2)}
  #define TN ${SHAPE.TN.toFixed(3)}
  #define TWIST_UP ${SHAPE.TWIST_UP.toFixed(3)}
  #define TWIST_LOW ${SHAPE.TWIST_LOW.toFixed(3)}
`;

/* Shared surface + swirl. t: 0 = floor edge (bottom), 1 = top rim. */
const GLSL_SURFACE = `
  float swirlAt(float t) {
    if (t >= TN) {
      float k = (t - TN) / (1.0 - TN);
      return TWIST_UP * pow(k, 1.15);
    }
    float k = (TN - t) / TN;
    return -TWIST_LOW * pow(k, 1.05);
  }

  vec3 surf(float ang, float t, float rv) {
    float r;
    float y;
    if (t >= TN) {
      float k = (t - TN) / (1.0 - TN);
      r = NECK + (TOP_R - NECK) * pow(k, 1.4);
      y = k * H_UP;
    } else {
      float k = (TN - t) / TN;
      r = NECK + (BOT_R - NECK) * pow(k, 1.45);
      y = -H_LOW * pow(k, 0.55);
    }
    // lanes fan slightly apart away from the neck
    float spread = smoothstep(0.0, 0.5, abs(t - TN));
    r *= 1.0 + rv * 0.16 * spread;
    return vec3(cos(ang) * r, y, sin(ang) * r);
  }
`;

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const laneVertex = `
  precision highp float;
  attribute float aT;
  attribute float aA0;      // base angle (strand) or absolute angle (ring)
  attribute float aDir;     // +1 / -1 helix direction, 0 = ring
  attribute float aRv;      // radial variation -1..1
  attribute float aOp;      // per-lane brightness
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float uTime;
  varying float vAlpha;
  ${GLSL_CONSTS}
  ${GLSL_SURFACE}
  void main() {
    float ang;
    if (aDir == 0.0) {
      ang = aA0 + uTime * 0.012;
    } else {
      ang = aA0 + aDir * swirlAt(aT) + uTime * 0.012 * aDir;
    }
    vec3 p = surf(ang, aT, aRv);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // gentle depth cue + fade at both ends of every lane
    float depth = clamp((-mv.z - 120.0) / 380.0, 0.0, 1.0);
    float ends = smoothstep(0.0, 0.10, aT) * (1.0 - smoothstep(0.86, 1.0, aT));
    float far = mix(0.35, 1.0, smoothstep(-0.6, 0.6, p.z / max(length(p.xz), 1.0)));
    vAlpha = aOp * ends * mix(1.0, 0.5, depth) * far;
  }
`;

const laneFragment = `
  precision highp float;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(vec3(0.92), vAlpha);
  }
`;

const dotVertex = `
  precision highp float;
  attribute float aA0;
  attribute float aDir;
  attribute float aRv;
  attribute float aSpeed;
  attribute float aPhase;
  attribute float aSize;
  attribute float aTrail;   // 0 = head, 1..n = trail segments
  attribute float aBulb;    // 1 = big glowing bulb, 0 = small dot
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float uTime;
  uniform float uDpr;
  uniform float uScale;
  varying float vAlpha;
  varying float vBulb;
  ${GLSL_CONSTS}
  ${GLSL_SURFACE}
  void main() {
    // travel bottom -> top, looping
    float head = fract(aPhase + uTime * aSpeed);
    float t = head - aTrail * 0.011;
    float valid = step(0.0, t);
    t = max(t, 0.0);

    float ang = aA0 + aDir * swirlAt(t) + uTime * 0.012 * aDir;
    vec3 p = surf(ang, t, aRv);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float trailFade = 1.0 - aTrail * 0.16;
    float ends = smoothstep(0.02, 0.14, t) * (1.0 - smoothstep(0.80, 0.99, t));
    float depth = clamp((-mv.z - 120.0) / 380.0, 0.0, 1.0);
    vAlpha = valid * ends * trailFade * mix(1.0, 0.55, depth);
    vBulb = aBulb;

    float size = aSize * (1.0 - aTrail * 0.11);
    gl_PointSize = max(1.0, size * uDpr * (uScale / -mv.z));
  }
`;

const dotFragment = `
  precision highp float;
  varying float vAlpha;
  varying float vBulb;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = pow(1.0 - d, 2.4);
    float halo = pow(1.0 - d, 1.2) * 0.35 * vBulb;
    float a = (core + halo) * vAlpha;
    gl_FragColor = vec4(vec3(1.0), a);
  }
`;

const dustVertex = `
  precision highp float;
  attribute vec3 position;
  attribute float aSeed;
  attribute float aSize;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float uTime;
  uniform float uDpr;
  uniform float uScale;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += mod(uTime * (1.2 + aSeed * 2.2) + aSeed * 400.0, 260.0) - 100.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float tw = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed * 1.6) + aSeed * 40.0);
    vAlpha = tw * 0.75;
    gl_PointSize = max(1.0, aSize * uDpr * (uScale / -mv.z));
  }
`;

const dustFragment = `
  precision highp float;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    gl_FragColor = vec4(vec3(1.0), pow(1.0 - d, 1.6) * vAlpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

type LaneCounts = {
  strandsMain: number;
  strandsCross: number;
  steps: number;
  floorRings: number;
  neckRings: number;
  dots: number;
  bulbs: number;
  trail: number;
  dust: number;
};

function countsFor(width: number): LaneCounts {
  if (width < 640) {
    return {
      strandsMain: 90,
      strandsCross: 56,
      steps: 110,
      floorRings: 34,
      neckRings: 16,
      dots: 260,
      bulbs: 26,
      trail: 5,
      dust: 220,
    };
  }
  if (width < 1100) {
    return {
      strandsMain: 220,
      strandsCross: 140,
      steps: 130,
      floorRings: 52,
      neckRings: 24,
      dots: 420,
      bulbs: 40,
      trail: 6,
      dust: 360,
    };
  }
  return {
    strandsMain: 320,
    strandsCross: 300,
    steps: 150,
    floorRings: 96,
    neckRings: 5,
    dots: 760,
    bulbs: 64,
    trail: 6,
    dust: 520,
  };
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function LaneFunnel({
  className,
  interactive = true,
}: LaneFunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL — the section simply stays black
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 1, 3000);
    const group = new THREE.Group();
    scene.add(group);

    const timeUniform = { value: 0 };
    const dprUniform = { value: dpr };
    const scaleUniform = { value: 1 };

    const c = countsFor(container.clientWidth);

    /* -------------------- lanes (strands + rings) -------------------- */
    const laneVerts: number[][] = []; // [t, a0, dir, rv, op]
    const laneIndex: number[] = [];

    const pushStrand = (a0: number, dir: number, rv: number, op: number) => {
      const base = laneVerts.length;
      for (let s = 0; s <= c.steps; s++) {
        laneVerts.push([s / c.steps, a0, dir, rv, op]);
        if (s > 0) laneIndex.push(base + s - 1, base + s);
      }
    };

    const pushRing = (t: number, a0: number, rv: number, op: number) => {
      const seg = 180;
      const base = laneVerts.length;
      for (let s = 0; s <= seg; s++) {
        laneVerts.push([t, a0 + (s / seg) * Math.PI * 2, 0, rv, op]);
        if (s > 0) laneIndex.push(base + s - 1, base + s);
      }
    };

    // main helix — clockwise
    for (let i = 0; i < c.strandsMain; i++) {
      const a0 = (i / c.strandsMain) * Math.PI * 2 + rand(-0.01, 0.01);
      const op = 0.10 + Math.pow(Math.random(), 2.0) * 0.6;
      pushStrand(a0, 1, rand(-1, 1), op);
    }
    // cross helix — counter-clockwise (creates the neck crosshatch)
    for (let i = 0; i < c.strandsCross; i++) {
      const a0 = (i / c.strandsCross) * Math.PI * 2 + rand(-0.02, 0.02);
      const op = 0.08 + Math.pow(Math.random(), 2.2) * 0.5;
      pushStrand(a0, -1, rand(-1, 1), op);
    }
    // concentric floor rings
    for (let i = 0; i < c.floorRings; i++) {
      const k = Math.pow((i + 1) / c.floorRings, 1.25);
      const t = SHAPE.TN * (1 - 0.06 - k * 0.94);
      pushRing(Math.max(t, 0.012), rand(0, 6.28), rand(-1, 1), rand(0.10, 0.42));
    }
    // horizontal loops around the neck / upper body
    for (let i = 0; i < c.neckRings; i++) {
      const t = SHAPE.TN + 0.02 + (i / c.neckRings) * 0.5;
      pushRing(t, rand(0, 6.28), rand(-1, 1), rand(0.05, 0.16));
    }

    const laneCount = laneVerts.length;
    const aT = new Float32Array(laneCount);
    const aA0 = new Float32Array(laneCount);
    const aDir = new Float32Array(laneCount);
    const aRv = new Float32Array(laneCount);
    const aOp = new Float32Array(laneCount);
    for (let i = 0; i < laneCount; i++) {
      const v = laneVerts[i];
      aT[i] = v[0];
      aA0[i] = v[1];
      aDir[i] = v[2];
      aRv[i] = v[3];
      aOp[i] = v[4];
    }

    const laneGeo = new THREE.BufferGeometry();
    // three needs a position attribute to size the draw call; the real
    // position is computed in the vertex shader.
    laneGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(laneCount * 3), 3)
    );
    laneGeo.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
    laneGeo.setAttribute("aA0", new THREE.BufferAttribute(aA0, 1));
    laneGeo.setAttribute("aDir", new THREE.BufferAttribute(aDir, 1));
    laneGeo.setAttribute("aRv", new THREE.BufferAttribute(aRv, 1));
    laneGeo.setAttribute("aOp", new THREE.BufferAttribute(aOp, 1));
    laneGeo.setIndex(laneIndex);

    const laneMat = new THREE.RawShaderMaterial({
      vertexShader: laneVertex,
      fragmentShader: laneFragment,
      uniforms: { uTime: timeUniform },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const laneMesh = new THREE.LineSegments(laneGeo, laneMat);
    laneMesh.frustumCulled = false;
    group.add(laneMesh);

    /* -------------------- travelling dots + bulbs -------------------- */
    const perDot = c.trail + 1;
    const dotTotal = (c.dots + c.bulbs) * perDot;
    const dA0 = new Float32Array(dotTotal);
    const dDir = new Float32Array(dotTotal);
    const dRv = new Float32Array(dotTotal);
    const dSpeed = new Float32Array(dotTotal);
    const dPhase = new Float32Array(dotTotal);
    const dSize = new Float32Array(dotTotal);
    const dTrail = new Float32Array(dotTotal);
    const dBulb = new Float32Array(dotTotal);

    let w = 0;
    const addDot = (bulb: boolean) => {
      const dir = Math.random() < 0.62 ? 1 : -1;
      const a0 = Math.random() * Math.PI * 2;
      const rv = rand(-1, 1);
      const speed = bulb ? rand(0.035, 0.07) : rand(0.045, 0.11);
      const phase = Math.random();
      const size = bulb ? rand(7, 11) : rand(2.2, 4.2);
      const trails = bulb ? perDot : 1; // small dots: head only
      for (let k = 0; k < perDot; k++) {
        const on = k < trails;
        dA0[w] = a0;
        dDir[w] = dir;
        dRv[w] = rv;
        dSpeed[w] = speed;
        dPhase[w] = phase;
        dSize[w] = on ? size : 0.0;
        dTrail[w] = k;
        dBulb[w] = bulb ? 1 : 0;
        w++;
      }
    };
    for (let i = 0; i < c.dots; i++) addDot(false);
    for (let i = 0; i < c.bulbs; i++) addDot(true);

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(dotTotal * 3), 3)
    );
    dotGeo.setAttribute("aA0", new THREE.BufferAttribute(dA0, 1));
    dotGeo.setAttribute("aDir", new THREE.BufferAttribute(dDir, 1));
    dotGeo.setAttribute("aRv", new THREE.BufferAttribute(dRv, 1));
    dotGeo.setAttribute("aSpeed", new THREE.BufferAttribute(dSpeed, 1));
    dotGeo.setAttribute("aPhase", new THREE.BufferAttribute(dPhase, 1));
    dotGeo.setAttribute("aSize", new THREE.BufferAttribute(dSize, 1));
    dotGeo.setAttribute("aTrail", new THREE.BufferAttribute(dTrail, 1));
    dotGeo.setAttribute("aBulb", new THREE.BufferAttribute(dBulb, 1));

    const dotMat = new THREE.RawShaderMaterial({
      vertexShader: dotVertex,
      fragmentShader: dotFragment,
      uniforms: {
        uTime: timeUniform,
        uDpr: dprUniform,
        uScale: scaleUniform,
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    dotPoints.frustumCulled = false;
    group.add(dotPoints);

    /* -------------------- ambient dust -------------------- */
    const dustPos = new Float32Array(c.dust * 3);
    const dustSeed = new Float32Array(c.dust);
    const dustSize = new Float32Array(c.dust);
    for (let i = 0; i < c.dust; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 20 + Math.pow(Math.random(), 0.7) * 260;
      dustPos[i * 3] = Math.cos(ang) * rad;
      dustPos[i * 3 + 1] = rand(-30, 160);
      dustPos[i * 3 + 2] = Math.sin(ang) * rad;
      dustSeed[i] = Math.random();
      dustSize[i] = rand(1.2, 2.6);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
    dustGeo.setAttribute("aSize", new THREE.BufferAttribute(dustSize, 1));
    const dustMat = new THREE.RawShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      uniforms: {
        uTime: timeUniform,
        uDpr: dprUniform,
        uScale: scaleUniform,
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    dust.frustumCulled = false;
    group.add(dust);

    /* -------------------- camera / resize -------------------- */
    const CAM_LOOK_Y = 40;
    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;

      // Keep the neck / floor framing on tall (mobile) viewports by
      // pulling the camera back as the aspect ratio narrows.
      const pull = aspect >= 1.5 ? 1 : 1 + (1.5 - aspect) * 0.75;
      camera.position.set(0, 50, 236 * pull);
      camera.lookAt(0, CAM_LOOK_Y, 0);
      camera.updateProjectionMatrix();

      // point-size scale: keeps dots a constant visual size vs. viewport
      scaleUniform.value = (height / 900) * 190;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* -------------------- pointer parallax -------------------- */
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (interactive && !reducedMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    /* -------------------- loop -------------------- */
    let frameId: number | null = null;
    let running = false;
    let elapsed = 40; // start mid-flow so dots are already in transit
    let last = performance.now();

    const draw = () => {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      group.rotation.y = curX * 0.12;
      group.rotation.x = curY * 0.03;
      timeUniform.value = elapsed;
      renderer.render(scene, camera);
    };

    const loop = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      elapsed += dt;
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      last = performance.now();
      loop();
    };
    const stop = () => {
      running = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    draw(); // first frame (also the static frame for reduced motion)

    let inView = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      laneGeo.dispose();
      laneMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}