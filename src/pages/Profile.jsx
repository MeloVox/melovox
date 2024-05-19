import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import { Star, StarOutline } from 'react-ionicons'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const Profile = () => {
  const [user, setUser] = useState({})
  const [totalReviews, setTotalReviews] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [userReviews, setUserReviews] = useState([])
  const [userId, setUserId] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    const spotify = sessionStorage.getItem('spotify-login')

    if (response) {
      const { data } = JSON.parse(response)
      setUser(data)
      setUserId(data.id)
      setUserPhoto(data.photo)
    }

    if (!response && !spotify) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    googleLogout()
    sessionStorage.clear()
    const event = new CustomEvent('userDisconnected')
    window.dispatchEvent(event)
    navigate('/login')
  }

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/getReviews?userId=${userId}`,
      )
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des critiques de l'utilisateur",
        )
      }
      const responseData = await response.json()
      setTotalReviews(responseData.reviews.length)
      setAverageRating(responseData.averageRating)
      setUserReviews(responseData.reviews)
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des critiques de l'utilisateur :",
        error,
      )
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserReviews()
    }
  }, [userId])

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen text-white bg-[e5e5e5]">
        <div className="w-full bg-[#1D2DB6] p-8 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-center">
          <img
            className="rounded-full w-[150px] h-[150px] mb-4 md:mb-0 mx-auto md:mx-0 md:mr-8"
            src={userPhoto}
            alt="User Profile"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold text-center md:text-left">
              {user?.name}
            </h1>
            <p className="mt-2 text-center md:text-left">{user?.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start">
              <button className="border rounded-md p-2 m-1">
                Modifier Photo
              </button>
              <button className="border rounded-md p-2 m-1">
                Modifier Nom
              </button>
              <button className="border rounded-md p-2 m-1">
                Modifier Email
              </button>
              <button className="border rounded-md p-2 m-1">
                Modifier Mot de Passe
              </button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-lg flex-grow overflow-y-auto px-4">
          <div
            className="bg-[#1D2DB6] p-8 rounded-lg text-white"
            style={{
              backgroundColor: 'rgba(251, 251, 251, 0.2)',
              borderRadius: '33px',
              boxShadow: '0px 0px 5px white',
            }}
          >
            <h2 className="text-xl font-bold text-center mb-5">
              Total de(s) critique(s) postée(s) : {totalReviews}
            </h2>
            <div className="text-xl font-bold text-center">
              Votre note moyenne:
              <br />
              {averageRating.toFixed(2)}/5
              <br />
              {totalReviews > 0 ? (
                <Rating
                  initialRating={averageRating}
                  emptySymbol={
                    <StarOutline color={'#D1D5DB'} height="20px" width="20px" />
                  }
                  fullSymbol={
                    <Star color={'#F59E0B'} height="20px" width="20px" />
                  }
                  readonly
                />
              ) : (
                <p className="mt-2 italic">Pas encore de note moyenne</p>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-center text-white">
                Vos Critiques:
              </h3>
              {userReviews.length > 0 ? (
                <ul className="mt-2 space-y-4">
                  {userReviews.map(review => (
                    <li
                      key={review.id}
                      className="p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <span className="text-sm text-black mb-2 md:mb-0">
                          {new Date(review.createdAt).toLocaleString()}
                        </span>
                        <Link
                          to={
                            review.idArtist
                              ? `/artist/${review.idArtist}`
                              : `/album/${review.idAlbum}`
                          }
                          className="text-blue-400 hover:font-bold"
                        >
                          Aller à la page de{' '}
                          {review.idArtist ? "l'artiste" : "l'album"}{' '}
                          <b>{review.artistName || review.albumName}</b>
                        </Link>
                      </div>
                      <p className="text-black bg-gray-100 p-2 rounded-md mb-2">
                        {review.comment}
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm mr-2 text-black">Note :</span>
                        <Rating
                          initialRating={review.rating}
                          emptySymbol={
                            <StarOutline
                              color={'black'}
                              height="20px"
                              width="20px"
                            />
                          }
                          fullSymbol={
                            <Star
                              color={'#F59E0B'}
                              height="20px"
                              width="20px"
                            />
                          }
                          readonly
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center mt-4 italic">
                  Pas encore de critique postée
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          className="text-red-500 border border-red-500 px-4 py-2 rounded-md bg-white hover:bg-red-500 hover:text-white mt-4 "
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Profile
