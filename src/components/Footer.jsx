import { motion } from 'motion/react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16 py-8 bg-white/10 backdrop-blur-xl border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/80 text-sm footer-text">© All right reserved</p>
          <p className="text-white/80 text-sm footer-text">Made with ❤️ by Sayantani</p>
          <a href="https://www.linkedin.com/in/sayantani-manna-32852a32a/" className="text-white/80 hover:text-white text-sm transition-colors footer-text">
            Contact Me 
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer

