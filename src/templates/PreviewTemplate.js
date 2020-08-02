import React, {useState, useEffect, useContext} from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';
import firebase from "firebase/app";
import { globalHistory as history } from '@reach/router';
import '@firebase/firestore';
import { Redirect } from "@reach/router";
import { checkPro } from '../config/checkPro';

//Basic firebase package
import app from '../config/base.js';
import { AuthContext, GlobalStateContext, GlobalDispatchContext } from '../config/context';


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
      }
      html
    }
  }

`



const BlogTemplate = (props) => {
  const [bought, isBought] = useState(false);
  const { location } = history;

  const state = useContext(GlobalStateContext) || {
      toggleDark: true
  }
  const dispatch = useContext(GlobalDispatchContext);

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
  //Check if its bought; Run only once at initial render;
  useEffect(() => {
    checkPro(currentUser, proID).then(x => isBought(x));
  }, [currentUser])



  

  //initialize DB?
  const db = app.firestore();





 return (
    <Layout>
        {bought ? <Redirect noThrow to={`/cursos/pro/${proSlug}`} /> : null}
        <section className='post-main'>
        <div className='post-title-container'>
        <h1 className='post-title-content'>{props.data.markdownRemark.frontmatter.title}</h1>

        </div>
        <div className='post-content-container' dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        </section>
        
        <Link className='goback' to="/cursos">Volver a los cursos</Link>
    </Layout>
 )
}

export default BlogTemplate