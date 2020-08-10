import React, {useContext} from 'react';
import Layout from '../layout/Layout';
import {graphql, Link, useStaticQuery} from 'gatsby';
import Img from 'gatsby-image';
import Button from '../layout/Button';
import { AuthContext, GlobalStateContext, GlobalDispatchContext } from '../config/context';
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

    //Begin Form logic.



    //Begin pay logic.
    //Basicamente cuando apretas pagar, primero se envia toda la info a firebase, una vez que confirmamos que està todo bien
    //Mandamos el pay a mercadopago.

    return (
        <Layout>
            <h1>Por favor completá algunos datos para seguir con la compra!</h1>
            <div className="checkout-main">
                
            <section className="billing-form">
                <form className="uniqueNewYork">
                <label>Nombre *</label>
                <input required type="text" name="name"/>
                <label>Apellido *</label>
                <input required type="text" name="sirname"/>
                <label>Teléfono</label>
                <input type="text" name="telefono"/>
                <label>Dirección</label>
                <input type="text" name="streetName"/>
                <label>Numero</label>
                <input type="text" name="streetNumber"/>
                <label>Codigo Postal</label>
                <input type="text" name="zipcode"/>
                </form>
            </section>
            <section className="course-container">
            <Img fixed={thumb} />
            <h4>{state.course.name}</h4>
            <p>${state.course.price}</p>
            <Button text="Pagar"/>
            </section>
            </div>
        </Layout>
    )
}

export default Checkout
