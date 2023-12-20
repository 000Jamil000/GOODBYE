import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import './authorization.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Authorization({ onLogin }) {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);

  const handleLogin = () => {
    if (email && password) {
      const userData = {
        email: email,
        password: password,
      };
      loginUser(userData);
    } else {
      alert('Введите email и пароль');
    }
  };

  const loginUser = (userData) => {
    fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ответ сервера:', data);
        console.log(data.success);
        if (data.success) {
          setIsRegistered(true);
          onLogin(); // Вызываем функцию onLogin из родительского компонента
          navigate('/form'); 
        } else {
          setIsRegistered(false);
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  };

  return (
    <MDBContainer fluid className='bg-container' style={{ backgroundColor: '#1E1E1E' }}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5 custom-card' style={{ maxWidth: '400px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Авторизация</h2>
          {!isRegistered ? (
            <>
              <p className="text-center mb-4">Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь.</p>
              <a href="/registration" className="d-block text-center mb-4">Зарегистрироваться</a>
            </>
          ) : (
            <>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='form2'
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='form3'
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-center mb-4">
                <span>Нет аккаунта? </span>
                <a href="/registration" className="register-link">Зарегистрироваться</a>
              </p>
              <MDBBtn onClick={handleLogin} className='mb-4 w-100 gradient-custom-4 login-btn' size='lg'>Войти</MDBBtn>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Authorization;
