import React, { useContext } from 'react'
import { ResumeData } from '../types'
import { Clock, Plus, Trash2 } from 'lucide-react'
import AIContext from '../contexts/AIContext'

interface CanvasProps {
  resumeData: ResumeData
  updateResumeData: (newData: Partial<ResumeData>) => void
}

const Canvas: React.FC<CanvasProps> = ({ resumeData, updateResumeData }) => {
  const { aiSuggestions } = useContext(AIContext)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateResumeData({ personalInfo: { ...resumeData.personalInfo, [name]: value } })
  }

  const addExperience = () => {
    updateResumeData({
      experience: [...resumeData.experience, { title: '', company: '', date: '', responsibilities: [''] }]
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    updateResumeData({ experience: newExperience })
  }

  const addResponsibility = (expIndex: number) => {
    const newExperience = [...resumeData.experience]
    newExperience[expIndex].responsibilities.push('')
    updateResumeData({ experience: newExperience })
  }

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const newExperience = [...resumeData.experience]
    newExperience[expIndex].responsibilities[respIndex] = value
    updateResumeData({ experience: newExperience })
  }

  const removeExperience = (index: number) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index)
    updateResumeData({ experience: newExperience })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="flex items-start mb-6">
        <div className="w-1/3">
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
          <input
            type="text"
            name="name"
            value={resumeData.personalInfo.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="title"
            value={resumeData.personalInfo.title}
            onChange={handleInputChange}
            placeholder="Professional Title"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={resumeData.personalInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            value={resumeData.personalInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full p-2 mb-2 border rounded"
          />
          <h2 className="text-xl font-semibold mt-4 mb-2">SKILLS</h2>
          <div className="space-y-2">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">{skill}</span>
            ))}
          </div>
          {/* Add more sections for languages, interests, etc. */}
        </div>
        <div className="w-2/3 pl-8">
          <h2 className="text-2xl font-semibold mb-4">SUMMARY</h2>
          <textarea
            value={resumeData.summary}
            onChange={(e) => updateResumeData({ summary: e.target.value })}
            placeholder="Write a brief summary..."
            className="w-full p-2 mb-4 border rounded"
            rows={4}
          />
          <h2 className="text-2xl font-semibold mb-4">WORK EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                placeholder="Job Title"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                placeholder="Company"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                value={exp.date}
                onChange={(e) => updateExperience(index, 'date', e.target.value)}
                placeholder="Date Range"
                className="w-full p-2 mb-2 border rounded"
              />
              {exp.responsibilities.map((resp, respIndex) => (
                <input
                  key={respIndex}
                  type="text"
                  value={resp}
                  onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                  placeholder="Responsibility"
                  className="w-full p-2 mb-2 border rounded"
                />
              ))}
              <button onClick={() => addResponsibility(index)} className="text-blue-600 hover:text-blue-800">
                <Plus size={16} className="inline mr-1" /> Add Responsibility
              </button>
              <button onClick={() => removeExperience(index)} className="text-red-600 hover:text-red-800 ml-4">
                <Trash2 size={16} className="inline mr-1" /> Remove Experience
              </button>
            </div>
          ))}
          <button onClick={addExperience} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Experience
          </button>
        </div>
      </div>
      {aiSuggestions.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
          <h3 className="font-semibold mb-2">AI Suggestions:</h3>
          <ul className="list-disc list-inside">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Canvas