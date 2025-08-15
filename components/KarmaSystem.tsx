'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Lightbulb, Shield, TrendingUp, Award } from 'lucide-react'

export default function KarmaSystem() {
  const [userKarma, setUserKarma] = useState(0)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  useEffect(() => {
    // Simulate karma accumulation
    const timer = setInterval(() => {
      setUserKarma(prev => prev + Math.floor(Math.random() * 5))
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const karmaActions = [
    {
      id: 'walking',
      icon: Users,
      title: 'Wandern',
      description: 'Tägliche Kilometer sammeln',
      reward: '+5 KARMA/km',
      color: 'from-gaia-500 to-gaia-600',
      multiplier: 1.0
    },
    {
      id: 'helping',
      icon: Heart,
      title: 'Helfen',
      description: 'Anderen Pilgern assistieren',
      reward: '+50 KARMA/Hilfe',
      color: 'from-karma-500 to-karma-600',
      multiplier: 2.5
    },
    {
      id: 'ideas',
      icon: Lightbulb,
      title: 'Ideen teilen',
      description: '90-Sekunden-Podcast aufnehmen',
      reward: '+25 KARMA/Idee',
      color: 'from-pilgrim-500 to-pilgrim-600',
      multiplier: 1.8
    },
    {
      id: 'mediation',
      icon: Shield,
      title: 'Konflikte lösen',
      description: 'Mediation zwischen Pilgern',
      reward: '+100 KARMA/Lösung',
      color: 'from-purple-500 to-purple-600',
      multiplier: 4.0
    },
    {
      id: 'sustainability',
      icon: TrendingUp,
      title: 'Nachhaltigkeit',
      description: 'Ressourcen schonen, Müll vermeiden',
      reward: '+15 KARMA/Tag',
      color: 'from-green-500 to-green-600',
      multiplier: 1.2
    },
    {
      id: 'community',
      icon: Award,
      title: 'Gemeinschaft',
      description: 'Wanderstämme organisieren',
      reward: '+75 KARMA/Event',
      color: 'from-blue-500 to-blue-600',
      multiplier: 3.0
    }
  ]

  const karmaLevels = [
    { level: 1, name: 'Neuling', min: 0, max: 100, color: '#6b7280' },
    { level: 2, name: 'Wanderer', min: 100, max: 500, color: '#22c55e' },
    { level: 3, name: 'Helfer', min: 500, max: 1500, color: '#0ea5e9' },
    { level: 4, name: 'Mentor', min: 1500, max: 5000, color: '#d946ef' },
    { level: 5, name: 'Weiser', min: 5000, max: 15000, color: '#f59e0b' },
    { level: 6, name: 'Legende', min: 15000, max: Infinity, color: '#ef4444' }
  ]

  const getCurrentLevel = (karma: number) => {
    return karmaLevels.find(level => karma >= level.min && karma < level.max) || karmaLevels[0]
  }

  const currentLevel = getCurrentLevel(userKarma)
  const nextLevel = karmaLevels.find(level => level.min > userKarma)
  const progress = nextLevel 
    ? ((userKarma - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100

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
            KARMA System
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ein revolutionäres Belohnungssystem, das positive Aktionen fördert 
            und Gemeinschaftsgeist stärkt – ohne Spekulation oder Handel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Karma Balance */}
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-4xl font-orbitron font-bold gradient-text mb-2">
                {userKarma.toLocaleString()}
              </div>
              <div className="text-gray-400 mb-4">KARMA Token</div>
              
              {/* Level Badge */}
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full text-white font-semibold mb-4"
                style={{ backgroundColor: currentLevel.color }}
              >
                Level {currentLevel.level}: {currentLevel.name}
              </div>

              {/* Progress Bar */}
              {nextLevel && (
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-karma-500 to-karma-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              )}
              
              {nextLevel && (
                <div className="text-sm text-gray-400">
                  {nextLevel.min - userKarma} KARMA bis Level {nextLevel.level}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Letzte Aktivitäten
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Wandern', karma: '+25', time: 'vor 2 Min' },
                  { action: 'Helfen', karma: '+50', time: 'vor 15 Min' },
                  { action: 'Idee geteilt', karma: '+25', time: 'vor 1 Std' },
                  { action: 'Nachhaltigkeit', karma: '+15', time: 'vor 3 Std' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                  >
                    <div>
                      <div className="text-white text-sm">{activity.action}</div>
                      <div className="text-gray-400 text-xs">{activity.time}</div>
                    </div>
                    <div className="text-gaia-400 font-semibold">
                      {activity.karma}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Karma Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {karmaActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300
                    hover:scale-105 hologram-effect
                    ${selectedAction === action.id ? 'ring-2 ring-karma-400' : ''}
                  `}
                  onClick={() => setSelectedAction(action.id)}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 neon-glow`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm">
                    {action.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-karma-400 font-semibold">
                      {action.reward}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <TrendingUp size={12} className="mr-1" />
                      {action.multiplier}x
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* KARMA Principles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6 text-center">
                KARMA Prinzipien
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gaia-500 to-gaia-600 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Nicht handelbar</h4>
                  <p className="text-gray-400 text-sm">
                    KARMA kann nicht gekauft, verkauft oder übertragen werden
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pilgrim-500 to-pilgrim-600 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Gemeinschaftlich</h4>
                  <p className="text-gray-400 text-sm">
                    Belohnt Aktionen, die der Gemeinschaft zugutekommen
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-karma-500 to-karma-600 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Transparent</h4>
                  <p className="text-gray-400 text-sm">
                    Alle Transaktionen sind nachvollziehbar und fair
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Global KARMA Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-orbitron font-bold text-white mb-8 text-center">
            Globale KARMA Statistiken
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-gaia-400 mb-2">
                847B
              </div>
              <div className="text-gray-400">Gesamt KARMA</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-pilgrim-400 mb-2">
                2.3M
              </div>
              <div className="text-gray-400">Tägliche Aktionen</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-karma-400 mb-2">
                156K
              </div>
              <div className="text-gray-400">Konflikte gelöst</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-green-400 mb-2">
                98.7%
              </div>
              <div className="text-gray-400">Zufriedenheit</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}