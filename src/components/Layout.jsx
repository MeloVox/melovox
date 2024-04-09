import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { getSpotifyProfile } from '../core'

const Layout = () => {
  const getUser = () => JSON.parse(sessionStorage.getItem('user'))?.data
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isconnected'),
  )
  const [user, setUser] = useState(getUser)

  useEffect(() => {
    const handleUserLogin = () => {
      sessionStorage.setItem('isconnected', true)
      setIsLoggedIn(true)
      if (getUser) {
        setUser(getUser)
      } else {
        const profile = getSpotifyProfile()
        console.log(profile)
      }
    }

    const handleDisconnect = () => {
      sessionStorage.setItem('isconnected', false)
      setUser(undefined)
      setIsLoggedIn(false)
    }

    window.addEventListener('userLoggedIn', handleUserLogin)
    window.addEventListener('userDisconnected', handleDisconnect)
  })
  return (
    <>
      <header className="sticky top-0 z-10 w-full h-24">
        <nav className="h-full w-full bg-transparent flex items-center">
          <img className="p-5" src={logo} alt="" />
          <ul className="hidden md:flex absolute pr-5 right-0 flex items-center space-x-5 text-white text-md font-Anton">
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            <input
              placeholder="Search in site"
              className="bgcolor font-roboto text-sm border bordercolor border-2 rounded-md py-1 px-2"
              type="search"
            />
            {isLoggedIn && user ? (
              <>
                <Link to="/profile">
                  <img
                    className="rounded-full cursor-pointer h-10 w-10"
                    src={user?.picture}
                    alt=""
                  />
                </Link>
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </header>
      <div className="w-full mb-20">
        <Outlet />
      </div>
      <footer className="w-full h-28 bgcolor flex justify-center items-center">
        <ul className="p-10 flex items-center text-white text-md font-Anton">
          <li className="ml-10">
            <Link to="/about">About Us</Link>
          </li>
          <li className="ml-10">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="mx-10">
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
