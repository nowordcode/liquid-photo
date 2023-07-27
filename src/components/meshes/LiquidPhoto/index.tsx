import React from "react";

import * as THREE from "three";

import { useThree, useFrame } from "@react-three/fiber";
import vertex from "./shaders/vertex";
import fragment from "./shaders/fragment";
import { useTexture } from "@react-three/drei";

type Props = {
  freq: number;
  speed: number;
};

export default function LiquidPhoto({ freq, speed }: Props) {
  const { viewport, mouse } = useThree();
  const photoTex = useTexture("./photos/photo2.jpg");

  const uniforms = React.useRef({
    uTime: { value: 0 },
    uFreq: { value: freq },
    uSpeed: { value: speed },
    uMouse: { value: new THREE.Vector2(0.0) },
    uTex: { value: photoTex },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    uImageBounds: {
      value: new THREE.Vector2(
        photoTex.source.data.width,
        photoTex.source.data.height
      ),
    },
  });

  const shaderRef = React.useRef<THREE.ShaderMaterial>(null!);
  React.useEffect(() => {
    shaderRef.current.uniforms.uTex.value = photoTex;
  }, [photoTex]);

  React.useEffect(() => {
    shaderRef.current.uniforms.uResolution.value = new THREE.Vector2(
      viewport.width,
      viewport.height
    );
  }, [viewport.width, viewport.height]);

  useFrame((state, delta) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += delta * 0.3;
    shaderRef.current.uniforms.uFreq.value = freq;
    shaderRef.current.uniforms.uSpeed.value = speed;
    shaderRef.current.uniforms.uMouse.value = mouse;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1024, 512]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
      {/* <meshBasicMaterial /> */}
    </mesh>
  );
}
