import '../../src/index.css';
import NavApp from "./Navigation";

function Header() {

  return (
    <header className="flex-row px-1 fixed-top" >

        <NavApp />
        <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('./hero2.png')", height: '100px', width: '100%' }}
      >
        </div>
    </header>
  );
}


export default Header;