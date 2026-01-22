import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import WatchedCard from '../components/WatchedCard'
import StatusModal from '../components/StatusModal'
import ConfirmationModal from '../components/ConfirmationModal'
import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import { useWatchedAnime } from '../context/WatchedContext'
import {
  sortWatchedAnime,
  filterWatchedAnime,
  sortOptions,
  filterOptions,
} from '../utils/watchedUtils'

/**
 * Watched Anime Page
 * Displays user's watched anime with tracking, filtering, and sorting capabilities
 */
const Watched = () => {
  const { watched, loading, updateWatchedAnime, removeFromWatched } =
    useWatchedAnime()

  const [view, setView] = useState('grid') // grid or list
  const [sortBy, setSortBy] = useState('recently-watched')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingAnime, setEditingAnime] = useState(null)
  const [removingAnime, setRemovingAnime] = useState(null)

  // Apply filtering and sorting
  const processedAnime = useMemo(() => {
    const filtered = filterWatchedAnime(watched, {
      status: filterStatus,
      searchQuery,
    })
    return sortWatchedAnime(filtered, sortBy)
  }, [watched, filterStatus, searchQuery, sortBy])

  const [hoveredCard, setHoveredCard] = useState(null)

  const handleEdit = (anime) => {
    setEditingAnime(anime)
  }

  const handleSaveEdit = (updatedData) => {
    if (editingAnime) {
      updateWatchedAnime(editingAnime.mal_id, updatedData)
      setEditingAnime(null)
    }
  }

  const handleRemove = (mal_id) => {
    const animeToRemove = watched.find((w) => w.mal_id === mal_id)
    setRemovingAnime(animeToRemove)
  }

  const confirmRemove = () => {
    if (removingAnime) {
      removeFromWatched(removingAnime.mal_id)
      setRemovingAnime(null)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 pt-20 pb-0">
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-2xl aspect-[3/4] animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Empty state
  if (watched.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 pt-16 pb-0">
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <EmptyState />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 pt-16 pb-0">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Watched Anime
          </h1>
          <p className="text-white/70 text-lg">
            Track and manage {watched.length} anime {watched.length === 1 ? 'entry' : 'entries'}
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Status */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filterOptions.status.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                View
              </label>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('grid')}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                    view === 'grid'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Grid
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('list')}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                    view === 'list'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  List
                </motion.button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-white/60 text-sm">
            Showing {processedAnime.length} of {watched.length} anime
          </div>
        </motion.div>

        {/* Anime Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          <AnimatePresence mode="popLayout">
            {processedAnime.map((anime) => (
              <WatchedCard
                key={anime.mal_id}
                anime={anime}
                view={view}
                onEdit={handleEdit}
                onRemove={handleRemove}
                isHovered={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results */}
        {processedAnime.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-white/60 text-lg">
              No anime found matching your filters.
            </p>
          </motion.div>
        )}
      </div>
      {/* Modals */}
      {editingAnime && (
        <StatusModal
          anime={editingAnime}
          onClose={() => setEditingAnime(null)}
          onSave={handleSaveEdit}
        />
      )}

      {removingAnime && (
        <ConfirmationModal
          anime={removingAnime}
          onConfirm={confirmRemove}
          onCancel={() => setRemovingAnime(null)}
        />
      )}
      </div>
      <Footer />
    </div>
  )
}

export default Watched
