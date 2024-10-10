import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import Header from './components/Header'
import ResumeTools from './components/ResumeTools'
import { ResumeData, ResumeComponent } from './types'
import AIContext from './contexts/AIContext'

const initialResumeData: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '', title: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  interests: [],
  organizations: [],
  certificates: [],
  components: [],
}

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [aiSuggestions, setAISuggestions] = useState<string[]>([])

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prevData => ({ ...prevData, ...newData }))
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (source.droppableId === 'sidebar' && destination.droppableId === 'canvas') {
      const draggedComponent = resumeData.components[source.index]
      const newComponents = [...resumeData.components]
      newComponents.splice(source.index, 1)
      
      setResumeData(prevData => ({
        ...prevData,
        components: newComponents,
        [draggedComponent.id]: [...(prevData[draggedComponent.id as keyof ResumeData] as any[]), { id: `${draggedComponent.id}-${Date.now()}`, content: '' }]
      }))
    } else if (source.droppableId === destination.droppableId) {
      const items = Array.from(resumeData[source.droppableId as keyof ResumeData] as any[])
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)

      setResumeData(prevData => ({
        ...prevData,
        [source.droppableId]: items
      }))
    }
  }

  return (
    <AIContext.Provider value={{ aiSuggestions, setAISuggestions }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header resumeData={resumeData} />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar resumeData={resumeData} />
            <main className="flex-1 p-6 overflow-y-auto">
              <ResumeTools resumeData={resumeData} updateResumeData={updateResumeData} />
              <Canvas resumeData={resumeData} updateResumeData={updateResumeData} />
            </main>
          </div>
        </div>
      </DragDropContext>
    </AIContext.Provider>
  )
}

export default App