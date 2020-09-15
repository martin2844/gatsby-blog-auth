import React, { useContext, useState, useEffect } from 'react'
import Layout from '../../layout/Layout';
import SetCrumbs from '../../config/SetCrumbs';
import { Redirect } from "@reach/router";
import { AuthContext } from '../../config/context';
import app from '../../config/base.js';
import Jumbotron from '../../layout/Jumbotron';
import Spinner from '../../layout/RoundSpinner';

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
                4. Create forms & Set values of forms to match the state data.✅
                5. Detect changes in form data. - onChange✅
                6. Create function to post new user data.✅
                    6.b Create state to show an alert when user saves data.
                7. Handle errors
                8. Show notices 
                
        */
        // 1. DB declaration
        const db = app.firestore();

    
        /*
        2.
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
        //3.
        //Using the then, x is the userData object we returned before. Now we could pass it to state
                //useEffect to avoid infinite re-rendering.
        useEffect(() => {
            getUserData().then((x) => {
                setUserData(x);
            });
        }, [currentUser])
        console.log(userData);
        //5. Detect changes and update them. 
        //1st function to handle not nested data
        const onChange = e => {setUserData({...userData, [e.target.name]: e.target.value})}
        //Second function to handle nested data-
        const onChange2 = e => {
            setUserData(
            {...userData, 
                personal: {
                    ...userData.personal,
                    [e.target.name]: e.target.value
                }
            }
            )
        }

        //6. Create function to post new user data.
        const onSubmit = async (e) => {
            //Prevent default behaviour.
            e.preventDefault();
            console.log(userData);
            //Update the firebase user.
            try {
                await db.collection("usernames").doc(currentUser.email).set({
                    ...userData
                },{ merge: true });
            } catch (error) {
                console.log(error);
            }
        }






        //4. Create forms and set data
        const form = (
            <form onSubmit={e => onSubmit(e)} className="uniqueNewYork" >
                <label>Nombre de usuario</label>
                <input onChange={e => onChange(e)} type="text" name="username" placeholder="Usuario" value={userData?.username}/>
                <label>Nombre</label>
                <input onChange={e => onChange2(e)} type="text" name="name" placeholder="Nombre" value={userData?.personal.name} />
                <label>Apellido</label>
                <input onChange={e => onChange2(e)} type="text" name="sirname" placeholder="Apellido"  value={userData?.personal.sirname}  />
                <label>Teléfono</label>
                <input onChange={e => onChange2(e)} type="number" name="phone" placeholder="Telefono" value={userData?.personal.phone} />
                <label>Dirección</label>
                <input onChange={e => onChange2(e)} type="text" name="streetName" placeholder="Nombre de la calle" value={userData?.personal.streetName} />
                <label>Número</label>
                <input onChange={e => onChange2(e)} type="number" name="streetNumber" placeholder="Numero de la calle" value={userData?.personal.streetNumber} />
                <label>Código postal</label>
                <input onChange={e => onChange2(e)} type="number" name="zipCode" placeholder="Codigo postal" value={userData?.personal.zipCode} />
                <br/>
                <div></div>
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <label>Repetí Password</label>
                <input type="password" name="password" placeholder="Password" />
                <div></div>
                <button>Guardar Cambios</button>
            </form>
        )

    return (
        <Layout>
            <SetCrumbs  first="Perfil"/>
            <Jumbotron title="Editar Perfil" text="Aquí podes editar los detalles de tu cuenta"> 
            {!currentUser ? <Redirect noThrow to="/login" /> : null}
            {userData?.username ? form : <Spinner/>}
            </Jumbotron>
        </Layout>
    )
}

export default Cursos
