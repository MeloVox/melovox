import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'

const Layout = () => {
  const [user, setUser] = useState([])
  const navigate = useNavigate()

  const handlePP = () => {
    if (user?.picture)
      return (
        <img className="rounded-full h-10 w-10" src={user.picture} alt="" />
      )
    else return ''
  }

  useEffect(() => {
    const response = localStorage.getItem('user')
    if (!response) {
      return
    }
    const { data } = JSON.parse(response)
    setUser(data)
  }, [navigate])
  return (
    <>
      <nav className="sticky w-full h-28 bgcolor flex">
        <img className="p-5" src={logo} alt="" />
        <ul className="absolute p-10 right-0 flex items-center space-x-5 text-white text-md font-Anton">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <input
            placeholder="Search in site"
            className="bgcolor font-roboto text-sm border bordercolor border-2 rounded-md py-1 px-2"
            type="search"
          />
          <a href="">{handlePP()}</a>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
