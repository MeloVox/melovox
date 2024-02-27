import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authMelovoxAPI, spotifyLogin } from '../core'
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google'
import logo_spotify from '../assets/logo_spotify.png'
import logo_google from '../assets/Google_logo.png'

function Login() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = useGoogleLogin({
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
  })

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    const spotify = sessionStorage.getItem('spotify-login')
    if (response || spotify) {
      navigate('/profile')
      return
    }
  }, [navigate])

  return (
    <div className="h-screen w-full flex flex-col text-white space-y-10 justify-center items-center bg-neons">
      <h1 className="w-fit text-5xl font-Rollicker">Welcome Back !</h1>
      <div className="flex w-[35%] flex-col space-y-20 shadow-md shadow-white/30 shadow-inner backdrop-blur-xl bg-white/20 rounded-2xl p-5">
        <div className="w-full flex flex-col space-y-5 justify-center items-center">
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
                onClick={login}
                className="w-full text-sm flex space-x-2 p-2 justify-center items-center rounded-full cursor-pointer bg-transparent border transition-all"
              >
                <img src={logo_google} className="w-4" />
                <p className="w-fit font-Inter font-medium">
                  Continue with google
                </p>
              </div>
            </div>
            <div
              onClick={spotifyLogin}
              className="w-full text-sm flex space-x-2 p-2 justify-center items-center rounded-full cursor-pointer bg-transparent border transition-all"
            >
              <img src={logo_spotify} className="w-4" />
              <p className="w-fit font-Inter font-medium">
                Continue with spotify
              </p>
            </div>
          </div>
        </div>
        <form
          className="flex flex-col space-y-5 justify-center items-center"
          onSubmit={e => {
            e.preventDefault()
            authMelovoxAPI({
              url: `api/login`,
              props: { email, password },
              callback: { setMessage, navigate },
            })
          }}
        >
          <div className="w-[85%]">
            <div className="flex flex-col space-y-2">
              <label className="font-Inter font-semibold" htmlFor="">
                E-Mail adress or username
              </label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="E-Mail adress or username"
                className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
                type="mail"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-Inter font-semibold">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
                type="password"
              />
            </div>
            <span className="textcolor font-Inter text-sm underline cursor-pointer">
              Forgot password ?
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
          </div>
        </form>
        <div className="w-full flex justify-center items-center">
          <span className="textcolor font-Inter text-sm">
            I dont have an account yet.
            <Link
              className="ml-2 text-gray-300 font-bold underline cursor-pointer"
              to="/register"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
