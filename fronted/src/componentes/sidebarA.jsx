import React from 'react';
import { Link, } from 'react-router-dom';
//import Cookies from 'js-cookie';

const SidebarA = ({activeWindow}) => {

    const handleSignOut = () => {
        // Lógica para cerrar sesión

        alert('Cerrando sesión...');
        //Cookies.remove('usuario')

    };


    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
                <symbol id="users" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                </symbol>
                <symbol id="postA" viewBox="0 0 16 16">
                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
                </symbol>
                <symbol id="likes" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386"/>
                </symbol>
                <symbol id="tag" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    
                </symbol>
                <symbol id="bar" viewBox="0 0 16 16">
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                </symbol>
                <symbol id="cargaU" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                </symbol>
                <symbol id="cargaP" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>

                </symbol>
            </svg>


            <div className="d-flex flex-nowrap">
                <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: '4.5rem' }}>
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li className="nav-item">
                            <Link to="/admin" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'users' && 'active'}`} title="users" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="users"><use xlinkHref="#users" /></svg>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/adminP" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'postsP' && 'active'}`} title="Posts" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="users"><use xlinkHref="#postA" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/TopPosts" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'TopPosts' && 'active'}`} title="Likes Top" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#likes" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/topUsers" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'topUsers' && 'active'}`} title="Users Posts" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#bar" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/categoriesR" className="nav-link py-3 border-bottom rounded-0" title="Categorias" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Customers"><use xlinkHref="#tag" /></svg>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cargaU" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'cargaU' && 'active'}`} title="Users" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Carga masiva"><use xlinkHref="#cargaU" /></svg>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cargaP" className={`nav-link py-3 border-bottom rounded-0 ${activeWindow === 'cargaP' && 'active'}`} title="Posts" data-bs-toggle="tooltip" data-bs-placement="right">
                                <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Carga masiva"><use xlinkHref="#cargaP" /></svg>
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


export default  SidebarA;
;