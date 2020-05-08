import React, {useState, useEffect} from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';

import '@firebase/firestore'

//Basic firebase package
import app from '../config/base.js';
import { AuthContext } from '../config/context';


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
      }
      html
    }
  }

`



const BlogTemplate = (props) => {
  // set state for fetching comments.
  const [comments, setComments] = useState([]);
  //Separate postID to search DB
  const postID = props.data.markdownRemark.frontmatter.id;
  useEffect(() => {
  
   //function to fetch comment data 
   const fetchData = async () => {
       const db = app.firestore();

       //Must do error handling, for the case the document does not exists obviously.
       const commentRef = await db.collection("comments").doc(postID).get();
       const data = await db.collection("comments").get();
       console.log(commentRef);
       setComments(commentRef.data().comments)
       //setComments(data.docs.map(doc => doc.data()));
   }
   fetchData();
  }, []);

  console.log(comments);

  //Must make conditional if user is logged in show comment box
  // Must make conditional for each comment if user.email === to comment.email user gets edit, or Delete button
  // Must style comment box in general


 return (
    <Layout>
        <section className='post-main'>
        <div className='post-title-container'>
        <h1 className='post-title-content'>{props.data.markdownRemark.frontmatter.title}</h1>
        <p className='post-date'> posted on {props.data.markdownRemark.frontmatter.date}</p>
        </div>
        <div className='post-content-container' dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        <Link className='goback' to="/blog">Go back to posts</Link>
        </section>
    </Layout>
 )
}

export default BlogTemplate