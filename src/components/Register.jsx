import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

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
    <div className="h-screen w-full flex justify-center items-center bgcolor">
      <div className="flex flex-col space-y-5 text-white">
        <h1 className="text-4xl font-Rollicker text-center">Welcome</h1>
        <GoogleLogin
          onSuccess={credentialResponse => {
            submitGoogle(credentialResponse)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
          useOneTap
        />
        <form
          className="flex flex-col space-y-5"
          onSubmit={e => {
            e.preventDefault()
            submitRegister(mail, password)
          }}
        >
          <div className="flex flex-col">
            <label className="font-Inter font-bold" htmlFor="">
              E-Mail adress
            </label>
            <input
              value={mail}
              onChange={e => setMail(e.target.value)}
              className="px-2 text-black border border-black"
              type="mail"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col">
            <label className="font-Inter font-bold">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-2 text-black border border-black"
              type="password"
            />
          </div>
          <button
            className="w-fit border border-black font-Anton"
            type="submit"
          >
            Register
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default Register
