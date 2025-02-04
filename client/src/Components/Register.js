import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { Redirect } from 'react-router';
import '../Landing.css';
import '../App.css';

const Register = props => {
  const { toggleForm } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const { setId, setGlobalName } = useContext(UserContext);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // if passwords do not match, alert user and do not submit form
  const registerBtn = e => {
    if (confirmPassword !== password) {
      alert('passwords dont match');
    } else {
      fetch('http://localhost:5000/api/user/register', {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          clearForm();
          if (data.token) {
            localStorage.setItem('token', data.token);
            setSuccessfulLogin(true);
            setId(data.userId);
            setGlobalName(data.userName);
          }
        });
    }
  };

  if (successfulLogin) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container login-register">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  registerBtn();
                }}
                className="form-signin"
              >
                <div className="form-label-group">
                  <input
                    onChange={e => {
                      setName(e.target.value);
                    }}
                    type="text"
                    id="inputName"
                    className="form-control"
                    placeholder="Name"
                    required
                    autoFocus
                  />
                  <label htmlFor="inputName">Name</label>
                </div>
                <div className="form-label-group">
                  <input
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                  <input
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="form-label-group">
                  <input
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    id="inputConfirmPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="inputConfirmPassword">Confirm password</label>
                </div>

                <button
                  className="btn btn-lg btn-block text-uppercase"
                  type="submit"
                >
                  Register
                </button>
                <hr className="my-4" />
                <button className="btn btn-lg btn-block text-uppercase">
                  Already have an account? Sign in here.
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
