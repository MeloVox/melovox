import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

export const UserInfo = () => {
  const [user, setUser] = useState([])
  const navigate = useNavigate()

  const refreshPage = () => {
    window.location.reload(false)
  }

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    const spotify = sessionStorage.getItem('spotify-login')

    if (response) {
      const { data } = JSON.parse(response)
      setUser(data)
    }

    if (!response && !spotify) {
      console.log(response)
      navigate('/login')
      return
    }
  }, [navigate])
  const logout = () => {
    googleLogout()
    sessionStorage.clear()
    navigate('/login')
    refreshPage()
  }
  return (
    <div className="bgcolor flex justify-center w-full h-screen text-white">
      <section className="w-[50%] h-full">
        <div className="h-[50%] flex justify-center items-center">
          <div className="h-full w-full flex justify-center items-center">
            <img className="rounded-full w-[25%]" src={user?.picture} alt="" />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center items-center flex-col">
            <h1 className="text-xl font-Rollicker">Followers</h1>
            <div className="font-Anton">
              <span>Tony</span>
              <span>Tony</span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[50%] h-full">
        <div className="h-[50%] w-[80%] flex justify-center items-center">
          <div className="w-full bgbox rounded-lg p-5 space-y-5">
            <h1 className="text-xl font-Rollicker">User Informations</h1>
            <div className="font-Anton flex flew-col">
              <span>{user?.email}</span>
            </div>
            <button
              className="hover:text-slate-300 hover:border-slate-300 border rounded-md p-2"
              onClick={logout}
            >
              Disconnect
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-Rollicker">Favorite Songs</h1>
          <div className="font-Anton">
            <span>Song 1</span>
          </div>
        </div>
      </section>
    </div>
  )
}
