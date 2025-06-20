import React, { useState } from 'react';
import '../style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const { BASE_URL } = useApi();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!values.email || !values.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(`${BASE_URL}/user/user_login`, values);

      if (result.data.loginStatus) {
        localStorage.setItem('valid', 'true'); // Consider replacing with token
        navigate('/');
      } else {
        setError(result.data.Error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-4 rounded border loginForm w-100' style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && (
          <div className="alert alert-danger py-1 text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email" className='form-label'>
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control rounded-0"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor="password" className='form-label'>
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control rounded-0"
              placeholder="Enter Password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <small className="d-block text-muted text-center mb-3">
            By logging in, you agree to our Terms & Conditions.
          </small>

          <p className="text-center">
            Not Yet Registered?{' '}
            <Link to="/register" className="text-decoration-none">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
