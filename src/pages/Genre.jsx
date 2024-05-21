import { useState } from 'react'
import { spotifySearchArtists, handleSpotify } from '../core'
import SwiperDisk from '../components/Swiper/SwiperDisk'
import SwiperList from '../components/Swiper/SwiperList'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import useMediaQuery from '../hooks/useMediaQuery'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const isMobile = useMediaQuery('(max-width: 768px)')

  const search = async () => {
    handleSpotify()
    const response = sessionStorage.getItem('spotify-token')

    if (!searchInput.trim()) {
      setError('Veuillez saisir quelque chose dans le champ de recherche.')
      return
    }

    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      const items = await spotifySearchArtists({ token, searchInput })
      setItems(items)
      console.log(items)
      setError(null)
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      search()
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full h-full items-center">
          <div className="flex w-3/4 flex-col items-center justify-between p-3">
            <div className="flex items-center justify-center w-full md:w-1/2">
              <input
                id="searchInput"
                placeholder="Chercher un artiste"
                className="block w-full px-3 py-2 text-black border-neutral-300 rounded-l focus:outline-none focus:border-primary"
                onChange={event => setSearchInput(event.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                type="submit"
                onClick={search}
                className="btnlog px-6 py-2 bg-primary text-white border rounded-r hover:bg-primary-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Rechercher
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          {isMobile ? (
            <SwiperList images={items} />
          ) : (
            <SwiperDisk images={items} />
          )}
          {/* <p className="text-white text-2xl font-Rollicker">Artiste : </p> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
