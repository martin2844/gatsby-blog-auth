import React, {useContext, useState, useEffect} from 'react';
import Layout from '../layout/Layout';
import Spinner from '../layout/Spinner';
import {graphql, Link, useStaticQuery} from 'gatsby';
import Img from 'gatsby-image';
import Button from '../layout/Button';
import { AuthContext, GlobalStateContext, GlobalDispatchContext } from '../config/context';
import pay from "../config/pay";
import firebase from "firebase/app";
import app from '../config/base.js';
import './styles/checkout.scss';

const Checkout = () => {
    //First get course's thumbs
    const postsQuery = useStaticQuery(graphql `
    query {
        cimages: allFile(sort: {fields: [name], order: ASC}, filter: { sourceInstanceName: { eq: "cthumbs" } }) {
            edges {
              node {
                childImageSharp {
                  fixed(width: 368) {
                    ...GatsbyImageSharpFixed
                    originalName
                  }
                }
              }
            }
          }
      } 
    `)
    //Initial loading state
    const [loading, setLoading] = useState(true);
      
     //BUILD BYPASS - GetCurrent User
     let currentUser;
     let getUser = useContext(AuthContext);
     if(getUser) {
         currentUser = getUser.currentUser;
        
     }

    // Get global state to get course to pay
    const state = useContext(GlobalStateContext) || {
        toggleDark: true
    }

    //Filter the thumbnail logic below
    const filter = state.course.slug || "react";
    const allImages = postsQuery.cimages.edges
    const thumbArray = allImages.filter((node) => {
        const a = node.node.childImageSharp.fixed.originalName;
        const name = a.substring(0, a.lastIndexOf("."));
        return name === filter;
    });
    const thumb = thumbArray[0].node.childImageSharp.fixed;


 

    //Begin Form logic.  -->Later on, on refector, make this a separate component.
        //Set form Data to state.
        const [formData, setFormData] = useState({
          name: "",
          sirname:"",
          phone: "",
          streetName: "",
          streetNumber: "",
          zipCode: ""
        })
        //Onchange handler for inputs.
        const onChange = e => {
          setFormData({...formData, [e.target.name]: e.target.value})
        } 
        //Preload userData from Firebase if exists
            //initialize DB?
            const db = app.firestore();
            //Before form, get firebase data.
            const getUserData = async () => {
              if(!currentUser?.email) {
                  return
              }
              const usernameRef = await db.collection('usernames').doc(currentUser.email).get();
              const usernameEntry = usernameRef.data();
              console.log(usernameEntry);
              const oldData = {
                name: usernameEntry?.personal?.name || "",
                sirname: usernameEntry?.personal?.sirname || "",
                phone: usernameEntry?.personal?.phone || "",
                streetName: usernameEntry?.personal?.streetName || "",
                streetNumber: usernameEntry?.personal?.streetNumber|| "",
                zipCode: usernameEntry?.personal?.zipCode || "",
              }
              setFormData(oldData);
              setLoading(false);
            }
            //Just do it once, after we have current user email.
            useEffect(() => {
              getUserData();
            }, [currentUser?.email])
       
        //Push to firebase
        const updateBillingInfo = async () => {
          await db.collection("usernames").doc(currentUser.email).set({
            personal: formData
        }, {merge: true});
        }
          


    //Begin pay logic.
    //Basicamente cuando apretas pagar, primero se envia toda la info a firebase, una vez que confirmamos que està todo bien
    //Mandamos el pay a mercadopago.


    const submitAndPay = () => {
      //First update billing info.
      updateBillingInfo();
      //Then post new info i.e. formdata && course info to pay.
      console.log("pay btn")

    }



    //Form to be displayed when initial data is loaded.
    const form = (
      <form className="uniqueNewYork">
      <label>Nombre *</label>
      <input required type="text" value={formData.name} name="name" onChange={e => onChange(e)}/>
      <label>Apellido *</label>
      <input required type="text" value={formData.sirname} name="sirname" onChange={e => onChange(e)}/>
      <label>Teléfono</label>
      <input type="number" value={formData.phone} name="phone" onChange={e => onChange(e)}/>
      <label>Dirección</label>
      <input type="text" value={formData.streetName} name="streetName" onChange={e => onChange(e)}/>
      <label>Numero</label>
      <input type="Number" value={formData.streetNumber} name="streetNumber" onChange={e => onChange(e)}/>
      <label>Codigo Postal</label>
      <input type="text" value={formData.zipCode} name="zipCode" onChange={e => onChange(e)}/>
      </form>
    )


    return (
        <Layout>
            <h1>Por favor completá algunos datos para seguir con la compra!</h1>
            <div className="checkout-main">
            <section className="billing-form">
               {loading ? <Spinner></Spinner> : form}
            </section>
            <section className="course-container">
            <Img fixed={thumb} />
            <h4>{state.course.name}</h4>
            <p>${state.course.price}</p>
            <Button onClick={() => submitAndPay()} text="Pagar"/>
            </section>
            </div>
        </Layout>
    )
}

export default Checkout
