import '../../src/index.css';
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
        //eslint-disable-next-line
      const { data } = await addJob({
        variables: {
          ...formState,
          userEmail: Auth.getProfile().data.email,
        },
      });

      setFormState({
        jobTitle: '',
        employer: '',
        jobDescription: ''
      });

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
      <h3 className="jobForm-header mt-2">ADD JOB</h3>
      <hr />
      {Auth.loggedIn() ? (
        <>
          <form
            className="job-form flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <label for="jobTitle" class="form-label mt-3">Job Title</label>
              <input
                name="jobTitle"
                placeholder="'Web Developer'"
                value={formState.jobTitle}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              />
              <label for="employer" class="form-label mt-3">Employer</label>
                <input
                name="employer"
                placeholder="'Google Inc'"
                value={formState.employer}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              />
              <label for="jobDescription" class="form-label mt-3">Job Description</label>
                <textarea
                name="jobDescription"
                placeholder="Describe what your position entailed here"
                value={formState.jobDescription}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                rows='10'
                onChange={handleChange}
              />
            </div>

            <div className="col-12 add-job">
              <button className="btn btn-secondary p-3" type="submit">
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
