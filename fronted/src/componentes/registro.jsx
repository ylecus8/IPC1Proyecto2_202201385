import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [carnet, setCarnet] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [facultad, setFacultad] = useState('');
  const [carrera, setCarrera] = useState('');

  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!isPasswordValid(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos 1 mayúscula, 1 minúscula y 1 carácter especial.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/Registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carnet,
          nombre,
          apellido,
          genero,
          correo,
          facultad,
          carrera,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);
      alert(data.mensaje);
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  return (
    
    <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div
        className='form-signin bg-body-tertiary'
        style={{ width: '100%', maxWidth: '600px', borderRadius: '20px', padding: '20px' }}
      >
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <img
              className='center-margin'
              src='https://e7.pngegg.com/pngimages/713/762/png-clipart-computer-icons-button-login-image-file-formats-logo.png'
              alt='Logo de Registro'
              width='72'
              height='57'
            />
          </div>
          <h1 className='h3 mb-3 fw-normal text-center'>Registro</h1>

          {/* Dividir el formulario en dos columnas */}
          <div className='row'>
            <div className='col'>
              <div className='form-floating' style={{ marginBottom: '15px' }}>
                <input
                  required
                  type='text'
                  className='form-control'
                  id='floatingCarnet'
                  placeholder='Carnet'
                  value={carnet}
                  onChange={(e) => setCarnet(e.target.value)}
                />
                <label htmlFor='floatingCarnet'>Carnet</label>
              </div>

              <div class='form-floating' style={{ marginBottom: '15px' }}>
                <input
                  required
                  type='text'
                  className='form-control'
                  id='floatingNombre'
                  placeholder='Nombre'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor='floatingNombre'>Nombre</label>
              </div>

              <div className='form-floating' style={{ margenBottom: '15px' }}>
                <input
                  required
                  type='text'
                  className='form-control'
                  id='floatingApellido'
                  placeholder='Apellido'
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <label htmlFor='floatingApellido'>Apellido</label>
              </div>
            </div>

            <div className='col'>
              <div class='form-floating' style={{ marginBottom: '15px' }}>
                <select
                  required
                  className='form-select'
                  id='floatingGenero'
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value=''>Selecciona el género</option>
                  <option value='Masculino'>Masculino</option>
                  <option value='Femenino'>Femenino</option>
                </select>
                <label htmlFor='floatingGenero'>Género</label>
              </div>


              <div className='form-floating' style={{ margenBottom: '15px' }}>
                <input
                  required
                  type='email'
                  className='form-control'
                  id='floatingCorreo'
                  placeholder='Correo'
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <label htmlFor='floatingCorreo'>Correo</label>
              </div>
            </div>
          </div>
          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <select
              required
              className='form-select'
              id='floatingFacultad'
              value={facultad}
              onChange={(e) => setFacultad(e.target.value)}
            >
              <option value=''>Selecciona una facultad</option>
              <option value='Facultad 1'>Facultad 1</option>
              <option value='Facultad 2'>Facultad 2</option>
              <option value='Facultad 3'>Facultad 3</option>
            </select>
            <label htmlFor='floatingFacultad'>Facultad</label>
          </div>

          <div className='form-floating' style={{ marginBottom: '15px' }}>
            <input
              required
              type='text'
              className='form-control'
              id='floatingCarrera'
              placeholder='Carrera'
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
            />
            <label htmlFor='floatingCarrera'>Carrera</label>
          </div>
          <div className='form-floating' style={{ margenBottom: '15px' }}>
            <input
              required
              type='password'
                  className='form-control'
              id='floatingPassword'
              placeholder='Contraseña'
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <label htmlFor='floatingPassword'>Contraseña</label>
          </div>

          <div className='form-floating' style={{ margenBottom: '15px' }}>
            <input
              required
              type='password'
              className='form-control'
              id='floatingConfirmPassword'
              placeholder='Confirma tu contraseña'
              value={confirmPassword}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <label htmlFor='floatingConfirmPassword'>Confirma tu contraseña</label>
          </div>

          <button className='btn btn-primary w-100 py-2' type='submit'>
            Registrarse
          </button>
        </form>

        <p className='mt-3 mb-0 text-center'>
          ¿Ya tienes una cuenta?{' '}
          <button
            className='btn btn-secondary btn-lg'
            onClick={() => navigate('/')}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Registro;
