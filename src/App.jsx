import { Routes,Route } from 'react-router-dom'
import UserForm from './components/userForm'

import './App.css'
import Home from './components/home/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/getregister' element={<UserForm/>}/>
      </Routes>
    </>
  )
}

export default App;
