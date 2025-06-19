import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// One single bar in 3D
const Bar = ({ x, y, height, color }) => {
  const meshRef = useRef();
  return (
    <mesh position={[x, height / 2, y]} ref={meshRef}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// The whole 3D bar chart scene
const BarsScene = ({ data, xKey, yKey }) => {
  const color = new THREE.Color();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 15, 10]} />

      {/* Bars */}
      {data.map((item, index) => {
        const x = index;
        const y = 0;
        const height = Number(item[yKey]) || 1;
        color.setHSL(index / data.length, 0.6, 0.5);

        return (
          <Bar key={index} x={x} y={y} height={height} color={color.clone()} />
        );
      })}

      {/* ✅ Axis Labels */}
      <Text
        position={[data.length / 2, 0.2, -2]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {xKey}
      </Text>

      <Text
        position={[-2, 5, 0]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {yKey}
      </Text>

      <Text
        position={[-2, 0.2, data.length / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>
    </>
  );
};

const ThreeDBarChart = ({ data, xKey, yKey }) => {
  if (!data || data.length === 0) return <p className="text-white">No data</p>;

  return (
    <div style={{ height: '500px', background: '#111', borderRadius: '12px' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <OrbitControls />
        <BarsScene data={data} xKey={xKey} yKey={yKey} />
      </Canvas>
    </div>
  );
};

export default ThreeDBarChart;
