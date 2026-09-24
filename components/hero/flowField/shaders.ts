// components/hero/flowField/shaders.ts


/*
|--------------------------------------------------------------------------
| COMMON FLOW FIELD
|--------------------------------------------------------------------------
*/

const FLOW_COMMON = `

precision highp float;

uniform float uTime;


/*
|--------------------------------------------------------------------------
| FIELD SHAPE
|--------------------------------------------------------------------------
*/

uniform float uNeckRadius;

uniform float uTopRadius;

uniform float uBottomRadius;

uniform float uHeightSpan;


/*
|--------------------------------------------------------------------------
| FLOW
|--------------------------------------------------------------------------
*/

uniform float uUpperTwist;

uniform float uLowerTwist;

uniform float uLowerVortex;

uniform float uLowerFlatten;

uniform float uLowerLift;


/*
|--------------------------------------------------------------------------
| NOISE
|--------------------------------------------------------------------------
*/

uniform float uNoiseStrength;

uniform float uNoiseScale;

uniform float uNoiseSpeed;


/*
|--------------------------------------------------------------------------
| FLOW SPEED
|--------------------------------------------------------------------------
*/

uniform float uFlowSpeed;


/*
|--------------------------------------------------------------------------
| CURSOR
|--------------------------------------------------------------------------
*/

uniform vec2 uMouse;

uniform float uInteractionStrength;


/*
|--------------------------------------------------------------------------
| ORGANIC NOISE
|--------------------------------------------------------------------------
*/

float organicNoise(
  float x,
  float y,
  float t
) {

  float a =
    sin(
      x * 2.13 +
      y * 1.73 +
      t
    ) * 0.50;


  float b =
    sin(
      x * 4.73 -
      y * 2.31 +
      t * 1.37
    ) * 0.30;


  float c =
    sin(
      x * 1.27 +
      y * 5.17 -
      t * 0.71
    ) * 0.20;


  return a + b + c;
}


/*
|--------------------------------------------------------------------------
| RADIUS
|--------------------------------------------------------------------------
*/

float getRadius(
  float y
) {

  float upper =
    smoothstep(
      0.0,
      1.0,
      max(
        y,
        0.0
      )
    );


  float lower =
    smoothstep(
      0.0,
      1.0,
      max(
        -y,
        0.0
      )
    );


  float upperRadius =
    mix(
      uNeckRadius,
      uTopRadius,
      pow(
        upper,
        0.84
      )
    );


  float lowerRadius =
    mix(
      uNeckRadius,
      uBottomRadius,
      pow(
        lower,
        0.76
      )
    );


  return
    y >= 0.0
      ? upperRadius
      : lowerRadius;
}


/*
|--------------------------------------------------------------------------
| MAIN FIELD POSITION
|--------------------------------------------------------------------------
|
| Every filament and every traveling light dot uses this
| exact same function.
|
|--------------------------------------------------------------------------
*/

vec3 getFieldPosition(
  float baseAngle,
  float normY,
  float randomSeed
) {

  /*
   * Upper region.
   */
  float upper =
    smoothstep(
      0.0,
      0.95,
      normY
    );


  /*
   * Lower region.
   */
  float lower =
    smoothstep(
      0.0,
      0.95,
      -normY
    );


  /*
   * Radius.
   */
  float radius =
    getRadius(
      normY
    );


  /*
   * Upper rotation.
   */
  float upperRotation =
    normY *
    uUpperTwist *
    upper;


  /*
   * Lower vortex.
   */
  float lowerRotation =
    lower *
    (
      uLowerTwist +
      uLowerVortex *
      (
        0.40 +
        0.60 *
        lower
      )
    );


  /*
   * Continuous field motion.
   */
  float flowRotation =
    uTime *
    uFlowSpeed *
    (
      0.35 +
      lower * 2.0
    );


  /*
   * Final angle.
   */
  float angle =
    baseAngle +
    upperRotation +
    lowerRotation +
    flowRotation;


  /*
   * Organic deformation.
   */
  float noise =
    organicNoise(
      angle *
        uNoiseScale,

      normY *
        uNoiseScale,

      uTime *
        uNoiseSpeed +
      randomSeed *
        4.0
    );


  float localRadius =
    radius *
    (
      1.0 +
      noise *
      uNoiseStrength
    );


  /*
   * Lower area becomes flatter.
   */
  float depthScale =
    mix(
      1.0,
      uLowerFlatten,
      lower
    );


  /*
   * X.
   */
  float x =
    cos(
      angle
    ) *
    localRadius;


  /*
   * Z.
   */
  float z =
    sin(
      angle
    ) *
    localRadius *
    depthScale;


  /*
   * Lower basin.
   */
  float basin =
    lower *
    lower *
    uLowerLift;


  /*
   * Y.
   */
  float y =
    normY *
    uHeightSpan *
    0.5 -
    basin;


  /*
   * Cursor influence.
   */
  x +=
    uMouse.x *
    uInteractionStrength *
    (
      14.0 +
      radius *
      0.045
    );


  y +=
    uMouse.y *
    uInteractionStrength *
    12.0;


  z +=
    uMouse.x *
    uInteractionStrength *
    7.0;


  /*
   * Small organic movement.
   */
  x +=
    noise *
    5.0;


  y +=
    noise *
    2.5;


  z +=
    noise *
    3.5;


  return vec3(
    x,
    y,
    z
  );
}
`;


