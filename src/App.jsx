/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  ExternalLink, 
  Info,
  ChevronLeft,
  Filter,
  Maximize2,
  Rocket,
  Telescope,
  Sparkles,
  Orbit,
  Star
} from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const featuredGames = useMemo(() => {
    return gamesData.filter(game => game.featured);
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-cosmic-bg text-[#e4e3e0] font-sans selection:bg-cosmic-accent selection:text-black">
      {/* Space Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20 cosmic-gradient" />
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        {/* Subtle moving stars */}
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto"
          >
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-cosmic-accent/10 pb-8 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-3 border border-cosmic-accent/50 rounded-full bg-cosmic-accent/5 relative"
                >
                  <Orbit className="w-10 h-10 text-cosmic-accent" />
                  <Star className="w-3 h-3 text-cosmic-accent absolute top-0 right-0 animate-pulse" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight italic bg-gradient-to-br from-white via-cosmic-accent to-cosmic-secondary bg-clip-text text-transparent">
                  Ultimate <span className="block md:inline lg:inline-block">Unblocked</span> <span className="block md:inline">Games</span>
                </h1>
              </div>
              <p className="font-mono text-xs opacity-40 tracking-[0.2em] uppercase flex items-center gap-2">
                <Rocket className="w-3 h-3" /> // galactic_uplink: active //
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto relative z-20">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-accent opacity-30 group-focus-within:opacity-100 transition-opacity" />
                <input 
                  type="text" 
                  placeholder="SCANPLANET_DB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-cosmic-card/50 backdrop-blur-md border border-cosmic-accent/10 rounded-none py-3 pl-10 pr-4 w-full md:w-[320px] font-mono text-xs focus:outline-none focus:border-cosmic-accent transition-all placeholder:opacity-20"
                />
              </div>
              
              <div className="flex gap-2 items-center overflow-x-auto no-scrollbar py-1">
                <Filter className="w-3 h-3 opacity-30 shrink-0" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest border transition-all ${
                      activeCategory === cat 
                        ? 'bg-cosmic-accent border-cosmic-accent text-black font-bold' 
                        : 'border-cosmic-accent/10 opacity-40 hover:opacity-100 hover:border-cosmic-accent/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Featured Section */}
          {searchQuery === '' && activeCategory === 'All' && featuredGames.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-mono uppercase tracking-[0.5em] opacity-40 flex items-center gap-2">
                  <Telescope className="w-4 h-4 text-cosmic-secondary" /> NEBULA_HIGHLIGHTS
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-cosmic-accent/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredGames.map((game) => (
                  <motion.div
                    key={`featured-${game.id}`}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame(game)}
                    className="group relative cursor-pointer border border-cosmic-accent/20 overflow-hidden bg-cosmic-card/40 backdrop-blur-sm aspect-video md:aspect-[16/9] nebula-glow"
                  >
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-bg via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-cosmic-accent/90 text-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest font-bold">
                        PRIME
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                       <h3 className="text-3xl font-bold uppercase tracking-tighter italic group-hover:text-cosmic-accent transition-colors drop-shadow-lg">
                        {game.title}
                      </h3>
                      <p className="text-xs opacity-50 font-mono line-clamp-1 uppercase tracking-tight">
                        {game.description}
                      </p>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                      <div className="w-16 h-16 border border-cosmic-accent/50 rounded-full flex items-center justify-center bg-cosmic-accent/5">
                        <Rocket className="w-6 h-6 text-cosmic-accent animate-bounce" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Database Label */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-mono uppercase tracking-[0.5em] opacity-40">
              {searchQuery ? `SCAN_RESULTS [${filteredGames.length}]` : `COSMIC_ARCHIVE [${filteredGames.length}]`}
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cosmic-accent/20 to-transparent" />
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, index) => (
                <motion.div
                  layout
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.04, duration: 0.5 }}
                  onClick={() => setSelectedGame(game)}
                  className="group relative cursor-pointer border border-cosmic-accent/10 overflow-hidden bg-cosmic-card/60 backdrop-blur-md hover:border-cosmic-accent/40 transition-all duration-500"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-90 saturate-[0.8] group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-bg via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-4 right-4 animate-pulse">
                       <span className="bg-cosmic-bg/80 backdrop-blur-sm px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border border-cosmic-accent/20 text-cosmic-accent">
                        {game.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="p-4 border border-cosmic-accent/50 rounded-full scale-0 group-hover:scale-100 transition-transform bg-cosmic-accent/5 backdrop-blur-sm">
                        <Gamepad2 className="w-8 h-8 text-cosmic-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 relative">
                    <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-cosmic-accent transition-colors truncate">
                      {game.title}
                    </h3>
                    <p className="text-[13px] opacity-40 line-clamp-2 leading-relaxed h-[36px]">
                      {game.description}
                    </p>
                    <div className="pt-4 flex justify-between items-center border-t border-cosmic-accent/5">
                      <span className="font-mono text-[9px] opacity-20 uppercase tracking-[0.3em]">Sector_{game.id}</span>
                      <ChevronLeft className="w-4 h-4 rotate-180 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cosmic-accent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredGames.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 opacity-20 space-y-6">
              <Search className="w-16 h-16 animate-pulse" />
              <p className="font-mono uppercase tracking-[0.5em] text-sm text-center">COORDINATES_UNKNOWN // NO_DATA</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          key="player"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-50 bg-cosmic-bg flex flex-col"
        >
          {/* Game Header/Toolbar */}
          <header className="h-16 shrink-0 border-b border-cosmic-accent/20 flex items-center justify-between px-6 bg-cosmic-card/80 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setSelectedGame(null)}
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                RETURN_TO_ORBIT
              </button>
              <div className="h-4 w-[1px] bg-cosmic-accent/10" />
              <div className="flex flex-col">
                <h2 className="text-sm font-bold uppercase tracking-tight leading-none text-cosmic-accent">{selectedGame.title}</h2>
                <span className="text-[10px] font-mono opacity-30 uppercase mt-1">SESSION:ESTABLISHED // TRANSMISSION:STABLE</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.open(selectedGame.url, '_blank')}
                className="p-2 border border-cosmic-accent/10 hover:border-cosmic-accent hover:text-cosmic-accent transition-all rounded-md"
                title="Launch in independent window"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setSelectedGame(null)}
                className="p-2 border border-cosmic-accent/10 hover:bg-cosmic-accent hover:border-cosmic-accent hover:text-black transition-all rounded-md group"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>
          </header>

          {/* Game Viewport */}
          <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-center">
               <h2 className="text-[25vw] font-black uppercase text-cosmic-accent opacity-5 select-none -rotate-12 whitespace-nowrap tracking-tighter">
                 SIMULATION
               </h2>
            </div>
            
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full h-full relative bg-black shadow-[0_0_100px_rgba(0,0,0,1)] z-10"
            >
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
              />
            </motion.div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 px-8 py-3 bg-cosmic-card/90 backdrop-blur-xl border border-cosmic-accent/20 rounded-full z-20 pointer-events-none opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cosmic-accent shadow-[0_0_8px_rgba(0,210,255,0.8)] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e4e3e0]">LIVE_LINK</span>
              </div>
              <div className="w-[1px] h-4 bg-cosmic-accent/20" />
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 text-cosmic-secondary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e4e3e0]">Press ESC to Exit</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Footer */}
      {!selectedGame && (
        <footer className="relative z-10 p-12 mt-32 border-t border-cosmic-accent/10 max-w-7xl mx-auto bg-gradient-to-b from-transparent to-cosmic-card/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3 opacity-60">
                <Orbit className="w-6 h-6 text-cosmic-accent" />
                <h3 className="font-bold uppercase tracking-[0.4em] text-sm">ULTIMATE_HUB</h3>
              </div>
              <p className="text-xs opacity-40 leading-relaxed font-mono uppercase tracking-wider">
                Connecting users across sectors to the highest fidelity archives in the known universe. 
                Stable link established since 2026.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">STATION_METRICS</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="opacity-40 uppercase tracking-widest">Signal_Strength</span>
                  <span className="text-cosmic-accent">OPTIMAL</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="opacity-40 uppercase tracking-widest">Relay_Latency</span>
                  <span className="text-cosmic-secondary">1.2ms</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono pb-2">
                  <span className="opacity-40 uppercase tracking-widest">Active_Nodes</span>
                  <span>412_GALACTIC</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col md:items-end">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">DISCONNECT</h4>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-cosmic-accent/20 flex items-center justify-center hover:bg-cosmic-accent hover:border-cosmic-accent hover:text-black transition-all cursor-pointer group shadow-lg">
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-[0.3em]">
            <p>© 2026 ULTIMATE_UNBLOCKED_GAMES</p>
            <p className="flex items-center gap-2 saturate-0 hover:saturate-100 transition-all cursor-crosshair">
              <Star className="w-3 h-3 text-cosmic-accent" /> TRANSMISSION_SECURE
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
