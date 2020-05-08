import React, {useState, useEffect} from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';

import '@firebase/firestore'

//Basic firebase package
import app from '../config/base.js';
import { AuthContext } from '../config/context';


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
      }
      html
    }
  }

`



const BlogTemplate = (props) => {

  // Initiate var for comment count:
  let commentCount = 0;



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

  comments && (commentCount = comments.length);

  //Must make conditional if user is logged in show comment box
  // Must make conditional for each comment if user.email === to comment.email user gets edit, or Delete button
  // Must style comment box in general

  let commentsDisplay = comments.map((comment) => {
    const { email } = comment;
    // por ahora no hay manera de sacar el username a través de firebase sin meterse en firebase functions o otro workaround mas facil es guardar el user en una base 
    // de datos, collection, separada cuando alguien se registra y cuando cambia el username lo actualiza. Y eso si es publico.
    return (
      <div>
        {comment.email}
      </div>
    )
  })
 
  

 return (
    <Layout>
        <section className='post-main'>
        <div className='post-title-container'>
        <h1 className='post-title-content'>{props.data.markdownRemark.frontmatter.title}</h1>
        <div className="post-sub-data-container">
        <p className='post-date'> posted on {props.data.markdownRemark.frontmatter.date}</p>
        <p className="comment-info">comments: {commentCount}</p>
        </div>
       
        </div>
  


        <div className='post-content-container' dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        </section>
        <section className="post-comments">
          {commentsDisplay}

        </section>
        <Link className='goback' to="/blog">Go back to posts</Link>
    </Layout>
 )
}

export default BlogTemplate