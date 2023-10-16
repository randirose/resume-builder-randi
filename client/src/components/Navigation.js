import '../../src/index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

import Auth from '../utils/auth';

const NavApp = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // handles the nav links collapsing correctly when screen resizes
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <Navbar variant='light' expand='lg' className="fixed-top" style={{fontFamily: "Montserrat"}}>
        <Container fluid>
          {/* if user is logged in, show app name and logo image, if not, only show logo image as main header in 'Home' will have app name */}
        {Auth.loggedIn() ? (
          <Navbar.Brand as={Link} to='/'>
            <img src="./logo.png" alt="logo" style={{width:'50px', height: '50px', marginLeft: '10px'}} className="m3"/> <span className="loggedin-nav-brand">RESUME BUILDER</span>
          </Navbar.Brand>
        ) : (
            <Navbar.Brand as={Link} to='/'>
            <img src="./logo.png" alt="logo" style={{width:'50px', height: '50px', marginLeft: '10px'}} className="m3"/>
          </Navbar.Brand>
        )}
          <Navbar.Toggle aria-controls='navbar' aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}/>
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {/* if user is logged in, see Profile/Preview/Logout, otherwise only see Sign Up/Login */}
              {Auth.loggedIn() ? (
                <>
                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
                  <Nav.Link as={Link} to='/me' style={{fontWeight: 'bold', fontSize: '120%'}} onClick={handleNavCollapse}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to='/download' style={{fontWeight: 'bold', fontSize: '120%'}} onClick={handleNavCollapse}>
                    Preview/Download
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} style={{fontWeight: 'bold', fontSize: '120%'}}>Logout</Nav.Link>
                  </div>
                </>
              ) : (
                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
                <Nav.Link onClick={() => setShowModal(true)} style={{fontWeight: 'bold', fontSize: '120%'}}>Login / Sign Up</Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='underline'>
                <Nav.Item>
                  <Nav.Link eventKey='login' style={{color: 'black', marginRight: '2px'}}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' style={{color: 'black' }}>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <Signup handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default NavApp;
