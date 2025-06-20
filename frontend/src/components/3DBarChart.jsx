import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const Bar = ({ x, z, height, color }) => {
  const meshRef = useRef();
  return (
    <mesh position={[x, height / 2, z]} ref={meshRef}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const BarsScene = ({ data, xKey, yKey }) => {
  const color = new THREE.Color();

  const xLabels = data.map((item) => item[xKey]);
  const yValues = data.map((item) => Number(item[yKey]) || 1);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 15, 10]} intensity={1.2} />
      <gridHelper args={[30, 30]} position={[0, 0, 0]} />

      {data.map((item, index) => {
        const x = index * 1.2;
        const z = 0;
        const height = Number(item[yKey]) || 1;
        color.setHSL(index / data.length, 0.6, 0.5);

        return (
          <Bar key={index} x={x} z={z} height={height} color={color.clone()} />
        );
      })}

      {/* X Axis Labels */}
      {xLabels.map((label, i) => (
        <Text
          key={i}
          position={[i * 1.2, -0.4, 0.9]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {label}
        </Text>
      ))}

      {/* Y Axis Label */}
      <Text
        position={[-1.5, 5, 0]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {yKey}
      </Text>
    </>
  );
};

const ThreeDBarChart = ({ data, xKey, yKey }) => {
  if (!data || data.length === 0) {
    return <p className="text-white mt-4">No data to display</p>;
  }

  return (
    <div
      style={{
        height: '500px',
        background: '#111',
        borderRadius: '12px',
        marginTop: '20px',
      }}
    >
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <OrbitControls />
        <BarsScene data={data} xKey={xKey} yKey={yKey} />
      </Canvas>
    </div>
  );
};

export default ThreeDBarChart;
