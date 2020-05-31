import React from 'react';
import { Link } from 'gatsby';
import './header.scss';


const Header = () => {
    return (
        <section className="header-main">
            <div className="top-bar flex-row-center">
                 <div className="toggle-mode"></div>
                 <div>¿Tenés una cuenta? <Link to="/login"> Registrate</Link> o <Link to="/login"> Logueate</Link></div>
            </div>
            <div className="center-bar">
                  <div className="Logo flex-row-center">
                        <h2 style={{color: "#6A635A"}}>codigo</h2>
                        <h2 style={{color: "#89837A"}}>Mate</h2>
                  </div>
                  <div className="Social">

                  </div>
            </div>
            <div className="bottom-bar">
                <ul className="flex-row-center">
                    <li>
                        <Link to="/tutoriales">Tutoriales</Link>
                    </li>
                    <li>
                      <Link to="/tutoriales">Contacto</Link> 
                    </li>
                    <li>
                      <Link to="/tutoriales">Acerca de</Link> 
                    </li>
                </ul>

            </div>
        </section>
    )
}

export default Header
