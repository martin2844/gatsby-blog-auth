import React, { useState, useEffect, useContext } from 'react'
import Layout from "../layout/Layout"
import Title from '../layout/title';
import '@firebase/firestore'

//Basic firebase package
import app from '../config/base.js';
import { AuthContext } from '../config/context';




const Inspirate = () => {
   const [comments, setComments] = useState([])

   useEffect(() => {
    const fetchData = async () => {
        const db = app.firestore();
        //    const      =                   the collection -> document name
        const commentRef = await db.collection("comments").doc("2").get();
        const data = await db.collection("comments").get();
        console.log(commentRef);
        setComments(commentRef.data().comments)
        //setComments(data.docs.map(doc => doc.data()));
    }
    fetchData();
   }, []) 
   console.log(comments);
   //BUILD BYPASS
   let currentUser;
   let getUser = useContext(AuthContext);
   if(getUser) {
       currentUser = getUser.currentUser;
  
    }



    return (
        <Layout>
            <Title title="inspirate" />
            <div style={{color: "white"}}>{comments.map((comment => {
                return (
                    // now to get the userName with the email do the following.
                    // https://stackoverflow.com/questions/38491237/firebase-authentication-lookup-a-user-by-email
                    <ul>
                        <li>{comment.email}</li>
                        <li>{comment.comment}</li>
                        <li>{comment.id}</li>
                    </ul>
                )
            }))}</div>
            
        </Layout>
    )
}

export default Inspirate
