'use client'

import { motion } from 'framer-motion'
import { Eye, Heart, Brain, Leaf, Users, Globe } from 'lucide-react'

export default function VisionSection() {
  const visionPoints = [
    {
      icon: Globe,
      title: "Globale Bewegung",
      description: "8 Milliarden Menschen setzen sich in Bewegung und durchbrechen traditionelle Barrieren durch tägliche, physische Wanderung.",
      color: "from-gaia-500 to-gaia-600"
    },
    {
      icon: Heart,
      title: "Gemeinschaftsgefühl",
      description: "Kontinuierliches Unterwegssein fördert gesteigertes Gemeinschaftsgefühl und mindert Fremdenfeindlichkeit.",
      color: "from-karma-500 to-karma-600"
    },
    {
      icon: Brain,
      title: "Neues Bewusstsein",
      description: "Der Weg wird zum ständigen Lern- und Reflexionsraum für ein neues Verhältnis zur Natur und den eigenen Grenzen.",
      color: "from-pilgrim-500 to-pilgrim-600"
    },
    {
      icon: Leaf,
      title: "Ökologische Transformation",
      description: "Nach 1.825 Tagen ist die Menschheit in sozialen, ökologischen und technologischen Prozessen grundlegend verändert.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Soziale Innovation",
      description: "Lösung bisheriger Probleme wie Ungleichverteilung von Ressourcen, Massenkonsum und gesellschaftliche Isolation.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Eye,
      title: "Langzeitvision",
      description: "Möglichkeit einer dauerhaft mobileren Existenz oder bewusste Neuverwurzelung in nachhaltiger Form.",
      color: "from-purple-500 to-purple-600"
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
            Vision
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            PILGRIM-8 ist mehr als eine Wanderung – es ist eine radikale Neuerfindung 
            der menschlichen Gesellschaft durch Bewegung, Begegnung und bewusste Transformation.
          </p>
        </motion.div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform duration-300 hologram-effect"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${point.color} flex items-center justify-center mb-4 neon-glow`}>
                <point.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {point.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Central Vision Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gaia-500/10 via-pilgrim-500/10 to-karma-500/10" />
          <div className="relative z-10">
            <h3 className="text-3xl font-orbitron font-bold text-white mb-6">
              Der Improvisationsraum der Menschheit
            </h3>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Diese globale Wanderkarawane schafft permanent neue Begegnungen, löst gewohnte 
              Routinen auf und ermöglicht eine Art „Neustart" in vielen Lebensbereichen – 
              von Ernährung über Bildung bis zu politischer Teilhabe.
            </p>
            
            {/* Animated Elements */}
            <div className="flex justify-center space-x-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-gaia-400 rounded-full flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-gaia-400 rounded-full" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-pilgrim-400 rounded-full flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-pilgrim-400 rounded-full" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-karma-400 rounded-full flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-karma-400 rounded-full" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <blockquote className="text-2xl font-light text-gray-300 italic max-w-3xl mx-auto">
            "Menschen werden nicht mehr nur als Fremde gesehen, 
            sondern als Mitreisende auf dem Weg zu einer besseren Zukunft."
          </blockquote>
          <div className="mt-4 text-gaia-400 font-semibold">
            — PILGRIM-8 Manifest
          </div>
        </motion.div>
      </div>
    </section>
  )
}