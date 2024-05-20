import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authMelovoxAPI, spotifyLogin } from '../core'
import { GoogleLogin } from '@react-oauth/google'
import logo_spotify from '../assets/logo_spotify.png'
import Background from '../components/Background/Background'

function Login() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    const spotify = sessionStorage.getItem('spotify-login')
    if (response || spotify) {
      navigate('/genre')
      return
    }
  }, [navigate])

  return (
    <>
      <Background />
      <div
        className="h-screen w-full flex flex-col text-white space-y-10 justify-center items-center bgcolor"
        style={{ zIndex: 2 }}
      >
        <h1
          className="w-fit text-4xl font-Marcellus"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          Ravi de te revoir !
        </h1>
        <div className="flex w-full justify-center">
          <div className="flex w-[30%] flex-col space-y-10">
            <div className="w-full flex flex-col space-y-5 justify-center items-center">
              <div className="w-fit space-y-5">
                <GoogleLogin
                  shape="circle"
                  theme="filled_black"
                  onSuccess={credentialResponse =>
                    authMelovoxAPI({
                      url: `api/handlegoogle`,
                      props: credentialResponse,
                      callback: { setMessage, navigate },
                    })
                  }
                  onError={() => {
                    console.log('Login Failed')
                  }}
                  useOneTap
                />
                <div
                  onClick={spotifyLogin}
                  className="w-full text-sm flex space-x-2 p-1 justify-center items-center rounded-full cursor-pointer bg-neutral-800 transition-all hover:bg-neutral-700 "
                >
                  <p className="absolute w-fit textspotify font-Inter font-medium">
                    Continuer avec Spotify
                  </p>
                  <div className="w-full flex justify-start">
                    <img src={logo_spotify} className="w-8" />
                  </div>
                </div>
              </div>
            </div>
            <form
              className="flex flex-col space-y-5"
              onSubmit={e => {
                e.preventDefault()
                authMelovoxAPI({
                  url: `api/login`,
                  props: { email, password },
                  callback: { setMessage, navigate },
                })
              }}
            >
              <div className="flex flex-col space-y-2">
                <label className="font-Inter font-semibold" htmlFor="">
                  Adresse mail et nom d'utilisateur
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adresse mail et nom d'utilisateur"
                  className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
                  type="mail"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-Inter font-semibold">Mot de passe</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
                  type="password"
                />
              </div>
              <span className="textcolor font-Inter text-sm underline cursor-pointer">
                Mot de passe oublié ?
              </span>
              <p className="w-full text-center">{message}</p>
              <div className="w-full flex justify-center items-center">
                <button
                  className="mt-5 w-[50%] border border-black text-black rounded-full font-Anton bg-gray-300 py-2 px-5"
                  type="submit"
                >
                  Connexion
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <span className="textcolor font-Inter text-sm">
                  Je n'ai pas de compte.
                  <Link
                    className="ml-2 text-[#D340AA] font-bold underline cursor-pointer"
                    to="/register"
                  >
                    S'inscrire
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
