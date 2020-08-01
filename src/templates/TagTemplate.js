
import React, {useState, useContext, useEffect} from 'react';
import Layout from '../layout/Layout';
import {graphql} from 'gatsby';
import { GlobalDispatchContext } from '../config/context';
import PostCard from '../layout/postCard';
import { globalHistory as history } from '@reach/router';
import './catntag.scss';



//export query so gatsby can grab it as a prop
export const query = graphql`
query($title: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$title] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            sinopsis
            category
            tags
            date
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
    
  }
`



const TagTemplate = ({data, pageContext}) => {

  const { location } = history;
  // Uncomment this to make theme context available on this file
  // const state = useContext(GlobalStateContext) || {
  //     toggleDark: true
  // }
  const dispatch = useContext(GlobalDispatchContext);
  useEffect(()=> {
    dispatch({type: "CRUMB_4_SET", payload: pageContext.title
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  

  // put all posts on state, filter with tags, via filterThePosts.
  const [thePosts, filterThePosts] = useState(data.allMarkdownRemark.edges);
   //Extract images from queries
  const postImages = data.images.edges

  //What happens when there is no image. 
  let noImage = postImages.filter((image) => {
  return image.node.childImageSharp.fixed.originalName === "no-image.png";
})


    //Begin posts mapping - or tut mapping
    const posts = thePosts.map((posts) => {
        // console.log(posts)
      // filter from image query which image belongs to which posts
      // the image name must match the slug of the post
      let theImageFilter = postImages.filter((image) => {
          let { originalName } = image.node.childImageSharp.fixed;
          let slugMatchPNG = posts.node.fields.slug + '.png';
          let slugMatchJPG = posts.node.fields.slug + '.jpg';
          // console.log(image);
          if (originalName === slugMatchJPG) {
              // console.log("jpg")
              return slugMatchJPG;
          } else if (originalName === slugMatchPNG) {
              // console.log("png")
              return slugMatchPNG;
          } else {
              // console.log("nomatch")
              return null;
          }


      })
      // console.log(theImageFilter)
      let theImage;
      // iffy because reading node from undefined crashes gatsby.
      if (theImageFilter.length !== 0) {
          theImage = theImageFilter[0].node.childImageSharp.fixed;
      } else {
          theImage = noImage[0].node.childImageSharp.fixed;
      }



      // let { tags } = posts.node.frontmatter;
      //iffy in case a post misses tags.
  
      // let theme = "dark";
      // state.toggleDark ? theme = "dark" : theme = "light";

      return ( < PostCard
          key = {posts.node.fields.slug}
          slug = { posts.node.fields.slug }
          image = { theImage }
          title = { posts.node.frontmatter.title }
          date = { posts.node.frontmatter.date }
          category = { posts.node.frontmatter.category }
          sinopsis = { posts.node.frontmatter.sinopsis }
          />




      )

  });

    return (
        <Layout>
        <h1 className="catntag-title" >{pageContext.title}</h1>
        <div className = "card-container" > { posts } </div>
        </Layout>
    )
}

export default TagTemplate
