import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Empty state UI when no anime is watched yet
 */
const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Illustration */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-9xl mb-8"
      >
        📺
      </motion.div>

      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        No Anime Watched Yet
      </h2>

      <p className="text-white/70 text-lg text-center max-w-md mb-8">
        Start building your anime watch list! Search for your favorite shows and keep track of what you're watching.
      </p>

      {/* CTA Button */}
      <Link to="/search">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          Discover Anime
        </motion.button>
      </Link>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-white/5 border border-white/20 rounded-xl p-6 max-w-md"
      >
        <h3 className="text-white font-semibold mb-4">How to get started:</h3>
        <ul className="text-white/70 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">1.</span>
            <span>Search for anime you want to watch</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">2.</span>
            <span>Click "Add to Watched" to track it</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">3.</span>
            <span>Manage your status and episodes here</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default EmptyState
