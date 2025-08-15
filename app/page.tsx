'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import VisionSection from '@/components/VisionSection'
import SystemsOverview from '@/components/SystemsOverview'
import Interactive3DMap from '@/components/Interactive3DMap'
import KarmaSystemEnhanced from '@/components/KarmaSystemEnhanced'
import GaiaOS from '@/components/GaiaOS'
import Timeline from '@/components/Timeline'
import GovernanceEnhanced from '@/components/GovernanceEnhanced'
import PilgrimProfiles from '@/components/PilgrimProfiles'
import Chatbot from '@/components/Chatbot'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const sections = [
    { id: 'hero', component: HeroSection },
    { id: 'vision', component: VisionSection },
    { id: 'systems', component: SystemsOverview },
    { id: 'map', component: Interactive3DMap },
    { id: 'profiles', component: PilgrimProfiles },
    { id: 'karma', component: KarmaSystemEnhanced },
    { id: 'gaia', component: GaiaOS },
    { id: 'timeline', component: Timeline },
    { id: 'governance', component: GovernanceEnhanced },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl font-orbitron gradient-text mb-4">
            PILGRIM-8
          </div>
          <div className="text-gaia-400 text-xl">
            Initialisiere die Zukunft...
          </div>
          <motion.div
            className="w-64 h-1 bg-gradient-to-r from-gaia-500 to-pilgrim-500 mt-8 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 256 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
        sections={sections.map(s => s.id)}
      />
      
      <AnimatePresence mode="wait">
        {sections.map(({ id, component: Component }) => (
          currentSection === id && (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen"
            >
              <Component />
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* AI Chatbot - Always visible */}
      <Chatbot />
    </main>
  )
}