import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main/Main'
import Nav from './components/nav/Nav'
import Develop from './pages/Develop/Develop'
import PostDevelop from './pages/Develop/PostDevelop'
import DevelopDetail from './pages/Develop/DevelopDetail'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="h-screen min-h-screen w-full bg-bg py-16">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/develop" element={<Develop />} />
          <Route path="/postdevelop" element={<PostDevelop />} />
          <Route path="/develop/:id" element={<DevelopDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
