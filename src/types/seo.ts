export interface SEOAnalysis {
  overallScore: number
  titleAnalysis: {
    score: number
    length: number
    issues: string[]
    suggestions: string[]
  }
  metaDescription: {
    score: number
    length: number
    exists: boolean
    suggestions: string[]
  }
  contentAnalysis: {
    score: number
    wordCount: number
    readabilityScore: number
    headingStructure: Record<string, unknown>
    suggestions: string[]
  }
  keywordAnalysis: {
    score: number
    extractedKeywords: string[]
    suggestedKeywords: string[]
    keywordDensity: Record<string, unknown>
  }
  technicalSEO: {
    score: number
    issues: string[]
    improvements: string[]
  }
  actionableInsights: string[]
  priorityActions: string[]
}

export interface AnalysisData {
  url: string
  timestamp: string
  metadata: Record<string, unknown>
  scrapeData: Record<string, unknown>
  seoAnalysis: SEOAnalysis
}