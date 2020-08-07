import React from 'react';
import { Link } from 'gatsby';
import './Button.scss';

const Button = ({to, href, color, text, children, onClick}) => {

    if(to && !href) {
        return (
            <Link to={to}>
            <div className={`button ${color}`}>
            {text || children}    
    
            </div>
            </Link>
        )
    } else if (href && !to){

        return(
            <a href={href}>
            <div className={`button ${color}`}>
                 {text || children}    

            </div>
            </a>
        )

    } else {
        return(
            <div onClick={onClick} className={`button ${color}`}>
            {text || children}    
    
            </div>
        )
    }
}

export default Button
