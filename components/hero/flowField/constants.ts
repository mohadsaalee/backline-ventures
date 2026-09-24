// components/hero/flowField/constants.ts

export interface FlowFieldConfig {
  // ------------------------------------------------------------
  // FILAMENT GEOMETRY
  // ------------------------------------------------------------

  ringCount: number;
  ringSegments: number;

  strandCount: number;
  strandSteps: number;


  // ------------------------------------------------------------
  // FIELD SHAPE
  // ------------------------------------------------------------

  neckRadius: number;

  topRadius: number;

  bottomRadius: number;

  heightSpan: number;


  // ------------------------------------------------------------
  // FLOW
  // ------------------------------------------------------------

  upperTwist: number;

  lowerTwist: number;

  lowerVortex: number;

  lowerFlatten: number;

  lowerLift: number;


  // ------------------------------------------------------------
  // ORGANIC MOVEMENT
  // ------------------------------------------------------------

  noiseStrength: number;

  noiseScale: number;

  noiseSpeed: number;

  flowSpeed: number;


  // ------------------------------------------------------------
  // FILAMENT OPACITY
  // ------------------------------------------------------------

  lineOpacityMin: number;

  lineOpacityMax: number;


  // ------------------------------------------------------------
  // NORMAL PARTICLES
  // ------------------------------------------------------------

  particleCount: number;

  particleSize: number;

  particleSpeed: number;

  highlightOpacity: number;


  // ------------------------------------------------------------
  // TRAVELING LIGHT DOTS
  // ------------------------------------------------------------
  //
  // These are NOT lines.
  //
  // They are tiny luminous points that travel along
  // the same 3D field as the filaments.
  //

  lightDotCount: number;

  lightDotSize: number;

  lightDotSpeed: number;

  lightDotOpacity: number;

  lightDotSpeedVariation: number;

  lightDotBrightnessVariation: number;


  // ------------------------------------------------------------
  // COLOR
  // ------------------------------------------------------------

  color: number;


  // ------------------------------------------------------------
  // CENTER MASK
  // ------------------------------------------------------------

  centerMaskStrength: number;

  centerMaskWidth: number;


  // ------------------------------------------------------------
  // CAMERA
  // ------------------------------------------------------------

  cameraFov: number;

  cameraPosition: [
    number,
    number,
    number
  ];

  cameraLookAt: [
    number,
    number,
    number
  ];


  // ------------------------------------------------------------
  // CURSOR INTERACTION
  // ------------------------------------------------------------

  interactionStrength: number;

  interactionRotation: number;

  interactionDepth: number;
}


/*
|--------------------------------------------------------------------------
| DESKTOP
|--------------------------------------------------------------------------
*/

export const FLOW_CONFIG_DESKTOP: FlowFieldConfig = {

  // ------------------------------------------------------------
  // FILAMENT DENSITY
  // ------------------------------------------------------------

  ringCount: 430,

  ringSegments: 230,

  strandCount: 175,

  strandSteps: 170,


  // ------------------------------------------------------------
  // FIELD WIDTH
  // ------------------------------------------------------------

  neckRadius: 52,

  topRadius: 410,

  bottomRadius: 455,


  // ------------------------------------------------------------
  // FIELD HEIGHT
  // ------------------------------------------------------------

  heightSpan: 420,


  // ------------------------------------------------------------
  // FLOW
  // ------------------------------------------------------------

  upperTwist: 2.1,

  lowerTwist: 4.8,

  lowerVortex: 3.0,

  lowerFlatten: 0.55,

  lowerLift: 34,


  // ------------------------------------------------------------
  // ORGANIC MOVEMENT
  // ------------------------------------------------------------

  noiseStrength: 0.035,

  noiseScale: 1.6,

  noiseSpeed: 0.075,

  /*
   * Slow cinematic movement.
   */
  flowSpeed: 0.065,


  // ------------------------------------------------------------
  // FILAMENT APPEARANCE
  // ------------------------------------------------------------

  lineOpacityMin: 0.025,

  lineOpacityMax: 0.19,


  // ------------------------------------------------------------
  // NORMAL PARTICLES
  // ------------------------------------------------------------

  particleCount: 1100,

  particleSize: 1.05,

  particleSpeed: 0.040,

  highlightOpacity: 0.52,


  // ------------------------------------------------------------
  // TRAVELING LIGHT DOTS
  // ------------------------------------------------------------
  //
  // This is the important new effect.
  //
  // Small dots travel along the field.
  //

  lightDotCount: 210,

  lightDotSize: 1.45,

  lightDotSpeed: 0.032,

  lightDotOpacity: 0.82,

  lightDotSpeedVariation: 0.65,

  lightDotBrightnessVariation: 0.45,


  // ------------------------------------------------------------
  // COLOR
  // ------------------------------------------------------------

  color: 0xffffff,


  // ------------------------------------------------------------
  // CENTER MASK
  // ------------------------------------------------------------

  centerMaskStrength: 0.07,

  centerMaskWidth: 0.26,


  // ------------------------------------------------------------
  // CAMERA
  // ------------------------------------------------------------

  cameraFov: 53,

  cameraPosition: [
    0,
    8,
    440,
  ],

  cameraLookAt: [
    0,
    -8,
    0,
  ],


  // ------------------------------------------------------------
  // CURSOR
  // ------------------------------------------------------------

  interactionStrength: 0.065,

  interactionRotation: 0.045,

  interactionDepth: 10,
};


/*
|--------------------------------------------------------------------------
| TABLET
|--------------------------------------------------------------------------
*/

export const FLOW_CONFIG_TABLET: FlowFieldConfig = {

  ...FLOW_CONFIG_DESKTOP,


  ringCount: 300,

  ringSegments: 175,

  strandCount: 115,

  strandSteps: 130,


  particleCount: 700,


  // Traveling lights
  lightDotCount: 125,

  lightDotSize: 1.30,


  // Width
  topRadius: 340,

  bottomRadius: 380,


  // Height
  heightSpan: 390,


  // Camera
  cameraPosition: [
    0,
    8,
    405,
  ],


  interactionStrength: 0.05,

  interactionDepth: 8,
};


/*
|--------------------------------------------------------------------------
| MOBILE
|--------------------------------------------------------------------------
*/

export const FLOW_CONFIG_MOBILE: FlowFieldConfig = {

  ...FLOW_CONFIG_DESKTOP,


  ringCount: 190,

  ringSegments: 120,

  strandCount: 70,

  strandSteps: 95,


  particleCount: 350,


  // Traveling lights
  lightDotCount: 65,

  lightDotSize: 1.15,


  // Width
  topRadius: 245,

  bottomRadius: 275,


  // Neck
  neckRadius: 42,


  // Height
  heightSpan: 350,


  // Camera
  cameraFov: 55,

  cameraPosition: [
    0,
    8,
    365,
  ],


  interactionStrength: 0.035,

  interactionDepth: 7,
};


/*
|--------------------------------------------------------------------------
| RESPONSIVE CONFIG
|--------------------------------------------------------------------------
*/

export function pickConfigForWidth(
  width: number
): FlowFieldConfig {

  if (
    width < 640
  ) {

    return FLOW_CONFIG_MOBILE;

  }


  if (
    width < 1024
  ) {

    return FLOW_CONFIG_TABLET;

  }


  return FLOW_CONFIG_DESKTOP;
}