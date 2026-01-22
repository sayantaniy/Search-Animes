import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/**
 * Modal for editing watched anime status and details
 */
const StatusModal = ({ anime, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    status: anime?.status || 'Watching',
    episodesWatched: anime?.episodesWatched || 0,
    rating: anime?.rating || 0,
    notes: anime?.notes || '',
  })

  const [errors, setErrors] = useState({})

  const statusOptions = ['Watching', 'Completed', 'On Hold', 'Dropped']

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (
      formData.episodesWatched < 0 ||
      (anime.episodes && formData.episodesWatched > anime.episodes)
    ) {
      newErrors.episodesWatched = `Episodes should be between 0 and ${anime.episodes || '?'}`
    }

    if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating should be between 0 and 10'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    onSave(formData)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-700/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Update Status</h2>
            <p className="text-white/60 text-sm">{anime?.title}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Status */}
            <div>
              <label className="block text-white text-sm font-semibold mb-3">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((status) => (
                  <motion.button
                    key={status}
                    type="button"
                    onClick={() => handleChange('status', status)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                      formData.status === status
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {status}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Episodes */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Episodes Watched
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={anime?.episodes || 999}
                  value={formData.episodesWatched}
                  onChange={(e) =>
                    handleChange('episodesWatched', parseInt(e.target.value) || 0)
                  }
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/60">
                  / {anime?.episodes || '?'}
                </div>
              </div>
              {errors.episodesWatched && (
                <p className="text-red-400 text-xs mt-2">{errors.episodesWatched}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={formData.rating}
                  onChange={(e) =>
                    handleChange('rating', parseFloat(e.target.value))
                  }
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${
                      (formData.rating / 10) * 100
                    }%, #ffffff20 ${(formData.rating / 10) * 100}%, #ffffff20 100%)`,
                  }}
                />
                <div className="px-3 py-1 bg-yellow-400/20 border border-yellow-400/40 rounded-lg text-yellow-300 font-bold text-sm min-w-[50px] text-center">
                  {formData.rating}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Personal Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add your thoughts about this anime..."
                rows="3"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Progress Bar */}
            {anime?.episodes && (
              <div>
                <div className="flex justify-between text-white text-xs mb-2">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      (formData.episodesWatched / anime.episodes) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                    style={{
                      width: `${
                        (formData.episodesWatched / anime.episodes) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/50"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default StatusModal
