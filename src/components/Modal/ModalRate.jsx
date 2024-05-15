import { useState, useRef, useEffect } from 'react'
import { CloseOutline } from 'react-ionicons'
import Rating from 'react-rating'
import { StarOutline, Star } from 'react-ionicons'
import PropTypes from 'prop-types'

const ModalRate = ({ open, onClose, albumCover, albumName, artistId }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const textareaRef = useRef(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const response = sessionStorage.getItem('user')

    if (response) {
      const { data } = JSON.parse(response)
      setUserId(data.id)
    }
  }, [])

  console.log(userId)
  console.log(artistId)

  const handleRatingChange = value => {
    setRating(value)
  }

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/createReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          music: artistId,
          rating,
          comment,
        }),
      })
      if (!response.ok) {
        throw new Error('Erreur lors de la soumission de la critique')
      }
      const responseData = await response.json()
      console.log(responseData.message)
      onClose()
    } catch (error) {
      console.error('Erreur lors de la soumission de la critique :', error)
    }
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        textareaRef.current.focus()
      }, 100)
    }
  }, [open])

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
                src={albumCover}
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
            <p className="text-gray-500 mt-2">
              Écrivez votre critique pour <b>{albumName}</b> ici :
            </p>

            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full h-40 mt-4 p-2 border border-gray-300 rounded-md resize-none text-black"
              placeholder="Laisser parler votre imagination"
              ref={textareaRef}
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
    </>
  )
}

ModalRate.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  albumCover: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistId: PropTypes.number.isRequired,
}

export default ModalRate
