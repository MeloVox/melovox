import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'

const Layout = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleConnected = () => {
    if (!user) {
      return (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )
    }
    return (
      <>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </>
    )
  }

  const handlePP = () => {
    if (user?.picture)
      return (
        <Link to="/profile">
          <img
            className="rounded-full cursor-pointer h-10 w-10"
            src={user.picture}
            alt=""
          />
        </Link>
      )
    else return
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
          {handleConnected()}
          <input
            placeholder="Search in site"
            className="bgcolor font-roboto text-sm border bordercolor border-2 rounded-md py-1 px-2"
            type="search"
          />
          {handlePP()}
        </ul>
      </nav>
      <Outlet />
      <footer className="sticky w-full h-28 bgcolor flex justify-center items-center">
        <ul className="p-10 flex items-center space-x-20 text-white text-md font-Anton">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/policy">Privacy Policiy</Link>
          </li>
          <li>
            <Link to="/tos">Terms of Service</Link>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default Layout
