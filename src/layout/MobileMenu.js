import React, { useState } from 'react';
import { Link } from 'gatsby';
import './mobilegod.scss';






const MobileMenu = () => {
    
    
    const [toggle, setToggle] = useState(false);
    try {
        toggle ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
    } catch (error) {
        console.log(error);
    }
 
 

    const mobileGod = (
        <section id="mobile-god" style={toggle ? {width: "100vw"} : {width: "0"}}  className="mobile-god">
            <svg onClick={() => setToggle(!toggle)} id="Outlined" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="Fill"><polygon points="28.71 4.71 27.29 3.29 16 14.59 4.71 3.29 3.29 4.71 14.59 16 3.29 27.29 4.71 28.71 16 17.41 27.29 28.71 28.71 27.29 17.41 16 28.71 4.71"/></g></svg>
        <Link style={toggle ? {opacity: "100%"} : {opacity: "0"}} to="/tutoriales"><h2>Tutoriales</h2></Link>
        <Link style={toggle ? {opacity: "100%"} : {opacity: "0"}} to="/cursos"><h2>Cursos</h2></Link>
        <Link style={toggle ? {opacity: "100%"} : {opacity: "0"}} to="/about"><h2>Acerca de</h2></Link>
       
        </section>
           
      
    )

    return (
        <>
        <div style={toggle ? {left: "89vw"} : {left: "0"}} onClick={() => setToggle(!toggle)} className="mobile-btn">
        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"/><path d="M0-.25h48v48h-48z" fill="none"/></svg>
        </div>
        
        {mobileGod}

        </>
    )
}

export default MobileMenu
