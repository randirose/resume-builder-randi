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

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
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
    <div>
      <h2 className="card-header">
        {userParam ? `${user.firstName}'s` : 'Your'} Profile
      </h2>
      <div className="col-12 col-md-10 mb-5">
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

      <div className="col-12 col-md-10 mb-5">
          <JobList
            jobs={user.jobs}
            title={`${user.firstName}'s jobs...`}
            showTitle={true}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <JobForm />
          </div>
        )}
        <div className="col-12 col-md-10 mb-5">
          <SkillList
            skills={user.skills}
            title={`${user.firstName}'s skills...`}
            showTitle={true}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <SkillForm />
          </div>
        )}
          <div className="col-12 col-md-10 mb-5">
          <EducationList
            educations={user.educations}
            title={`${user.firstName}'s education and certificates...`}
            showTitle={true}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <EducationForm />
          </div>
        )}
      </div>
  );
};

export default Profile;