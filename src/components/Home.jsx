import { useState, useEffect } from 'react'

//CLE SPOTIFY CLIENT ID ET CLIENT SECRET
const CLIENT_ID = 'dc5a9c0f2475447b9959b26313b4d9f2'
const CLIENT_SECRET = 'c8a1e011fc8b4cc2a2d2983eb647b7f4'

function App() {
  // Stocke la valeur de la barre de recherche
  const [searchInput, setSearchInput] = useState('')
  // Stocke le token d'accès Spotify
  const [accessToken, setAccessToken] = useState('')
  // Stocke une liste d'artistes
  const [artist, setArtist] = useState({})
  // Stocke une liste de chansons
  const [songs, setSongs] = useState([])
  // Stocke une liste d'albums
  const [albums, setAlbums] = useState([])

  //Transmet les infos à Spotify
  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    const searchType = document.getElementById('select').value

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }

    if (searchType === 'artist') {
      const artistData = await fetch(
        'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
        searchParameters,
      )
        .then(response => response.json())
        .then(data => data.artists.items)

      setArtist(artistData)
      console.log(artistData[0])

      // Réinitialise les états pour les albums et les chansons
      setAlbums([])
      setSongs([])
    } else if (searchType === 'album') {
      const albumData = await fetch(
        'https://api.spotify.com/v1/search?q=' + searchInput + '&type=album',
        searchParameters,
      )
        .then(response => response.json())
        .then(data => data.albums.items)

      setAlbums(albumData)
      console.log(albumData[0])

      // Réinitialise les états pour les artistes et les chansons
      setArtist([])
      setSongs([])
    } else if (searchType === 'song') {
      const songData = await fetch(
        'https://api.spotify.com/v1/search?q=' + searchInput + '&type=track',
        searchParameters,
      )
        .then(response => response.json())
        .then(data => data.tracks.items)

      setSongs(songData)
      console.log(songData[0])

      // Réinitialise les états pour les artistes et les albums
      setArtist([])
      setAlbums([])
    }
  }

  return (
    <div className="mt-4 pt-72 w-full  text-white bg-black ">
      {/* Recherche un artiste par le nom */}
      <div className="flex justify-center gap-6">
        <input
          placeholder="Chercher un album"
          className="relative m-0 -mr-0.5 block min-w-0  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          onKeyUp={event => {
            if (event.key === 'Enter') {
              search()
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
        ></input>
        <select
          defaultValue={''}
          id="select"
          name="select"
          className="block py-2.5 text-center px-0 w-36 text-sm bg-transparent border-b-2 border-gray-200 appearance-none border-black focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected value="art" className="text-black">
            {'<'} -Selectionner-{'>'}
          </option>
          <option value="artist" className="text-black">
            Artist
          </option>
          <option value="album" className="text-black">
            Album
          </option>
          <option value="song" className="text-black">
            Chanson
          </option>
        </select>

        <button
          onClick={search}
          className="relative border-2 text-white z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight  shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        >
          Rechercher{' '}
        </button>
      </div>

      <div className="flex-col gap-6 flex mt-8">
        <div className="flex justify-center items-center gap-8 w-full">
          <div className="bg-gradient-to-r from-red-400 to-red-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Rap</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Techno
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Disco</div>
          </div>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Jazz
          </div>

          <div className="bg-gradient-to-r from-red-400 to-red-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Metal</div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8 w-full ">
          <div className="bg-gradient-to-r from-green-200 to-blue-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Raggae</div>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Chill
          </div>
          <div className="bg-gradient-to-r from-red-400 to-red-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">K-Pop</div>
          </div>
          <div className="bg-gradient-to-r from-orange-200 to-orange-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Lo-Fi</div>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Movies
          </div>
          <div className="bg-gradient-to-r from-green-200 to-blue-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Funk
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 w-full ">
          <div className="bg-gradient-to-r from-green-200 to-green-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">RnB</div>
          </div>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Alternatif
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-yellow-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Dub</div>
          </div>
          <div className="bg-gradient-to-r from-pink-400 to-pink-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Funk
          </div>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Electro
          </div>
        </div>
      </div>

      <div className="flex space-x-20 justify-center">
        {artist &&
          artist.length > 0 &&
          artist.slice(0, 6).map((singleArtist, index) => (
            <div key={index}>
              <a>{singleArtist.name}</a>
              <img
                className="rounded-full"
                style={{ width: '5em' }}
                src={
                  singleArtist.images.length > 0
                    ? singleArtist.images[0].url
                    : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
                }
              ></img>
            </div>
          ))}
      </div>
      <div className="flex space-x-20 justify-center">
        {' '}
        {albums &&
          albums.length > 0 &&
          albums.slice(0, 6).map((album, i) => (
            <div key={i}>
              <a>{album.name}</a>
              <img
                style={{ width: '5em' }}
                src={
                  album.images.length > 0
                    ? album.images[0].url
                    : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
                }
              ></img>
            </div>
          ))}
      </div>
      <div className="flex space-x-20 justify-center">
        {songs &&
          songs.length > 0 &&
          songs.slice(0, 6).map((song, index) => (
            <div key={index}>
              <a>{song.name}</a>
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
