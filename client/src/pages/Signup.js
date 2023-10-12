import '../../src/index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    linkedIn: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4 signup">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                <p>
                Success! You may now head{' '}
                <Link to="/me">to your profile.</Link>
              </p>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                <div className="col-12">
                <label for="firstName" class="form-label mt-1">First Name: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="First name"
                  name="firstName"
                  type="text"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.firstName}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <label for="lastName" class="form-label mt-1">Last Name: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="Last name"
                  name="lastName"
                  type="text"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.lastName}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <label for="email" class="form-label mt-1">Email: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="'janedoe@gmail.com'"
                  name="email"
                  type="email"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.email}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <label for="password" class="form-label mt-1">Password: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="8 characters minimum"
                  name="password"
                  type="password"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.password}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <label for="phoneNumber" class="form-label mt-1">Phone Number: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="5035551234"
                  name="phoneNumber"
                  type="text"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.phoneNumber}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <label for="location" class="form-label mt-1">Location: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="'Portland, OR'"
                  name="address"
                  type="text"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.address}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <label for="linkedIn" class="form-label mt-1">LinkedIn URL: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input"
                  placeholder="'www.linkedin.com/yourprofile'"
                  name="linkedIn"
                  type="text"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.linkedIn}
                  onChange={handleChange}
                /></div></div>
                <button
                  className="btn btn-secondary mt-2"
                  style={{ cursor: 'pointer', width: '100%' }}
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
