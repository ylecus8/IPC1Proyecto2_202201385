import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SidebarA from './sidebarA';

// Registrar las escalas y elementos necesarios para evitar errores
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReporteTopUsuarios = () => {
  const [userNames, setUserNames] = useState([]);
  const [postsCreated, setPostsCreated] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/TopUsers', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          const topUsers = data.topUsers;

          setUserNames(topUsers.map((user) => user.carnet));
          setPostsCreated(topUsers.map((user) => user.postsCreated));
        }
      } catch (error) {
        console.error('Error al obtener datos de usuarios con más publicaciones:', error);
      }
    };

    fetchTopUsers(); // Obtener datos al montar el componente
  }, []);

  const barData = {
    labels: userNames,
    datasets: [
      {
        label: 'Publicaciones Creadas',
        data: postsCreated,
        backgroundColor: 'rgba(153, 102, 255, 0.7)', // Morado
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <SidebarA activeWindow="topUsers" />
      
      <div
        className="content"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        {/* Ajustar el tamaño del contenedor para centrar y hacer más pequeño */}
        <div style={{ width: '400px', height: '400px', backgroundColor: 'white', borderRadius: '20px' }}>
          <Bar data={barData} options={{ maintainAspectRatio: false }} /> {/* Mostrar gráfico de barras */}
        </div>
      </div>
    </div>
  );
};

export default ReporteTopUsuarios;