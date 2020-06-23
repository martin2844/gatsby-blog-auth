import React from 'react';
import { Link } from 'gatsby';
import './Button.scss';

const Button = ({to, href, color, text}) => {

    if(to && !href) {
        return (
            <Link to={to}>
            <div className={`button ${color}`}>
            {text}    
    
            </div>
            </Link>
        )
    } else if (href && !to){

        return(
            <a href={href}>
            <div className={`button ${color}`}>
                 {text}    

            </div>
            </a>
        )

    } else {
        return(
            <div>
                Cant double link properties
            </div>
        )
    }
}

export default Button
