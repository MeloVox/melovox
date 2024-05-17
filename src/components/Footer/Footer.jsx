import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="w-full absolute mt-8 bg-slate-900 text-gray-300 py-y px-2 bottom-0">
      <div className="w-full mx-auto">
        <ul className="flex flex-col md:flex-row md:justify-center">
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="/about">A Propos</Link>
          </li>
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="/contact">Nous contacter</Link>
          </li>
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="/policy">Politique de confidentialité</Link>
          </li>
          <li className="py-2 px-4 text-center md:text-left">
            <Link to="/tos">Conditions d'utilisation</Link>
          </li>
        </ul>
      </div>

      <p className="text-center py-4">2024 Melovox, Tous droits réservés</p>
    </div>
  )
}

export default Footer
