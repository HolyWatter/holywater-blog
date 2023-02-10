import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Nav from "./components/nav/Nav";
import Develop from "./pages/Develop/Develop";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="min-h-screen w-full bg-bg py-16">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/develop" element={<Develop />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
