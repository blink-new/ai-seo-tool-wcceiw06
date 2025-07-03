import { motion } from 'framer-motion'
import { BrainCircuitIcon } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <BrainCircuitIcon className="h-8 w-8 text-white" />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-900">
          Loading SEO AI Pro...
        </h2>
        <p className="text-gray-600">
          Preparing your intelligent SEO analysis tools
        </p>
      </motion.div>
    </div>
  )
}