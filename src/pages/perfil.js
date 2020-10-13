import React, {useContext, useState, useEffect} from 'react'
import Layout from '../layout/Layout';
import Title from '../layout/title';
import app from '../config/base.js';
import { AuthContext } from '../config/context';
import {Link, graphql, useStaticQuery} from 'gatsby';
import RoundSpinner from '../layout/RoundSpinner';
import './styles/profile.scss';
import { checkPro } from '../config/checkPro';
import SetCrumbs from '../config/SetCrumbs';
import { Redirect } from "@reach/router"

const Profile = () => {


const postsQuery = useStaticQuery(graphql`
query {
    posts: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
      edges{
        node {
          frontmatter {
            title
            date
            sinopsis
            tags
            id
          }
          fields {
              slug
          }
        }
      }
    }
  
  } 
`)

    const [userData, setUserData] = useState();
    const [displayImage, setDisplayImage] = useState(null);
    const [newName, setNewName] = useState("");
    const [pro, setPro] = useState({pro: false, courses: null})
    const [commentData, setCommentData] = useState({
        commentCount: null,
        latestComment: {
            comment: null,
            datePosted: null,
            postID: null
        }
    })

    
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
    // add here check if user has pro status or not
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
                //get username DB data
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
                    },{ merge: true });
                }   

                //check if username DB entry's pic is different than actual currentUser object picture, if different update
                if(usernameEntry.profilePic !== currentUser.photoURL){
                    await db.collection("usernames").doc(currentUser.email).set({
                        profilePic: currentUser.photoURL
                    }, { merge: true })
                }
                console.log(usernameEntry.commentCount);


                if(usernameEntry.commentCount) {
                    //filter posts to get post information
                    let postTitleContainer = postsQuery.posts.edges.filter(posts => {
                        let theID = posts.node.frontmatter.id;
                        return theID === usernameEntry.latestComment.postID;
                    })
                    
                    //destructure variables
                    let { commentCount, latestComment } = usernameEntry;
                    let { comment, datePosted, postID } = latestComment;
                   //set state for latest comment data
                    setCommentData({
                        commentCount: commentCount,
                        latestComment: {
                            comment: comment,
                            datePosted: datePosted,
                            postID: postID,
                            title: postTitleContainer[0].node.frontmatter.title,
                            slug: postTitleContainer[0].node.fields.slug
                        }
                })
               
                } else {
                    setCommentData({...commentData, commentCount: 0});
                }
              
            

        }

           //Promodule hook
           let proStatus = await checkPro(currentUser);
           proStatus && setPro({pro: true, courses: proStatus});

        }).catch(err => console.error(err));

        // ALSO set users image into state for displaying it.
        if(currentUser && currentUser.photoURL !== null) {
            setDisplayImage(currentUser.photoURL);
        } else {
            console.log("no image set a no image thumb")
            setDisplayImage("https://limitlesstravellers.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png")
        }
     
    }, [currentUser]);
    

    //Coment display JSX
    let commentDisplay = (
        <div> 
            <h5>Dejaste un total de {commentData.commentCount} comentarios</h5>
                  <p>Tu ultimo comentario fue en el post <Link to={`/blog/${commentData.latestComment.slug}`}>{commentData.latestComment.title}</Link></p>
                
            <div className="last-comment">
                <p>{commentData.latestComment.datePosted}</p>
                <p>{commentData.latestComment.comment}</p>
                </div>
            

        </div>
    )

    return (
        <Layout>
            <SetCrumbs  first="Perfil"/>
            {!currentUser ? <Redirect noThrow to="/login" /> : null}
            <section className="profile-top">
                    <div className="profile-data-container">
                        <div className="info-section">
                        { name ? <Title subtitle={`Bienvenido ${name}`} /> : null}
                        {currentUser ? <img className="profile-pic" src={displayImage}/> : null}
                        <p>Usuario </p>
                        <p>Comentarios: </p>
                      
                        </div>

                    

                    
                        <div className="user-section">
                            <div className="user-comments">
                                Ultimo comentario:
                                {
                                    commentData.commentCount === null ? 
                                    <RoundSpinner text="loading comments" /> :
                                    (commentData.commentCount >= 1 ? commentDisplay : 
                                    <p>No comentaste en ningún post todavia!</p>)
                                 }
                                
                            </div>
                           
                        </div>

                    </div>
                  

            </section>
            






        </Layout>
    )
}

export default Profile


