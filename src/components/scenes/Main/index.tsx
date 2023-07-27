"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import LiquidPhoto from "@/components/meshes/LiquidPhoto";

export default function MainScene() {
  const [freq, setFreq] = React.useState(10.0);
  const [speed, setSpeed] = React.useState(3.0);

  return (
    <div className="w-full h-full grid grid-rows-6 grid-cols-2 border border-black">
      <div className="p-4">
        <h3 className="text-2xl font-extrabold md:text-4xl">
          Liquid Photo Effect
        </h3>
      </div>

      <div className="decorator border-l border-b border-black" />

      <div className="p-4">
        <p className="text-xs">
          This is an experimantation on a plane geometry applying shaders to
          achieve liquid water effect of mouse moving. Mainly Simplex 3D Noise
          and creating ripple coordinats from mouse position in the fragment
          shader do the trick.
        </p>
      </div>
      <div className="p-4 border-l border-b border-black">
        <div className="md:flex h-full items-center gap-4">
          <h3 className="font-bold">Frequency</h3>
          <input
            type="range"
            step={0.5}
            min={0}
            max={100}
            className="flex-1"
            value={freq}
            onChange={(e) => {
              setFreq(Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="p-4 border-b border-black"></div>
      <div className="p-4 border-l border-b border-black">
        <div className="md:flex h-full items-center gap-4">
          <h3 className="font-bold">Speed</h3>
          <input
            type="range"
            step={0.5}
            min={0}
            max={100}
            className="flex-1"
            value={speed}
            onChange={(e) => {
              setSpeed(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="row-start-4 row-span-3 col-span-2">
        <Canvas>
          <LiquidPhoto freq={freq} speed={speed} />
        </Canvas>
      </div>
    </div>
  );
}
