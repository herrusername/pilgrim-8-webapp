'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Award, Heart, Star, Calendar, Camera, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { PILGRIM_PROFILES } from '../lib/api-config';
import { pollinationsService } from '../lib/ai-services';

interface PilgrimStory {
  images: string[];
  journey: Array<{ location: string; description: string }>;
  achievements: Array<{ title: string; date: string; impact: string }>;
}

const PilgrimProfiles: React.FC = () => {
  const [selectedPilgrim, setSelectedPilgrim] = useState<string | null>(null);
  const [pilgrimStories, setPilgrimStories] = useState<{ [key: string]: PilgrimStory }>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadPilgrimStory = async (pilgrimId: string) => {
    if (pilgrimStories[pilgrimId]) return;
    
    setIsLoading(true);
    try {
      const story = await pollinationsService.generatePilgrimStory(pilgrimId);
      if (story) {
        setPilgrimStories(prev => ({ ...prev, [pilgrimId]: story }));
      }
    } catch (error) {
      console.error('Error loading pilgrim story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePilgrimSelect = (pilgrimId: string) => {
    setSelectedPilgrim(pilgrimId);
    setCurrentImageIndex(0);
    loadPilgrimStory(pilgrimId);
  };

  const nextImage = () => {
    const story = selectedPilgrim ? pilgrimStories[selectedPilgrim] : null;
    if (story && story.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % story.images.length);
    }
  };

  const prevImage = () => {
    const story = selectedPilgrim ? pilgrimStories[selectedPilgrim] : null;
    if (story && story.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + story.images.length) % story.images.length);
    }
  };

  const selectedProfile = selectedPilgrim ? PILGRIM_PROFILES.find(p => p.id === selectedPilgrim) : null;
  const selectedStory = selectedPilgrim ? pilgrimStories[selectedPilgrim] : null;

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Pilger Geschichten
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Entdecke die inspirierenden Reisen und Erfahrungen unserer PILGRIM-8 Community-Mitglieder
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        {!selectedPilgrim ? (
          /* Profile Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {PILGRIM_PROFILES.map((pilgrim, index) => (
              <motion.div
                key={pilgrim.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={() => handlePilgrimSelect(pilgrim.id)}
                className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 cursor-pointer hover:border-blue-400/50 transition-all duration-300 group"
              >
                {/* Profile Image Placeholder */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <User size={32} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{pilgrim.name}</h3>
                  <p className="text-blue-300 text-sm mb-2">{pilgrim.profession}</p>
                  <div className="flex items-center justify-center space-x-1 text-gray-400 text-sm">
                    <MapPin size={14} />
                    <span>{pilgrim.location.split(' → ')[0]} → ...</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">KARMA Punkte</span>
                    <span className="text-yellow-400 font-semibold">{pilgrim.karma.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Route</span>
                    <span className="text-blue-400 text-sm">{pilgrim.journey}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Spezialisierung</span>
                    <span className="text-purple-400 text-sm">{pilgrim.specialization}</span>
                  </div>
                </div>

                {/* Achievements Preview */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-1">
                    {pilgrim.achievements.slice(0, 3).map((_, i) => (
                      <Award key={i} size={16} className="text-yellow-400" />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">{pilgrim.achievements.length} Auszeichnungen</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-400 text-sm">Klicken für Details →</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Detailed Profile View */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-6xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedPilgrim(null)}
                className="mb-6 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Zurück zu allen Profilen</span>
              </button>

              {selectedProfile && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Media */}
                  <div className="space-y-6">
                    {/* Image Gallery */}
                    <div className="relative">
                      <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden border border-blue-500/30">
                        {isLoading ? (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <Camera className="w-12 h-12 text-blue-400 animate-pulse mx-auto mb-4" />
                              <p className="text-gray-400">Lade Bilder...</p>
                            </div>
                          </div>
                        ) : selectedStory && selectedStory.images.length > 0 ? (
                          <>
                            <img
                              src={selectedStory.images[currentImageIndex]}
                              alt={`${selectedProfile.name} - Bild ${currentImageIndex + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+QmlsZCB3aXJkIGdlbGFkZW4uLi48L3RleHQ+Cjwvc3ZnPgo=';
                              }}
                            />
                            {selectedStory.images.length > 1 && (
                              <>
                                <button
                                  onClick={prevImage}
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                                >
                                  <ChevronLeft size={20} />
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                                >
                                  <ChevronRight size={20} />
                                </button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                  {selectedStory.images.map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setCurrentImageIndex(index)}
                                      className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentImageIndex ? 'bg-blue-400' : 'bg-white/50'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <User className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                              <p className="text-gray-400">Profilbild</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Journey Map */}
                    <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <MapPin className="mr-2" size={20} />
                        Reiseroute
                      </h4>
                      {selectedStory && selectedStory.journey ? (
                        <div className="space-y-3">
                          {selectedStory.journey.map((stop, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="text-white font-medium">{stop.location}</h5>
                                <p className="text-gray-400 text-sm">{stop.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-400">Reisedaten werden geladen...</div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Info */}
                  <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{selectedProfile.name}</h3>
                          <p className="text-blue-300 mb-2">{selectedProfile.profession}</p>
                          <p className="text-gray-400 text-sm">{selectedProfile.age} Jahre</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-400">{selectedProfile.karma.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">KARMA Punkte</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <MapPin size={16} />
                          <span className="text-sm">{selectedProfile.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Star size={16} />
                          <span className="text-sm">{selectedProfile.specialization}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mt-4">{selectedProfile.story}</p>
                    </div>

                    {/* Achievements */}
                    <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Award className="mr-2" size={20} />
                        Auszeichnungen
                      </h4>
                      {selectedStory && selectedStory.achievements ? (
                        <div className="space-y-4">
                          {selectedStory.achievements.map((achievement, index) => (
                            <div key={index} className="border-l-4 border-yellow-400 pl-4">
                              <h5 className="text-white font-medium">{achievement.title}</h5>
                              <p className="text-gray-400 text-sm mb-1">{achievement.impact}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Calendar size={12} />
                                <span>{new Date(achievement.date).toLocaleDateString('de-DE')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedProfile.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Award size={16} className="text-yellow-400" />
                              <span className="text-gray-300">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Statistiken</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">47</div>
                          <div className="text-sm text-gray-400">Projekte</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">156</div>
                          <div className="text-sm text-gray-400">Tage unterwegs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">23</div>
                          <div className="text-sm text-gray-400">Länder besucht</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-400">892</div>
                          <div className="text-sm text-gray-400">Menschen geholfen</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default PilgrimProfiles;