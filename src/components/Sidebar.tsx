import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Home, FileText, Bot, Settings, Layers, Briefcase, GraduationCap, Wrench, Puzzle, Award, User, MessageSquare, Image, Heart, BookOpen } from 'lucide-react'
import { ResumeData, ResumeComponent } from '../types'

interface SidebarProps {
  resumeData: ResumeData
}

const initialResumeComponents: ResumeComponent[] = [
  { id: 'work-experience', name: 'Work Experience', icon: <Briefcase size={20} /> },
  { id: 'education', name: 'Education', icon: <GraduationCap size={20} /> },
  { id: 'skills', name: 'Skills', icon: <Wrench size={20} /> },
  { id: 'projects', name: 'Projects', icon: <Puzzle size={20} /> },
  { id: 'key-accomplishments', name: 'Key Accomplishments', icon: <Award size={20} /> },
  { id: 'personal-brand-statement', name: 'Personal Brand Statement', icon: <User size={20} /> },
  { id: 'testimonials', name: 'Testimonials', icon: <MessageSquare size={20} /> },
  { id: 'visual-portfolio', name: 'Visual Portfolio', icon: <Image size={20} /> },
  { id: 'volunteer-experience', name: 'Volunteer Experience', icon: <Heart size={20} /> },
  { id: 'publications', name: 'Publications', icon: <BookOpen size={20} /> },
]

const Sidebar: React.FC<SidebarProps> = ({ resumeData }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard')

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              className={`flex items-center w-full p-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Home size={20} className="mr-2" /> Dashboard
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 rounded ${activeTab === 'templates' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('templates')}
            >
              <FileText size={20} className="mr-2" /> Templates
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 rounded ${activeTab === 'ai-assist' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('ai-assist')}
            >
              <Bot size={20} className="mr-2" /> AI Assist
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 rounded ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} className="mr-2" /> Settings
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full p-2 rounded ${activeTab === 'components' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('components')}
            >
              <Layers size={20} className="mr-2" /> Components
            </button>
          </li>
        </ul>
      </nav>

      {activeTab === 'components' && (
        <Droppable droppableId="sidebar" isDropDisabled={true}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Resume Components</h3>
              <ul className="space-y-2">
                {initialResumeComponents.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <button className="flex items-center w-full p-2 rounded hover:bg-gray-700">
                          {component.icon}
                          <span className="ml-2">{component.name}</span>
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </aside>
  )
}

export default Sidebar