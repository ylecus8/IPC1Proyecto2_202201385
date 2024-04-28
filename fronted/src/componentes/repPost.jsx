import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import SidebarA from './sidebarA';
Chart.register(ArcElement, Title, Tooltip, Legend);

const ReporteTopPosts = () => {
    const [postNames, setPostNames] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/TopPosts', {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json(); // Datos desde el servidor
                    const topPosts = data.posts; // Extrae el campo de posts

                    setPostNames(topPosts.map((post) => post.name)); // Nombres de posts
                    setLikes(topPosts.map((post) => post.likes)); // Número de "Me gusta"
                }
            } catch (error) {
                console.error('Error al obtener los posts más populares:', error);
            }
        };

        fetchTopPosts(); // Obtener datos al montar el componente
    }, []);
    
    const pieData = {
        labels: postNames, // Los nombres de los posts
        datasets: [
            {
                label: 'Número de Me gusta',
                data: likes, // Los valores
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', // Rojo
                    'rgba(54, 162, 235, 0.7)', // Azul
                    'rgba(255, 205, 86, 0.7)', // Amarillo
                    'rgba(75, 192, 192, 0.7)', // Verde
                    'rgba(153, 102, 255, 0.7)', // Morado
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(255, 205, 86, 1)', 
                    'rgba(75, 192, 192, 1)', 
                    'rgba(153, 102, 255, 1)', 
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="App">
            <SidebarA activeWindow="topPosts" />
            
            <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '600px', height: '600px', backgroundColor: 'white', borderRadius: '20px' }}>
                    <Pie data={pieData} /> {/* Muestra el gráfico Pie */}
                </div>
            </div>
        </div>
    );
};

export default ReporteTopPosts;