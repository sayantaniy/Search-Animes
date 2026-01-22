import { motion, AnimatePresence } from 'framer-motion'

/**
 * Confirmation modal for removing anime from watched list
 */
const ConfirmationModal = ({ anime, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-700/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-sm w-full border border-white/20 shadow-2xl"
        >
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl mb-6 text-center"
          >
            ⚠️
          </motion.div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Remove from Watched?
          </h2>

          <p className="text-white/70 text-center mb-6">
            Are you sure you want to remove <span className="font-semibold text-white">{anime?.title}</span> from your watched list? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              Keep It
            </motion.button>
            <motion.button
              onClick={onConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-500/50"
            >
              Remove
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ConfirmationModal
