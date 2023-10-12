import '../../src/index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 login">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/me">your profile</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                <div className="col-12">
                <label for="email" class="form-label mt-1">Email: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input p-1"
                  placeholder="'janedoe@gmail.com'"
                  name="email"
                  type="email"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.email}
                  onChange={handleChange}
                />
                </div></div>
                <div className="row">
                <div className="col-12">
                <label for="password" class="form-label mt-1">Password: </label>
                </div></div>
                <div className="row">
                <div className="col-12">
                <input
                  className="form-input p-1"
                  placeholder="********"
                  name="password"
                  type="password"
                  style={{ lineHeight: '2', resize: 'vertical', width: '100%' }}
                  value={formState.password}
                  onChange={handleChange}
                /></div></div>
                <div className="row">
                <div className="col-12">
                <button
                  className="btn btn-secondary mt-2"
                  style={{ cursor: 'pointer', width: '100%' }}
                  type="submit"
                >
                  Login
                </button>
                </div></div>
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

export default Login;
