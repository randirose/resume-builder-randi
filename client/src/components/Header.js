import '../../src/index.css';
import NavApp from "./Navigation";

function Header() {

  return (
    <header className="flex-row px-1" >

        <NavApp />
        <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('./hero2.png')", height: 400, width: '100%' }}
      >
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-dark'>
              <h1 className='mb-3'>RESUME BUILDER</h1>
              <h4 className='mb-3'>—Easily build a perfect resume!—</h4>
            </div>
          </div>
        </div>
    </header>
  );
}


export default Header;