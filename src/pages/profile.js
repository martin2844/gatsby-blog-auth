import React, {useContext, useState, useEffect} from 'react'
import Layout from '../layout/Layout';
import Title from '../layout/title';
import app from '../config/base.js';
import { GlobalDispatchContext, GlobalStateContext, AuthContext } from '../config/context';


const Profile = () => {
   

    const {currentUser} = useContext(AuthContext);
    const [name, setName] = useState(null);


    const checkName = async () => {

        try {
            if(currentUser && currentUser.displayName === null) {
                let newDisplayName = currentUser.email.substr(0, currentUser.email.indexOf("@"));
                await app.auth().currentUser.updateProfile({displayName: newDisplayName});
                setName(newDisplayName);
            } else {
                setName(currentUser.displayName);
                console.log("allready has a name")
            }
            
        } catch (error) {
                console.log(error);
        }
    
    
    }

    useEffect(()=> {
        checkName();
    }, [name]);

    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return (
        <Layout>
            { name ? <Title subtitle={`Bienvenido ${name}`} sub2={`${da}-${mo}-${ye}`} /> : null}
        </Layout>
    )
}

export default Profile


