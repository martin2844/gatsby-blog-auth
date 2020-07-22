import React from 'react';
import "./Alert.scss";

const Alert = (props) => {
    let {text, fail, success} = props;
    let styling;
    if(fail){
        styling = "fail";
    } else if(success) {
        styling= "success";
    } else {
        styling = null;
    }


    return (
        <div className={`alert ${styling}`}>
            {text}
        </div>
    )
}

export default Alert
