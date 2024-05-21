import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="w-full h-16 text-white bottom-0">
      <div className="w-full mx-auto">
        <ul className="flex flex-col md:flex-row md:justify-center">
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="/about">A Propos</Link>
          </li>
          <li className="py-2 px-4 text-center md:text-left">
            <a href="mailto:melovox@gmail.com">Nous contacter</a>
          </li>
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="">Politique de confidentialité</Link>
          </li>
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="">Conditions d'utilisation</Link>
          </li>
        </ul>
      </div>

      <p className="text-center">2024 Melovox, Tous droits réservés</p>
    </div>
  )
}

export default Footer
