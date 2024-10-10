import React from 'react'

interface AIContextType {
  aiSuggestions: string[]
  setAISuggestions: React.Dispatch<React.SetStateAction<string[]>>
}

const AIContext = React.createContext<AIContextType>({
  aiSuggestions: [],
  setAISuggestions: () => {},
})

export default AIContext