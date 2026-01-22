import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/search'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Search Anime
            </Link>
            <Link
              to="/watched"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/watched'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Watched
            </Link>
          </div>
          
          <Link to="/" className="flex items-center space-x-2">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold text-white logo"
            >
             anisearch
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

