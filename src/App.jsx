import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Test from './components/Test.jsx'
import Home from './components/Home.jsx'
import Notfound from './components/404.jsx'
import Register from './components/Register.jsx'
import Profile from './components/Profile.jsx'
import Artist from './components/Artist.jsx'
import Callback from './components/Callback.jsx'
import About from './components/About.jsx'
import Background from './components/Background.jsx'
import SwiperArrow from './components/SwiperArrow.jsx'
import SwiperInfinite from './components/SwiperInfinite.jsx'

function App() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bgcolor">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Test />}> */}
          <Route path="/test" element={<Test />} />
          <Route path="/Arrow" element={<SwiperArrow />} />
          <Route path="/Infinite" element={<SwiperInfinite />} />
          <Route index element={<Background />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<Notfound />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
