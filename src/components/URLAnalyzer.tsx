import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchIcon, GlobeIcon, Loader2Icon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { blink } from '../blink/client'
import { AnalysisData } from '../types/seo'
import toast from 'react-hot-toast'

interface URLAnalyzerProps {
  onAnalysisComplete: (data: AnalysisData) => void
}

export function URLAnalyzer({ onAnalysisComplete }: URLAnalyzerProps) {
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
    
    if (!validateUrl(normalizedUrl)) {
      toast.error('Please enter a valid URL')
      return
    }

    setAnalyzing(true)
    try {
      // Step 1: Scrape the website
      const scrapeData = await blink.data.scrape(normalizedUrl)
      
      // Step 2: Extract content for analysis
      const content = scrapeData.markdown || scrapeData.extract?.text || ''
      const metadata = scrapeData.metadata || {}
      
      // Step 3: AI Analysis
      const analysisPrompt = `
        Analyze this website for SEO optimization. Provide a comprehensive analysis including:
        
        Website: ${normalizedUrl}
        Title: ${metadata.title || 'No title found'}
        Description: ${metadata.description || 'No description found'}
        Content preview: ${content.substring(0, 2000)}...
        
        Please provide analysis in JSON format with the following structure:
        {
          "overallScore": number (0-100),
          "titleAnalysis": {
            "score": number (0-100),
            "length": number,
            "issues": string[],
            "suggestions": string[]
          },
          "metaDescription": {
            "score": number (0-100),
            "length": number,
            "exists": boolean,
            "suggestions": string[]
          },
          "contentAnalysis": {
            "score": number (0-100),
            "wordCount": number,
            "readabilityScore": number,
            "headingStructure": object,
            "suggestions": string[]
          },
          "keywordAnalysis": {
            "score": number (0-100),
            "extractedKeywords": string[],
            "suggestedKeywords": string[],
            "keywordDensity": object
          },
          "technicalSEO": {
            "score": number (0-100),
            "issues": string[],
            "improvements": string[]
          },
          "actionableInsights": string[],
          "priorityActions": string[]
        }
      `

      const { object: analysis } = await blink.ai.generateObject({
        prompt: analysisPrompt,
        schema: {
          type: 'object',
          properties: {
            overallScore: { type: 'number' },
            titleAnalysis: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                length: { type: 'number' },
                issues: { type: 'array', items: { type: 'string' } },
                suggestions: { type: 'array', items: { type: 'string' } }
              }
            },
            metaDescription: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                length: { type: 'number' },
                exists: { type: 'boolean' },
                suggestions: { type: 'array', items: { type: 'string' } }
              }
            },
            contentAnalysis: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                wordCount: { type: 'number' },
                readabilityScore: { type: 'number' },
                headingStructure: { type: 'object' },
                suggestions: { type: 'array', items: { type: 'string' } }
              }
            },
            keywordAnalysis: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                extractedKeywords: { type: 'array', items: { type: 'string' } },
                suggestedKeywords: { type: 'array', items: { type: 'string' } },
                keywordDensity: { type: 'object' }
              }
            },
            technicalSEO: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                issues: { type: 'array', items: { type: 'string' } },
                improvements: { type: 'array', items: { type: 'string' } }
              }
            },
            actionableInsights: { type: 'array', items: { type: 'string' } },
            priorityActions: { type: 'array', items: { type: 'string' } }
          }
        }
      })

      const fullAnalysis = {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        metadata,
        scrapeData,
        seoAnalysis: analysis
      }

      onAnalysisComplete(fullAnalysis)
      toast.success('Analysis complete!')
      
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Analysis failed. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/60 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <GlobeIcon className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">
                Analyze Your Website
              </h3>
              <p className="text-gray-600">
                Get comprehensive SEO insights powered by AI
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Enter website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white"
                  disabled={analyzing}
                  onKeyDown={(e) => e.key === 'Enter' && analyzeWebsite()}
                />
                <GlobeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <Button
                onClick={analyzeWebsite}
                disabled={analyzing || !url.trim()}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                {analyzing ? (
                  <>
                    <Loader2Icon className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Website...
                  </>
                ) : (
                  <>
                    <SearchIcon className="h-5 w-5 mr-2" />
                    Start SEO Analysis
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  AI-Powered Analysis
                </Badge>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Actionable Insights
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}