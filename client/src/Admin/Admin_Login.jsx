import React, { useState } from 'react'
import '../style.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useApi } from '../context/ApiContext';

const Admin_Login = () => {
    const { BASE_URL } = useApi();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
   const handleSubmit = (event) => {
  event.preventDefault();
  axios.post(`${BASE_URL}/admin/admin_login`, values)
    .then(result => {
      if (result.data.loginStatus) {
        localStorage.setItem("valid", true);
        localStorage.setItem("role", "admin"); // ✅ Set role in localStorage
        navigate('/admin_dashboard/');
      } else {
        setError(result.data.Error);
      }
    })
    .catch(err => console.log(err));
}


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email'  placeholder='Enter Email'
                     onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                <div className='mb-1'> 
                    <label htmlFor="password">You are Agree with terms & conditions</label>

                </div>
                <p>User Login: <Link className=" text-decoration-none"to={'/login'}> Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Admin_Login