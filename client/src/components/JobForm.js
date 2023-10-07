import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_JOB } from '../utils/mutations';
import { QUERY_JOBS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const JobForm = () => {

  const [formState, setFormState] = useState({
        jobTitle: '',
        employer: '',
        jobDescription: ''
    });


  const [addJob, { error }] = useMutation(ADD_JOB, {
    update(cache, { data: { addJob } }) {
      try {
        const { jobs } = cache.readQuery({ query: QUERY_JOBS });

        cache.writeQuery({
          query: QUERY_JOBS,
          data: { jobs: [addJob, ...jobs] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, jobs: [...me.jobs, addJob] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addJob({
        variables: {
          ...formState,
          userEmail: Auth.getProfile().data.email,
        },
      });

      setFormState('');

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
        ...formState,
        [name]: value,
    });
  };


  return (
    <div>
      <h3>ADD JOB</h3>

      {Auth.loggedIn() ? (
        <>
          {/* <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p> */}
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="jobTitle"
                placeholder="Enter Job Title"
                value={formState.jobTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
                <input
                name="employer"
                placeholder="Enter Employer"
                value={formState.employer}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
                <input
                name="jobDescription"
                placeholder="Enter Job Description"
                value={formState.jobDescription}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Job
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default JobForm;
