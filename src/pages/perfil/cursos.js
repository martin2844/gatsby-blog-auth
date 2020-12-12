import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import SetCrumbs from '../../config/SetCrumbs';
import Spinner from '../../layout/RoundSpinner';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { Redirect } from "@reach/router";
import { AuthContext } from '../../config/context';
import app from '../../config/base';
import PostCard from '../../layout/postCard';

const Cursos = () => {

    const postsQuery = useStaticQuery(graphql`
    query {
        posts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter:{frontmatter: {course: {eq: true}}}) {
            edges {
              node {
                frontmatter {
                  tags
                  category
                  course
                  type
                }
                fields {
                  slug
                }
              }
            }
          }
          courses: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter:{frontmatter: {course: {eq: true},  type:{ne: "paid-preview"}}}) {
            edges {
              node {
                frontmatter {
                  title
                  tags
                  category
                  course
                  type
                  id
                }
                fields {
                  slug
                }
              }
            }
          }
        
       images: allFile(sort: {fields: [name], order: ASC}, filter: { sourceInstanceName: { eq: "thumbs" } }) {
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

 
        
        const [loading, isLoading] = useState(true);
        const [userInfo, setUserInfo] = useState({
            pro: false,
            courses: null,

        });
        const [Courses, setCourses] = useState(null)
        const db = app.firestore();
        //BUILD BYPASS
        let currentUser;
        let getUser = useContext(AuthContext);
        if(getUser) {
            currentUser = getUser.currentUser;
        }
        if(currentUser !== undefined && currentUser !== null) {
            console.log(currentUser.metadata.creationTime)
        }
        
        let noCourses = (
            <div className="table-top">
                No tenes ningun curso por ahora! mira los cursos disponibles <Link to="/cursos">aca</Link>
            </div>
        )

        //Get Course Info
        useEffect(() => {
            (async () => {
                if(currentUser) {
                    const usernameRef = await db.collection('usernames').doc(currentUser.email).get();
                    const usernameEntry = usernameRef.data();
                    console.log(usernameEntry);
                    if(!usernameEntry.pro) {
                        setCourses(noCourses)
                        isLoading(false)
                    } else {
                        setUserInfo({
                            pro: true,
                            courses: [
                                ...usernameEntry.courses
                            ]
                        })
                        setCourses(courseCards)
                        isLoading(false);
                    }
                }
            })()
        }, [loading ])

        console.log(userInfo);

        //Extract images from queries
        const postImages = postsQuery.images.edges
        //What happens when there is no image. 
        let noImage = postImages.filter((image) => {
            return image.node.childImageSharp.fixed.originalName === "no-image.png";
        })

        
        const courseCards = postsQuery.courses.edges.map((course) => {
                if(course.node.frontmatter.type.includes("child")) {
                return
                }
                if(!userInfo?.courses?.includes(course.node.frontmatter.id)) {
                    console.log(userInfo.courses)
                    return
                }
            
              let courseImg;
              let courseThumb = postsQuery.cimages.edges.filter((img) => {
                  let name = img.node.childImageSharp.fixed.originalName
                  return name.substr(0, name.lastIndexOf(".")) === course.node.fields.slug
              });
              if(courseThumb.length !== 0) {
                  courseImg = courseThumb[0].node.childImageSharp.fixed
              } else {
                  courseImg = noImage[0].node.childImageSharp.fixed;
              }
              
              return(
                  <PostCard key={course.node.frontmatter.title} title={course.node.frontmatter.title} category={course.node.frontmatter.category} type={course.node.frontmatter.type} slug={course.node.fields.slug} course image={courseImg}/>
              )
          })



    return (
        <Layout>
            <SetCrumbs  first="Perfil"/>
            {!currentUser ? <Redirect noThrow to="/login" /> : null}
            {userInfo.pro ? <h1>Tus cursos</h1> : null}
            <div className="card-container">
            {loading ? <Spinner /> : Courses}
            </div>
            

        </Layout>
    )
}

export default Cursos
