// Combined login/register page. On successful auth it sets user in App.
import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Auth({ setUser }) {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <LoginForm setUser={setUser} />
      </div>
      <div className="col-md-1" />
      <div className="col-md-5">
        <RegisterForm />
      </div>
    </div>
  );
}
