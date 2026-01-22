import { motion } from 'framer-motion'
import { getStatusColor, formatDate, getProgressPercentage } from '../utils/watchedUtils'

/**
 * Individual watched anime card component
 * Supports both grid and list view
 */
const WatchedCard = ({
  anime,
  onEdit,
  onRemove,
  view = 'grid',
  isHovered,
  setHoveredCard,
}) => {
  const progress = getProgressPercentage(anime.episodesWatched, anime.episodes)

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        whileHover={{ x: 5 }}
        className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 hover:border-white/40 transition-all"
      >
        {/* Desktop Layout */}
        <div className="hidden sm:flex gap-4 items-center">
          {/* Poster */}
          <div className="flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden">
            <img
              src={anime.images?.jpg?.image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {anime.rating > 0 && (
              <div className="text-yellow-400 font-bold text-sm mb-2">
                ⭐ Rating: {anime.rating}/10
              </div>
            )}
            <h3 className="text-white font-semibold truncate text-lg">
              {anime.title}
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {anime.episodesWatched} / {anime.episodes || '?'} episodes
            </p>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getStatusColor(anime.status)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex-shrink-0 text-right flex flex-col gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(anime.status)}`}>
              {anime.status}
            </div>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(anime)}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRemove(anime.mal_id)}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Remove
            </motion.button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex sm:hidden gap-4">
          {/* Poster */}
          <div className="flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden">
            <img
              src={anime.images?.jpg?.image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Top Section: Title and Episodes */}
            <div>
              <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                {anime.title}
              </h3>
              <p className="text-white/60 text-xs">
                {anime.episodesWatched}/{anime.episodes || '?'} episodes
              </p>
            </div>

            {/* Middle Section: Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden my-2">
              <div
                className={`h-full bg-gradient-to-r ${getStatusColor(anime.status)}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Section: Status, Edit, Remove */}
            <div className="flex items-center gap-2">
              <div className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(anime.status)}`}>
                {anime.status}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(anime)}
                className="px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded transition-colors"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRemove(anime.mal_id)}
                className="px-2 py-0.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold rounded transition-colors"
              >
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHoveredCard(anime.mal_id)}
      onHoverEnd={() => setHoveredCard(null)}
      className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:border-white/40 cursor-pointer group transition-all"
    >
      {/* Poster Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getStatusColor(anime.status)} backdrop-blur-sm`}
        >
          {anime.status}
        </div>

        {/* Hover Content */}
        {isHovered === anime.mal_id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col justify-end p-4"
          >
            <div className="space-y-3">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-white text-xs mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getStatusColor(anime.status)}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-white/70 text-xs mt-2">
                  {anime.episodesWatched} / {anime.episodes || '?'} episodes
                </p>
              </div>

              {/* Last Watched */}
              <p className="text-white/70 text-xs">
                Last watched: {formatDate(anime.lastWatchedDate)}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(anime)
                  }}
                  className="flex-1 py-2 px-3 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(anime.mal_id)
                  }}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  ✕
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4">
        {/* Rating on top */}
        {anime.rating > 0 && (
          <div className="mb-2 text-yellow-400 font-bold text-sm">
            ⭐ Rating: {anime.rating}/10
          </div>
        )}
        <h3 className="text-white font-semibold line-clamp-2 min-h-[3rem]">
          {anime.title}
        </h3>
        <div className="mt-3 flex items-center justify-between text-xs text-white/60">
          <span className="inline-block bg-white/10 px-2 py-1 rounded">
            {anime.episodes} eps
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default WatchedCard
