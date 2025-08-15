'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Globe, Users, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="cyber-grid h-full w-full" />
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-gaia-500/20 to-pilgrim-500/20 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-r from-karma-500/20 to-gaia-500/20 blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-orbitron font-bold gradient-text mb-4">
            PILGRIM-8
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 font-light">
            Die Zukunft der Menschheit beginnt mit einem Schritt
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Eine visionäre 5-Jahres-Wanderung von 8 Milliarden Menschen zur Neugestaltung 
            unserer Gesellschaft, unterstützt von KI-Systemen und nachhaltigen Technologien.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="glass-effect rounded-2xl p-6 hologram-effect">
            <Globe className="w-12 h-12 text-gaia-400 mx-auto mb-4" />
            <div className="text-3xl font-orbitron font-bold text-white mb-2">8B+</div>
            <div className="text-gray-400">Menschen in Bewegung</div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 hologram-effect">
            <Users className="w-12 h-12 text-pilgrim-400 mx-auto mb-4" />
            <div className="text-3xl font-orbitron font-bold text-white mb-2">1,825</div>
            <div className="text-gray-400">Tage der Transformation</div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 hologram-effect">
            <Zap className="w-12 h-12 text-karma-400 mx-auto mb-4" />
            <div className="text-3xl font-orbitron font-bold text-white mb-2">∞</div>
            <div className="text-gray-400">Möglichkeiten</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <button className="
            group relative px-8 py-4 bg-gradient-to-r from-gaia-500 to-pilgrim-500
            rounded-full text-white font-semibold text-lg
            hover:shadow-2xl hover:shadow-gaia-500/25
            transition-all duration-300 transform hover:scale-105
            neon-glow
          ">
            <span className="flex items-center gap-3">
              Die Reise beginnen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gaia-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gaia-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}