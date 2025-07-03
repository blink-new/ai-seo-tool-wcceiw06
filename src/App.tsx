import { useState, useEffect } from 'react'
import { SearchIcon, TrendingUpIcon, BarChart3Icon, BrainCircuitIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { blink } from './blink/client'
import { URLAnalyzer } from './components/URLAnalyzer'
import { SEODashboard } from './components/SEODashboard'
import { LoadingScreen } from './components/LoadingScreen'
import { AnalysisData } from './types/seo'

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await blink.auth.me()
        setUser(userData)
      } catch (error) {
        console.error('Auth error:', error)
        // If not authenticated, Blink will redirect automatically
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <BrainCircuitIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SEO AI Pro
              </h1>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-sm text-gray-600">
                Welcome, {user.displayName || user.email}
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {(user.displayName || user.email).charAt(0).toUpperCase()}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisData ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <motion.div 
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                AI-Powered SEO Analysis
                <span className="block text-2xl font-normal text-gray-600 mt-2">
                  Optimize your website with intelligent insights
                </span>
              </h2>
              
              <div className="flex justify-center space-x-8 mt-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <SearchIcon className="h-5 w-5" />
                  <span>Deep Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <TrendingUpIcon className="h-5 w-5" />
                  <span>Growth Insights</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BarChart3Icon className="h-5 w-5" />
                  <span>Performance Metrics</span>
                </div>
              </div>
            </motion.div>

            {/* URL Analyzer */}
            <URLAnalyzer onAnalysisComplete={setAnalysisData} />
          </div>
        ) : (
          <SEODashboard 
            data={analysisData} 
            onNewAnalysis={() => setAnalysisData(null)}
          />
        )}
      </main>
    </div>
  )
}

export default App