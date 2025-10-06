/* eslint-disable react/no-unknown-property */
import React, { useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { shaderMaterial, useTrailTexture } from "@react-three/drei";
import * as THREE from "three";

// SVG filter for a gooey look (optional)
const GooeyFilter = ({ id = "goo-filter", strength = 10 }) => (
  <svg className="absolute overflow-hidden">
    <defs>
      <filter id={id}>
        <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

// Custom shader material
const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color("#ffffff"),
  },
  // vertex
  `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  // fragment
  `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      // snap to a grid and sample the trail at grid centers
      vec2 gridCenter = (floor(uv * gridSize) + 0.5) / gridSize;
      float trail = texture2D(mouseTrail, gridCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  const mat = useMemo(() => new DotMaterial(), []);
  mat.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge,
    interpolate: interpolate ?? 0.1,
    ease: easingFunction ?? ((x) => x),
  });

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={mat}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
        transparent
      />
    </mesh>
  );
}

/**
 * Fullscreen background pixel trail.
 * - Fixed & behind everything (-z-10)
 * - pointer-events: none (so your site stays fully clickable)
 * - Listens to pointer events on document.body so the trail follows your mouse.
 */
export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,   // ~fraction of texture, not pixels
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x) => x,
  color = "#111111",
  gooeyFilter,       // { id: 'goo', strength: 10 }  or undefined
  className = "",
}) {
  const eventSource = typeof window !== "undefined" ? document.body : undefined;

  return (
    <>
      {gooeyFilter ? <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} /> : null}
      <Canvas
        className={`fixed inset-0 z-10 pointer-events-none ${className}`}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        // This makes the R3F event system listen on the page instead of the canvas,
        // so we can keep pointer-events: none and not block your UI.
        eventSource={eventSource}
        eventPrefix="client"
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
