import Rating from 'react-rating'
import { StarOutline, Star } from 'react-ionicons'
import PropTypes from 'prop-types'

const Comment = ({ comment, rating, profilePicture, date }) => {
  // Fonction pour formater la date
  const formatDate = date => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(date).toLocaleDateString(undefined, options)
  }

  // Fonction pour formater l'heure
  const formatTime = date => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Vérifier si le commentaire ou le rating est présent
  const hasContent = comment || rating > 0

  console.log(rating, 'rating comment')
  return (
    <>
      {hasContent && ( // Vérifiez si le commentaire ou le rating est présent
        <div className="flex p-4 w-fit">
          <img
            src={profilePicture}
            alt="Photo de profil"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            {rating > 0 && (
              <div className="flex items-center mb-2">
                <Rating
                  initialRating={rating}
                  emptySymbol={
                    <StarOutline color={'#D1D5DB'} height="20px" width="20px" />
                  }
                  fullSymbol={
                    <Star color={'#F59E0B'} height="20px" width="20px" />
                  }
                  fractions={2}
                  readonly={true}
                />
              </div>
            )}
            {comment && <p className="mb-2">{comment}</p>}
            <div className="text-sm text-gray-500">
              <span>{formatDate(date)}</span>
              <span className="mx-1">à</span>
              <span>{formatTime(date)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Validation des types des props
Comment.propTypes = {
  comment: PropTypes.string,
  rating: PropTypes.number,
  profilePicture: PropTypes.string,
  date: PropTypes.instanceOf(Date),
}

export default Comment
