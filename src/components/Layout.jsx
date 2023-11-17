import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState, createContext } from 'react'
import logo from '../assets/logo.svg'

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleUserLogin = () => {
      const { data } = JSON.parse(sessionStorage.getItem('user'))
      setUser(data)
      setIsLoggedIn(true)
    }

    const handleDisconnect = () => {
      setUser(null)
      setIsLoggedIn(false)
    }

    window.addEventListener('userLoggedIn', handleUserLogin)
    window.addEventListener('userDisconnected', handleDisconnect)
  })
  return (
    <>
      <header className="sticky top-0 z-10 w-full h-24">
        <nav className="h-full w-full bgcolor flex items-center">
          <img className="p-5" src={logo} alt="" />
          <ul className="absolute pr-5 right-0 flex items-center space-x-5 text-white text-md font-Anton">
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
            {isLoggedIn && user.picture ? (
              <>
                <Link to="/profile">
                  <img
                    className="rounded-full cursor-pointer h-10 w-10"
                    src={user.picture}
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
      <div className="w-full">
        <Outlet />
      </div>
      <footer className="w-full h-28 bgcolor flex justify-center items-center">
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
    </UserContext.Provider>
  )
}

export default Layout
