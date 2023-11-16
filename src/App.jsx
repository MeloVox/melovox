import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Notfound from './components/404.jsx'
import Register from './components/Register.jsx'
import { UserInfo } from './components/User.jsx'

function App() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserInfo />} />
            <Route path="/artist/:artistId" element={<Artist />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
