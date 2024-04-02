import Presentation from '../../../src/assets/presentation.png'
import Background from '../../components/Background/Background'

function About() {
  return (
    <>
      <Background />
      <div className="containerPresentation">
        <div className="titlePresentation">Qui sommes-nous ?</div>
        <div className="generalPresentation">
          <div className="textPresentation">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            congue augue. Nunc gravida nunc nec purus volutpat, sit amet
            ullamcorper tortor pellentesque. Vivamus non dolor ante. Nam tempor
            ut est nec facilisis. In mollis urna tincidunt nunc feugiat, sed
            tempor nisl bibendum. Maecenas lacinia risus et tellus tempus, id
            porttitor eros laoreet. Vestibulum id sem id arcu sodales vehicula.
            Integer elementum lacinia orci non tincidunt. Etiam fringilla, urna
            semper commodo ornare, nunc metus tempus mi, ac auctor nibh ipsum
            vel nisi. Donec non condimentum nulla. Suspendisse sed leo a erat
            auctor placerat. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Cras a erat ut leo sollicitudin sollicitudin interdum at dui.
            Nulla eu auctor est. Fusce a rutrum risus. Maecenas commodo nulla et
            lacus elementum porttitor.
          </div>
        </div>
      </div>
      <div className="imagePresentation">
        <img src={Presentation} className="imgPres" />
      </div>
    </>
  )
}

export default About
