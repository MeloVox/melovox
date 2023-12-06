import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loginCode = searchParams.get('code')
    if (loginCode) {
      sessionStorage.setItem('spotify-login', loginCode)
      navigate('/profile')
      return
    }
    navigate('/login')
  }, [navigate, searchParams])
  return <></>
}

export default Callback
