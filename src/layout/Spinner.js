import React from 'react'
import './RoundSpinner.scss'

const Spinner = (props) => {
    return (
        <div className="top-container">
        <div class="spinner"></div>
        <h4>{props.text}</h4>
        </div>
    )
}

export default Spinner
