import React, {useContext, useState, useEffect} from 'react'
import Layout from '../layout/Layout';
import Title from '../layout/title';
import app from '../config/base.js';
import axios from 'axios';
import { GlobalDispatchContext, GlobalStateContext, AuthContext } from '../config/context';


const Profile = () => {
    
    const [displayImage, setDisplayImage] = useState(null);

    //BUILD BYPASS
    let currentUser;
    let getUser = useContext(AuthContext);
    if(getUser) {
        currentUser = getUser.currentUser;
    }

    const [name, setName] = useState(null);



    //CHECK IF USER HAS DISPLAY NAME, IF NOT SET IT UP FOR HIM
    useEffect(()=> {

        const checkName = async () => {

            try {
                if(currentUser && currentUser.displayName === null) {
                    let newDisplayName = currentUser.email.substr(0, currentUser.email.indexOf("@"));
                    await app.auth().currentUser.updateProfile({displayName: newDisplayName});
                    setName(newDisplayName);
                } else if(currentUser) {
                    setName(currentUser.displayName);
                    console.log("allready has a name")
                }
                
            } catch (error) {
                    console.log(error);
            }
        
        
        }
        checkName();
        // ALSO set users image into state for displaying it.
        if(currentUser && currentUser.photoURL !== null) {
            setDisplayImage(currentUser.photoURL);
        } else {
            console.log("no image set a no image thumb")
            setDisplayImage("https://limitlesstravellers.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png")
        }

    }, [currentUser]);

    //GET RANDOM IMAGE FUNCTION
    const setNewProfile = async () => {

        let randomURL = await axios.get('https://source.unsplash.com/random/150x150').then((response) => {
            console.log("function triggered")
           return response.request.responseURL
        })

        console.log( await randomURL, "lol");

     try {
        if(randomURL) {
            await app.auth().currentUser.updateProfile({photoURL: randomURL});
            console.log("new image?")
            setDisplayImage(randomURL);
        }
     } catch (error) {
         console.log(error);
     }
    }

    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return (
        <Layout>
            
            { name ? <Title subtitle={`Bienvenido ${name}`} sub2={`${da}-${mo}-${ye}`} /> : null}


            <section className="user-section">
              <h4>Tu nombre de display: {name}</h4>
              <button>Cambiar</button>

              <h4>Tu imagen {currentUser ? <img src={displayImage}/> : null}</h4>
              <button>Cambiar:</button>
              <button onClick={ () => setNewProfile() }>Poner una random</button> 

            </section>
            

            
        </Layout>
    )
}

export default Profile


