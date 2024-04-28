import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Login = () => {
    //const carnetAdmin=
    const [carnet, setCarnet] = useState(''); 
    const [pass, setPass] = useState(''); 
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (carnet === '12024' && pass === 'ipc1') {
            alert('Bienvenido Administrador');
            navigate('/admin'); // Redirigir a /admin
            return; // Termina aquí si es administrador
          }
      
          // Si no es administrador, intentar iniciar sesión con el servidor
          try {
            const response = await fetch('http://localhost:5000/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carnet: carnet,  // Asegúrate de enviar el carnet correcto
                    password: pass,  // Asegúrate de enviar la contraseña correcta
                }),
            });
    
            const data = await response.json();
    
            if (!data.error) {
                alert(data.mensaje);
                // Almacena el carnet en las cookies para usarlo más adelante
                Cookies.set('usuario', carnet);
    
                // Redirige a la siguiente página si el inicio de sesión es exitoso
                navigate('/create');
            } else {
                // Muestra el mensaje de error si el inicio de sesión falla
                alert(data.mensaje);
            }
    
        } catch (error) {
            console.log('Error en la solicitud', error);
            // Muestra un mensaje de error si algo sale mal
            alert('Hubo un error con el inicio de sesión. Intenta de nuevo.');
        }
    };




    return (

        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <div className="form-signin bg-body-tertiary " style={{ width: '100%', maxWidth: '400px', borderRadius: "20px" }}>

            <form onSubmit={handleSubmit}>
                <img classNameName="mb-4" src="https://previews.123rf.com/images/giamportone/giamportone2103/giamportone210300896/166486349-icono-de-inicio-de-sesi%C3%B3n-s%C3%ADmbolo-de-usuario-vectorial-pictograma-lineal-simple-iniciar-sesi%C3%B3n-en.jpg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 fw-normal">Incio de Sesion</h1>

                <div className="form-floating">
                    <input required type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={carnet} onChange={(e) => setCarnet(e.target.value) } />
                    <label for="floatingInput">Carnet</label>
                </div>
                <div className="form-floating">
                    <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value) }/>
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Iniciar sesion</button>                
            </form>

            <p className="mt-3 mb-0 text-center">
                    ¿Aun no tienes una cuenta? <button className="btn btn-secondary  btn-sm" onClick={() => navigate('/registro')}>Registrate aquí</button>.
                </p>

            </div>
        </div>


    );

};

export default Login;