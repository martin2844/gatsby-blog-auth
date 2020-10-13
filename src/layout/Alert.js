import React, {useEffect, useState} from 'react';
import "./Alert.scss";

const Alert = (props) => {
    const [animation, setAnimation] = useState("animate__fadeInUp")

    let {text, fail, success} = props;
    let styling;
    if(fail){
        styling = "fail";
    } else if(success) {
        styling= "success";
    } else {
        styling = null;
    }
    
    setTimeout(() => {
        setAnimation("animate__fadeOut");
    }, 3000);

    

    return (
        <div className={`alert ${styling} animate__animated ${animation}`}>
            {text}
        </div>
    )
}

export default Alert
