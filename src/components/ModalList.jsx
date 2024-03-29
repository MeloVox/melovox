import PropTypes from 'prop-types'
import { CloseOutline } from 'react-ionicons'

const ModalList = ({ open, onClose, comments }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors text-black
                  ${open ? 'visible bg-black/60' : 'invisible'}
              `}
      >
        <div
          onClick={e => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all w-full
                      ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
              `}
          id="modal-list"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            <CloseOutline color={'#000000'} height="20px" width="20px" />
          </button>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: 'calc(80vh - 100px)' }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Commentaires :
            </h2>
            {comments.length === 0 ? (
              <p className="text-gray-500">Aucun commentaire pour le moment</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold">{comment.author}</p>
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    Note : {comment.rate} - Date :{' '}
                    {new Date(comment.date).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

ModalList.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      rate: PropTypes.string.isRequired, // Ajout de la prop 'rate'
    }),
  ).isRequired,
}

export default ModalList