/*
|--------------------------------------------------------------------------
| RING VERTEX
|--------------------------------------------------------------------------
*/

export const ringVertexShader = `

${FLOW_COMMON}

attribute float aNormY;

attribute float aAngle;

attribute float aRandom;

uniform mat4 projectionMatrix;

uniform mat4 modelViewMatrix;

varying float vAlpha;

varying float vRandom;

varying float vNormY;


void main() {

  vec3 position =
    getFieldPosition(
      aAngle,
      aNormY,
      aRandom
    );


  vec4 mv =
    modelViewMatrix *
    vec4(
      position,
      1.0
    );


  gl_Position =
    projectionMatrix *
    mv;


  float edge =
    smoothstep(
      1.05,
      0.05,
      abs(
        aNormY
      )
    );


  vAlpha =
    mix(
      0.58,
      1.0,
      edge
    );


  vRandom =
    aRandom;


  vNormY =
    aNormY;
}
`;


/*
|--------------------------------------------------------------------------
| STRAND VERTEX
|--------------------------------------------------------------------------
*/

export const strandVertexShader = `

${FLOW_COMMON}

attribute float aNormY;

attribute float aAngle;

attribute float aRandom;

uniform mat4 projectionMatrix;

uniform mat4 modelViewMatrix;

varying float vAlpha;

varying float vRandom;

varying float vNormY;


void main() {

  vec3 position =
    getFieldPosition(
      aAngle,
      aNormY,
      aRandom
    );


  vec4 mv =
    modelViewMatrix *
    vec4(
      position,
      1.0
    );


  gl_Position =
    projectionMatrix *
    mv;


  float edge =
    smoothstep(
      1.05,
      0.05,
      abs(
        aNormY
      )
    );


  vAlpha =
    mix(
      0.48,
      0.9,
      edge
    );


  vRandom =
    aRandom;


  vNormY =
    aNormY;
}
`;


/*
|--------------------------------------------------------------------------
| FILAMENT FRAGMENT
|--------------------------------------------------------------------------
*/

export const lineFragmentShader = `

precision highp float;

uniform vec3 uColor;

uniform float uOpacityMin;

uniform float uOpacityMax;

uniform float uCenterMaskStrength;

uniform float uCenterMaskWidth;

varying float vAlpha;

varying float vRandom;

varying float vNormY;


void main() {

  float opacity =
    mix(
      uOpacityMin,
      uOpacityMax,
      vAlpha
    );


  /*
   * Keep the text area readable.
   */
  float center =
    1.0 -
    smoothstep(
      0.0,
      uCenterMaskWidth,
      abs(
        vNormY
      )
    );


  opacity *=
    1.0 -
    center *
    uCenterMaskStrength;


  /*
   * Very subtle monochrome variation.
   */
  vec3 gray =
    uColor *
    (
      0.76 +
      vRandom *
      0.24
    );


  gl_FragColor =
    vec4(
      gray,
      opacity
    );
}
`;


/*
|--------------------------------------------------------------------------
| NORMAL PARTICLE VERTEX
|--------------------------------------------------------------------------
*/

export const particleVertexShader = `

${FLOW_COMMON}

attribute float aBaseAngle;

attribute float aProgress;

attribute float aSpeedFactor;

attribute float aSizeFactor;

uniform mat4 projectionMatrix;

uniform mat4 modelViewMatrix;

uniform float uParticleSize;

uniform float uParticleSpeed;

varying float vFade;


void main() {

  /*
   * Continuous movement.
   */
  float progress =
    fract(
      aProgress +
      uTime *
      uParticleSpeed *
      aSpeedFactor
    );


  /*
   * Bottom → top.
   */
  float normY =
    mix(
      -0.98,
      0.98,
      progress
    );


  /*
   * Follow field.
   */
  vec3 position =
    getFieldPosition(
      aBaseAngle,
      normY,
      aSpeedFactor
    );


  vec4 mv =
    modelViewMatrix *
    vec4(
      position,
      1.0
    );


  gl_Position =
    projectionMatrix *
    mv;


  /*
   * Perspective sizing.
   */
  float distanceToCamera =
    max(
      -mv.z,
      1.0
    );


  gl_PointSize =
    max(
      1.0,
      uParticleSize *
      aSizeFactor *
      (
        250.0 /
        distanceToCamera
      )
    );


  /*
   * Fade at edges.
   */
  vFade =
    smoothstep(
      0.0,
      0.08,
      progress
    )
    *
    smoothstep(
      1.0,
      0.90,
      progress
    );
}
`;


/*
|--------------------------------------------------------------------------
| NORMAL PARTICLE FRAGMENT
|--------------------------------------------------------------------------
*/

