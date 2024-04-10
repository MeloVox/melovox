import emailjs from '@emailjs/browser'
import { useState } from 'react'

const EmailForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_3n4ykwf'
    const templateId = 'template_e7ni8rn'
    const publicKey = 'UEPPskZzkLd5rEK_2'

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Web Wizard',
      message,
    }

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(response => {
        console.log('Email sent successfully!', response)
        setName('')
        setEmail('')
        setMessage('')
      })
      .catch(error => {
        console.error('Error sending email:', error)
      })
  }

  return (
    // <form onSubmit={handleSubmit} className='emailForm'>
    //     <input
    //         type="text"
    //         placeholder="Your Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //     />
    //     <input
    //         type="email"
    //         placeholder="Your Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <textarea
    //         cols="30"
    //         rows="10"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //     >
    //     </textarea>
    //     <button type="submit">Send Email</button>
    // </form>

    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit} className="emailForm">
          <div className="mb-5">
            <label htmlFor="name">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email">Email Address</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows="4"
              name="message"
              id="message"
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailForm
