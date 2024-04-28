import React from 'react';
import { Link, } from 'react-router-dom';
import Cookies from 'js-cookie';

const SidebarU= ({activeWindow}) => {

    const handleSignOut = () => {
        // Lógica para cerrar sesión

        alert('Cerrando sesión...');
        Cookies.remove('usuario')

    };


    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
                <symbol id="create" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </symbol>
                <symbol id="posts" viewBox="0 0 16 16">
                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
                </symbol>
                <symbol id="trend" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                </symbol>
               
                <symbol id="bar" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>

                </symbol>
            </svg>


            <div className="d-flex flex-nowrap">
                <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: '4.5rem' }}>
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li className="nav-item">
                            <Link to="/create" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'create' && 'active'}`} title="create" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="create"><use xlinkHref="#create" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'posts' && 'active'}`} title="posts" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#posts" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/trend" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'trend' && 'active'}`} title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#trend" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/update" className="nav-link py-3 border-bottom rounded-0" title="Editar perfil" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Products"><use xlinkHref="#bar" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/categoriesR" className="nav-link py-3 border-bottom rounded-0" title="Categorias" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Customers"><use xlinkHref="#tag" /></svg>
                            </Link>
                        </li>
                    </ul>
                    <div className="dropdown border-top">
                        <Link to="/profile" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
                        </Link>
                        <ul className="dropdown-menu text-small shadow">
                         
                            <li><Link className="dropdown-item" to="/" onClick={handleSignOut}>Sign out</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="b-example-vr"></div>
            </div>
        </div>
    );
}


export default  SidebarU;