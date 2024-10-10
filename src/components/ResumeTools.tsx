import React, { useContext } from 'react'
import { Lightbulb, Search, Zap, Trophy, Check, Target } from 'lucide-react'
import { ResumeData } from '../types'
import AIContext from '../contexts/AIContext'

interface ResumeToolsProps {
  resumeData: ResumeData
  updateResumeData: (newData: Partial<ResumeData>) => void
}

const ResumeTools: React.FC<ResumeToolsProps> = ({ resumeData, updateResumeData }) => {
  const { setAISuggestions } = useContext(AIContext)

  const handleSkillSuggester = () => {
    // Simulating AI suggestion
    const suggestedSkills = ['Problem Solving', 'Team Leadership', 'Project Management']
    setAISuggestions(suggestedSkills)
    alert('AI has suggested new skills. Check the suggestions area!')
  }

  const handleJobDescriptionAnalyzer = () => {
    // In a real app, this would parse a job description
    const keywords = ['communication', 'teamwork', 'innovation']
    alert(`Key skills found in job description: ${keywords.join(', ')}`)
  }

  const handleActionVerbFinder = () => {
    const actionVerbs = ['Implemented', 'Developed', 'Coordinated', 'Streamlined']
    setAISuggestions(actionVerbs)
    alert('Action verbs suggested. Check the suggestions area!')
  }

  const handleAchievementFormatter = () => {
    const formatted = resumeData.experience.map(exp => ({
      ...exp,
      responsibilities: exp.responsibilities.map(r => 
        `${['Achieved', 'Improved', 'Increased'][Math.floor(Math.random() * 3)]} ${r}`
      )
    }))
    updateResumeData({ experience: formatted })
    alert('Achievements reformatted with action verbs!')
  }

  const handleGrammarCheck = () => {
    // Simulating a grammar check
    alert('Grammar check complete. No errors found!')
  }

  const handleKeywordOptimizer = () => {
    // In a real app, this would analyze against common job keywords
    const optimizedSummary = `${resumeData.summary} Experienced in agile methodologies and cross-functional collaboration.`
    updateResumeData({ summary: optimizedSummary })
    alert('Resume optimized with industry keywords!')
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Resume Building Tools</h2>
      <div className="grid grid-cols-3 gap-4">
        <button onClick={handleSkillSuggester} className="flex items-center justify-center bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
          <Lightbulb className="mr-2" size={20} />
          Skill Suggester
        </button>
        <button onClick={handleJobDescriptionAnalyzer} className="flex items-center justify-center bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
          <Search className="mr-2" size={20} />
          Job Description Analyzer
        </button>
        <button onClick={handleActionVerbFinder} className="flex items-center justify-center bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
          <Zap className="mr-2" size={20} />
          Action Verb Finder
        </button>
        <button onClick={handleAchievementFormatter} className="flex items-center justify-center bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
          <Trophy className="mr-2" size={20} />
          Achievement Formatter
        </button>
        <button onClick={handleGrammarCheck} className="flex items-center justify-center bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
          <Check className="mr-2" size={20} />
          Grammar Checker
        </button>
        <button onClick={handleKeywordOptimizer} className="flex items-center justify-center bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
          <Target className="mr-2" size={20} />
          Keyword Optimizer
        </button>
      </div>
    </div>
  )
}

export default ResumeTools