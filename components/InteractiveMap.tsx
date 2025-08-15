'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Zap, Droplets, Wifi } from 'lucide-react'

export default function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [pilgrimCount, setPilgrimCount] = useState(0)

  useEffect(() => {
    // Animate pilgrim counter
    const timer = setInterval(() => {
      setPilgrimCount(prev => {
        if (prev < 8000000000) {
          return prev + Math.floor(Math.random() * 1000000)
        }
        return 8000000000
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const regions = [
    {
      id: 'europe',
      name: 'Europa',
      pilgrims: 742000000,
      wayposts: 8500,
      status: 'active',
      color: '#22c55e',
      position: { x: 50, y: 35 }
    },
    {
      id: 'asia',
      name: 'Asien',
      pilgrims: 4600000000,
      wayposts: 25000,
      status: 'active',
      color: '#0ea5e9',
      position: { x: 70, y: 40 }
    },
    {
      id: 'africa',
      name: 'Afrika',
      pilgrims: 1340000000,
      wayposts: 12000,
      status: 'expanding',
      color: '#d946ef',
      position: { x: 52, y: 55 }
    },
    {
      id: 'north-america',
      name: 'Nordamerika',
      pilgrims: 579000000,
      wayposts: 7500,
      status: 'active',
      color: '#f59e0b',
      position: { x: 25, y: 35 }
    },
    {
      id: 'south-america',
      name: 'Südamerika',
      pilgrims: 430000000,
      wayposts: 5500,
      status: 'planning',
      color: '#ef4444',
      position: { x: 30, y: 65 }
    },
    {
      id: 'oceania',
      name: 'Ozeanien',
      pilgrims: 45000000,
      wayposts: 800,
      status: 'active',
      color: '#8b5cf6',
      position: { x: 85, y: 70 }
    }
  ]

  const wayposts = [
    { id: 1, x: 48, y: 32, type: 'energy', status: 'online' },
    { id: 2, x: 52, y: 38, type: 'water', status: 'online' },
    { id: 3, x: 68, y: 42, type: 'medical', status: 'maintenance' },
    { id: 4, x: 72, y: 38, type: 'energy', status: 'online' },
    { id: 5, x: 28, y: 36, type: 'water', status: 'online' },
    { id: 6, x: 32, y: 68, type: 'energy', status: 'offline' },
    { id: 7, x: 54, y: 58, type: 'medical', status: 'online' },
    { id: 8, x: 86, y: 72, type: 'water', status: 'online' }
  ]

  const getWaypostIcon = (type: string) => {
    switch (type) {
      case 'energy': return Zap
      case 'water': return Droplets
      case 'medical': return Users
      default: return Wifi
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#22c55e'
      case 'maintenance': return '#f59e0b'
      case 'offline': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <section className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-orbitron font-bold gradient-text mb-6">
            Globale Karte
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Verfolgen Sie die Bewegungen von Milliarden von Pilgern in Echtzeit 
            und die Infrastruktur, die ihre Reise unterstützt.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-orbitron font-bold text-gaia-400 mb-2">
                {pilgrimCount.toLocaleString()}
              </div>
              <div className="text-gray-400">Aktive Pilger</div>
            </div>
            <div>
              <div className="text-3xl font-orbitron font-bold text-pilgrim-400 mb-2">
                50,000
              </div>
              <div className="text-gray-400">Wayposts</div>
            </div>
            <div>
              <div className="text-3xl font-orbitron font-bold text-karma-400 mb-2">
                1,825
              </div>
              <div className="text-gray-400">Tage verbleibend</div>
            </div>
            <div>
              <div className="text-3xl font-orbitron font-bold text-green-400 mb-2">
                97.3%
              </div>
              <div className="text-gray-400">System-Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-2 glass-effect rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden">
              {/* World Map SVG Background */}
              <svg viewBox="0 0 100 60" className="w-full h-full">
                {/* Simplified world map paths */}
                <path
                  d="M15,25 L35,25 L35,45 L15,45 Z" // North America
                  fill="rgba(34, 197, 94, 0.1)"
                  stroke="rgba(34, 197, 94, 0.3)"
                  strokeWidth="0.2"
                />
                <path
                  d="M25,50 L40,50 L40,70 L25,70 Z" // South America
                  fill="rgba(239, 68, 68, 0.1)"
                  stroke="rgba(239, 68, 68, 0.3)"
                  strokeWidth="0.2"
                />
                <path
                  d="M45,20 L65,20 L65,50 L45,50 Z" // Europe/Africa
                  fill="rgba(217, 70, 239, 0.1)"
                  stroke="rgba(217, 70, 239, 0.3)"
                  strokeWidth="0.2"
                />
                <path
                  d="M65,25 L90,25 L90,55 L65,55 Z" // Asia
                  fill="rgba(14, 165, 233, 0.1)"
                  stroke="rgba(14, 165, 233, 0.3)"
                  strokeWidth="0.2"
                />
                <path
                  d="M80,65 L95,65 L95,75 L80,75 Z" // Oceania
                  fill="rgba(139, 92, 246, 0.1)"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="0.2"
                />
              </svg>

              {/* Region Markers */}
              {regions.map((region, index) => (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${region.position.x}%`,
                    top: `${region.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: region.color }}
                    animate={{
                      scale: selectedRegion === region.id ? [1, 1.5, 1] : [1, 1.2, 1],
                      boxShadow: [
                        `0 0 0 0 ${region.color}40`,
                        `0 0 0 10px ${region.color}00`,
                        `0 0 0 0 ${region.color}40`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ))}

              {/* Waypost Markers */}
              {wayposts.map((waypost, index) => {
                const Icon = getWaypostIcon(waypost.type)
                return (
                  <motion.div
                    key={waypost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    className="absolute"
                    style={{
                      left: `${waypost.x}%`,
                      top: `${waypost.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getStatusColor(waypost.status) }}
                    >
                      <Icon size={8} className="text-white" />
                    </div>
                  </motion.div>
                )
              })}

              {/* Animated Routes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                  d="M 25,35 Q 40,20 55,35"
                  stroke="#22c55e"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 55,35 Q 70,25 85,40"
                  stroke="#0ea5e9"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Region Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">
                Regionen
              </h3>
              <div className="space-y-3">
                {regions.map((region) => (
                  <motion.div
                    key={region.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedRegion === region.id 
                        ? 'bg-white/20 border border-white/30' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedRegion(region.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: region.color }}
                        />
                        <span className="text-white font-medium">{region.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{region.status}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-300">
                      {region.pilgrims.toLocaleString()} Pilger
                    </div>
                    <div className="text-xs text-gray-400">
                      {region.wayposts.toLocaleString()} Wayposts
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">
                Waypost-Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-300">Online</span>
                  </div>
                  <span className="text-white">48,650</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-gray-300">Wartung</span>
                  </div>
                  <span className="text-white">1,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-300">Offline</span>
                  </div>
                  <span className="text-white">150</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}