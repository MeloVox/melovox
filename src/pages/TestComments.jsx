import { useState } from 'react'
import ModalList from '../components/Modal/ModalList'

const TestComments = () => {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState([])

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9)
  }

  const addComment = () => {
    const newComment = {
      id: generateUniqueId(),
      author: 'John Doe',
      content: 'This is a test comment.',
      date: new Date(),
      rate: '⭐⭐⭐⭐⭐',
      replies: [],
    }
    setComments([...comments, newComment])
  }

  const addSecondComment = () => {
    const secondComment = {
      id: generateUniqueId(),
      author: 'Jane Smith',
      content: 'Another test comment.',
      date: new Date(),
      rate: '⭐⭐⭐',
      replies: [],
    }
    setComments([...comments, secondComment])
  }

  const deleteComment = commentId => {
    setComments(comments.filter(comment => comment.id !== commentId))
  }

  const deleteReply = (commentId, replyId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const deletedReplies = comment.replies.filter(
          reply => reply.id === replyId,
        )
        const numDeletedReplies = deletedReplies.length
        const remainingReplies = comment.replies.filter(
          reply => reply.id !== replyId,
        )
        return {
          ...comment,
          replies: remainingReplies,
          numDeletedReplies: comment.numDeletedReplies
            ? comment.numDeletedReplies + numDeletedReplies
            : numDeletedReplies,
        }
      }
      return comment
    })
    setComments(updatedComments)
  }

  const addReply = (commentId, replyContent) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: generateUniqueId(),
              author: 'Current User',
              content: replyContent,
              date: new Date(),
            },
          ],
        }
      }
      return comment
    })
    setComments(updatedComments)
  }

  return (
    <div>
      <button
        onClick={handleOpenModal}
        style={{
          display: 'flex',
          flexDirection: 'row',
          color: 'blue',
          width: 'fit-content',
          padding: '3px',
          border: '1px solid blue',
        }}
      >
        View Comments
      </button>
      <button onClick={addComment}>Add Comment</button>
      <button onClick={addSecondComment}>Add Second Comment</button>
      <ModalList
        open={open}
        onClose={handleCloseModal}
        comments={comments}
        onAddComment={addComment}
        onDeleteComment={deleteComment}
        onAddReply={addReply}
        onDeleteReply={deleteReply}
      />
    </div>
  )
}

export default TestComments
