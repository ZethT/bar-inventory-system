import React, { useState } from 'react';
import { CForm, CFormInput, CButton, CContainer, CRow, CCol } from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post('http://localhost:5001/login', formData)
      .then(response => {
        if (response.data.user_id) {
          setUser({ user_id: response.data.user_id, username: formData.username, role: response.data.role });
          navigate('/');
        } else {
          setError(response.data.message || 'Login failed');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setError(error.response?.data?.message || 'Login failed');
      });
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CForm>
            <CFormInput
              type="text"
              label="Username"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
            <CFormInput
              type="password"
              label="Password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <CButton color="primary" onClick={handleSubmit} className="mt-2">Login</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;