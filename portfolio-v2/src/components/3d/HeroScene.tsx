import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, geometry, color, speed = 1, rotationAxis = [0.01, 0.01, 0] }: {
  position: [number, number, number];
  geometry: 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron' | 'torusKnot';
  color: string;
  speed?: number;
  rotationAxis?: number[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += rotationAxis[0] * speed;
    meshRef.current.rotation.y += rotationAxis[1] * speed;
    meshRef.current.rotation.z += rotationAxis[2] * speed;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });

  const Geometry = () => {
    switch (geometry) {
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      case 'torus': return <torusGeometry args={[0.8, 0.3, 16, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[0.9, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[0.8, 0]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.6, 0.2, 64, 16]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <Geometry />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.35}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#8251EE" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#8251EE" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#00d4aa" />

        <FloatingShape position={[-3.5, 1.5, -2]} geometry="icosahedron" color="#8251EE" speed={0.8} rotationAxis={[0.008, 0.012, 0.004]} />
        <FloatingShape position={[3.5, -1, -3]} geometry="torus" color="#00d4aa" speed={1.2} rotationAxis={[0.005, 0.01, 0.008]} />
        <FloatingShape position={[-1.5, -2, -1.5]} geometry="octahedron" color="#ff6b6b" speed={0.6} rotationAxis={[0.01, 0.006, 0.005]} />
        <FloatingShape position={[2, 2.5, -4]} geometry="dodecahedron" color="#8251EE" speed={1} rotationAxis={[0.007, 0.009, 0.003]} />
        <FloatingShape position={[0, -0.5, -5]} geometry="torusKnot" color="#00d4aa" speed={0.5} rotationAxis={[0.004, 0.008, 0.006]} />

        <ParticleField />
        <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
