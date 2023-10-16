import '../../src/index.css';
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

      // update 'me' object's cache
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
      <h3 className="eduForm-header mt-2">ADD EDUCATION / CERTIFICATE</h3>
        <hr />
      {Auth.loggedIn() ? (
        <>
          <form
            className="edu-form flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
            <label for="school" class="form-label mt-1">School / Org</label>
              <input
                name="school"
                placeholder="'UofO'"
                value={formState.school}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              />
              <label for="dateRange" class="form-label mt-3">Time Frame</label>
                <input
                name="dateRange"
                placeholder="'2023-24'"
                value={formState.dateRange}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              />
              <label for="degree" class="form-label mt-3">Degree / Certificate</label>
                <input
                name="degree"
                placeholder="'BS in Comp Sci'"
                value={formState.degree}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 add-edu">
              <button className="btn btn-secondary py-3 mt-2 mb-2" type="submit">
                Add Education / Certificate
              </button>
            </div>
            {/* took substring of error.message to make more readable/user friendly */}
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message.substring(28)}
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
