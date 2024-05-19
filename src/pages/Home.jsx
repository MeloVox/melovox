import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Rating from 'react-rating'
import { StarOutline, Star } from 'react-ionicons'

const Home = () => {
  // const [totalReviews, setTotalReviews] = useState(0)
  // const [averageRating, setAverageRating] = useState(0)
  const [userReviews, setUserReviews] = useState([])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/getReviews`)
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des critiques de l'utilisateur",
        )
      }
      const responseData = await response.json()
      // setTotalReviews(responseData.reviews.length)
      // setAverageRating(responseData.averageRating)
      setUserReviews(responseData.reviews)
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des critiques de l'utilisateur :",
        error,
      )
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mt-8 mb-4">
          Les 10 commentaires les plus récents
        </h1>
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
                <div className="flex flex-row text-black">
                  <div className="flex mr-4">
                    <img src={review.photo} alt={review.userId} />
                  </div>
                  <div className="flex">
                    <p>Utilisateur : {review.userId}</p>
                  </div>
                </div>
                <p className="text-black bg-gray-100 p-2 rounded-md mb-2">
                  {review.comment}
                </p>
                <div className="flex items-center">
                  <span className="text-sm mr-2 text-black">Note :</span>
                  <Rating
                    initialRating={review.rating}
                    emptySymbol={
                      <StarOutline color={'black'} height="20px" width="20px" />
                    }
                    fullSymbol={
                      <Star color={'#F59E0B'} height="20px" width="20px" />
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
        <div className="max-w-lg w-full">
          <ul className="space-y-4"></ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
