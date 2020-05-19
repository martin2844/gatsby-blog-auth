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



  // Ie.firestore.FieldValue.arrayRemove("east_coast")nitiate var for comment count info.
  let commentCount = null;



  // set state for fetching comments.

  //initial comment loading for mapping afterwards
  const [comments, setComments] = useState([]);
  //second state to populate the actual info that will be shown.
  const [newComms, setNewComms] = useState([]);
  const [loading, setLoading] = useState(null);
  const [noComms, setNoComms] = useState(false);


  //Initialization of the variable to get the postID from the blog posts front matter in order to search the DB
  const postID = props.data.markdownRemark.frontmatter.id;

  //initialize DB?
  const db = app.firestore();


  //@@@ Fetch Comment Data function
     //function to fetch comment data 
     const fetchData = async () => {
      //initialize firestore. local scope
     //Must do error handling, for the case the document does not exists obviously.
     try {

      const commentRef = await db.collection("comments").doc(postID).get();

      if(commentRef.data() === undefined) {
        db.collection("comments").doc(postID).set({comments: []});
        throw "Undefined document, but Dont worry, I've 'created' one for you";
      } else if (Object.keys(commentRef.data()).length === 0 && commentRef.data().constructor === Object) {
        db.collection("comments").doc(postID).set({comments: []});
        throw "The document was defined, but there was no data, dont worry, Ive put Data in for you.";
      } else if(commentRef.data().comments.length === 0) {
        setNoComms(true);
        throw "No comments for this post \n But worry shall you not, this document exists, be the first one to comment \n go on!";
      } else {
        setComments(commentRef.data().comments);
      }
     

     } catch (error) {
       console.error(error);
     }
     
 }

 
  //Initial useEffect to do the fetching of the DB only once
  useEffect(() => {
    setLoading(true);
   //carry out actual function
   fetchData().catch("help");
  }, []);

  //@@@ function for finding username in the username collection
  const findName = async (email) => {
    
    const usernameRef = await db.collection("usernames");
    return usernameRef.doc(email).get();

  } 


 //Create async function to construct the comment objects using a map from the previously created comments state. since each comment will have a pending promise
 //we will use promise.all inside the async function to return them once they are all promised.
    const constructComments = async () => {
      
      // only map out if comments exist.
      if(comments) {
      let promises = comments.map(async (comment) => {
        let username = await findName(comment.email);
        return (
          {
            comment: comment.comment,
            email: comment.email,
            username: username.data().username,
            id: comment.id,
            image: username.data().profilePic,
            datePosted: comment.datePosted
          }
        )
      })
      return await Promise.all(promises)
    }
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

    if(newComms !== undefined && newComms.length >= 1 ) {
      setNoComms(false);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        


    } else if (newComms !== undefined && newComms.length === 0 ) {
      setNoComms(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
   
  }, [newComms])

  // @@@ Comment display block
  console.log(noComms);
  let commentsDisplay;
  if(newComms !== undefined && noComms === false) {
    commentsDisplay = newComms.map((commentario) => {
      const { email, username, comment, image, id, datePosted } = commentario;
      let allowDelete = false;
      if(currentUser){

        if(currentUser.email === email) {
          allowDelete = true;
        }

   

      }
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
            <div className="top"><h4><a href={`emailto:${email}`}>{username}</a></h4><p>{datePosted.substr(0, datePosted.indexOf(" "))}</p></div>
            <p>{comment}</p>
            {allowDelete && <p id={id} comment={comment} dateposted={datePosted} onClick={e => deleteComment(e, comment, email, datePosted)} className="delete-comment"> Delete Comment</p>}
          </div>
         

        </div>
      )
    })

  } else {
    commentsDisplay = ( 
      <div>no comments</div>
    )
  }

 

  //@@@ Delete a comment function
  const deleteComment = (e, comment, email, datePosted) => {
    console.log(e.target.id);
    const ID = parseInt(e.target.id);
  
    db.collection("comments").doc(postID).update({
      comments: firebase.firestore.FieldValue.arrayRemove({id: ID, email: email, comment: comment, datePosted: datePosted})
    }).then(fetchData()).catch(error => console.error(error));
   
  }


//@@@ Post a comment function - onSubmit
 const [text, setText] = useState("");
 const onSubmit = async (e) => {
   e.preventDefault();
   try {

    await db.collection("comments").doc(postID).update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        comment: text,
        email: currentUser.email,
        id: Math.floor(Math.random() * 10000),
        datePosted: new Date().toLocaleString("es", {hour12: false})
      })

    });
     console.log("Comment Succeeded");
     setText("");
     
   } catch (error) {
      
    console.error(error);


   }


 }


  // @@@ Define leave comment block 

  const newComment = (
    <section className="new-comment">
    <form onSubmit={e => onSubmit(e).then(fetchData())}>
      <label>Leave a comment:</label>
      <textarea value={text} onChange={e => setText(e.target.value)}/>
      <button>Submit</button>
  </form>
  </section>
  )







 return (
    <Layout>
          {JSON.stringify(loading)}
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
        <div className="top-comment-bar">
             <span>
                 <h5 className="underline-hero">{commentCount} Comments</h5>
             </span>
             <span>
                  {currentUser ? null : <Link to="/login"><h5>Log in to comment</h5></Link>}
             </span> 
        </div>


          {loading ? <Spinner text="loading comments" /> : commentsDisplay}
         
        </section>

        {currentUser ? newComment : null }
        
        <Link className='goback' to="/blog">Go back to posts</Link>
    </Layout>
 )
}

export default BlogTemplate