export const particleFragmentShader = `

precision highp float;

uniform vec3 uColor;

uniform float uHighlightOpacity;

varying float vFade;


void main() {

  vec2 point =
    gl_PointCoord -
    vec2(
      0.5
    );


  float distanceFromCenter =
    length(
      point
    );


  float alpha =
    smoothstep(
      0.5,
      0.06,
      distanceFromCenter
    );


  gl_FragColor =
    vec4(
      uColor,
      alpha *
      vFade *
      uHighlightOpacity
    );
}
`;


/*
|--------------------------------------------------------------------------
| TRAVELING LIGHT DOT VERTEX
|--------------------------------------------------------------------------
|
| THIS IS THE REFERENCE EFFECT.
|
| It is a tiny luminous point traveling along a filament.
|
| There is NO LINE SEGMENT.
|
|--------------------------------------------------------------------------
*/

export const lightDotVertexShader = `

${FLOW_COMMON}

attribute float aBaseAngle;

attribute float aProgress;

attribute float aSpeedFactor;

attribute float aSizeFactor;

attribute float aBrightness;

uniform mat4 projectionMatrix;

uniform mat4 modelViewMatrix;

uniform float uLightDotSize;

uniform float uLightDotSpeed;

varying float vBrightness;

varying float vEdgeFade;


void main() {

  /*
   * --------------------------------------------------------------
   * MOVEMENT
   * --------------------------------------------------------------
   *
   * Progress continuously moves from bottom to top.
   */
  float progress =
    fract(
      aProgress +
      uTime *
      uLightDotSpeed *
      aSpeedFactor
    );


  /*
   * --------------------------------------------------------------
   * FIELD POSITION
   * --------------------------------------------------------------
   *
   * This is the critical part.
   *
   * The dot follows the SAME mathematical flow field as
   * the surrounding filaments.
   */
  float normY =
    mix(
      -0.98,
      0.98,
      progress
    );


  vec3 position =
    getFieldPosition(
      aBaseAngle,
      normY,
      aBrightness
    );


  /*
   * --------------------------------------------------------------
   * CAMERA TRANSFORM
   * --------------------------------------------------------------
   */

  vec4 mv =
    modelViewMatrix *
    vec4(
      position,
      1.0
    );


  gl_Position =
    projectionMatrix *
    mv;


  /*
   * --------------------------------------------------------------
   * SMALL DOT
   * --------------------------------------------------------------
   *
   * This is intentionally tiny.
   *
   * It should look like:
   *
   *             ·
   *
   * NOT:
   *
   *             ━━━
   */
  float distanceToCamera =
    max(
      -mv.z,
      1.0
    );


  gl_PointSize =
    max(
      1.0,
      uLightDotSize *
      aSizeFactor *
      (
        270.0 /
        distanceToCamera
      )
    );


  /*
   * --------------------------------------------------------------
   * EDGE FADE
   * --------------------------------------------------------------
   *
   * Avoid dots popping abruptly at the top and bottom.
   */
  vEdgeFade =
    smoothstep(
      0.0,
      0.10,
      progress
    )
    *
    smoothstep(
      1.0,
      0.88,
      progress
    );


  /*
   * Individual brightness variation.
   */
  vBrightness =
    aBrightness;
}
`;


/*
|--------------------------------------------------------------------------
| TRAVELING LIGHT DOT FRAGMENT
|--------------------------------------------------------------------------
|
| Creates a tiny soft luminous dot.
|
|--------------------------------------------------------------------------
*/

export const lightDotFragmentShader = `

precision highp float;

uniform vec3 uColor;

uniform float uLightDotOpacity;

varying float vBrightness;

varying float vEdgeFade;


void main() {

  /*
   * Point coordinates:
   *
   *     0,0       1,0
   *
   *        \     /
   *         \   /
   *          \ /
   *
   *         CENTER
   *
   *          / \
   *         /   \
   *
   *     0,1       1,1
   */
  vec2 point =
    gl_PointCoord -
    vec2(
      0.5
    );


  float distanceFromCenter =
    length(
      point
    );


  /*
   * --------------------------------------------------------------
   * SOFT OUTER GLOW
   * --------------------------------------------------------------
   */

  float glow =
    smoothstep(
      0.50,
      0.0,
      distanceFromCenter
    );


  /*
   * --------------------------------------------------------------
   * SMALL BRIGHT CORE
   * --------------------------------------------------------------
   */

  float core =
    smoothstep(
      0.18,
      0.0,
      distanceFromCenter
    );


  /*
   * --------------------------------------------------------------
   * COMBINE
   * --------------------------------------------------------------
   *
   * The glow is subtle.
   * The center is brighter.
   */
  float alpha =
    (
      glow *
      0.42
    )
    +
    (
      core *
      0.58
    );


  alpha *=
    vBrightness;


  alpha *=
    vEdgeFade;


  alpha *=
    uLightDotOpacity;


  /*
   * Pure white/gray light.
   */
  gl_FragColor =
    vec4(
      uColor,
      alpha
    );
}
`;