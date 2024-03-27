import { useState } from 'react'
import ModalRate from '../components/ModalRate'
import Comment from '../components/Comment'

const Test = () => {
  const [open, setOpen] = useState(false)

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
          color: 'red',
          width: 'fit-content',
          padding: '3px',
          border: '1px solid red',
        }}
      >
        Noter l'album
      </button>
      <ModalRate open={open} onClose={handleCloseModal} />
      <Comment />
    </div>
  )
}

export default Test
