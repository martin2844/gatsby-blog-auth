import React from 'react'
import './Spinner.scss'

const Spinner = (props) => {
    return (
        <div className="top-container">
        <div className="seven">
            <div className="loader" id="loader-7"></div>
        </div>
        <h4>{props.text}</h4>
        </div>
    )
}

export default Spinner
