import React, { useCallback } from 'react'
import app from '../config/base.js'

//import navigate to navigate to page after successfully login or creating user.
import { navigate } from "@reach/router"


const signIn = () => {

    const handleSignUp = async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app.auth().createUserWithEmailAndPassword(email.value, password.value);
            navigate(`/`);
        } catch (error) {
            alert(error);
        }
    }


    const handleSignIn = async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app.auth().signInWithEmailAndPassword(email.value, password.value);
            navigate(`/`);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>


            <form onSubmit={handleSignIn}>

                <label>Email</label>
                <input type="email" name="email" placeholder="email" />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>


            <form onSubmit={handleSignUp}>

                <label>Email</label>
                <input type="email" name="email" placeholder="email" />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>


            
        </div>
    )
}

export default signIn

