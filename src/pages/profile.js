import React, {useContext, useState, useEffect} from 'react'
import Layout from '../layout/Layout';
import Title from '../layout/title';
import app from '../config/base.js';
import axios from 'axios';
import { GlobalDispatchContext, GlobalStateContext, AuthContext } from '../config/context';

import './styles/profile.scss';


const Profile = () => {

    const [displayImage, setDisplayImage] = useState(null);
    const [change, displayChange] = useState(false);
    const [newName, setNewName] = useState("");

    //BUILD BYPASS
    let currentUser;
    let getUser = useContext(AuthContext);
    if(getUser) {
        currentUser = getUser.currentUser;
    }
    
    if(currentUser !== undefined && currentUser !== null) {
        console.log(currentUser.metadata.creationTime)
    }

    const [name, setName] = useState(null);

    const db = app.firestore();

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

        checkName().then( async () => {


            // Do checking here, if user does not have a name in DB write it down, so search first
            console.log("entered .then")
            if(currentUser) {

                const usernameRef = await db.collection('usernames').doc(currentUser.email).get();
                const usernameEntry = usernameRef.data();
                console.log(usernameEntry);

                   
                // If no results do following block
                if(usernameEntry === undefined || usernameEntry.email === undefined || usernameEntry.profilePic === undefined) {
                    console.log("username === undefind, writing name to DB")
                    await db.collection("usernames").doc(currentUser.email).set({
                        email: currentUser.email,
                        username: currentUser.displayName,
                        profilePic: currentUser.photoURL || "https://limitlesstravellers.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png"
                    });
                }   

                //check if
                if(usernameEntry.profilePic !== currentUser.photoURL){
                    await db.collection("usernames").doc(currentUser.email).set({
                        profilePic: currentUser.photoURL
                    })
                }
                
                    
            }  
            

  
        }).catch(err => console.error(err));

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
            await db.collection("usernames").doc(currentUser.email).update({
                profilePic: randomURL
            })
            console.log("new image?")
            setDisplayImage(randomURL);
        }
     } catch (error) {
         console.log(error);
     }
    }


    //get users comments?
    const fetchComments = async () => {
       const commentRef = await db.collection("comments")
       return commentRef.where('postID', '==', 2).where('email', '==', '123@123.com').get();
    }

    fetchComments().then(x => console.log(x));

    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)


    //handleChange of username
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newName)
        try {
            await app.auth().currentUser.updateProfile({displayName: newName});
            console.log("new name set in user auth module");
            await db.collection("usernames").doc(currentUser.email).set({
                username: newName,
            });
            console.log("new name set in DB");
        } catch (error) {
            console.error(error);
        }
    }
 
    //New Name form 

    let newDispName = (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input value={newName} type="text" onChange={e => setNewName(e.target.value)}></input>
            <button>change</button>
        </form>

    )


    return (
        <Layout>
            <section className="profile-top">
            { name ? <Title subtitle={`Bienvenido ${name}`} sub2={`${da}-${mo}-${ye}`} /> : null}
            {currentUser ? <img className="profile-pic" src={displayImage}/> : null}
            </section>
            



            <section className="user-section">

              <div className="user-data">
                    <div className="display-name">
                          <h5>Tu nombre de display: {name}</h5>
                          <button onClick={() => displayChange(!change)} >Cambiar</button>
                           {change && newDispName}

                    </div>
           
              <h5>Tu imagen:</h5>
              {currentUser ? <img src={displayImage}/> : null}
              <div>        
                <button>Cambiar:</button>
                <button onClick={ () => setNewProfile() }>Poner una random</button>
              </div>
      


              </div>
             
             <div className="user-comments">
                <h5>Ultimos comentarios</h5>

             </div>

             
            </section>



        </Layout>
    )
}

export default Profile


