import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Callback from './components/Callback'
import SwiperList from './components/SwiperList.jsx'

import Login from './pages/Login'
import Test from './pages/Test'
import Notfound from './pages/404'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Artist from './pages/Artist'
import About from './pages/About'
import Genre from './pages/Genre'

function App() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bgcolor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/test" element={<Test />} />
            <Route path="/swiperlist" element={<SwiperList />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/artist/:artistId" element={<Artist />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
