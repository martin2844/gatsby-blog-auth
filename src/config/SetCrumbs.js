import React, {useEffect, useContext} from 'react'
import { globalHistory as history } from '@reach/router';
import {GlobalDispatchContext } from '../config/context';




const SetCrumbs = ({first, second, third, fourth, fifth}) => {


    const dispatch = useContext(GlobalDispatchContext);
    const { location } = history;

    useEffect(()=> {
        
        if(second) {
            dispatch({type: "CRUMB_1_SET", payload: "Home"
        })}
    
        if(second) {
            dispatch({type: "CRUMB_2_SET", payload: second
        })}
        
        if(third) {
            dispatch({type: "CRUMB_3_SET", payload: third
        })}
        
        if(fourth) {
            dispatch({type: "CRUMB_4_SET", payload: fourth
        })}

        if(fifth) {
            dispatch({type: "CRUMB_5_SET", payload: fifth
        })}

    }, [location.pathname])


    return (
        <>
        </>
    )
}

export default SetCrumbs
