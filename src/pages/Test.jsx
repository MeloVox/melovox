import { useState, useEffect } from 'react'
import ModalRate from '../components/Modal/ModalRate'
import Comment from '../components/Comment/Comment'

const Test = () => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState([])

  console.log(user)

  useEffect(() => {
    const response = sessionStorage.getItem('user')

    if (response) {
      const { data } = JSON.parse(response)
      setUser(data)
      console.log(data.id)
    }
  }, [])

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
