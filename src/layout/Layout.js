import React, { useContext } from 'react';
import './main-rules.scss';
import './Layout.scss';
import Header from './Header';
import MobileMenu from './MobileMenu';
import {GlobalDispatchContext, GlobalStateContext} from '../config/context';

const Layout = (props) => {

    

    const state = useContext(GlobalStateContext) || {
        toggleDark: true
      }

    return (
        <React.Fragment>
        <MobileMenu />
        <Header />
        <div className={state.toggleDark ? "main-container dark" : "main-container"}>

            
         {props.children}
        </div>
        </React.Fragment>
    )
}

export default Layout
