import React from 'react';
import Link from 'gatsby-link'
import './footer.scss';

const Footer = () => {
    return(
        <footer className="footer-main">
           <div className="news-container">
           <p>Newsletter</p>
               <form className="uniqueNewYork">
                   <input type="email" />
                   <button>📬</button>

               </form>
            </div>
            <div>
                <p>CodigoMate 2020</p>
            </div>
            <div className="footer-links">
                <Link>Contacto</Link>
                <p>/</p> 
                <Link>Publicidad</Link>
                <p>/</p> 
                <Link>Privacidad</Link>
            </div>
        </footer>
    )
}

export default Footer