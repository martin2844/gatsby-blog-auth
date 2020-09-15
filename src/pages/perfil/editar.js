import React, { useContext, useState, useEffect } from 'react'
import Layout from '../../layout/Layout';
import SetCrumbs from '../../config/SetCrumbs';
import { Redirect } from "@reach/router";
import { AuthContext } from '../../config/context';
import app from '../../config/base.js';
import Jumbotron from '../../layout/Jumbotron';

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

        const [userData, setUserData] = useState();


        /* 
        
        We will get user data to populate this page 
                1. First decalare db. ✅
                2. Create function to get user data. ✅
                3. Pass user data to state ✅
                4. Create forms & Set values of forms to match the state data.
                5. Detect changes in form data.
                6. Create function to post new user data.
                7. Handle errors
                8. Show notices 
                
        */
        // 1. DB declaration
        const db = app.firestore();

    
        /*
        Function to get user data. 
        ASYNC function that returns the user object containing all the data.
        */
        const getUserData = async () => {
            //Must have a current user, if not the data will be wrong? Must check without this if statemant,
            if(currentUser) {
                //Get userRef from the data base that contains all user info.
                let userRef = await db.collection('usernames').doc(currentUser.email).get();
                //Parse the data from the REF
                const userData = userRef.data();
                return userData;
            }
           
        }
        //Using the then, x is the userData object we returned before. Now we could pass it to state
                //useEffect to avoid infinite re-rendering.
        useEffect(() => {
            getUserData().then((x) => {
                setUserData(x);
            });
        }, [currentUser])
        console.log(userData);


    return (
        <Layout>
            <SetCrumbs  first="Perfil"/>
            <Jumbotron title="Editar Perfil" text="Aquí podes editar los detalles de tu cuenta"> 
            {!currentUser ? <Redirect noThrow to="/login" /> : null}
            <form className="uniqueNewYork" >
                <label>Nombre de usuario</label>
                <input type="text" name="email" placeholder="nombre" />
                <label>Nombre</label>
                <input type="text" name="email" placeholder="nombre" />
                <label>Apellido</label>
                <input type="text" name="email" placeholder="nombre" />
                <label>Teléfono</label>
                <input type="text" name="email" placeholder="nombre" />
                <label>Dirección</label>
                <input type="text" name="email" placeholder="nombre" />
                <label>Número</label>
                <input type="text" name="email" placeholder="nombre" />
                <label>Código postal</label>
                <input type="text" name="email" placeholder="nombre" />
                <br/>
                <div></div>
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <label>Repetí Password</label>
                <input type="password" name="password" placeholder="Password" />
                <div></div>
                <button type="submit">Guardar Cambios</button>
            </form>
            </Jumbotron>
        </Layout>
    )
}

export default Cursos
