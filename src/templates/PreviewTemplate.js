import React, {useState, useEffect, useContext} from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';
import firebase from "firebase/app";
import { globalHistory as history } from '@reach/router';
import '@firebase/firestore';
import { Redirect } from "@reach/router";
import { checkPro } from '../config/checkPro';
import Button from '../layout/Button';
//Basic firebase package
import app from '../config/base.js';
import { AuthContext, GlobalStateContext, GlobalDispatchContext } from '../config/context';
import pay from "../config/pay";

import './blogtemplate.scss';


//export query so gatsby can grab it as a prop
export const query = graphql`
query (
    $slug: String!
  ){
    markdownRemark (
      fields: {
        slug: {
          eq: $slug
        }
      }
    ){
      frontmatter {
        title
        date
        sinopsis
        id
        category
        tags
        course
        proID
        proSlug
        price
      }
      html
    }
  }

`



const BlogTemplate = (props) => {
  const [bought, isBought] = useState(false);
  const [incomplete, isIncomplete] = useState(false);
  const { location } = history;

  const state = useContext(GlobalStateContext) || {
      toggleDark: true
  }
  const dispatch = useContext(GlobalDispatchContext);

  console.log(state);

    useEffect(()=> {
      if(props.data.markdownRemark.frontmatter.course !== true) {
        dispatch({type: "CRUMB_4_SET", payload: props.data.markdownRemark.frontmatter.category
      });
      dispatch({type: "CRUMB_5_SET", payload: props.data.markdownRemark.frontmatter.title
    });
      }
     
    }, [location.pathname])

  

     //BUILD BYPASS
     let currentUser;
     let getUser = useContext(AuthContext);
     if(getUser) {
         currentUser = getUser.currentUser;
        
     }

     


  
  
  //Initialization of the variable to get the postID from the blog posts front matter in order to search the DB
  const postID = props.data.markdownRemark.frontmatter.id;
  const proID = props.data.markdownRemark.frontmatter.proID;
  const proSlug = props.data.markdownRemark.frontmatter.proSlug;
  const price = props.data.markdownRemark.frontmatter.price;
  const title = props.data.markdownRemark.frontmatter.title;

  const [course, setCourse] = useState({
    name: title,
    price: price,
    id: proID,
    slug: proSlug,
    email: "hello@hello.com"
  });

  useEffect(()=> {
    if(currentUser){
      setCourse({
        ...course,
        email: currentUser.email
      });
     }
   }, [currentUser])
 

  //Check if its bought; Run only once at initial render;
  useEffect(() => {
    checkPro(currentUser, proID).then(x => isBought(x));
    
  }, [currentUser])


  //Incomplete function - If user is incomplete, change incomplete to true, so redirect is done
  const setIncomplete = () => {
    //Dispatch course to context state.
      dispatch({
      type: "HOIST_COURSE",  
      payload: {
        ...course
      }
    });
      isIncomplete(true);

  }

  //initialize DB?
  const db = app.firestore();

  const makePayment = async (course) => {
    if(!currentUser){
      //Remember course to buy, make user login or register, and then redirect to checkout.js
      setIncomplete();
      return false;
    }
    const usernameRef = await db.collection('usernames').doc(currentUser.email).get();
    const usernameEntry = usernameRef.data();
    //Do username checks, if checks fail redirect to special flow checkout remembering course to pay.
    if(!usernameEntry?.personal?.name || !usernameEntry?.personal?.sirname) {
      console.log("incomplete DATA");
      setIncomplete();
      return false;
    }
    pay(course);
  }
  



 return (
    <Layout>
        {bought ? <Redirect noThrow to={`/cursos/pro/${proSlug}`} /> : null}
        {incomplete && currentUser ? <Redirect noThrow to={`/checkout/`} /> : null}
        {incomplete && !currentUser ? <Redirect noThrow to={`/login/`} /> : null}
        <section className='post-main'>
        <div className='post-title-container'>
        <h1 className='post-title-content'>{props.data.markdownRemark.frontmatter.title}</h1>
        </div>
        <div className='post-content-container' dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        </section>
        <div>
        <Button onClick={x => makePayment(course).then(x => console.log(x))} text="pagar"/>
        </div>
        <Link className='goback' to="/cursos">Volver a los cursos</Link>
    </Layout>
 )
}

export default BlogTemplate