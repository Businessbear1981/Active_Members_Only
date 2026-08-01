'use client'

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Lock, Unlock, RotateCw } from "lucide-react";

interface PuzzleLock {
  id: number;
  layer: "surface" | "streets" | "vip";
  code: string;
  hint: string;
  solved: boolean;
}

interface LayerCollapseProps {
  onComplete?: () => void;
}

const puzzleLocks: PuzzleLock[] = [
  {
    id: 1,
    layer: "surface",
    code: "1920",
    hint: "Art Deco's golden year",
    solved: false
  },
  {
    id: 2,
    layer: "streets",
    code: "MOTOWN",
    hint: "Detroit's legendary sound",
    solved: false
  },
  {
    id: 3,
    layer: "vip",
    code: "COLLIDE",
    hint: "When worlds meet",
    solved: false
  }
];

export default function LayerCollapse({ onComplete }: LayerCollapseProps) {
  const [locks, setLocks] = useState<PuzzleLock[]>(puzzleLocks);
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [collapsed, setCollapsed] = useState(false);
  const [allSolved, setAllSolved] = useState(false);

  useEffect(() => {
    const solved = locks.every((lock) => lock.solved);
    setAllSolved(solved);
    if (solved && onComplete) {
      onComplete();
    }
  }, [locks, onComplete]);

  const handleInputChange = (lockId: number, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [lockId]: value.toUpperCase()
    }));
  };

  const handleSubmit = (lockId: number) => {
    const lock = locks.find((l) => l.id === lockId);
    if (!lock) return;

    if (inputs[lockId] === lock.code) {
      setLocks((prev) =>
        prev.map((l) =>
          l.id === lockId ? { ...l, solved: true } : l
        )
      );
      setInputs((prev) => ({ ...prev, [lockId]: "" }));
    } else {
      setInputs((prev) => ({ ...prev, [lockId]: "" }));
    }
  };

  const handleReset = () => {
    setLocks(puzzleLocks);
    setInputs({});
    setCollapsed(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg overflow-hidden border border-amber-400/30 bg-gradient-to-br from-amber-950/40 via-slate-950 to-purple-950/40 h-48 flex items-center justify-center"
      >
        <p className="text-amber-300/60 text-xs tracking-[0.4em] uppercase">Worlds Collide</p>
      </motion.div>

      {/* Intro Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-3"
      >
        <h2 className="text-3xl font-bold text-slate-100">
          Worlds Collide
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Art Deco 1920s elegance meets Detroit hip-hop grit. Solve three puzzle locks to unlock the collision of worlds. Each lock reveals a layer of the experience.
        </p>
      </motion.div>

      {/* Puzzle Locks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locks.map((lock, idx) => (
          <motion.div
            key={lock.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-lg border-2 transition-all ${
              lock.solved
                ? "border-green-400 bg-green-500/10"
                : "border-amber-400/50 bg-slate-900/50 hover:border-amber-400"
            }`}
          >
            {/* Lock Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 capitalize">
                {lock.layer} Layer
              </h3>
              <motion.div
                animate={{ rotate: lock.solved ? 0 : 360 }}
                transition={{ duration: 0.5 }}
              >
                {lock.solved ? (
                  <Unlock className="w-5 h-5 text-green-400" />
                ) : (
                  <Lock className="w-5 h-5 text-amber-400" />
                )}
              </motion.div>
            </div>

            {/* Hint */}
            <p className="text-sm text-slate-400 mb-4 italic">
              "{lock.hint}"
            </p>

            {/* Input */}
            {!lock.solved ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={inputs[lock.id] || ""}
                  onChange={(e) => handleInputChange(lock.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSubmit(lock.id);
                  }}
                  placeholder="Enter code..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-center font-mono"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubmit(lock.id)}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded transition-colors text-sm"
                >
                  Unlock
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="py-2 text-center text-green-400 font-semibold"
              >
                ✓ Unlocked
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Collision Visualization */}
      {allSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg overflow-hidden border-2 border-amber-400 bg-gradient-to-br from-amber-900/50 via-purple-950/40 to-cyan-950/30 h-48 flex items-center justify-center"
        >
          <p className="text-amber-200 text-sm tracking-[0.3em] uppercase">Layers Collided</p>
        </motion.div>
      )}

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-6 rounded-lg border-2 text-center transition-all ${
          allSolved
            ? "border-green-400 bg-green-500/10"
            : "border-amber-400/30 bg-amber-500/5"
        }`}
      >
        <p className={`text-lg font-semibold ${allSolved ? "text-green-400" : "text-amber-300"}`}>
          {allSolved
            ? "🎉 All Locks Unlocked! Worlds Collided."
            : `${locks.filter((l) => l.solved).length} of ${locks.length} locks solved`}
        </p>
        {allSolved && (
          <p className="text-slate-300 mt-2 text-sm">
            The three layers have converged. Art Deco elegance meets Detroit grit in a spectacular collision of worlds.
          </p>
        )}
      </motion.div>

      {/* Reset Button */}
      {allSolved && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400 text-slate-100 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Reset Puzzle
        </motion.button>
      )}

      {/* Puzzle Lock Showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-lg overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 h-40 flex items-center justify-center"
      >
        <p className="text-slate-500 text-xs tracking-[0.4em] uppercase">Puzzle Lock Mechanism</p>
      </motion.div>

      {/* Art Deco + Hip-Hop Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border border-amber-400/30 bg-amber-500/5"
        >
          <h3 className="text-lg font-bold text-amber-300 mb-3">Art Deco 1920s</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✦ Geometric patterns & sunbursts</li>
            <li>✦ Brass & gold accents</li>
            <li>✦ Opulent, museum-quality aesthetic</li>
            <li>✦ Elegant serif typography</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border border-purple-400/30 bg-purple-500/5"
        >
          <h3 className="text-lg font-bold text-purple-300 mb-3">Detroit Hip-Hop</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✦ Graffiti tags & street art</li>
            <li>✦ Neon purple & cyan energy</li>
            <li>✦ Bold, industrial typography</li>
            <li>✦ Urban grit & raw authenticity</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
