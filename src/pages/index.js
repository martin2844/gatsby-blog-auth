import React, {useContext} from 'react'
import app from '../config/base';
import {GlobalDispatchContext, GlobalStateContext, AuthContext} from '../config/context';

const Index = () => {

    const state = useContext(GlobalStateContext) || {
      user: "hello world"
      }

      const {currentUser} = useContext(AuthContext);
      //conditional testing.
      let logged = (<div>YOU ARE LOGGED</div>)
      let notLogged = (<div>YOU ARE NOT LOGGED</div>)
      console.log(currentUser);

    return (
        <div>

            "hello world"
           <button onClick={() => app.auth().signOut()} >Sign out</button>
           {currentUser ? logged : notLogged}
        </div>
    )
}

export default Index
