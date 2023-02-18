import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main/Main'
import Nav from './components/nav/Nav'
import DevelopList from './pages/Develop/DevelopList'
import PostDevelop from './pages/Develop/PostDevelop'
import DevelopDetail from './pages/Develop/DevelopDetail'
import Sidebar from './components/Aside/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="mx-0 h-full min-h-screen justify-center bg-bg py-16">
        <Sidebar />
        <div className="md:pl-[200px]">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/develop" element={<DevelopList />} />
            <Route path="/postdevelop" element={<PostDevelop />} />
            <Route path="/develop/:id" element={<DevelopDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
