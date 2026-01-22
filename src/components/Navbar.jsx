import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
    { path: '/watched', label: 'Watched' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-xl sm:text-2xl font-bold text-white logo"
            >
              anisearch
            </motion.span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

