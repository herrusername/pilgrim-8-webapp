'use client'

import { motion } from 'framer-motion'
import { 
  Home, 
  Eye, 
  Settings, 
  Map, 
  Heart, 
  Brain, 
  Clock, 
  Users 
} from 'lucide-react'

interface NavigationProps {
  currentSection: string
  onSectionChange: (section: string) => void
  sections: string[]
}

const sectionIcons = {
  hero: Home,
  vision: Eye,
  systems: Settings,
  map: Map,
  profiles: User,
  karma: Heart,
  gaia: Brain,
  timeline: Clock,
  governance: Users,
}

const sectionNames = {
  hero: 'Start',
  vision: 'Vision',
  systems: 'Systeme',
  map: 'Weltkarte',
  profiles: 'Profile',
  karma: 'KARMA',
  gaia: 'GAIA-OS',
  timeline: 'Timeline',
  governance: 'Governance',
}

export default function Navigation({ currentSection, onSectionChange, sections }: NavigationProps) {
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="glass-effect rounded-2xl p-4 space-y-4">
        {sections.map((section) => {
          const Icon = sectionIcons[section as keyof typeof sectionIcons]
          const isActive = currentSection === section
          
          return (
            <motion.button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`
                relative group flex items-center justify-center w-12 h-12 rounded-xl
                transition-all duration-300 hover:scale-110
                ${isActive 
                  ? 'bg-gradient-to-r from-gaia-500 to-pilgrim-500 neon-glow' 
                  : 'bg-white/10 hover:bg-white/20'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                size={20} 
                className={`
                  ${isActive ? 'text-white' : 'text-gray-300'}
                  transition-colors duration-300
                `}
              />
              
              {/* Tooltip */}
              <div className="
                absolute left-full ml-4 px-3 py-2 bg-black/80 text-white text-sm
                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                pointer-events-none whitespace-nowrap
              ">
                {sectionNames[section as keyof typeof sectionNames]}
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gaia-400 rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
      
      {/* Language Toggle */}
      <motion.div
        className="glass-effect rounded-xl p-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="text-xs text-gray-400 hover:text-white transition-colors">
          DE/EN
        </button>
      </motion.div>
    </motion.nav>
  )
}