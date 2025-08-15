'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Zap, Globe, Brain, CheckCircle } from 'lucide-react'

export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState(1)

  const timelineData = [
    {
      year: 1,
      title: 'Boot-Phase',
      subtitle: 'Der Beginn der Reise',
      description: 'Freiwillige 20% der Weltbevölkerung starten die Wanderung. Erste Wayposts werden aktiviert.',
      icon: Users,
      color: 'from-gaia-500 to-gaia-600',
      milestones: [
        'Lotterie-System für Teilnehmer',
        'Erste 10,000 Wayposts online',
        'KARMA-System Beta-Test',
        'Pilgrim-Band Verteilung',
        'Erste Wanderstämme bilden sich'
      ],
      stats: {
        pilgrims: '1.6B',
        wayposts: '10K',
        distance: '2.5B km',
        karma: '125M'
      }
    },
    {
      year: 2,
      title: 'Globaler Roll-out',
      subtitle: 'Weltweite Expansion',
      description: 'Alle Menschen beginnen zu wandern. Flugverkehr wird auf 10% reduziert.',
      icon: Globe,
      color: 'from-pilgrim-500 to-pilgrim-600',
      milestones: [
        'Vollständige Teilnahme erreicht',
        'Flugverkehr drastisch reduziert',
        '30,000 Wayposts aktiv',
        'Erste Hochgeschwindigkeits-Schiffsrouten',
        'AR-Brillen eingeführt'
      ],
      stats: {
        pilgrims: '8B',
        wayposts: '30K',
        distance: '12B km',
        karma: '2.1B'
      }
    },
    {
      year: 3,
      title: 'Verdichtung',
      subtitle: 'Optimierung und Lernen',
      description: 'KI-optimierte Routen entstehen. Wanderstämme kreuzen sich für gemeinsame Projekte.',
      icon: Brain,
      color: 'from-karma-500 to-karma-600',
      milestones: [
        'GAIA-OS vollständig aktiv',
        'Skill-basierte Routenoptimierung',
        '45,000 Wayposts weltweit',
        'Mobile Bildungsprogramme',
        'Erste Aufforstungsprojekte'
      ],
      stats: {
        pilgrims: '8B',
        wayposts: '45K',
        distance: '18B km',
        karma: '5.7B'
      }
    },
    {
      year: 4,
      title: 'Symbiosis-Test',
      subtitle: 'Harmonie mit der Natur',
      description: 'Intensive Zusammenarbeit zwischen Mensch, KI und Natur. Ökosysteme beginnen sich zu erholen.',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      milestones: [
        'Ökosystem-Regeneration messbar',
        'CO₂-Emissionen um 60% reduziert',
        '50,000 Wayposts vollständig',
        'Globale Hackathons',
        'Erste Re-Root Diskussionen'
      ],
      stats: {
        pilgrims: '8B',
        wayposts: '50K',
        distance: '24B km',
        karma: '12.3B'
      }
    },
    {
      year: 5,
      title: 'Entscheidungsphase',
      subtitle: 'Die Zukunft wählen',
      description: '30-Tage-Pause für globale Entscheidung: Freeze, Re-Root oder Perma-Pilgrim?',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      milestones: [
        '30-Tage-Global-Pause',
        'Weltweite Abstimmung',
        'Drei Zukunftsszenarien',
        'Earth Pilgrim Council Entscheidung',
        'Neue Ära beginnt'
      ],
      stats: {
        pilgrims: '8B',
        wayposts: '50K',
        distance: '30B km',
        karma: '25B'
      }
    }
  ]

  const currentData = timelineData[selectedYear - 1]

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
            5-Jahres Timeline
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Die Evolution von PILGRIM-8: Von den ersten Schritten bis zur 
            Transformation der menschlichen Gesellschaft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Timeline Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-6">
                Jahre
              </h3>
              <div className="space-y-4">
                {timelineData.map((data, index) => (
                  <motion.button
                    key={data.year}
                    onClick={() => setSelectedYear(data.year)}
                    className={`
                      w-full text-left p-4 rounded-xl transition-all duration-300
                      ${selectedYear === data.year 
                        ? 'bg-gradient-to-r from-gaia-500/20 to-pilgrim-500/20 border border-gaia-400/50' 
                        : 'bg-white/5 hover:bg-white/10'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-full bg-gradient-to-r ${data.color} 
                        flex items-center justify-center
                        ${selectedYear === data.year ? 'neon-glow' : ''}
                      `}>
                        <data.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Jahr {data.year}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {data.title}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline Content */}
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Year Header */}
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentData.color} flex items-center justify-center neon-glow`}>
                  <currentData.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-orbitron font-bold text-white">
                    Jahr {currentData.year}: {currentData.title}
                  </h3>
                  <p className="text-xl text-gray-400">
                    {currentData.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {currentData.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-effect rounded-xl p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-gaia-400 mb-1">
                  {currentData.stats.pilgrims}
                </div>
                <div className="text-gray-400 text-sm">Pilger</div>
              </div>
              <div className="glass-effect rounded-xl p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-pilgrim-400 mb-1">
                  {currentData.stats.wayposts}
                </div>
                <div className="text-gray-400 text-sm">Wayposts</div>
              </div>
              <div className="glass-effect rounded-xl p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-karma-400 mb-1">
                  {currentData.stats.distance}
                </div>
                <div className="text-gray-400 text-sm">Distanz</div>
              </div>
              <div className="glass-effect rounded-xl p-4 text-center">
                <div className="text-2xl font-orbitron font-bold text-green-400 mb-1">
                  {currentData.stats.karma}
                </div>
                <div className="text-gray-400 text-sm">KARMA</div>
              </div>
            </div>

            {/* Milestones */}
            <div className="glass-effect rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-white mb-6">
                Wichtige Meilensteine
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentData.milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-gaia-400 flex-shrink-0" />
                    <span className="text-gray-300">{milestone}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="glass-effect rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-white mb-6">
                Fortschritt
              </h4>
              <div className="relative">
                <div className="flex justify-between mb-4">
                  {timelineData.map((data, index) => (
                    <div
                      key={data.year}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${index < selectedYear 
                          ? 'bg-gaia-500 text-white' 
                          : index === selectedYear - 1
                          ? 'bg-gradient-to-r from-gaia-500 to-pilgrim-500 text-white neon-glow'
                          : 'bg-gray-600 text-gray-400'
                        }
                      `}
                    >
                      {data.year}
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-gray-700 rounded-full">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-gaia-500 to-pilgrim-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedYear / 5) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Start</span>
                  <span>Transformation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Future Scenarios */}
        {selectedYear === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 glass-effect rounded-2xl p-8"
          >
            <h3 className="text-2xl font-orbitron font-bold text-white mb-8 text-center">
              Drei Zukunftsszenarien
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">
                  A) Freeze
                </h4>
                <p className="text-gray-300 text-sm">
                  Große Stille-Reservate für 100-jährige Regeneration. 
                  Pilger bleiben auf dem Rest der Erde mobil.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">
                  B) Re-Root
                </h4>
                <p className="text-gray-300 text-sm">
                  KI-gestützte Umverteilung für gerechte und ökologische 
                  Neuansiedlung der Menschheit.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">
                  C) Perma-Pilgrim
                </h4>
                <p className="text-gray-300 text-sm">
                  20% bleiben nomadisch, 80% kehren in nachhaltige 
                  Mischformen zurück.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}