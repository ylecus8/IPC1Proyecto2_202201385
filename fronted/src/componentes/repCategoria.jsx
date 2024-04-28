import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import SidebarA from './sidebarA';
Chart.register(ArcElement, Title, Tooltip, Legend);

const ReporteCategoria = () => {
    const [claves, setClaves] = useState([]);
    const [valores, setValores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/reportecategoria', {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setClaves(Object.keys(data.countByCategory));
                    setValores(Object.values(data.countByCategory));
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };

        fetchData();
    }, []);
    
    const data = {
        labels: claves,
        datasets: [
            {
                label: 'Cantidad de posts por categoría',
                data: valores,
                backgroundColor: [
                    'rgba(0, 122, 255, 0.7)', // Azul
                    'rgba(88, 86, 214, 0.7)', // Morado
                    'rgba(255, 204, 0, 0.7)', // Amarillo
                    'rgba(90, 200, 250, 0.7)', // Verde claro
                    'rgba(255, 59, 48, 0.7)', // Ladrillo
                ],
                borderColor: [
                    'rgba(0, 122, 255, 1)',
                    'rgba(88, 86, 214, 1)',
                    'rgba(255, 204, 0, 1)',
                    'rgba(90, 200, 250, 1)',
                    'rgba(255, 59, 48, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="App">
            <SidebarA activeWindow="categoriesR" />
            
            <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '600px', height: '600px', backgroundColor: 'white', borderRadius: '20px' }}>
                    <Pie data={data} />
                </div>
            </div>
        </div>
    );
};

export default ReporteCategoria;