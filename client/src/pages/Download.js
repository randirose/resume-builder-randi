import JsPDF from 'jspdf';
import {
    // Container,
    // Card,
    Button,
    // Row,
    // Col
  } from 'react-bootstrap';

const Download = () => {
const generatePDF = () => {

    const report = new JsPDF('portrait','pt','a4');
    report.html(document.querySelector('#report')).then(() => {
        report.save('report.pdf');
    });}

    return (
        <div>
        <div id="report"><p>testing testing</p></div>
        <Button onClick={generatePDF} type="button">Export PDF</Button>
        </div>
    )

    
}

export default Download;