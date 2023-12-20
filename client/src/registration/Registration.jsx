import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import './Registration.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = () => {
    if (email && password && repeatPassword) {
      if (password === repeatPassword) {
        const userData = {
          email: email,
          password: password,
        };
        registerUser(userData);
      } else {
        alert('Пароли не совпадают');
      }
    } else {
        alert('Введите email, пароль и повторите пароль');
    }
  };

  const registerUser = (userData) => {
    fetch('http://localhost:5000/api/user/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ответ сервера:', data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5 custom-card' style={{ maxWidth: '400px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Регистрация</h2>
          <MDBInput
            wrapperClass='mb-4'
            label='Your Email'
            size='lg'
            id='form2'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            size='lg'
            id='form3'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Repeat Password'
            size='lg'
            id='form4'
            type='password'
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <p className="text-center mb-4">
            <span>Есть аккаунт? </span>
            <a href="/authorization" className="register-link">Войти</a>
          </p>
          <MDBBtn onClick={handleRegister} className='mb-4 w-100 gradient-custom-4' size='lg'>Зарегистрироваться</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Registration;
