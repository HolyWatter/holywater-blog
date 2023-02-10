import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
