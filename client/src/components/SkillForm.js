import '../../src/index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SKILL } from '../utils/mutations';
import { QUERY_SKILLS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const SkillForm = () => {

  const [skillName, setSkillName] = useState('');


  const [addSkill, { error }] = useMutation(ADD_SKILL, {
    update(cache, { data: { addSkill } }) {
      try {
        const { skills } = cache.readQuery({ query: QUERY_SKILLS });

        cache.writeQuery({
          query: QUERY_SKILLS,
          data: { skills: [addSkill, ...skills] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, skills: [...me.skills, addSkill] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        //eslint-disable-next-line
      const { data } = await addSkill({
        variables: {
          skillName,
          userEmail: Auth.getProfile().data.email,
        },
      });

      setSkillName('');

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'skillName') {
        setSkillName(value);
      }
    };


  return (
    <div>
      <h3 className="skillForm-header mt-2">ADD SKILL</h3>
      <hr />
      {Auth.loggedIn() ? (
        <>
          <form
            className="skill-form flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
            <label for="skillName" class="form-label mt-3">Skill Name</label>
              <input
                name="skillName"
                placeholder="'HTML'"
                value={skillName}
                className="form-input w-100 p-2"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 add-skill">
              <button className="btn btn-secondary py-3 mt-2" type="submit">
                Add Skill
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
          You need to be logged in to add a skill! Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SkillForm;
