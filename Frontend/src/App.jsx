import { useState } from 'react'
import './App.css'
import GoogleTranslate from './components/GTranslate/GoogleTranslate'
import Chatbot from './components/Chatbot/ChatBot'
import ScrollTop from './components/ScrollToTop/ScrollTop.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-green-500'>
      <h1 className='text-3xl text-bold'>NGOConnect</h1>
      {/* <GoogleTranslate /> */}
      {/* <ScrollTop /> */}
    </div>
  )
}

export default App
