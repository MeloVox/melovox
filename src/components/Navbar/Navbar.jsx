import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { CloseOutline, MenuOutline } from 'react-ionicons'
import { getSpotifyProfile } from '../../core'

const Header = () => {
  const getUser = () => JSON.parse(sessionStorage.getItem('user'))?.data
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isconnected'),
  )
  const [user, setUser] = useState(getUser)

  console.log(isLoggedIn)

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

  const [open, setOpen] = useState(false)

  return (
    <div className="h-16 shadow-md w-full top-0 left-0 text-white">
      <div className="h-full md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="h-full justify-between font-bold text-2xl cursor-pointer flex items-center gap-1">
          <Link to="/">
            {' '}
            <img className="w-auto h-14" src={logo} alt="Logo Melovox" />
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="items-center right-0 top-0  cursor-pointer md:hidden w-fit h-fit"
          >
            {open ? (
              <CloseOutline color={'white'} />
            ) : (
              <MenuOutline color={'white'} />
            )}
          </div>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 absolute md:static md:z-auto z-[0] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? 'top-16 bg-black' : 'top-[-490px]'
          }`}
        >
          {isLoggedIn ? (
            <>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/">Accueil</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/genre">Rechercher</Link>
              </li>
            </>
          ) : (
            <>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/">Accueil</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/genre">Rechercher</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/login">Se connecter</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/register">Créer un compte</Link>
              </li>
            </>
          )}
          {/* <input
              placeholder="Search in site"
              className="bgcolor font-roboto text-sm border bordercolor border-2 rounded-md py-1 px-2"
              type="search"
            /> */}
          {isLoggedIn && user ? (
            <>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link to="/profile">
                  <img
                    className="rounded-full cursor-pointer h-10 w-10 bg-white"
                    src={user?.photo}
                  />
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
