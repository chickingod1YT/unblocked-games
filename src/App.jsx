/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Orbit, 
  Star, 
  Rocket, 
  Gamepad2, 
  Flame, 
  Trophy, 
  Clock, 
  ArrowLeft, 
  Maximize2, 
  ExternalLink,
  Share2,
  Play,
  X,
  MessageSquarePlus
} from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Load recently played
    const saved = localStorage.getItem('recentlyPlayed');
    if (saved) {
      try {
        setRecentlyPlayed(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recently played', e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToRecentlyPlayed = (gameId) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(id => id !== gameId);
      const updated = [gameId, ...filtered].slice(0, 10);
      localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
      return updated;
    });
  };

  const categories = useMemo(() => {
    return ['All', ...new Set(gamesData.map(g => g.category))];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredGames = useMemo(() => {
    return gamesData.filter(game => game.featured);
  }, []);

  const recentGames = useMemo(() => {
    return recentlyPlayed
      .map(id => gamesData.find(g => g.id === id))
      .filter(Boolean);
  }, [recentlyPlayed]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    if (game) {
      addToRecentlyPlayed(game.id);
    }
  };

  const formatStats = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  const toggleFullscreen = () => {
    if (gameContainerRef.current) {
      if (!document.fullscreenElement) {
        gameContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleShare = async () => {
    if (!selectedGame) return;
    const shareData = {
      title: `${selectedGame.title} - Ultimate Unblocked Games`,
      text: `Check out ${selectedGame.title} on Ultimate Unblocked Games!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const GAME_REQUEST_URL = "https://forms.gle/PNh522deBEai4sq78";

  return (
    <div className="min-h-screen bg-cosmic-bg text-[#e4e3e0] font-sans selection:bg-cosmic-accent selection:text-black">
      {/* Space Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20 cosmic-gradient" />
        
        {/* Deep Space Dust */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '150px 150px' }} />
        
        {/* Twinkling Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-0"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Moving Nebula Layers */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-cosmic-secondary/20 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, -60, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cosmic-accent/20 blur-[120px] rounded-full pointer-events-none"
        />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
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

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href={GAME_REQUEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-cosmic-accent/10 border border-cosmic-accent/20 rounded-full text-xs font-bold uppercase tracking-widest text-cosmic-accent hover:bg-cosmic-accent hover:text-black transition-all group"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Request a Game
            </a>
          </div>
        </header>

        {!selectedGame ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Search & Categories */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-20 group-focus-within:opacity-100 group-focus-within:text-cosmic-accent transition-all" />
                <input 
                  type="text"
                  placeholder="SCAN ARCHIVES FOR MISSIONS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cosmic-card/50 border border-white/5 rounded-2xl py-5 pl-16 pr-8 text-sm font-mono tracking-wider focus:outline-none focus:border-cosmic-accent/50 focus:ring-4 focus:ring-cosmic-accent/5 transition-all outline-none"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar w-full md:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${
                      activeCategory === cat 
                        ? 'bg-cosmic-accent border-cosmic-accent text-black scale-105 shadow-lg shadow-cosmic-accent/20' 
                        : 'bg-white/5 border-white/5 opacity-40 hover:opacity-100 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Section */}
            {activeCategory === 'All' && !searchQuery && featuredGames.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 opacity-40">
                  <Flame className="w-5 h-5 text-cosmic-secondary" />
                  <h2 className="text-xs font-mono uppercase tracking-[0.3em]">Critical_Missions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredGames.map(game => (
                    <motion.div
                      key={game.id}
                      whileHover={{ scale: 1.02 }}
                      className="group relative h-[300px] rounded-3xl overflow-hidden border border-white/5 cursor-pointer shadow-2xl"
                      onClick={() => handleGameSelect(game)}
                    >
                      <img 
                        src={game.image} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={game.title} 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-bg via-cosmic-bg/20 to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 p-8 w-full group-hover:bg-cosmic-accent/10 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-cosmic-accent text-black text-[8px] font-bold uppercase tracking-widest italic flex items-center gap-1">
                            <Star className="w-2 h-2 fill-current" /> Featured
                          </span>
                          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{game.category}</span>
                        </div>
                        <h3 className="text-3xl font-bold uppercase italic tracking-tight mb-2 group-hover:text-cosmic-accent transition-colors">{game.title}</h3>
                        <p className="text-sm opacity-60 line-clamp-1 font-mono tracking-tight uppercase max-w-md">{game.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Recently Played Section */}
            {activeCategory === 'All' && !searchQuery && recentGames.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-8 opacity-40">
                  <Clock className="w-5 h-5 text-cosmic-accent" />
                  <h2 className="text-xs font-mono uppercase tracking-[0.3em]">Temporal_History</h2>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                  {recentGames.map(game => (
                    <motion.div
                      key={`recent-${game.id}`}
                      whileHover={{ y: -5 }}
                      onClick={() => handleGameSelect(game)}
                      className="flex-shrink-0 w-48 group cursor-pointer"
                    >
                      <div className="relative h-32 rounded-2xl overflow-hidden mb-3 border border-white/5">
                        <img 
                          src={game.image} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                          alt={game.title} 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wide group-hover:text-cosmic-accent transition-colors truncate">{game.title}</h4>
                      <p className="text-[9px] font-mono opacity-20 uppercase tracking-widest">{game.category}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Main Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 opacity-40">
                  <Gamepad2 className="w-5 h-5" />
                  <h2 className="text-xs font-mono uppercase tracking-[0.3em]">Archive_Protocol</h2>
                </div>
                <p className="text-[10px] font-mono opacity-20 uppercase tracking-widest">{filteredGames.length} NODES_LOCATED</p>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredGames.map((game, idx) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -10 }}
                      onClick={() => handleGameSelect(game)}
                      className="group bg-cosmic-card/30 border border-white/5 rounded-3xl p-4 cursor-pointer hover:border-cosmic-accent/30 hover:bg-cosmic-card/50 transition-all shadow-xl backdrop-blur-sm"
                    >
                      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                        <img 
                          src={game.image} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          alt={game.title} 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-cosmic-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {game.isHot && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-cosmic-secondary rounded-full text-white text-[8px] font-bold uppercase flex items-center gap-1 shadow-lg">
                            <Flame className="w-3 h-3 fill-current" /> Highly_Active
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                          <div className="p-4 rounded-full bg-cosmic-accent text-black shadow-2xl scale-125 border-4 border-black">
                            <Play className="w-6 h-6 fill-current" />
                          </div>
                        </div>
                      </div>
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold uppercase italic tracking-wide group-hover:text-cosmic-accent transition-colors">{game.title}</h3>
                          <span className="text-[9px] font-mono opacity-20 border border-white/10 px-2 py-0.5 rounded uppercase">{game.category}</span>
                        </div>
                        <p className="text-xs opacity-40 line-clamp-2 leading-relaxed mb-6 font-mono uppercase tracking-tight">{game.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 opacity-30">
                              <Trophy className="w-3 h-3" />
                              <span className="text-[10px] font-mono tracking-tighter">{game.rating}</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-30">
                              <Orbit className="w-3 h-3" />
                              <span className="text-[10px] font-mono tracking-tighter uppercase">{formatStats(game.playCount)}</span>
                            </div>
                          </div>
                          <motion.div className="text-cosmic-accent opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-48 opacity-20 space-y-6">
                  <Search className="w-16 h-16 animate-pulse" />
                  <p className="font-mono uppercase tracking-[0.5em] text-sm text-center">COORDINATES_UNKNOWN // NO_DATA_AVAILABLE</p>
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          /* Game Detail View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-cosmic-bg/95 backdrop-blur-3xl" onClick={() => setSelectedGame(null)} />
            
            <div className="relative w-full h-full max-w-6xl bg-cosmic-card border border-cosmic-accent/20 md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
              {/* Game Viewport Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/40">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-cosmic-accent transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back_to_Archives
                </button>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-8 text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2"><Trophy className="w-3 h-3 text-cosmic-accent" /> Rating: {selectedGame.rating}</span>
                    <span className="flex items-center gap-2"><Orbit className="w-3 h-3 text-cosmic-secondary" /> Plays: {formatStats(selectedGame.playCount)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleShare}
                      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors opacity-40 hover:opacity-100"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={toggleFullscreen}
                      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors opacity-40 hover:opacity-100"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setSelectedGame(null)} className="p-3 bg-cosmic-accent/10 text-cosmic-accent rounded-xl hover:bg-cosmic-accent hover:text-black transition-all border border-cosmic-accent/20"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Game Frame Container */}
              <div ref={gameContainerRef} className="relative flex-1 bg-black group">
                <div className="absolute inset-0 flex items-center justify-center bg-cosmic-card z-0">
                  <div className="flex flex-col items-center gap-6 opacity-20">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                      <Orbit className="w-16 h-16 text-cosmic-accent" />
                    </motion.div>
                    <p className="font-mono text-sm tracking-[0.4em] animate-pulse">ESTABLISHING_UPLINK...</p>
                  </div>
                </div>
                <iframe 
                  id="innerFrame"
                  name="innerFrame"
                  src={selectedGame.url && !selectedGame.html ? selectedGame.url : undefined}
                  srcDoc={selectedGame.html}
                  className="relative z-10 w-full h-full border-none"
                  title={selectedGame.title}
                  loading="lazy"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture; microphone *"
                  referrerPolicy="no-referrer"
                  sandbox="allow-forms allow-modals allow-same-origin allow-scripts allow-pointer-lock allow-orientation-lock allow-presentation allow-downloads allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                />
              </div>

              {/* Game Info Footer */}
              <div className="p-8 bg-black/60 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold italic uppercase tracking-tight text-cosmic-accent">{selectedGame.title}</h2>
                    <p className="text-sm opacity-50 max-w-2xl font-mono uppercase tracking-tight leading-relaxed">{selectedGame.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-6 min-w-[200px]">
                    <span className="text-[10px] font-mono border border-cosmic-secondary/40 text-cosmic-secondary px-4 py-2 rounded-full uppercase tracking-widest">{selectedGame.category} NODE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Improved Footer */}
        <footer className="relative z-10 p-12 mt-32 border-t border-cosmic-accent/10 bg-gradient-to-b from-transparent to-cosmic-card/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3 opacity-60">
                <Orbit className="w-6 h-6 text-cosmic-accent" />
                <h3 className="font-bold uppercase tracking-[0.4em] text-sm">ULTIMATE_GAMES</h3>
              </div>
              <p className="text-xs opacity-40 leading-relaxed font-mono uppercase tracking-wider">
                Connecting users across sectors to the highest fidelity archives in the known universe. 
                Stable link established since 2026.
              </p>
              <div className="flex gap-4">
                 <a 
                  href={GAME_REQUEST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cosmic-accent hover:underline"
                >
                  <MessageSquarePlus className="w-3 h-3" /> Submit Request
                </a>
              </div>
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
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-30 uppercase">System_Status</h4>
              <div className="flex gap-4">
                <div className="px-4 py-2 border border-cosmic-accent/20 rounded-full font-mono text-[10px] text-cosmic-accent animate-pulse">
                  STABLE_TRANSMISSION
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
      </div>
    </div>
  );
}
