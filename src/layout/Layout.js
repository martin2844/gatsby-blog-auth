import React, { useContext } from 'react';
import './main-rules.scss';
import './Layout.scss';
import Navbar from './Navbar';
import Header from './Header';
import {GlobalDispatchContext, GlobalStateContext, AuthContext} from '../config/context';

const Layout = (props) => {

    
    const dispatch = useContext(GlobalDispatchContext);
    const state = useContext(GlobalStateContext) || {
        toggleDark: true
      }

    


    return (
        <React.Fragment>
        {/* <Navbar /> */}
        <Header />
        <div className={state.toggleDark ? "main-container dark" : "main-container"}>

            
         {props.children}
        </div>
        </React.Fragment>
    )
}

export default Layout
