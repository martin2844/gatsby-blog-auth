import React, {useState, useEffect, useContext} from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';
import Spinner from '../layout/Spinner';
import firebase from "firebase/app";


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

     //BUILD BYPASS
     let currentUser;
     let getUser = useContext(AuthContext);
     if(getUser) {
         currentUser = getUser.currentUser;
     }
 

  
  
  //Async await is difficult

  //In order to get the username, I need to access my username collection, because firebase doesnt allow access to the auth module if you're not
  //running an admin sdk. So everytime a user is created the username, and later profile picture is stored into a DB, inside a collection called usernames.
  //Each doc has the name of the user's email, so its just a matter of getting one document per email.

  //So first we load up the comments, then we check for each comment, which has the user's email stored, what is that users 'username' by accessing the collection
  //usernames.



  // Initiate var for comment count info.
  let commentCount = null;



  // set state for fetching comments.

  //initial comment loading for mapping afterwards
  const [comments, setComments] = useState([]);
  //second state to populate the actual info that will be shown.
  const [newComms, setNewComms] = useState([]);
  const [loading, setLoading] = useState(null);


  //Initialization of the variable to get the postID from the blog posts front matter in order to search the DB
  const postID = props.data.markdownRemark.frontmatter.id;

  //initialize DB?
  const db = app.firestore();


  //Fetch Data function
     //function to fetch comment data 
     const fetchData = async () => {
      //initialize firestore. local scope
     

     //Must do error handling, for the case the document does not exists obviously.
     const commentRef = await db.collection("comments").doc(postID).get();    
     setComments(commentRef.data().comments);

   
 }


  //Initial useEffect to do the fetching of the DB only once




  useEffect(() => {
    setLoading(true);

   //carrt out actual function
   fetchData();



  }, []);

  //create function for finding username in the username collection
  const findName = async (email) => {
    
    const usernameRef = await db.collection("usernames");
    return usernameRef.doc(email).get();

  } 


 //Create async function to construct the comment objects using a map from the previously created comments state. since each comment will have a pending promise
 //we will use promise.all inside the async function to return them once they are all promised.
    const constructComments = async () => {
      let promises = comments.map(async (comment) => {
        let username = await findName(comment.email);
        return (
          {
            comment: comment.comment,
            email: comment.email,
            username: username.data().username,
            id: comment.id
          }
        )
      })
      return await Promise.all(promises)
    }

    //Use effect to run only when the comments change, that is to say, when comments change from initial empty state to fully populated
    useEffect(() => {
      //create an async function in order to be able to await the constructComment function and pass it into a variable called data
      let run = async () => {
        let data = await constructComments();
        //once we get the Data we will pass it into the newComms state.
        setNewComms(data);
        
      }

        run();
     

 
    }, [comments]);

  
  //just modifying the original commentcount variable to show the actual length of the comments array.
  comments && (commentCount = comments.length);

  //Loading . Set loading false if newComms is bigger than, but also case could be doc not found == no comments. So do that as well
  useEffect(() => {
    //   
    if(newComms.length >= 1) {
      setLoading(false);
    }
   
  }, [newComms])


  let commentsDisplay;
  if(newComms !== undefined) {
    commentsDisplay = newComms.map((commentario) => {
      const { email, username, comment, image, id } = commentario;
      // por ahora no hay manera de sacar el username a través de firebase sin meterse en firebase functions o otro workaround mas facil es guardar el user en una base 
      // de datos, collection, separada cuando alguien se registra y cuando cambia el username lo actualiza. Y eso si es publico.
      let imageSRC;
      if(image) {
        imageSRC = image
      } else {
        imageSRC = "https://limitlesstravellers.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png"
      }
      return (
        <div key={id} className="comment">
          <div className="profile-pic">
            <img className="picture" src={imageSRC} />
          </div>
          <div className="comment-content">
            <h4><a href={`emailto:${email}`}>{username}</a></h4>
            <p>{comment}</p>

          </div>
         

        </div>
      )
    })
  }
 
  
console.log(loading);


const [text, setText] = useState("");

 const onSubmit = async (e) => {
   e.preventDefault();
   try {

    await db.collection("comments").doc(postID).update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        comment: text,
        email: currentUser.email,
        id: Math.floor(Math.random() * 10000)
      })

    });
     console.log("Comment Succeeded");
     setText("");
     
   } catch (error) {
      
    console.error(error);


   }


 }




  // Define leave comment block 

  const newComment = (
    <section className="new-comment">
    <form onSubmit={e => onSubmit(e).then(fetchData())}>
      <label>Leave a comment:</label>
      <textarea value={text} onChange={e => setText(e.target.value)}/>
      <button>Submit</button>
  </form>
  </section>
  )

  // Define Sign In block

  const signIn = (
    <section>
      You are not logged in! <Link to="/login">Sign in</Link> to leave a comment
    </section>
  )






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

          {loading ? <Spinner text="loading comments" /> : commentsDisplay}
         
        </section>
        
        {loading ? null : (currentUser ? newComment : signIn)}
        <Link className='goback' to="/blog">Go back to posts</Link>
    </Layout>
 )
}

export default BlogTemplate