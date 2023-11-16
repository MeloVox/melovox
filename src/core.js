const API = 'http://127.0.0.1:3333'

export const submitGoogle = (googleUser, setMessage, navigate) => {
  fetch(`${API}/api/handlegoogle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(googleUser),
  })
    .catch(err => {
      if (err instanceof TypeError)
        setMessage(`API offline: login not supported`)
      else setMessage(err.toString())
      return
    })
    .then(reponse => {
      if (!reponse) return
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

export const submitLogin = (user, setMessage, navigate) => {
  const { mail, password } = user
  fetch(`${API}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: mail, password }),
  })
    .catch(err => {
      if (err instanceof TypeError)
        setMessage(`API offline: login not supported`)
      else setMessage(err.toString())
      return
    })
    .then(reponse => {
      if (!reponse) return
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

export const submitRegister = (user, setMessage) => {
  const { mail, password } = user
  fetch(`${API}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: mail, password }),
  })
    .catch(err => {
      if (err instanceof TypeError)
        setMessage(`API offline: register not supported`)
      else setMessage(err.toString())
      return
    })
    .then(reponse => {
      if (!reponse) return
      reponse.json().then(data => {
        const { message } = data
        setMessage(message)
      })
    })
}
