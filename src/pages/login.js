import React, { useContext } from 'react'
import Layout from '../layout/Layout';
import Title from '../layout/title';
import app from '../config/base.js';
import { AuthContext } from '../config/context';
import Jumbotron from '../layout/Jumbotron';
import './styles/login.scss';

//import navigate to navigate to page after successfully login or creating user.
import { navigate, Redirect } from "@reach/router"



const Login = () => {
  
    let currentUser;
    let test = useContext(AuthContext);
    if(test) {
        currentUser = test.currentUser;
    }

    const handleSignUp = async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app.auth().createUserWithEmailAndPassword(email.value, password.value);
          navigate(`/profile`);
        } catch (error) {
            alert(error);
        }
    }


    const handleSignIn = async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app.auth().signInWithEmailAndPassword(email.value, password.value);
           navigate(`/profile`);
        } catch (error) {
            alert(error);
        }
    }

    


    return (
        <Layout>
                 {currentUser ? <Redirect noThrow to="/perfil" /> : null}
        <section className="login-container">
           <Jumbotron title="Logueate!" text="Para acceder a todo el contenido"> 
            <form className="uniqueNewYork" onSubmit={handleSignIn}>
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <div></div>
                <button type="submit">Login</button>
            </form>
            </Jumbotron>
            <Jumbotron title="o Registrate!" text="Si no tenés cuenta aún">
            <form className="uniqueNewYork" onSubmit={handleSignUp}>
           
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <div></div>
                <button type="submit">Register</button>
            </form>
            </Jumbotron>
            </section>

            
        </Layout>
    )
}

export default Login

