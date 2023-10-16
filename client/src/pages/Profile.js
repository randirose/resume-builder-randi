import '../../src/index.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import JobList from '../components/JobList';
import JobForm from '../components/JobForm';
import SkillList from '../components/SkillList';
import SkillForm from '../components/SkillForm';
import UserInfo from '../components/UserInfo';
import EducationForm from '../components/EducationForm';
import EducationList from '../components/EducationList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { _id: userParam } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userParam ? QUERY_USER : QUERY_ME,
    {
      variables: { userId: userParam },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_USER` query
  const user = data?.me || data?.user || {};

  // if user is logged in, navigate to profile page
  if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?._id) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div className="profile">
      <h2 className="profile-header card-header">
        {user.firstName}'s Profile
      </h2>
      <div className="row mt-3">
      <div className="col-12">
        {/* send user info to component to render */}
          <UserInfo
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            phoneNumber={user.phoneNumber}
            address={user.address}
            linkedIn={user.linkedIn}
            title={`${user.firstName}'s Info...`}
            showTitle={true}
          />
        </div>
        </div>
        {/* table of content for profile sections */}
        <div className="profile-toc">
          <button className="btn btn-secondary"><a href="#jobs">View Jobs</a></button>
          <button className="btn btn-secondary"><a href="#skills">View Skills</a></button>
          <button className="btn btn-secondary"><a href="#edu">View Education & Certificates</a></button>
        </div>
      <div className="row mt-5" >
      <div className="col-12 col-md-7" id="jobs">
        {/* send user job info and title to component */}
          <JobList
            jobs={user.jobs}
            title={`${user.firstName}'s Jobs`}
            showTitle={true}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-5 job-form-profile mt-5"
          >
            <JobForm />
          </div>
        )}
        </div>
        <div className="row mt-5">
        <div className="col-12 col-md-7" id="skills">
          {/* send user skill info to compoenent to render */}
          <SkillList
            skills={user.skills}
            title={`${user.firstName}'s Skills`}
            showTitle={true}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-5 skill-form-profile mt-5"
          >
            <SkillForm />
          </div>
        )}
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-12 col-md-7" id="edu">
            {/* send user edu info to component to render */}
          <EducationList
            educations={user.educations}
            title={`${user.firstName}'s Education & Certificates`}
            showTitle={true}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-5 edu-form-profile mt-5"
          >
            <EducationForm />
          </div>
        )}
        </div>
      </div>
  );
};

export default Profile;