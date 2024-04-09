import { useState, useEffect } from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { useNavigate, Link } from 'react-router-dom'
import { authMelovoxAPI, spotifyLogin } from '../core.js'
import logo_spotify from '../assets/logo_spotify.png'
import Background from './Background'
import register from '../assets/register.png'
import logo_google from '../assets/Google_logo.png'

function Register() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    const spotify = sessionStorage.getItem('spotify-login')

    if (response || spotify) {
      navigate('/profile')
      return
    }
  }, [navigate])

  return (
    <>
      <Background />
      <div
        className="h-screen w-full flex flex-col justify-center items-center space-y-10 bgcolor text-white"
        style={{ zIndex: 2 }}
      >
        <h1 className="w-full text-center text-3xl font-Anton mt-48 md:mt-38 mb-10">
          Avec <span style={{ color: '#D340AA' }}>Mélovox</span>, partage ton
          opinion sur les titres les plus écoutés !
        </h1>
        <div className="flex w-full flex-col space-y-10 md:flex-row h-fit justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[40%]">
            <img
              src={register}
              className="w-full"
              style={{ filter: 'drop-shadow(0px 0px 5px white)' }}
            />
          </div>
          <div className="flex h-full w-[80%] md:w-[40%] flex-col ml-10 justify-center items-center">
            <div className="h-fit flex w-full justify-center items-center flex-col bgLoginForm">
              <form
                className="flex flex-col space-y-5 w-[85%] mt-5"
                onSubmit={e => {
                  e.preventDefault()
                  authMelovoxAPI({
                    url: `api/register`,
                    props: { email, password },
                    callback: { setMessage, navigate },
                  })
                }}
              >
                <div className="flex flex-col space-y-2">
                  <label className="font-Inter font-semibold" htmlFor="">
                    E-mail ou identifiant
                  </label>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-mail ou identifiant"
                    className="px-4 py-1 font-Inter text-white rounded-full bg-transparent h-10 border border-white"
                    type="mail"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-Inter font-semibold">
                    Mot de passe
                  </label>
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="px-4 py-1 font-Inter text-white rounded-full bg-transparent h-10 border border-white"
                    type="password"
                  />
                </div>
                <span className="text-gray-400 font-Inter text-sm underline cursor-pointer flex justify-start">
                  Mot de passe oublié ?
                </span>
                <div className="w-full flex justify-center items-center">
                  <button
                    className="btnlog w-[75%] rounded-full font-Anton bg-[#1D2DB6] py-2 px-5"
                    type="submit"
                  >
                    Créer le compte
                  </button>
                </div>
                <p className="w-full text-center text-sm">{message}</p>
              </form>

              <div className="w-full flex flex-col space-y-5 justify-center items-center border-t border-neutral-400 pt-5">
                <div className="w-[85%] space-y-5">
                  <div className="hidden">
                    <GoogleLogin
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
                      useOneTap={true}
                    />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <div
                      onClick={useGoogleLogin({
                        onSuccess: credentialResponse =>
                          authMelovoxAPI({
                            url: `api/handlegoogle`,
                            props: credentialResponse,
                            callback: { setMessage, navigate },
                          }),
                        flow: 'auth-code',
                        onError: () => {
                          console.log('Login Failed')
                        },
                      })}
                      className="w-full text-sm flex space-x-2 p-2 justify-center items-center rounded-full cursor-pointer bg-transparent border transition-all"
                    >
                      <img src={logo_google} className="w-4" />
                      <p className="w-fit font-Inter font-medium">
                        Se connecter avec Google
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={spotifyLogin}
                    className="w-full text-sm flex space-x-2 p-2 justify-center items-center rounded-full cursor-pointer border border-white bg-transparent transition-all"
                  >
                    <img src={logo_spotify} className="w-4" />
                    <p className="w-fit font-Inter font-medium">
                      Se connecter avec Spotify
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center border-t border-neutral-400 mt-10">
                <span className="textcolor font-Inter text-sm my-5">
                  J'ai déjà un compte.
                  <Link
                    className="ml-2 text-[#D340AA] font-bold underline cursor-pointer"
                    to="/login"
                  >
                    Se connecter.
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
