import React, { useContext } from 'react'
import Layout from '../../layout/Layout';
import SetCrumbs from '../../config/SetCrumbs';
import { Redirect } from "@reach/router";
import { AuthContext } from '../../config/context';

const Cursos = () => {

        //BUILD BYPASS
        let currentUser;
        let getUser = useContext(AuthContext);
        if(getUser) {
            currentUser = getUser.currentUser;
        }
        
        if(currentUser !== undefined && currentUser !== null) {
            console.log(currentUser.metadata.creationTime)
        }


    return (
        <Layout>
            <SetCrumbs  first="Perfil"/>
            {!currentUser ? <Redirect noThrow to="/login" /> : null}
        </Layout>
    )
}

export default Cursos
