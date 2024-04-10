import MailForm from '../components/ContactForm/MailForm'
import AlertPopup from '../components/AlertPopup/AlertPopup'

function Contact() {
  return (
    <div>
      <MailForm />
      <AlertPopup type={true} text="Success message" />
    </div>
  )
}

export default Contact
