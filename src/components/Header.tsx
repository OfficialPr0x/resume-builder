import React from 'react'
import { Layout, Type, Palette, Sliders, Download } from 'lucide-react'
import { ResumeData } from '../types'

interface HeaderProps {
  resumeData: ResumeData
}

const Header: React.FC<HeaderProps> = ({ resumeData }) => {
  const handleDownload = () => {
    // In a real application, this would generate a PDF
    console.log('Downloading resume:', resumeData)
    alert('Resume download started!')
  }

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ProResume</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><button className="flex items-center text-gray-600 hover:text-blue-600"><Layout className="mr-1" size={18} /> Layout</button></li>
            <li><button className="flex items-center text-gray-600 hover:text-blue-600"><Type className="mr-1" size={18} /> Fonts</button></li>
            <li><button className="flex items-center text-gray-600 hover:text-blue-600"><Palette className="mr-1" size={18} /> Themes</button></li>
            <li><button className="flex items-center text-gray-600 hover:text-blue-600"><Sliders className="mr-1" size={18} /> Format</button></li>
            <li><button onClick={handleDownload} className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"><Download className="mr-1" size={18} /> Download</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header