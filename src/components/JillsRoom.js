import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusGeometry, MeshStandardMaterial } from 'three';

const RotatingTorus = () => {
  const torusRef = useRef();

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const JillsRoom = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 2]} />
      <RotatingTorus />
    </Canvas>
  );
};

export default JillsRoom;