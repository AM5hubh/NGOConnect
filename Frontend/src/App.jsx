import { useState } from 'react'
import './App.css'
import GoogleTranslate from './components/GTranslate/GoogleTranslate'
import Chatbot from './components/Chatbot/ChatBot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-green-500'>
      <h1 className='text-3xl text-bold'>NGOConnect</h1>
      <GoogleTranslate />
    
    </div>
  )
}

export default App
