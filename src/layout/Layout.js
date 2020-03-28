import React, { useContext } from 'react';
import './Layout.scss';
import Navbar from './Navbar';
import {GlobalDispatchContext, GlobalStateContext, AuthContext} from '../config/context';

const Layout = (props) => {

    
    const dispatch = useContext(GlobalDispatchContext);
    const state = useContext(GlobalStateContext) || {
        toggleDark: true
      }

    


    return (
        <React.Fragment>
        <Navbar />
        <div className={state.toggleDark ? "main-container dark" : "main-container"}>

            
         {props.children}
        </div>
        </React.Fragment>
    )
}

export default Layout
