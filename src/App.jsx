import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Callback from './pages/Callback'
import Login from './pages/Login'
import Test from './pages/Test'
import Notfound from './pages/404'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Artist from './pages/Artist'
import About from './pages/About/About'
import Genre from './pages/Genre'
import Album from './pages/Album'
import TestComments from './pages/TestComments'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/test" element={<Test />} />
          <Route path="/testcomments" element={<TestComments />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
