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
    console.log('Search for ' + searchInput)

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }

    //Récupère une liste d'artistes
    const artistData = await fetch(
      'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
      searchParameters,
    )
      .then(response => response.json())
      .then(data => data.artists.items)
    setArtist(artistData)
    console.log(artistData[0])

    //Récupère une liste d'albums par rapport à l'artiste [0]
    await fetch(
      'https://api.spotify.com/v1/artists/' +
        artistData[0].id +
        '/albums' +
        '?include_groups=album&market=US&limit=50',
      searchParameters,
    )
      .then(response => response.json())
      .then(data => {
        setAlbums(data.items)

        // Récupère une liste de chansons par rapport à l'artiste [0]
        if (data.items.length > 0) {
        fetch(
            'https://api.spotify.com/v1/albums/' + data.items[0].id + '/tracks',
            searchParameters,
          )
            .then(response => response.json())
            .then(data => {
              setSongs(data.items)
            })
        } else {
          console.error('La liste des albums est vide.')
        }
      })
  }

  return (
    <div class="space-y-20 mt-40  ">
      {/* Recherche un artiste par le nom */}
      <div class="flex justify-center">
        <input
          placeholder="Chercher un album"
          class="relative m-0 -mr-0.5 block min-w-0  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          onKeyUp={event => {
            if (event.key === 'Enter') {
              search()
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
        ></input>
        <select id="select" nom="select">
          <option selected value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <button onClick={search}       class="relative text-black z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight  shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
 >Rechercher</button>
      </div>
      <div class="flex space-x-20 justify-center">
        {artist &&
          artist.length > 0 &&
          artist.slice(0, 6).map((singleArtist, index) => (
            <div key={index}>
              <a>{singleArtist.name}</a>
              <img class="rounded-full"
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
      <div class="flex space-x-20 justify-center">        {albums &&
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
      <div class="flex space-x-20 justify-center">
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
