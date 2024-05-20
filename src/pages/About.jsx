import Presentation from '../../src/assets/presentation.png'
import Background from '../components/Background/Background'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const About = () => {
  return (
    <>
      <Navbar />
      <Background />

      <div className="flex items-center w-full h-screen">
        <div className="w-1/2 bg-white bg-opacity-20 rounded-lg shadow-md ml-10 p-6 text-[30px] text-white md:mt-4">
          <h1 className="font-bold mb-8 text-[40px]">Qui sommes-nous ?</h1>
          <div className="flex flex-col md:flex-row">
            <div className="w-full text-[25px]">
              <div className="text-[35px] font-semibold">Présentation</div>
              Melovox est un projet Ydays visant à créer une application web de
              critique musicale. Notre objectif est de permettre aux
              utilisateurs de partager leurs avis sur les albums de leurs
              artistes préférés. Nous souhaitons également offrir une plateforme
              de découverte musicale en recommandant des albums en fonction des
              goûts de chacun.
            </div>
          </div>
        </div>
        <img
          src={Presentation}
          className="w-15 h-15 absolute bottom-0 right-0 md:w-15 md:h15 md:flex md:bottom-0"
          alt="Presentation"
        />
      </div>
      <Footer />
    </>
  )
}

export default About
