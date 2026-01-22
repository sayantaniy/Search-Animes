import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useWatchedAnime } from '../context/WatchedContext'
import Footer from '../components/Footer'

const AnimeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToWatched, getWatchedAnime, updateWatchedAnime } = useWatchedAnime()
  const [anime, setAnime] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [backgroundGradient, setBackgroundGradient] = useState('from-gray-600 via-gray-700 to-gray-800')
  const [isWatchedModalOpen, setIsWatchedModalOpen] = useState(false)
  const [watchStatus, setWatchStatus] = useState('Watching')
  const watchedEntry = getWatchedAnime(parseInt(id))

  useEffect(() => {
    fetchAnimeDetails()
    fetchGalleryImages()
  }, [id])

  const fetchAnimeDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
      const data = await response.json()
      setAnime(data.data)
      
      // Set background gradient based on anime title or use default
      // For Frieren -> green, Violet Evergarden -> violet, etc.
      const title = data.data?.title?.toLowerCase() || ''
      if (title.includes('frieren')) {
        setBackgroundGradient('from-green-600 via-green-700 to-emerald-800')
      } else if (title.includes('violet')) {
        setBackgroundGradient('from-violet-600 via-purple-700 to-indigo-800')
      } else {
        setBackgroundGradient('from-gray-600 via-gray-700 to-gray-800')
      }
    } catch (error) {
      console.error('Error fetching anime details:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`)
      const data = await response.json()
      setGalleryImages(data.data?.slice(0, 6) || [])
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} pt-16 flex items-center justify-center`}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} pt-16 flex items-center justify-center`}>
        <div className="text-white text-xl">Anime not found</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br ${backgroundGradient} pt-16 pb-0`}>
      <div className="flex-grow flex flex-col">
        {/* Header Section with Large Image */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-xl md:text-2xl text-white/90 italic">{anime.title_english}</p>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl sticky top-24">
              <img
                src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                alt={anime.title}
                className="w-full aspect-[3/4] object-cover"
              />
              {anime.score && (
                <div className="p-4 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      {anime.score}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add to Watched Button */}
              <div className="p-4 border-t border-white/20">
                {watchedEntry ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/watched')}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/50"
                  >
                    ✓ In Watched List
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsWatchedModalOpen(true)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/50"
                  >
                    + Add to Watched
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Synopsis and Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {/* Synopsis Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Synopsis</h2>
              <p className="text-white/90 leading-relaxed text-lg">
                {anime.synopsis || 'No synopsis available.'}
              </p>

              {/* Genre Tags */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {anime.genres.map((genre, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-semibold"
                    >
                      {genre.name}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            {/* Information Grid */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Type</h3>
                  <p className="text-white text-lg">{anime.type || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Episodes</h3>
                  <p className="text-white text-lg">{anime.episodes || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Status</h3>
                  <p className="text-white text-lg">{anime.status || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Aired</h3>
                  <p className="text-white text-lg">
                    {formatDate(anime.aired?.from)} - {formatDate(anime.aired?.to)}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Studio</h3>
                  <p className="text-white text-lg">
                    {anime.studios?.map(s => s.name).join(', ') || 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Duration</h3>
                  <p className="text-white text-lg">{anime.duration || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Rating</h3>
                  <p className="text-white text-lg">{anime.rating || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-white/70 text-sm font-semibold mb-1">Source</h3>
                  <p className="text-white text-lg">{anime.source || 'N/A'}</p>
                </div>
              </div>

              {anime.trailer?.url && (
                <div className="mt-8">
                  <a
                    href={anime.trailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-colors"
                  >
                    Watch Trailer →
                  </a>
                </div>
              )}
            </div>

            {/* Gallery Section */}
            {(anime.images || galleryImages.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">GALLERY</h2>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.length > 0 ? (
                      galleryImages.map((pic, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                        >
                          <img
                            src={pic.jpg?.large_image_url || pic.jpg?.image_url}
                            alt={`${anime.title} - Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))
                    ) : (
                      anime.images && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                        >
                          <img
                            src={anime.images.jpg?.large_image_url || anime.images.jpg?.image_url}
                            alt={anime.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Add to Watched Modal */}
      {isWatchedModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWatchedModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-700/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Add to Watched</h2>
            <p className="text-white/60 mb-6">{anime.title}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-3">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Watching', 'Completed', 'On Hold', 'Dropped'].map((status) => (
                    <motion.button
                      key={status}
                      type="button"
                      onClick={() => setWatchStatus(status)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                        watchStatus === status
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {status}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <motion.button
                type="button"
                onClick={() => setIsWatchedModalOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  addToWatched(anime, { status: watchStatus })
                  setIsWatchedModalOpen(false)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/50"
              >
                Add to List
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </div>
      <Footer />
    </div>
  )
}

export default AnimeDetail

