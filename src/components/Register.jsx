import { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate, Link } from 'react-router-dom'
import { authMelovoxAPI, spotifyLogin } from '../core.js'
import logo_spotify from '../assets/logo_spotify.png'
import Background from './Background'
import register from '../assets/register.png'

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
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-10 bgcolor text-white" style={{ zIndex: 2 }}>
        <h1 className="w-fit text-3xl font-Marcellus" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Avec <span style={{ color: "#D340AA" }}>Melovox</span>, partage ton opinion sur les titres les plus écoutés !</h1>
        <div className="flex w-full justify-center">
          <div className="flex flex-col justify-center items-center w-[40%] mr-10">
            <img src={register} className="w-full h-auto" style={{ filter: "drop-shadow(0px 0px 5px white)" }} />
          </div>
          <div className="flex w-[35%] flex-col p-7 ml-10" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", borderRadius: "33px", boxShadow: "0px 0px 5px white" }}>
            <form
              className="flex flex-col space-y-5"
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
                  Adresse mail ou nom d'utilisateur
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adresse mail ou nom d'utilisateur"
                  className="px-4 py-1 font-Inter text-white rounded-full bgbox h-10 border border-white"
                  type="mail"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-Inter font-semibold">Mot de passe</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="px-4 py-1 font-Inter text-white rounded-full bgbox h-10 border border-white"
                  type="password"
                />
              </div>
              <span className="text-white font-Inter text-sm underline cursor-pointer flex justify-end">
                Politique de données
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
            <hr className="w-full my-5" />

            <div className="w-full flex flex-col space-y-5 justify-center items-center">
              <div className="w-fit space-y-5">
                <GoogleLogin
                  shape="circle"
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
                  className="w-full text-sm flex space-x-2 p-1 justify-center items-center rounded-full cursor-pointer bg-neutral-800 transition-all hover:bg-neutral-700"
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
            <hr className="w-full my-5" />
            <div className="w-full flex justify-center items-center">
              <span className="textcolor font-Inter text-sm">
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
    </>
  )
}

export default Register
