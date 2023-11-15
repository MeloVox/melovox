import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Notfound from './components/404.jsx'

function App() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
