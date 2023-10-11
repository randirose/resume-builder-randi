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

  return (
    <>
      <Navbar variant='light' expand='lg' className="fixed-top">
        <Container fluid>
        {Auth.loggedIn() ? (
          <Navbar.Brand as={Link} to='/'>
            <img src="./logo.png" alt="logo" style={{width:'50px', height: '50px', marginLeft: '10px'}} className="m3"/> <span className="loggedin-nav-brand">RESUME BUILDER</span>
          </Navbar.Brand>
        ) : (
            <Navbar.Brand as={Link} to='/'>
            <img src="./logo.png" alt="logo" style={{width:'50px', height: '50px', marginLeft: '10px'}} className="m3"/>
          </Navbar.Brand>
        )}
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/me' style={{fontWeight: 'bold', fontSize: '120%'}}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to='/download' style={{fontWeight: 'bold', fontSize: '120%'}}>
                    Preview/Download
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} style={{fontWeight: 'bold', fontSize: '120%'}}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} style={{fontWeight: 'bold', fontSize: '120%'}}>Login / Sign Up</Nav.Link>
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
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
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
