import PropTypes from 'prop-types'
import {
  CloseOutline,
  TrashOutline,
  ReturnDownBackOutline,
  SendOutline,
  CloseCircleOutline,
} from 'react-ionicons'
import { useState } from 'react'

const ModalList = ({
  open,
  onClose,
  comments,
  onDeleteComment,
  onAddReply,
  onDeleteReply,
}) => {
  const [replyContent, setReplyContent] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)

  const handleReply = () => {
    if (replyContent.trim() !== '') {
      onAddReply(replyingTo, replyContent)
      setReplyContent('')
      setReplyingTo(null)
    }
  }
  console.log(comments)

  const handleToggleReply = commentId => {
    if (replyingTo === commentId) {
      setReplyingTo(null)
    } else {
      setReplyingTo(commentId)
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors text-black
                  ${open ? 'visible bg-black/80' : 'invisible'}
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
            <h2 className="text-2xl font-bold mb-4 text-center">
              Commentaires :
            </h2>
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center">
                Aucun commentaire pour le moment
              </p>
            ) : (
              comments.map(comment => (
                <div
                  key={comment.id}
                  className="relative mb-6 border border-gray-300 rounded-md shadow-md p-4 hover:shadow-lg"
                >
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-600"
                  >
                    <TrashOutline
                      color={'#000000'}
                      height="20px"
                      width="20px"
                    />
                  </button>
                  <button
                    onClick={() => handleToggleReply(comment.id)}
                    className="absolute bottom-2 right-2 p-1 rounded-lg text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-600"
                  >
                    {replyingTo === comment.id ? (
                      <CloseCircleOutline
                        color={'red'}
                        height="20px"
                        width="20px"
                      />
                    ) : (
                      <ReturnDownBackOutline
                        color={'#000000'}
                        height="20px"
                        width="20px"
                      />
                    )}
                  </button>
                  <p className="font-semibold text-lg">
                    Utilisateur: {comment.userId}
                  </p>
                  <p className="mt-2">{comment.comment}</p>
                  <p className="text-sm text-gray-600">
                    Note : {comment.rating} - Date :{' '}
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  {comment.numDeletedReplies && (
                    <p className="text-sm text-red-600 mt-2">
                      {comment.numDeletedReplies} réponse(s) supprimée(s)
                    </p>
                  )}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-6 mt-4">
                      {comment.replies.map(reply => (
                        <div
                          key={reply.id}
                          className={`relative mb-3 border border-gray-200 rounded-md shadow-md p-3 hover:shadow-lg ${
                            reply.isDeleted ? 'text-red-500' : ''
                          }`}
                        >
                          {reply.isDeleted && (
                            <p className="italic">
                              This reply has been deleted
                            </p>
                          )}
                          {!reply.isDeleted && (
                            <>
                              <button
                                onClick={() =>
                                  onDeleteReply(comment.id, reply.id)
                                }
                                className="absolute top-2 right-2 p-1 rounded-lg text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-600"
                              >
                                <TrashOutline
                                  color={'#000000'}
                                  height="20px"
                                  width="20px"
                                />
                              </button>
                              <p className="font-semibold text-lg">
                                {reply.author}
                              </p>
                              <p>{reply.content}</p>
                              <p className="text-sm text-gray-600">
                                Date : {new Date(reply.date).toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {replyingTo === comment.id && (
                    <div className="mt-4">
                      <textarea
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="Votre réponse..."
                        maxLength={250}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                        style={{ resize: 'none' }}
                      />
                      <button
                        onClick={handleReply}
                        disabled={!replyContent.trim()}
                        className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:pointer-events-none"
                      >
                        <SendOutline
                          color={'#FFFFFF'}
                          height="20px"
                          width="20px"
                        />
                      </button>
                    </div>
                  )}
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
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      rate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onAddReply: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
}

export default ModalList
