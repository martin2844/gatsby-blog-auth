import React from 'react';
import './Jumbotron.scss';
const Jumbotron = ({color, title, text}) => {

    return (
        <div className={`jumbotron ${color}`}>
          <h1>{title}</h1>
          <p>{text}</p>  
        </div>
    );
}

export default Jumbotron
