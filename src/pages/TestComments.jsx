import { useState } from 'react'
import ModalList from '../components/Modal/ModalList'

const TestComments = () => {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState([])

  // Fonction pour ajouter un commentaire (simulée pour l'exemple)
  const addComment = () => {
    const newComment = {
      author: 'John Doe',
      content: 'This is a test comment.',
      date: new Date(),
      rate: '⭐⭐⭐⭐⭐',
    }
    setComments([...comments, newComment])
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
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
      <ModalList open={open} onClose={handleCloseModal} comments={comments} />
    </div>
  )
}

export default TestComments
