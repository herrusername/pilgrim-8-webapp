'use client'

import { motion } from 'framer-motion'
import { Cpu, Heart, Brain, Shield, Zap, Globe } from 'lucide-react'

export default function SystemsOverview() {
  const systems = [
    {
      id: 'karma',
      icon: Heart,
      title: 'KARMA System',
      subtitle: 'Soziales Bewertungssystem',
      description: 'Token-basiertes System für positive Aktionen wie Wandern, Helfen und Ideenaustausch.',
      features: ['Nicht handelbar', 'Transparente Verteilung', 'Gemeinschaftsfördernd'],
      color: 'karma',
      gradient: 'from-karma-500 to-karma-600'
    },
    {
      id: 'gaia',
      icon: Brain,
      title: 'GAIA-OS',
      subtitle: 'KI-Betriebssystem',
      description: 'Dezentrales KI-System für Routenoptimierung, Konfliktlösung und Ressourcenmanagement.',
      features: ['Federated Learning', 'Kryptografische Sicherheit', 'Adaptive Algorithmen'],
      color: 'gaia',
      gradient: 'from-gaia-500 to-gaia-600'
    },
    {
      id: 'pilgrim',
      icon: Globe,
      title: 'Pilgrim-Band',
      subtitle: 'Wearable Technology',
      description: 'Solarbetriebenes Wearable mit GPS, Gesundheitsmonitoring und Krypto-Wallet.',
      features: ['Offline-Ortung', 'Gesundheitsdaten', 'Notfallfunktionen'],
      color: 'pilgrim',
      gradient: 'from-pilgrim-500 to-pilgrim-600'
    },
    {
      id: 'wayposts',
      icon: Zap,
      title: 'Autonome Wayposts',
      subtitle: 'Infrastruktur-Netzwerk',
      description: '50.000 Container-Module weltweit mit Energie, Wasser und Reparaturmöglichkeiten.',
      features: ['Solarenergie', 'Wasseraufbereitung', 'Reparatur-Kits'],
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'governance',
      icon: Shield,
      title: 'Earth Pilgrim Council',
      subtitle: 'Governance System',
      description: '28 Mitglieder (21 Menschen + 7 KI) für demokratische Entscheidungsfindung.',
      features: ['Liquid Democracy', 'Rotierende Wahl', 'KI-Integration'],
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'ar',
      icon: Cpu,
      title: 'AR-Interface',
      subtitle: 'Erweiterte Realität',
      description: 'Optionale AR-Brillen für lokale Geschichten, Kultur und Gamification.',
      features: ['Story-Badges', 'Kulturelles Erbe', 'Interaktive Erlebnisse'],
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    }
  ]

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
            Technologie-Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ein integriertes Ökosystem aus KI, Blockchain und nachhaltiger Technologie 
            für die größte menschliche Wanderung der Geschichte.
          </p>
        </motion.div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-effect rounded-2xl p-6 h-full hover:scale-105 transition-all duration-300 hologram-effect">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${system.gradient} flex items-center justify-center mb-4 neon-glow group-hover:animate-pulse`}>
                  <system.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                  {system.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {system.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {system.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {system.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (featureIndex * 0.1) }}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${system.color}-400 mr-3`} />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 glass-effect rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gaia-500/5 via-pilgrim-500/5 to-karma-500/5" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-orbitron font-bold text-white mb-8">
              Systemintegration
            </h3>
            
            {/* Connection Diagram */}
            <div className="relative max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-8 items-center">
                {/* KARMA */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-karma-500 to-karma-600 flex items-center justify-center mx-auto mb-3 neon-glow">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-white font-semibold">KARMA</div>
                </motion.div>

                {/* GAIA-OS (Center) */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gaia-500 to-gaia-600 flex items-center justify-center mx-auto mb-3 neon-glow">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-white font-semibold text-lg">GAIA-OS</div>
                </motion.div>

                {/* Pilgrim-Band */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pilgrim-500 to-pilgrim-600 flex items-center justify-center mx-auto mb-3 neon-glow">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-white font-semibold">Pilgrim-Band</div>
                </motion.div>
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                  x1="25%" y1="50%" x2="50%" y2="50%"
                  stroke="url(#gradient1)" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.line
                  x1="50%" y1="50%" x2="75%" y2="50%"
                  stroke="url(#gradient2)" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <p className="text-gray-300 mt-8 max-w-3xl mx-auto">
              Alle Systeme arbeiten nahtlos zusammen: GAIA-OS koordiniert die Routen, 
              das Pilgrim-Band erfasst Daten, und das KARMA-System belohnt positive Aktionen 
              in einem geschlossenen Kreislauf der Nachhaltigkeit.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}