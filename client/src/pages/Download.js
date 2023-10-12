import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    // Container,
    // Card,
    Button,
    // Row,
    // Col
  } from 'react-bootstrap';
import Auth from '../utils/auth';
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillPhone } from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";


// import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Download = () => {
const generatePDF = () => {
    const resume = document.getElementById('resume');
    html2canvas(resume)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new JsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("resume.pdf");  
    });
};

    const { _id: userParam } = useParams();

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(
      userParam ? QUERY_USER : QUERY_ME,
      {
        variables: { userId: userParam },
      }
    );
  
    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const user = data?.me || data?.user || {};
    const skills = user.skills;
    const jobs = user.jobs;
    const educations = user.educations;
  
    // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
      return <Navigate to="/download" />;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user?._id) {
      return (
        <h4>
          You need to be logged in to see your download your resume. Use the navigation
          links above to sign up or log in!
        </h4>
      );
    }
    return (
        <>
        <div className="download">
        <div id="wrapper">
        <div id="resume">
        <h3 className="resume-header d-flex flex-row-reverse">{user.firstName} {user.lastName}</h3>
        <hr className="dividers"/>
        <div className="row">
            <div className="col-12 col-md-4 aside">
                {/* contact and skills */}
                <div className="contact-info">
                    <h4 className="aside-header">Contact Me:</h4>
                <span className="contact-icons"><AiOutlineMail /></span>{' '} {user.email}<br />
                <span className="contact-icons"><AiOutlineLinkedin /></span>{' '} {user.linkedIn}<br />
                <span className="contact-icons"><FaLocationDot /></span>{' '} {user.address}<br />
                <span className="contact-icons"><AiFillPhone /></span>{' '} {user.phoneNumber}<br />
                </div>
                <hr className="dividers" />
                <div className="resume-skills">
                <h4 className="aside-header">My Skills:</h4>
                    <ul className="skill-names">
                {skills &&
                    skills.map((skill) => (
                        <li key={skill._id}>
                        {skill.skillName}
                        </li>
                ))}
                     </ul>

                </div>
                <hr className="dividers" />
                <div className="resume-educations d-flex flex-wrap">
                <h4 className="aside-header">Education / Certificates:</h4>
                <div>
                {educations &&
                    educations.map((education) => (
                        <div key={education._id} >
                        <h6 className="edu-school">
                            <span className="resume-school">{education.school}</span>{' '}|{' '}{education.dateRange}
                        </h6>
                        <p className="edu-degree">
                            <GrCertificate /> {education.degree}
                        </p>

                        </div>
                ))}
                </div>
                </div>
                
            </div>
            <div className="col-12 col-md-8">
                {/* jobs and edu */}
                <div className="resume-jobs d-flex flex-wrap">
                <h4 className="aside-header jobs-header">Work Experience:</h4>
                <div>
                {jobs &&
                    jobs.map((job) => (
                        <div key={job._id} >
                        <h5 className="job-title">
                            <span className="resume-job-title">{job.jobTitle}</span>{'    '} |{' '}  {job.employer}
                        </h5>
                        <p className="job-descrip">
                            {job.jobDescription}
                        </p>
                        <hr className="dividers" />
                        </div>

                ))}
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>

        </div>
        <div>
        <Button onClick={generatePDF} type="button" className="download-button">Export PDF</Button>
        </div>
        </>
      );
    };

export default Download;