import '../../src/index.css';
import NavApp from "../components/Navigation";
// if user is not logged in, they see this home page
function Home() {

  return (
    <header className="flex-row px-1 fixed-top" >

        <NavApp />
        <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('./hero2.png')", height: '1200px', width: '100%' }}
      >
          <div className='d-flex justify-content-center h-100'>
            <div className='text-dark'>
              <h1 className='loggedout-header mb-3'>RESUME BUILDER</h1>
              <h2 className='mb-3'>— Easily build a perfect resume! —</h2><br />
              <h4 className='home-text'>Simply sign up or login using the link above, then add your jobs, skills, and education and <span style={{fontStyle: 'italic'}}>voila</span>, download a PDF of your customized resume!</h4>
            </div>
          </div>
        </div>
    </header>
  );
}


export default Home;