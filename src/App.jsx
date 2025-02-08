import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import UserForm from './components/userForm'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<UserForm/>}/>
      </Routes>
    </>
  )
}

export default App
