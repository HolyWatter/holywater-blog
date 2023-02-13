import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main/Main'
import Nav from './components/nav/Nav'
import Develop from './pages/Develop/Develop'
import PostDevelop from './pages/Develop/PostDevelop'
import DevelopDetail from './pages/Develop/DevelopDetail'
import Sidebar from './components/Aside/Sidebar'
import ImaTest from './pages/ImaTest'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="h-full min-h-screen bg-bg py-16">
        <Sidebar />
        <div className="inline-block w-3/4">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/develop" element={<Develop />} />
            <Route path="/postdevelop" element={<PostDevelop />} />
            <Route path="/develop/:id" element={<DevelopDetail />} />
            <Route path="/test" element={<ImaTest />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
