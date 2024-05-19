import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Callback from './pages/Callback'
import Login from './pages/Login'
import Home from './pages/Home'
import Test from './pages/Test'
import Notfound from './pages/404'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Artist from './pages/Artist'
import About from './pages/About'
import Genre from './pages/Genre'
import Album from './pages/Album'
import TestComments from './pages/TestComments'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/test" element={<Test />} />
          <Route path="/testcomments" element={<TestComments />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
