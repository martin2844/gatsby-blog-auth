import React, { useContext, useState, useEffect } from 'react'
import Layout from '../../layout/Layout';
import SetCrumbs from '../../config/SetCrumbs';
import { Redirect } from "@reach/router";
import { AuthContext } from '../../config/context';
import app from '../../config/base.js';
import Jumbotron from '../../layout/Jumbotron';
import Spinner from '../../layout/RoundSpinner';
import axios from 'axios';
import Alert from '../../layout/Alert';
import RoundSpinner from '../../layout/RoundSpinner';

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
        //User Data State
        const [userData, setUserData] = useState();
        //Image data state
        const [displayImage, setDisplayImage] = useState(null);
        //File Data
        const [fileData, setFileData] = useState();
        //New profile image
        const [newProfile, setNewProfile] = useState();
        //Alert State
        const [pictureAlert, setPictureAlert] = useState(null);
        const [formAlert, setFormAlert] = useState();
        const [randomAlert, setRandomAlert] = useState(null);
        //Set loaders
        const [loading, setLoading] = useState(false);
        const [formLoading, setFormLoading] = useState(false);
        const [passData, setPassData] = useState();
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

        // Set image into state
        if(currentUser && currentUser.photoURL !== null) {
            setDisplayImage(currentUser.photoURL);
        } else {
            console.log("no image set a no image thumb")
            setDisplayImage("https://limitlesstravellers.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png")
        }
     



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

        const onChangePass = e => {setPassData({...passData, [e.target.name]: e.target.value})}

        //6. Create function to post new user data.
        const onSubmit = async (e) => {
            //Prevent default behaviour.
            e.preventDefault();
            setFormLoading(true);
            console.log(userData);

            if(passData && passData.password !== passData.password2){
                setFormAlert("passError")
                setFormLoading(false);
                throw Error;
                return;
            }

            if(passData && passData.password.length < 6) {
                setFormAlert("length");
                setFormLoading(false);
                throw Error;
                return;
            }

            //Update the firebase user.
            try {
                await app.auth().currentUser.updateProfile({displayName: userData.username});
                await db.collection("usernames").doc(currentUser.email).set({
                    ...userData
                },{ merge: true });
                if(passData?.password) {
                    await app.auth().currentUser.updatePassword(passData.password)
                }
                setFormAlert("success");
                setFormLoading(false);
            } catch (error) {
                console.log(error);
                if(error.code === "auth/requires-recent-login"){
                    setFormAlert("re-login");
                } else {
                    setFormAlert("error");
                }
                setFormLoading(false);
            }
        }


        //Create function for file changes
        const onChangeFiles = e => {setFileData({[e.target.name]: e.target.files});}
        //Upload Profile Picture Function
        const uploadProfile = async (files) => { 
            console.log("clicked");
            setLoading(true);
            if(files){
                //Make an array from the fileList Type
                let file = Array.from(files.file);
                //Just get the first element since we are uploading just 1 picture
                file = file[0];
                //Generate new Form data in order to be able to upload to imgur
                let imageData = new FormData();
                //Add the file
                imageData.append('image', file);
                try {
                    //Upload image to IMGUR
                    let pictureUpload = await axios.post('https://api.imgur.com/3/image', imageData, {
                             headers: {
                                 'Authorization': 'Client-ID afda234326b61af',
                                      }
                                 });
                    //Get the picture url out of the response body from axios.
                    let pictureURL = pictureUpload.data.data.link;
                    console.log(pictureURL);
                    try {
                        //Now Update the users profile picture and the user's DB picture.
                        await app.auth().currentUser.updateProfile({photoURL: pictureURL});
                        let UPDATEIT = await db.collection("usernames").doc(currentUser.email).set({
                            profilePic: pictureURL
                        },{ merge: true });
                        setPictureAlert("success");
                        setDisplayImage(pictureURL);
                        setLoading(false);
                    } catch (error) {
                        console.log(error);
                    }

                } catch (error) {
                    console.log(error);
                }
                
                
            } else {
                setPictureAlert("no file");
                setLoading(false);
            }
         
        }

        //GET RANDOM IMAGE FUNCTION
        const setNewRandomPic = async () => {
            setLoading(true);
            let randomURL = await axios.get('https://source.unsplash.com/random/150x150').then((response) => {
                console.log("function triggered")
            return response.request.responseURL;
            })

            console.log( await randomURL, "lol");

        try {
            if(randomURL) {
                await app.auth().currentUser.updateProfile({photoURL: randomURL});
                await db.collection("usernames").doc(currentUser.email).update({
                    profilePic: randomURL
                })
                console.log("new image?");
                setDisplayImage(randomURL);
                setRandomAlert("success");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setRandomAlert("fail");
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
                <input onChange={e => onChangePass(e)} type="password" name="password" placeholder="Password" />
                <label>Repetí Password</label>
                <input onChange={e => onChangePass(e)} type="password" name="password2" placeholder="Repeat Pass" />
                <div></div>
                <button>{formLoading ? <RoundSpinner /> : "Guardar Cambios"}</button>
                {formAlert === "success" ? <Alert text="Información actualizada" success /> : null}
                {formAlert === "error" ? <Alert text="Ocurrió un error probá nuevamente después" fail /> : null}
                {formAlert === "passError" ? <Alert text="Las contraseñas deben coincidir" fail /> : null}
                {formAlert === "length" ? <Alert text="Las contraseña debe ser de al menos 6 carácteres" fail /> : null}
                {formAlert === "re-login" ? <Alert text="Para cambiar la contraseña te vamos a pedir que te deslogues y vuelvas a loguear! Disculpa!" fail /> : null}
                
            </form>
        )
        
        const imageBox = (
            <div class="image-box">
            <h4>Tu foto de perfil actual:</h4>
            {currentUser ? <img class="profile-pic" src={displayImage}/> : null}
            <h4>Cambiar:</h4>
            <button class="nice-button" onClick={() => setNewRandomPic()} >Poner una Random</button>
          
            <div class="side-by-side">
                <input class="file"  type="file" name="file" onChange={e => onChangeFiles(e)}></input>
                <button class="nice-button" onClick={() => uploadProfile(fileData)}>{loading ? <RoundSpinner /> : "Subir!"}</button>
            </div>
            {pictureAlert === "success" ? <Alert text="Imágen Subida" success /> : null}
            {pictureAlert === "fail" ? <Alert text="Error, probá de nuevo más tarde" fail /> : null}
            {pictureAlert === "no file" ? <Alert text="Probá adjuntando un archivo" fail /> : null}
            {randomAlert === "success" ? <Alert text="Ya tenés una nueva imágen aleatoria" success /> : null}
            {randomAlert === "fail" ? <Alert text="Error, probá de nuevo más tarde" fail /> : null}
            </div>
        )
        
        
        //Cleanup alerts
        useEffect(() => {
          setTimeout(() => {
              setPictureAlert(null);
          }, 8000);
        }, [pictureAlert])

        useEffect(() => {
            setTimeout(() => {
                setRandomAlert(null);
            }, 8000);
          }, [randomAlert])

          useEffect(() => {
            setTimeout(() => {
                setFormAlert(null);
            }, 8000);
          }, [formAlert])

    return (
        <Layout>
            <SetCrumbs  first="Perfil"/>
            <Jumbotron title="Editar Perfil" text="Aquí podes editar los detalles de tu cuenta"> 
            {!currentUser ? <Redirect noThrow to="/login" /> : null}
            <div class="edit-profile-container">
            {userData?.username ? form : <Spinner/>}
            {userData?.username ? imageBox : <Spinner/>}
            </div>
            </Jumbotron>
        </Layout>
    )
}

export default Cursos
