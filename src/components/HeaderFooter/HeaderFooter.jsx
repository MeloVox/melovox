import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'

const HeaderFooter = () => {
  const getUser = () => JSON.parse(sessionStorage.getItem('user'))?.data
  const getSpotify = () => JSON.parse(sessionStorage.getItem('spotify-user'))
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isconnected'),
  )
  const [user, setUser] = useState(getUser)
  const [image, setImage] = useState([])

  useEffect(() => {
    const handleUserLogin = () => {
      sessionStorage.setItem('isconnected', true)
      setIsLoggedIn(true)
      const dataUser = getUser()
      const dataSpotify = getSpotify()
      if (dataUser) {
        setUser(dataUser)
      }
      if (dataSpotify) {
        const list_images = dataSpotify.images
        list_images.forEach(image => {
          setImage(image.url)
        })
      }
    }

    const handleDisconnect = () => {
      sessionStorage.setItem('isconnected', false)
      setUser(undefined)
      setImage(undefined)
      setIsLoggedIn(false)
    }

    window.addEventListener('userLoggedIn', handleUserLogin)
    window.addEventListener('userDisconnected', handleDisconnect)
  })
  return (
    <>
      <header className="fixed top-0 z-10 w-full h-24">
        <nav className="h-full w-full bg-transparent flex items-center">
          <img className="p-5" src={logo} alt="" />
          <ul className="absolute pr-5 right-0 flex items-center space-x-5 text-white text-md font-Anton">
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profil</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Se connecter</Link>
                </li>
                <li>
                  <Link to="/register">Créer un compte</Link>
                </li>
              </>
            )}
            <input
              placeholder="Search in site"
              className="bgcolor font-roboto text-sm border bordercolor border-2 rounded-md py-1 px-2"
              type="search"
            />
            {(isLoggedIn && user) || image ? (
              <>
                <Link to="/profile">
                  <img
                    className="rounded-full cursor-pointer h-10 w-10"
                    src={user?.picture || image}
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
      <footer className="fixed  bottom-0 z-10 w-full h-28 bgcolor flex justify-center items-center">
        <ul className="p-10 flex items-center space-x-20 text-white text-md font-Anton">
          <li>
            <Link to="/about">A Propos</Link>
          </li>
          <li>
            <Link to="/contact">Nous contacter</Link>
          </li>
          <li>
            <Link to="/policy">Politique de confidentialité</Link>
          </li>
          <li>
            <Link to="/tos">Conditions d'utilisation</Link>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default HeaderFooter
