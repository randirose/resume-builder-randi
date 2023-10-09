import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EDUCATION } from '../utils/mutations';
import { QUERY_EDUCATIONS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const EducationForm = () => {

  const [formState, setFormState] = useState({
        school: '',
        dateRange: '',
        degree: ''
    });


  const [addEducation, { error }] = useMutation(ADD_EDUCATION, {
    update(cache, { data: { addEducation } }) {
      try {
        const { educations } = cache.readQuery({ query: QUERY_EDUCATIONS });

        cache.writeQuery({
          query: QUERY_EDUCATIONS,
          data: { educations: [addEducation, ...educations] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, educations: [...me.educations, addEducation] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        //eslint-disable-next-line
      const { data } = await addEducation({
        variables: {
          ...formState,
          userEmail: Auth.getProfile().data.email,
        },
      });

      setFormState({
        school: '',
        dateRange: '',
        degree: ''
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
      <h3>ADD EDUCATION / CERTIFICATE</h3>

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
                name="school"
                placeholder="Enter School or Company Name"
                value={formState.school}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
                <input
                name="dateRange"
                placeholder="Enter Date Range for Courses"
                value={formState.dateRange}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
                <input
                name="degree"
                placeholder="Enter Degree or Certificate Name"
                value={formState.degree}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Education or Certificate
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

export default EducationForm;
