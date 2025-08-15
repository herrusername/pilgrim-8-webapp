'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Users, TrendingUp, CheckCircle, Clock, MessageSquare, BarChart3, Brain, Lightbulb, Target } from 'lucide-react';
import { deepSeekService } from '../lib/ai-services';

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: { for: number; against: number; abstain: number };
  status: string;
  timeLeft: string;
  category: string;
  aiAnalysis?: any;
}

const GovernanceEnhanced: React.FC = () => {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [newProposal, setNewProposal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Globales Bildungsnetzwerk",
      description: "Aufbau eines dezentralen Bildungssystems für alle Pilger mit KI-gestützten Lernpfaden",
      votes: { for: 15420, against: 3240, abstain: 1890 },
      status: "Aktiv",
      timeLeft: "5 Tage",
      category: "Bildung"
    },
    {
      id: 2,
      title: "Nachhaltige Energieinfrastruktur",
      description: "Implementierung erneuerbarer Energien entlang der Pilgerwege mit Smart-Grid-Technologie",
      votes: { for: 18750, against: 2100, abstain: 2450 },
      status: "Aktiv",
      timeLeft: "12 Tage",
      category: "Umwelt"
    },
    {
      id: 3,
      title: "Digitale KARMA-Währung",
      description: "Einführung einer blockchain-basierten KARMA-Währung für nachhaltiges Handeln",
      votes: { for: 12890, against: 8760, abstain: 3210 },
      status: "Diskussion",
      timeLeft: "18 Tage",
      category: "Technologie"
    }
  ]);

  const getVotePercentage = (votes: any, type: 'for' | 'against' | 'abstain') => {
    const total = votes.for + votes.against + votes.abstain;
    return ((votes[type] / total) * 100).toFixed(1);
  };

  const handleProposalAnalysis = async (proposal: Proposal) => {
    if (proposal.aiAnalysis) return; // Already analyzed

    setIsAnalyzing(true);
    try {
      const analysis = await deepSeekService.generateGovernanceAnalysis(
        `${proposal.title}: ${proposal.description}`
      );
      
      setProposals(prev => prev.map(p => 
        p.id === proposal.id 
          ? { ...p, aiAnalysis: analysis }
          : p
      ));
    } catch (error) {
      console.error('Error analyzing proposal:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewProposal = async () => {
    if (!newProposal.trim()) return;

    setIsAnalyzing(true);
    try {
      const analysis = await deepSeekService.generateGovernanceAnalysis(newProposal);
      
      const proposal: Proposal = {
        id: Date.now(),
        title: newProposal.split('.')[0] || 'Neuer Vorschlag',
        description: newProposal,
        votes: { for: 0, against: 0, abstain: 0 },
        status: 'Neu',
        timeLeft: '30 Tage',
        category: 'Community',
        aiAnalysis: analysis
      };

      setProposals(prev => [proposal, ...prev]);
      setNewProposal('');
      setShowNewProposalForm(false);
      setSelectedProposal(proposal.id);
    } catch (error) {
      console.error('Error creating proposal:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedProposalData = proposals.find(p => p.id === selectedProposal);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-green-900/20 to-black relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          KI-Gestützte Governance
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Demokratische Entscheidungsfindung mit DeepSeek AI-Analyse für die PILGRIM-8 Gemeinschaft
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">8.2M</div>
            <div className="text-sm text-gray-400">Wahlberechtigte</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center">
            <Vote className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{proposals.length}</div>
            <div className="text-sm text-gray-400">Aktive Abstimmungen</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 text-center">
            <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-sm text-gray-400">DeepSeek Analyse</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">156</div>
            <div className="text-sm text-gray-400">Umgesetzte Vorschläge</div>
          </div>
        </motion.div>

        {/* New Proposal Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowNewProposalForm(true)}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Lightbulb className="mr-2" size={20} />
            Neuen Vorschlag einreichen
          </button>
        </div>

        {/* New Proposal Form */}
        <AnimatePresence>
          {showNewProposalForm && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-8 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Neuen Governance-Vorschlag erstellen</h3>
              <textarea
                value={newProposal}
                onChange={(e) => setNewProposal(e.target.value)}
                placeholder="Beschreiben Sie Ihren Vorschlag für die PILGRIM-8 Community..."
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-xl p-4 h-32 resize-none focus:outline-none focus:border-green-500 transition-colors"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleNewProposal}
                  disabled={!newProposal.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 animate-spin" size={16} />
                      AI analysiert...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2" size={16} />
                      Vorschlag einreichen
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowNewProposalForm(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proposals Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Proposals List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Aktuelle Vorschläge</h3>
            {proposals.map((proposal, index) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedProposal(proposal.id);
                  handleProposalAnalysis(proposal);
                }}
                className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedProposal === proposal.id 
                    ? 'border-green-400/50 shadow-lg shadow-green-400/20' 
                    : 'border-green-500/30 hover:border-green-400/40'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-white">{proposal.title}</h4>
                      {proposal.aiAnalysis && (
                        <Brain className="w-4 h-4 text-purple-400" title="AI-Analyse verfügbar" />
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{proposal.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        proposal.status === 'Aktiv' 
                          ? 'bg-green-500/20 text-green-400'
                          : proposal.status === 'Neu'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {proposal.status}
                      </span>
                      <span className="text-gray-400 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {proposal.timeLeft}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vote Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Dafür: {getVotePercentage(proposal.votes, 'for')}%</span>
                    <span className="text-red-400">Dagegen: {getVotePercentage(proposal.votes, 'against')}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{ width: `${getVotePercentage(proposal.votes, 'for')}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    {(proposal.votes.for + proposal.votes.against + proposal.votes.abstain).toLocaleString()} Stimmen
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed View */}
          <div className="space-y-6">
            {selectedProposalData ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Proposal Details */}
                <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{selectedProposalData.title}</h3>
                  
                  {/* AI Analysis */}
                  {selectedProposalData.aiAnalysis && (
                    <div className="mb-6 bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <Brain className="mr-2" size={20} />
                        DeepSeek AI-Analyse
                      </h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-400">{selectedProposalData.aiAnalysis.feasibility}%</div>
                            <div className="text-xs text-gray-400">Machbarkeit</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-400">{selectedProposalData.aiAnalysis.impact}%</div>
                            <div className="text-xs text-gray-400">Impact</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-400">{selectedProposalData.aiAnalysis.support}%</div>
                            <div className="text-xs text-gray-400">Community Support</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300 bg-black/30 rounded-lg p-3">
                          {selectedProposalData.aiAnalysis.analysis}
                        </div>
                        <div className="text-xs text-gray-400">
                          Geschätzte Umsetzungszeit: {selectedProposalData.aiAnalysis.timeline}
                        </div>
                      </div>
                    </div>
                  )}

                  {isAnalyzing && selectedProposal === selectedProposalData.id && (
                    <div className="mb-6 bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 text-center">
                      <Brain className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-2" />
                      <p className="text-purple-400">DeepSeek AI analysiert den Vorschlag...</p>
                    </div>
                  )}
                  
                  {/* Voting Interface */}
                  <div className="space-y-4 mb-6">
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                      ✓ Dafür stimmen
                    </button>
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                      ✗ Dagegen stimmen
                    </button>
                    <button className="w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                      ○ Enthalten
                    </button>
                  </div>

                  {/* Vote Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Stimmenverteilung</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-green-400">Dafür</span>
                        <span className="text-white">{selectedProposalData.votes.for.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-400">Dagegen</span>
                        <span className="text-white">{selectedProposalData.votes.against.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Enthalten</span>
                        <span className="text-white">{selectedProposalData.votes.abstain.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center">
                <Vote className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">Wählen Sie einen Vorschlag aus, um Details und AI-Analyse zu sehen</p>
              </div>
            )}

            {/* Discussion Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <MessageSquare className="mr-2" />
                Community Diskussion
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="text-gray-300 text-sm">"Die AI-Analyse zeigt vielversprechende Ergebnisse für diesen Vorschlag..."</p>
                  <p className="text-gray-500 text-xs mt-1">- Maya Chen, Bildungsexpertin</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="text-gray-300 text-sm">"DeepSeek hat wichtige technische Aspekte identifiziert..."</p>
                  <p className="text-gray-500 text-xs mt-1">- Carlos Rivera, Tech-Spezialist</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <p className="text-gray-300 text-sm">"Die kulturellen Auswirkungen wurden gut analysiert..."</p>
                  <p className="text-gray-500 text-xs mt-1">- Amara Okafor, Kulturvermittlerin</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                An Diskussion teilnehmen
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceEnhanced;