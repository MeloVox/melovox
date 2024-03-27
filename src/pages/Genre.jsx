import { useState } from 'react'
import { spotifySearch, handleSpotify } from '../core'
import SwiperList from '../components/SwiperList'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState([])

  const search = async () => {
    handleSpotify()
    const response = sessionStorage.getItem('spotify-token')
    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      const items = await spotifySearch({ token, searchInput })
      setItems(items)
      console.log(items)
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      search()
    }
  }

  return (
    <div className="flex mt-10 ">
      <div className="flex flex-col w-full h-full p-4 m-8 overflow-y-auto items-center">
        <div className="flex justify-between gap-6 mb-6 mt-10">
          <div className="flex gap-6 w-full">
            <input
              id="searchInput"
              placeholder="Chercher un album"
              className="relative block w-1/3 px-3 py-[0.25rem] text-base border border-solid border-neutral-300 rounded-l focus:outline-none focus:border-primary h-8"
              onChange={event => setSearchInput(event.target.value)}
              onKeyDown={handleKeyPress} // Ajout du gestionnaire d'événements onKeyDown
            />
            <button
              onClick={search}
              className="border border-solid border-black px-6 py-2.5 bg-primary text-white rounded-r hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Rechercher
            </button>
          </div>
          <p className="text-white text-2xl font-Rollicker">Artiste</p>
        </div>
        <SwiperList images={items} />
      </div>
    </div>
  )
}

export default App
