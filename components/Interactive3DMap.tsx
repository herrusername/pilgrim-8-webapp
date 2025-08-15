'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Globe, Users, MapPin, Route, Zap } from 'lucide-react';

// 3D Globe Component
const Globe3D: React.FC<{ onLocationClick: (location: any) => void }> = ({ onLocationClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Create Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDUxMiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iMjU2IiBmaWxsPSIjMTEzM2FhIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiMyMmM1NWUiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iNTAiIHI9IjE1IiBmaWxsPSIjMjJjNTVlIi8+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjEyMCIgcj0iMjUiIGZpbGw9IiMyMmM1NWUiLz4KPGNpcmNsZSBjeD0iNDAwIiBjeT0iODAiIHI9IjE4IiBmaWxsPSIjMjJjNTVlIi8+Cjwvc3ZnPgo=');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const pilgrimLocations = [
    { id: 1, name: 'Himalaya Route', position: [1.5, 0.8, 0.5], pilgrims: 1250000, color: '#ff6b6b' },
    { id: 2, name: 'Pacific Route', position: [-1.2, 0.3, 1.0], pilgrims: 980000, color: '#4ecdc4' },
    { id: 3, name: 'Atlantic Route', position: [-0.8, 0.6, -1.1], pilgrims: 1100000, color: '#45b7d1' },
    { id: 4, name: 'African Route', position: [0.2, -0.5, 1.3], pilgrims: 1350000, color: '#f9ca24' },
    { id: 5, name: 'European Route', position: [0.5, 1.2, 0.8], pilgrims: 890000, color: '#6c5ce7' },
    { id: 6, name: 'Asian Route', position: [1.8, 0.2, -0.3], pilgrims: 1450000, color: '#fd79a8' }
  ];

  return (
    <group>
      {/* Earth Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Pilgrim Route Points */}
      {pilgrimLocations.map((location) => (
        <group key={location.id}>
          {/* Location Marker */}
          <mesh
            position={location.position}
            onClick={() => onLocationClick(location)}
            onPointerOver={() => setHovered(location.name)}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color={location.color}
              emissive={location.color}
              emissiveIntensity={hovered === location.name ? 0.5 : 0.2}
            />
          </mesh>

          {/* Pulsing Ring */}
          <mesh position={location.position} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.12, 32]} />
            <meshBasicMaterial 
              color={location.color}
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Location Label */}
          {hovered === location.name && (
            <Html position={[location.position[0] + 0.2, location.position[1] + 0.2, location.position[2]]}>
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm border border-purple-500/30">
                <div className="font-semibold">{location.name}</div>
                <div className="text-xs text-gray-300">{location.pilgrims.toLocaleString()} Pilger</div>
              </div>
            </Html>
          )}
        </group>
      ))}

      {/* Connecting Lines */}
      {pilgrimLocations.map((location, index) => {
        const nextLocation = pilgrimLocations[(index + 1) % pilgrimLocations.length];
        const points = [
          new THREE.Vector3(...location.position),
          new THREE.Vector3(...nextLocation.position)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={`line-${index}`} geometry={geometry}>
            <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
          </line>
        );
      })}
    </group>
  );
};

// Floating Particles
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.02} transparent opacity={0.6} />
    </points>
  );
};

// Main Interactive 3D Map Component
const Interactive3DMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location);
  };

  const stats = [
    { icon: Users, label: 'Aktive Pilger', value: '8.2M', color: 'text-blue-400' },
    { icon: Route, label: 'Routen', value: '6', color: 'text-green-400' },
    { icon: MapPin, label: 'Stationen', value: '2,847', color: 'text-purple-400' },
    { icon: Zap, label: 'KARMA Punkte', value: '156M', color: 'text-yellow-400' }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Header */}
      <div className="relative z-10 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Interaktive 3D Weltkarte
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Erkunde die globalen PILGRIM-8 Routen in Echtzeit und entdecke die Geschichten von Millionen von Pilgern
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-8 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 mb-2 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[600px] mx-auto max-w-6xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
            <div className="text-center">
              <Globe className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-white">Lade 3D Weltkarte...</p>
            </div>
          </div>
        )}

        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="rounded-2xl border border-purple-500/30"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

            {/* 3D Globe */}
            <Globe3D onLocationClick={handleLocationClick} />

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.4}
              minDistance={3}
              maxDistance={10}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Location Details Panel */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 z-30"
        >
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ×
          </button>
          
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{selectedLocation.name}</h3>
            <div className="flex items-center space-x-2 text-gray-300">
              <Users size={16} />
              <span>{selectedLocation.pilgrims.toLocaleString()} aktive Pilger</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Aktuelle Aktivitäten</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Nachhaltigkeitsprojekte: 47 aktiv</div>
                <div>• Bildungsinitiativen: 23 laufend</div>
                <div>• Kultureller Austausch: 156 Events</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-purple-400 mb-2">KARMA Statistiken</h4>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Durchschnitt:</span>
                  <span className="text-green-400">2,847 Punkte</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Top Performer:</span>
                  <span className="text-yellow-400">15,420 Punkte</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300">
              Route Details anzeigen
            </button>
          </div>
        </motion.div>
      )}

      {/* Controls Info */}
      <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg border border-purple-500/30">
        <h4 className="font-semibold mb-2">Steuerung</h4>
        <div className="text-sm space-y-1 text-gray-300">
          <div>🖱️ Ziehen: Globus drehen</div>
          <div>🔍 Scrollen: Zoom</div>
          <div>📍 Klicken: Route auswählen</div>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DMap;