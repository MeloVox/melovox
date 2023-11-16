import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [message, setMessage] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const API = 'http://localhost:3333'
  const navigate = useNavigate()

  const submitRegister = (mail, password) => {
    fetch(`${API}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail, password }),
    })
      .catch(err => {
        setMessage(err.toString())
      })
      .then(reponse => {
        reponse.json().then(data => {
          const { message } = data
          setMessage(message)
        })
      })
  }

  const submitGoogle = googleUser => {
    fetch(`${API}/api/handlegoogle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleUser),
    })
      .catch(err => {
        setMessage(err.toString())
      })
      .then(reponse => {
        reponse.json().then(response => {
          const { message, data } = response
          setMessage(message)
          if (data) {
            localStorage.setItem('user', JSON.stringify(response))
            navigate('/profile')
          }
        })
      })
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center space-y-10 bgcolor text-white">
      <h1 className="w-fit text-5xl font-Rollicker">Welcome to Melovox !</h1>
      <div className="flex w-[30%] flex-col space-y-20">
        <div className="w-full flex justify-center items-center">
          <GoogleLogin
            shape="circle"
            theme="filled_black"
            onSuccess={credentialResponse => {
              submitGoogle(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
            useOneTap
          />
        </div>
        <form
          className="flex flex-col space-y-5"
          onSubmit={e => {
            e.preventDefault()
            submitRegister(mail, password)
          }}
        >
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              E-Mail adress or username
            </label>
            <input
              value={mail}
              onChange={e => setMail(e.target.value)}
              placeholder="E-Mail adress or username"
              className="px-4 py-1 font-Inter textcolor rounded-full bgbox h-10 border border-gray-500"
              type="mail"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-1 font-Inter textcolor rounded-full bgbox h-10 border border-gray-500"
              type="password"
            />
          </div>
          <span className="textcolor font-Inter text-sm underline cursor-pointer">
            Data Policy
          </span>
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
              I already have an account.
              <Link to="/login">
                <a className="ml-2 text-gray-300 font-bold underline cursor-pointer">
                  Log in
                </a>
              </Link>
            </span>
          </div>
          <p>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default Register
