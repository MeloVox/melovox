import Presentation from '../../../src/assets/presentation.png'
import Background from '../../components/Background/Background'

const About = () => {
  return (
    <>
      <Background />

      <div
        className="flex justify-center items-center w-screen h-screen"
        style={{ border: '2px solid red' }}
      >
        <div className="bg-white bg-opacity-20 rounded-lg shadow-md p-6 text-white md:mt-4">
          <h1 className="text-3xl font-bold mb-8">Qui sommes-nous ?</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">Présentation</h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
        <img
          src={Presentation}
          className="w-15 h-15 absolute bottom-0 right-0 md:w-15 md:h15 md:flex md:bottom-0"
          alt="Presentation"
        />
      </div>
    </>
  )
}

export default About
