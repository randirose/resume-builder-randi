import JsPDF from 'jspdf';
import {
    // Container,
    // Card,
    Button,
    // Row,
    // Col
  } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Download = () => {
const generatePDF = () => {

    const report = new JsPDF('portrait','pt','a4');
    report.html(document.querySelector('#report')).then(() => {
        report.save('report.pdf');
    });}

    return (
        <div>
        {Auth.loggedIn() ? (
        <>
        <div id="report"><p>testing testing</p></div>
        <Button onClick={generatePDF} type="button">Export PDF</Button>
        </>
        ) : (
            <p>
              You need to be logged in download your resume! Please{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
          )}
        </div>
      );
    };

export default Download;