import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// Configuration object for wave parameters
const waveConfig = {
  length: 10,
  thickness: 0.05,
  segments: 100,
  numLayers: 8,
  layerSpacing: 0.1,
  animationSpeed: 0.5,
  frequency: 0.5,
  amplitude: 1,
  colors: [
    new THREE.Color('#9c27b0'), // Purple
    new THREE.Color('#2196f3'), // Blue
    new THREE.Color('#e91e63'), // Pink
  ],
  metalness: 0.4,
  roughness: 0.2,
  clearcoat: 0.5,
  baseOpacity: 0.7,
  opacityFalloff: 0.1,
  emissiveIntensity: 0.5,
};

const WaveLines = ({ scrollProgress, buttonTriggerActive }) => {
  const groupRef = useRef();
  const materialRefs = useRef([]);

  // Generate initial curve points for the 'S' shape
  const curvePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= waveConfig.segments; i++) {
      const t = i / waveConfig.segments;
      points.push(
        new THREE.Vector3(
          (t - 0.5) * waveConfig.length,
          Math.sin(t * Math.PI * 2) * 2,
          Math.cos(t * Math.PI) * 1.5
        )
      );
    }
    return points;
  }, []);

  // Create base curve
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints);
  }, [curvePoints]);

  // Generate tube geometries for each layer
  const tubes = useMemo(() => {
    return Array.from({ length: waveConfig.numLayers }, (_, i) => {
      const offset = (i - waveConfig.numLayers / 2) * waveConfig.layerSpacing;
      const offsetPoints = curvePoints.map(point => 
        point.clone().add(new THREE.Vector3(0, offset, offset))
      );
      const offsetCurve = new THREE.CatmullRomCurve3(offsetPoints);
      return new THREE.TubeGeometry(
        offsetCurve,
        waveConfig.segments,
        waveConfig.thickness * (1 - i * 0.05),
        8,
        false
      );
    });
  }, [curvePoints]);

  // Animation frame update
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    materialRefs.current.forEach((material, i) => {
      if (!material) return;
      
      const phase = i / waveConfig.numLayers;
      const animationFactor = buttonTriggerActive ? 2 : 1;
      
      // Update emissive intensity based on scroll and button state
      material.emissiveIntensity = waveConfig.emissiveIntensity * 
        (1 + Math.sin(time * waveConfig.animationSpeed + phase) * 0.3) *
        (1 + scrollProgress * 0.5) * animationFactor;
      
      // Update opacity
      material.opacity = waveConfig.baseOpacity - 
        (i * waveConfig.opacityFalloff) +
        Math.sin(time + phase) * 0.1;
    });

    // Animate group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {tubes.map((tube, i) => {
        const t = i / (waveConfig.numLayers - 1);
        const color = new THREE.Color().lerpColors(
          waveConfig.colors[0],
          waveConfig.colors[2],
          t
        );

        return (
          <mesh key={i} geometry={tube}>
            <meshStandardMaterial
              ref={el => (materialRefs.current[i] = el)}
              color={color}
              metalness={waveConfig.metalness}
              roughness={waveConfig.roughness}
              clearcoat={waveConfig.clearcoat}
              transparent
              opacity={waveConfig.baseOpacity - (i * waveConfig.opacityFalloff)}
              emissive={color}
              emissiveIntensity={waveConfig.emissiveIntensity}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const FluidWaveEffect = ({ scrollContainerRef, buttonTriggerActive }) => {
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'black'
    }}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
        />
        <WaveLines
          scrollProgress={scrollProgress.get()}
          buttonTriggerActive={buttonTriggerActive}
        />
      </Canvas>
    </div>
  );
};

export default FluidWaveEffect; 