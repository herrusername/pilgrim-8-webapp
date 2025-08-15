'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Shield, Network, Zap, Eye, Settings, Activity, Database } from 'lucide-react'

export default function GaiaOS() {
  const [systemStatus, setSystemStatus] = useState('optimal')
  const [activeNodes, setActiveNodes] = useState(0)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  useEffect(() => {
    // Simulate system metrics
    const timer = setInterval(() => {
      setActiveNodes(prev => 50000 + Math.floor(Math.random() * 5000))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const modules = [
    {
      id: 'routing',
      icon: Network,
      title: 'Routenoptimierung',
      description: 'KI-gestützte Pfadfindung für optimale Wanderrouten',
      status: 'active',
      load: 87,
      color: 'from-gaia-500 to-gaia-600'
    },
    {
      id: 'mediation',
      icon: Shield,
      title: 'Konfliktlösung',
      description: '3-stufiges KI-Justizsystem für Streitschlichtung',
      status: 'active',
      load: 23,
      color: 'from-karma-500 to-karma-600'
    },
    {
      id: 'health',
      icon: Activity,
      title: 'Gesundheitsmonitoring',
      description: 'Überwachung vitaler Parameter aller Pilger',
      status: 'active',
      load: 94,
      color: 'from-pilgrim-500 to-pilgrim-600'
    },
    {
      id: 'resources',
      icon: Database,
      title: 'Ressourcenmanagement',
      description: 'Verteilung von Wasser, Energie und Nahrung',
      status: 'maintenance',
      load: 45,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'prediction',
      icon: Eye,
      title: 'Vorhersagemodelle',
      description: 'Wetterprognosen und Risikobewertung',
      status: 'active',
      load: 76,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'learning',
      icon: Brain,
      title: 'Federated Learning',
      description: 'Dezentrales Lernen aus globalen Daten',
      status: 'active',
      load: 68,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const systemMetrics = [
    { label: 'CPU Auslastung', value: 73, unit: '%', color: '#22c55e' },
    { label: 'Speicher', value: 45, unit: '%', color: '#0ea5e9' },
    { label: 'Netzwerk', value: 89, unit: '%', color: '#d946ef' },
    { label: 'Sicherheit', value: 99, unit: '%', color: '#f59e0b' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e'
      case 'maintenance': return '#f59e0b'
      case 'error': return '#ef4444'
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
            GAIA-OS
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Das dezentrale KI-Betriebssystem, das 8 Milliarden Pilger koordiniert, 
            schützt und bei ihrer Transformation unterstützt.
          </p>
        </motion.div>

        {/* System Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-gaia-400 mb-2">
                {activeNodes.toLocaleString()}
              </div>
              <div className="text-gray-400">Aktive Nodes</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-pilgrim-400 mb-2">
                99.97%
              </div>
              <div className="text-gray-400">Uptime</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-karma-400 mb-2">
                847TB
              </div>
              <div className="text-gray-400">Verarbeitete Daten</div>
            </div>
            
            <div className="text-center">
              <div className={`text-3xl font-orbitron font-bold mb-2 ${
                systemStatus === 'optimal' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {systemStatus.toUpperCase()}
              </div>
              <div className="text-gray-400">System Status</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Modules */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300
                    hover:scale-105 hologram-effect
                    ${selectedModule === module.id ? 'ring-2 ring-gaia-400' : ''}
                  `}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center neon-glow`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getStatusColor(module.status) }}
                      />
                      <span className="text-xs text-gray-400 capitalize">
                        {module.status}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {module.description}
                  </p>
                  
                  {/* Load Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Auslastung</span>
                      <span>{module.load}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${module.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${module.load}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                System Metriken
              </h3>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{metric.label}</span>
                      <span className="text-white">{metric.value}{metric.unit}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Sicherheitsprotokoll
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Verschlüsselung</span>
                  </div>
                  <span className="text-green-400 text-xs">AES-256</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center space-x-2">
                    <Network className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">Blockchain</span>
                  </div>
                  <span className="text-blue-400 text-xs">Aktiv</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm">Anomalie-Erkennung</span>
                  </div>
                  <span className="text-purple-400 text-xs">Online</span>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                KI-Entscheidungen (24h)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Routenoptimierungen</span>
                  <span className="text-white">2,847,392</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Konfliktlösungen</span>
                  <span className="text-white">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Ressourcenverteilungen</span>
                  <span className="text-white">847,293</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Gesundheitswarnungen</span>
                  <span className="text-white">23,847</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-orbitron font-bold text-white mb-8 text-center">
            Dezentrale KI-Architektur
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Edge Nodes */}
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-gaia-500 to-gaia-600 flex items-center justify-center mx-auto mb-2 neon-glow"
                >
                  <Network className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-white text-sm">Edge Nodes</div>
                <div className="text-gray-400 text-xs">50,000+</div>
              </div>

              {/* Processing Layer */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-pilgrim-500 to-pilgrim-600 flex items-center justify-center mx-auto mb-2 neon-glow"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-white text-sm">Processing</div>
                <div className="text-gray-400 text-xs">Real-time</div>
              </div>

              {/* Core AI */}
              <div className="text-center">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                      "0 0 40px rgba(34, 197, 94, 0.8)",
                      "0 0 20px rgba(34, 197, 94, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-gaia-400 via-pilgrim-400 to-karma-400 flex items-center justify-center mx-auto mb-2"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>
                <div className="text-white text-sm font-semibold">GAIA Core</div>
                <div className="text-gray-400 text-xs">Central AI</div>
              </div>

              {/* Learning Layer */}
              <div className="text-center">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-karma-500 to-karma-600 flex items-center justify-center mx-auto mb-2 neon-glow"
                >
                  <Database className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-white text-sm">Learning</div>
                <div className="text-gray-400 text-xs">Federated</div>
              </div>

              {/* Output Layer */}
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-2 neon-glow"
                >
                  <Settings className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-white text-sm">Actions</div>
                <div className="text-gray-400 text-xs">Automated</div>
              </div>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[1, 2, 3, 4].map((i) => (
                <motion.line
                  key={i}
                  x1={`${i * 20}%`} y1="50%" x2={`${(i + 1) * 20}%`} y2="50%"
                  stroke="#22c55e" strokeWidth="2" opacity="0.6"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    delay: i * 0.5 
                  }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}