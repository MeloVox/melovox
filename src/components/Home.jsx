import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  CardImg,
  CardSubtitle,
} from 'react-bootstrap'
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
    var authParameters = {
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

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }

    //Récupère une liste d'artistes
    var artistData = await fetch(
      'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
      searchParameters,
    )
      .then(response => response.json())
      .then(data => data.artists.items)

    setArtist(artistData)

    //Récupère une liste d'albums par rapport à l'artiste [0]
    var returnedAlbums = await fetch(
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
          var returnedSongs = fetch(
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
    <div style={{ height: '75vh' }}>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Chercher un album"
            type="input"
            onKeyUp={event => {
              if (event.key === 'Enter') {
                search()
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Rechercher</Button>
        </InputGroup>
      </Container>
      <Container>
        <h4>Artistes</h4>
        <Row className="mx-5 row row-cols-6">
          {artist &&
            artist.length > 0 &&
            artist.slice(0, 6).map((singleArtist, index) => (
              <Card key={index}>
                <CardBody>
                  <CardImg
                    style={{ width: '2em' }}
                    src={
                      singleArtist.images.length > 0
                        ? singleArtist.images[0].url
                        : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
                    }
                  />
                  <CardTitle style={{ fontSize: '15px' }}>
                    {singleArtist.name}
                  </CardTitle>
                  <CardText style={{ fontSize: '15px' }}>
                    {singleArtist.followers.total ??
                      'Nombre de followers non disponible'}
                  </CardText>
                </CardBody>
              </Card>
            ))}
        </Row>
        <h4>Albums du premier Artiste</h4>
        <Row className="mx-2 row row-cols-6">
          {albums.slice(0, 6).map((album, i) => {
            return (
              <Card key={i}>
                <Card.Img style={{ width: '2em' }} src={album.images[0].url} />
                <CardBody>
                  <CardTitle style={{ fontSize: '15px' }}>
                    {album.name}
                  </CardTitle>
                  <CardText style={{ fontSize: '15px' }}>
                    Sortie le: {album.release_date}
                  </CardText>
                  <CardSubtitle style={{ fontSize: '15px' }}>
                    Tracks: {album.total_tracks}
                  </CardSubtitle>
                </CardBody>
              </Card>
            )
          })}
        </Row>
        <h4>Chansons du premier albums</h4>
        <Row className="mx-2 row row-cols-6">
          {songs.slice(0, 6).map((song, i) => {
            return (
              <Card key={i}>
                <CardBody>
                  <CardTitle style={{ fontSize: '15px' }}>
                    {song.name}
                  </CardTitle>
                </CardBody>
              </Card>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default App
