'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Brain, Vote, Shield, Globe, Zap, CheckCircle, Clock, MessageSquare, TrendingUp, Lightbulb, Target } from 'lucide-react'
import { deepSeekService } from '../lib/ai-services'

export default function Governance() {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null)
  const [votingPower, setVotingPower] = useState(1247)
  const [newProposal, setNewProposal] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showNewProposalForm, setShowNewProposalForm] = useState(false)
  const [proposals, setProposals] = useState(activeProposals)

  const councilMembers = [
    { type: 'human', name: 'Dr. Elena Vasquez', region: 'Europa', expertise: 'Klimawissenschaft' },
    { type: 'human', name: 'Kenji Nakamura', region: 'Asien', expertise: 'Technologie' },
    { type: 'human', name: 'Amara Okafor', region: 'Afrika', expertise: 'Soziologie' },
    { type: 'human', name: 'Marcus Thompson', region: 'Nordamerika', expertise: 'Ökonomie' },
    { type: 'ai', name: 'GAIA-Alpha', specialization: 'Routenoptimierung', confidence: 97.3 },
    { type: 'ai', name: 'KARMA-Beta', specialization: 'Soziale Dynamik', confidence: 94.8 },
    { type: 'ai', name: 'ECO-Gamma', specialization: 'Umweltschutz', confidence: 98.1 }
  ]

  const activeProposals = [
    {
      id: 1,
      title: 'Neue Waypost-Standorte in der Sahara',
      description: 'Errichtung von 500 zusätzlichen Wayposts für bessere Abdeckung in Nordafrika',
      category: 'Infrastruktur',
      votes: { yes: 6847392, no: 1293847, abstain: 847293 },
      timeLeft: '2 Tage',
      status: 'active',
      impact: 'hoch'
    },
    {
      id: 2,
      title: 'Temporäre Sperrzone Amazonas',
      description: 'Schutz des Regenwaldes durch 6-monatige Wanderungspause',
      category: 'Umwelt',
      votes: { yes: 7293847, no: 847392, abstain: 293847 },
      timeLeft: '5 Tage',
      status: 'active',
      impact: 'kritisch'
    },
    {
      id: 3,
      title: 'KI-Voting-Gewichtung anpassen',
      description: 'Reduzierung des KI-Stimmanteils von 25% auf 20%',
      category: 'Governance',
      votes: { yes: 4847392, no: 3293847, abstain: 1847293 },
      timeLeft: '1 Tag',
      status: 'critical',
      impact: 'mittel'
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'kritisch': return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'hoch': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'mittel': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    }
  }

  const getTotalVotes = (votes: any) => votes.yes + votes.no + votes.abstain

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
            Governance
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Demokratische Entscheidungsfindung durch das Earth Pilgrim Council – 
            eine einzigartige Symbiose aus menschlicher Weisheit und KI-Intelligenz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Council Overview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Council Composition */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Earth Pilgrim Council
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Menschen</span>
                  <span className="text-gaia-400 font-semibold">21</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">KI-Instanzen</span>
                  <span className="text-pilgrim-400 font-semibold">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gesamt</span>
                  <span className="text-karma-400 font-semibold">28</span>
                </div>
              </div>

              <div className="space-y-2">
                {councilMembers.slice(0, 7).map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      member.type === 'human' 
                        ? 'bg-gradient-to-r from-gaia-500 to-gaia-600' 
                        : 'bg-gradient-to-r from-pilgrim-500 to-pilgrim-600'
                    }`}>
                      {member.type === 'human' ? (
                        <Users className="w-4 h-4 text-white" />
                      ) : (
                        <Brain className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">
                        {member.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {member.type === 'human' ? member.expertise : `${member.confidence}% Vertrauen`}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Voting Power */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Vote className="w-5 h-5 mr-2" />
                Ihre Stimmmacht
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-orbitron font-bold text-karma-400 mb-2">
                  {votingPower.toLocaleString()}
                </div>
                <div className="text-gray-400">KARMA-basierte Stimmen</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Basis-Stimme</span>
                  <span className="text-white">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">KARMA-Bonus</span>
                  <span className="text-white">+{(votingPower - 1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delegierte Stimmen</span>
                  <span className="text-white">847</span>
                </div>
              </div>
            </div>

            {/* Liquid Democracy */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Liquid Democracy
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Übertragen Sie Ihre Stimme an Experten oder stimmen Sie direkt ab.
              </p>
              <div className="space-y-2">
                <button className="w-full p-2 bg-gaia-500/20 border border-gaia-500/30 rounded-lg text-gaia-400 text-sm hover:bg-gaia-500/30 transition-colors">
                  Stimme delegieren
                </button>
                <button className="w-full p-2 bg-pilgrim-500/20 border border-pilgrim-500/30 rounded-lg text-pilgrim-400 text-sm hover:bg-pilgrim-500/30 transition-colors">
                  Direkt abstimmen
                </button>
              </div>
            </div>
          </motion.div>

          {/* Active Proposals */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-orbitron font-bold text-white">
                Aktive Abstimmungen
              </h3>
              <div className="text-sm text-gray-400">
                {activeProposals.length} Vorschläge
              </div>
            </div>

            {activeProposals.map((proposal, index) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300
                  hover:scale-[1.02] hologram-effect
                  ${selectedProposal === proposal.id ? 'ring-2 ring-karma-400' : ''}
                `}
                onClick={() => setSelectedProposal(proposal.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">
                        {proposal.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getImpactColor(proposal.impact)}`}>
                        {proposal.impact}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {proposal.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {proposal.timeLeft}
                      </span>
                      <span>{proposal.category}</span>
                    </div>
                  </div>
                </div>

                {/* Voting Results */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Abstimmungsergebnis</span>
                    <span>{getTotalVotes(proposal.votes).toLocaleString()} Stimmen</span>
                  </div>
                  
                  {/* Yes Votes */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">Ja</span>
                      <span className="text-white">{proposal.votes.yes.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${(proposal.votes.yes / getTotalVotes(proposal.votes)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* No Votes */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-400">Nein</span>
                      <span className="text-white">{proposal.votes.no.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-red-500 rounded-full"
                        style={{ width: `${(proposal.votes.no / getTotalVotes(proposal.votes)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Abstain Votes */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Enthaltung</span>
                      <span className="text-white">{proposal.votes.abstain.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-gray-500 rounded-full"
                        style={{ width: `${(proposal.votes.abstain / getTotalVotes(proposal.votes)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button className="flex-1 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm hover:bg-green-500/30 transition-colors">
                    Ja stimmen
                  </button>
                  <button className="flex-1 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm hover:bg-red-500/30 transition-colors">
                    Nein stimmen
                  </button>
                  <button className="flex-1 py-2 bg-gray-500/20 border border-gray-500/30 rounded-lg text-gray-400 text-sm hover:bg-gray-500/30 transition-colors">
                    Enthalten
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Governance Principles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-orbitron font-bold text-white mb-8 text-center">
            Governance-Prinzipien
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gaia-500 to-gaia-600 flex items-center justify-center mx-auto mb-4 neon-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Transparenz
              </h4>
              <p className="text-gray-400 text-sm">
                Alle Entscheidungen sind öffentlich nachvollziehbar und 
                werden in der Blockchain dokumentiert.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pilgrim-500 to-pilgrim-600 flex items-center justify-center mx-auto mb-4 neon-glow">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Inklusion
              </h4>
              <p className="text-gray-400 text-sm">
                Jeder Pilger hat eine Stimme, unabhängig von Herkunft, 
                Status oder geografischer Lage.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-karma-500 to-karma-600 flex items-center justify-center mx-auto mb-4 neon-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Effizienz
              </h4>
              <p className="text-gray-400 text-sm">
                KI-unterstützte Entscheidungsfindung beschleunigt 
                Prozesse ohne menschliche Weisheit zu ersetzen.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}