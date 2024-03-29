import { useState } from 'react'
import { CloseOutline } from 'react-ionicons'
import TestSpotify from '../assets/logo_spotify.png'
import Comment from './Comment'
import Rating from 'react-rating'
import { StarOutline, Star } from 'react-ionicons'
import PropTypes from 'prop-types'

const ModalRate = ({ open, onClose }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [postTime, setPostTime] = useState(null)

  const handleRatingChange = value => {
    setRating(value)
  }

  console.log(rating, 'rating comment')

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Note :', rating)
    console.log('Commentaire :', comment)
    setPostTime(new Date())
    onClose()
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors
                ${open ? 'visible bg-black/60' : 'invisible'}
            `}
      >
        <div
          onClick={e => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all
                    ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
                `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            <CloseOutline color={'#000000'} height="20px" width="20px" />
          </button>
          <div className="text-center w-96">
            <div className="flex justify-between items-center">
              <img
                src={TestSpotify}
                alt="Couverture de l'album"
                className="w-16 h-16"
              />
              <Rating
                initialRating={rating}
                emptySymbol={
                  <StarOutline color={'#D1D5DB'} height="20px" width="20px" />
                }
                fullSymbol={
                  <Star color={'#F59E0B'} height="20px" width="20px" />
                }
                onChange={handleRatingChange}
                fractions={2}
              />
            </div>
            <p className="text-gray-500 mt-2">Écrivez votre critique ici :</p>

            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full h-40 mt-4 p-2 border border-gray-300 rounded-md resize-none text-black"
              placeholder="Laisser parler votre imagination"
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Publier
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Afficher le commentaire avec l'heure du post */}
      {postTime && (
        <Comment
          comment={comment}
          rating={rating}
          profilePicture={TestSpotify}
          date={postTime}
        />
      )}
    </>
  )
}

// Validation des types des props
ModalRate.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalRate
