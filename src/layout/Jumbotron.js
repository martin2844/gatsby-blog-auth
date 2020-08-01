import React from 'react';
import './Jumbotron.scss';
const Jumbotron = ({color, title, text, children}) => {

    return (
        <div className={`jumbotron ${color}`}>
          <h1>{title}</h1>
          <p>{text}</p>  
          {children}
        </div>
    );
}

export default Jumbotron
