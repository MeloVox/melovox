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
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/profile')
          }
        })
      })
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col space-y-5 m-5 border border-black rounded-md p-5">
        <GoogleLogin
          onSuccess={credentialResponse => {
            submitGoogle(credentialResponse)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
          useOneTap
        />
        <h1 className="font-bold text-4xl">Register</h1>
        <form
          className="flex flex-col space-y-5"
          onSubmit={e => {
            e.preventDefault()
            submitRegister(mail, password)
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="">Mail</label>
            <input
              value={mail}
              onChange={e => setMail(e.target.value)}
              className="text-black px-2 border border-black"
              type="mail"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-black px-2 border border-black"
              type="password"
            />
          </div>
          <button className="w-fit border border-black" type="submit">
            Login
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default Register
