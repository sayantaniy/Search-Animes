import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const searchAnime = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=20`)
      const data = await response.json()
      setSearchResults(data.data || [])
    } catch (error) {
      console.error('Error searching anime:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchAnime(searchQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Search Anime</h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your favorite anime..."
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white font-semibold hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {loading && (
          <div className="text-center text-white/80 py-12">Searching...</div>
        )}

        {!loading && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {searchResults.map((anime, index) => (
              <motion.div
                key={anime.mal_id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl cursor-pointer group"
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {anime.score && (
                    <div className="absolute top-3 right-3 bg-yellow-400/90 backdrop-blur-sm text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
                      ⭐ {anime.score}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold line-clamp-2 min-h-[3rem] mb-2 anime-title">
                    {anime.title}
                  </h3>
                  <div className="flex items-center justify-between text-white/70 text-sm">
                    <span>{anime.type}</span>
                    <span>{anime.episodes || '?'} eps</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && searchQuery && searchResults.length === 0 && (
          <div className="text-center text-white/80 py-12">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

