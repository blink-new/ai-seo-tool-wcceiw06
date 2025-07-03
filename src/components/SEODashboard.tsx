import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  TrendingUpIcon, 
  FileTextIcon, 
  TagIcon, 
  SettingsIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  RefreshCwIcon
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { AnalysisData } from '../types/seo'

interface SEODashboardProps {
  data: AnalysisData
  onNewAnalysis: () => void
}

export function SEODashboard({ data, onNewAnalysis }: SEODashboardProps) {
  const { seoAnalysis, url, metadata } = data

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onNewAnalysis}
              className="flex items-center space-x-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>New Analysis</span>
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ExternalLinkIcon className="h-4 w-4" />
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 underline"
              >
                {url}
              </a>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {metadata.title as string || 'Website Analysis'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-full ${getScoreBg(seoAnalysis.overallScore)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(seoAnalysis.overallScore)}`}>
              {seoAnalysis.overallScore}/100
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Priority Actions */}
      <Card className="border-2 border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertCircleIcon className="h-5 w-5" />
            <span>Priority Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {seoAnalysis.priorityActions?.map((action, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Badge variant="secondary" className="mt-0.5">{index + 1}</Badge>
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="title">Title & Meta</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Title SEO</p>
                    <p className={`text-2xl font-bold ${getScoreColor(seoAnalysis.titleAnalysis.score)}`}>
                      {seoAnalysis.titleAnalysis.score}
                    </p>
                  </div>
                  <FileTextIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Progress value={seoAnalysis.titleAnalysis.score} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Meta Description</p>
                    <p className={`text-2xl font-bold ${getScoreColor(seoAnalysis.metaDescription.score)}`}>
                      {seoAnalysis.metaDescription.score}
                    </p>
                  </div>
                  <TagIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Progress value={seoAnalysis.metaDescription.score} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Content Quality</p>
                    <p className={`text-2xl font-bold ${getScoreColor(seoAnalysis.contentAnalysis.score)}`}>
                      {seoAnalysis.contentAnalysis.score}
                    </p>
                  </div>
                  <TrendingUpIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Progress value={seoAnalysis.contentAnalysis.score} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Technical SEO</p>
                    <p className={`text-2xl font-bold ${getScoreColor(seoAnalysis.technicalSEO.score)}`}>
                      {seoAnalysis.technicalSEO.score}
                    </p>
                  </div>
                  <SettingsIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Progress value={seoAnalysis.technicalSEO.score} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Actionable Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <span>AI Insights & Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {seoAnalysis.actionableInsights?.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-1 rounded">
                      <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="title" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Title Tag Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>SEO Score</span>
                <Badge className={getScoreColor(seoAnalysis.titleAnalysis.score)}>
                  {seoAnalysis.titleAnalysis.score}/100
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Title Length</span>
                <Badge variant="outline">{seoAnalysis.titleAnalysis.length} characters</Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-700">Issues Found</h4>
                {seoAnalysis.titleAnalysis.issues?.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <AlertCircleIcon className="h-4 w-4 text-red-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{issue}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">Suggestions</h4>
                {seoAnalysis.titleAnalysis.suggestions?.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta Description Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>SEO Score</span>
                <Badge className={getScoreColor(seoAnalysis.metaDescription.score)}>
                  {seoAnalysis.metaDescription.score}/100
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Description Length</span>
                <Badge variant="outline">{seoAnalysis.metaDescription.length} characters</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Meta Description Exists</span>
                <Badge variant={seoAnalysis.metaDescription.exists ? "default" : "destructive"}>
                  {seoAnalysis.metaDescription.exists ? "Yes" : "No"}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">Suggestions</h4>
                {seoAnalysis.metaDescription.suggestions?.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span>Content Score</span>
                  <Badge className={getScoreColor(seoAnalysis.contentAnalysis.score)}>
                    {seoAnalysis.contentAnalysis.score}/100
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Word Count</span>
                  <Badge variant="outline">{seoAnalysis.contentAnalysis.wordCount} words</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">Content Improvements</h4>
                {seoAnalysis.contentAnalysis.suggestions?.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Extracted Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {seoAnalysis.keywordAnalysis.extractedKeywords?.map((keyword, index) => (
                    <Badge key={index} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {seoAnalysis.keywordAnalysis.suggestedKeywords?.map((keyword, index) => (
                    <Badge key={index} variant="outline">{keyword}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-700">Technical Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoAnalysis.technicalSEO.issues?.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertCircleIcon className="h-4 w-4 text-red-500 mt-0.5" />
                      <span className="text-sm text-gray-700">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Recommended Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoAnalysis.technicalSEO.improvements?.map((improvement, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}