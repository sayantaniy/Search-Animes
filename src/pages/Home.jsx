import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Footer from '../components/Footer'

const Home = () => {
  const [topAnimes, setTopAnimes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTopAnimes()
  }, [])

  const fetchTopAnimes = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=4')
      const data = await response.json()
      setTopAnimes(data.data || [])
    } catch (error) {
      console.error('Error fetching top anime:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Text Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-4"
                >
                  About Animes
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-white/90"
                >
                  Anime is a diverse medium of animation originating from Japan, characterized by distinct art styles, varied genres, and a global, multibillion-dollar, rapidly growing industry. While often associated with specific visual tropes—such as large eyes, vibrant hair, and detailed backgrounds—it encompasses a vast spectrum of storytelling, ranging from children's shows to complex, mature, and philosophical narratives. 
                </motion.p>
              </div>

              {/* Profile Picture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="relative"
              >
                <div className="w-48 h-48 bg-white/20 backdrop-blur-xl border-4 border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
                  <img className='w-full h-full object-cover' src="https://media.istockphoto.com/id/1360807875/photo/japanese-state-flag-waving-on-the-wind.jpg?s=612x612&w=0&k=20&c=vLcmUymOB6Wo_-_DrCClT2Hvxvr4ACBnY894W8MiBJU=" alt="japan flag" />
                </div>
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,255,255,0.3)',
                      '0 0 40px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Top Animes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center md:text-left">
            Top Animes
          </h2>

          {loading ? (
            <div className="text-center text-white/80 py-12">Loading top animes...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topAnimes.map((anime, index) => (
                <motion.div
                  key={anime.mal_id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
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
                    <h3 className="text-white font-semibold line-clamp-2 min-h-[3rem]">
                      {anime.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default Home

