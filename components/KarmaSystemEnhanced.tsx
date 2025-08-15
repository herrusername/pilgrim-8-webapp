'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, Lightbulb, Shield, TrendingUp, Award, Brain, Plus, Calculator, Zap, Star, Globe, Leaf } from 'lucide-react'
import { deepSeekService } from '../lib/ai-services'

interface KarmaAction {
  id: string;
  title: string;
  description: string;
  category: string;
  basePoints: number;
  icon: any;
  color: string;
  aiScore?: any;
}

export default function KarmaSystemEnhanced() {
  const [userKarma, setUserKarma] = useState(15420)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [newAction, setNewAction] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Nachhaltigkeit')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showNewActionForm, setShowNewActionForm] = useState(false)
  const [recentActions, setRecentActions] = useState<any[]>([])

  useEffect(() => {
    // Simulate karma accumulation
    const timer = setInterval(() => {
      setUserKarma(prev => prev + Math.floor(Math.random() * 5))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const karmaActions: KarmaAction[] = [
    {
      id: 'sustainability',
      title: 'Nachhaltiges Handeln',
      description: 'Umweltfreundliche Aktionen und Ressourcenschonung',
      category: 'Nachhaltigkeit',
      basePoints: 150,
      icon: Leaf,
      color: 'text-green-400'
    },
    {
      id: 'education',
      title: 'Wissen teilen',
      description: 'Bildung und Wissensvermittlung in der Community',
      category: 'Bildung',
      basePoints: 120,
      icon: Lightbulb,
      color: 'text-blue-400'
    },
    {
      id: 'community',
      title: 'Gemeinschaft stärken',
      description: 'Soziale Projekte und Zusammenhalt fördern',
      category: 'Gemeinschaft',
      basePoints: 100,
      icon: Users,
      color: 'text-purple-400'
    },
    {
      id: 'innovation',
      title: 'Innovation vorantreiben',
      description: 'Technologische Lösungen für gesellschaftliche Probleme',
      category: 'Innovation',
      basePoints: 180,
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      id: 'culture',
      title: 'Kultureller Austausch',
      description: 'Brücken zwischen Kulturen bauen',
      category: 'Kultur',
      basePoints: 110,
      icon: Globe,
      color: 'text-pink-400'
    },
    {
      id: 'health',
      title: 'Gesundheit fördern',
      description: 'Körperliche und mentale Gesundheit unterstützen',
      category: 'Gesundheit',
      basePoints: 140,
      icon: Heart,
      color: 'text-red-400'
    }
  ]

  const categories = ['Nachhaltigkeit', 'Bildung', 'Gemeinschaft', 'Innovation', 'Kultur', 'Gesundheit']

  const handleActionSubmit = async () => {
    if (!newAction.trim()) return

    setIsCalculating(true)
    try {
      const karmaScore = await deepSeekService.calculateKarmaScore(newAction, selectedCategory)
      
      const action = {
        id: Date.now(),
        title: newAction.split('.')[0] || 'Neue Aktion',
        description: newAction,
        category: selectedCategory,
        timestamp: new Date(),
        aiScore: karmaScore
      }

      setRecentActions(prev => [action, ...prev.slice(0, 4)])
      setUserKarma(prev => prev + karmaScore.totalPoints)
      setNewAction('')
      setShowNewActionForm(false)
    } catch (error) {
      console.error('Error calculating karma:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const getKarmaLevel = (karma: number) => {
    if (karma < 1000) return { level: 'Neuling', color: 'text-gray-400', progress: karma / 1000 }
    if (karma < 5000) return { level: 'Pilger', color: 'text-blue-400', progress: (karma - 1000) / 4000 }
    if (karma < 15000) return { level: 'Wegweiser', color: 'text-green-400', progress: (karma - 5000) / 10000 }
    if (karma < 50000) return { level: 'Mentor', color: 'text-purple-400', progress: (karma - 15000) / 35000 }
    return { level: 'Visionär', color: 'text-yellow-400', progress: 1 }
  }

  const karmaLevel = getKarmaLevel(userKarma)

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
          KI-Gestütztes KARMA System
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Belohnungen für positive Aktionen mit DeepSeek AI-Bewertung und intelligenter Punktevergabe
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* User Karma Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 mb-12 text-center"
        >
          <div className="flex items-center justify-center space-x-8">
            <div>
              <motion.div
                className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {userKarma.toLocaleString()}
              </motion.div>
              <div className="text-gray-400 text-lg">KARMA Punkte</div>
            </div>
            
            <div className="w-px h-20 bg-gray-600" />
            
            <div>
              <div className={`text-2xl font-bold ${karmaLevel.color} mb-2`}>
                {karmaLevel.level}
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-3 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${karmaLevel.progress * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="text-gray-400 text-sm">Nächstes Level</div>
            </div>
          </div>
        </motion.div>

        {/* New Action Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowNewActionForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Plus className="mr-2" size={20} />
            Neue Aktion bewerten lassen
          </button>
        </div>

        {/* New Action Form */}
        <AnimatePresence>
          {showNewActionForm && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-8 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Neue KARMA-Aktion einreichen</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Kategorie auswählen</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Beschreibung der Aktion</label>
                  <textarea
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="Beschreiben Sie Ihre positive Aktion für die PILGRIM-8 Community..."
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-4 h-32 resize-none focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleActionSubmit}
                  disabled={!newAction.trim() || isCalculating}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isCalculating ? (
                    <>
                      <Brain className="mr-2 animate-spin" size={16} />
                      AI bewertet...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2" size={16} />
                      KARMA berechnen
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowNewActionForm(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Karma Actions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">KARMA Kategorien</h3>
            <div className="grid gap-4">
              {karmaActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedAction(action.id)}
                  className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedAction === action.id 
                      ? 'border-purple-400/50 shadow-lg shadow-purple-400/20' 
                      : 'border-purple-500/30 hover:border-purple-400/40'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center ${action.color}`}>
                      <action.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">{action.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{action.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-yellow-400 font-semibold">{action.basePoints} Basis-Punkte</span>
                        <span className="text-gray-400 text-sm">Kategorie: {action.category}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Actions & AI Scores */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Kürzliche Aktionen</h3>
            
            {recentActions.length > 0 ? (
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-white">{action.title}</h4>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">+{action.aiScore.totalPoints}</div>
                        <div className="text-xs text-gray-400">KARMA</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4">{action.description}</p>
                    
                    {/* AI Analysis */}
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                      <h5 className="text-purple-400 font-semibold mb-2 flex items-center">
                        <Brain className="mr-2" size={16} />
                        DeepSeek AI-Bewertung
                      </h5>
                      <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-400">{action.aiScore.score}</div>
                          <div className="text-xs text-gray-400">Basis-Score</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-400">×{action.aiScore.multiplier}</div>
                          <div className="text-xs text-gray-400">Multiplikator</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-400">{action.aiScore.totalPoints}</div>
                          <div className="text-xs text-gray-400">Gesamt</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{action.aiScore.explanation}</p>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-3">
                      {action.timestamp.toLocaleString('de-DE')}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 text-center">
                <Star className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 mb-4">Noch keine Aktionen bewertet</p>
                <p className="text-gray-500 text-sm">Reichen Sie Ihre erste positive Aktion ein, um KARMA-Punkte zu sammeln!</p>
              </div>
            )}

            {/* Leaderboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="mr-2" />
                Top KARMA Sammler
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                    <span className="text-white">Maya Chen</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">47,892</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                    <span className="text-white">Carlos Rivera</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">43,156</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                    <span className="text-white">Amara Okafor</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">38,947</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">47</div>
                      <span className="text-purple-400">Du</span>
                    </div>
                    <span className="text-yellow-400 font-semibold">{userKarma.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}