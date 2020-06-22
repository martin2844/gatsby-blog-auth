import React, {useState, useContext} from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';
import Img from 'gatsby-image';
import Layout from "../layout/Layout";
import Title from '../layout/title';
import {GlobalDispatchContext, GlobalStateContext, AuthContext} from '../config/context';
import PostCard from '../layout/postCard';



import '../pages/styles/blog.scss';

export const postsQuery = graphql`
query($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date]}
      limit: $limit
      skip: $skip
      ) {
      edges{
        node {
          frontmatter {
            title
            date
            sinopsis
            tags
            category
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

    
  } 
`


const Tutoriales = (props) => {

  const state = useContext(GlobalStateContext) || {
    toggleDark: true
  }



const postsQuery = props.data;

// use state to declare global filter tags.
const [filterTags, setFilterTags] = useState([]);

// put all posts on state, filter with tags, via filterThePosts.
const [thePosts, filterThePosts] = useState(postsQuery.posts.edges);
console.log(thePosts);

// image query

//Extract images from queries
const postImages = postsQuery.images.edges

//What happens when there is no image. 
let noImage = postImages.filter((image) => {
  return image.node.childImageSharp.fixed.originalName === "no-image.png";
})

//Begin posts map
const posts = thePosts.map((posts) => {
  // filter from image query which image belongs to which posts
  // the image name must match the slug of the post
  let theImageFilter = postImages.filter( (image) => {
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
        return
    }


  })

  let theImage;
  // iffy because reading node from undefined crashes gatsby.
  if (theImageFilter.length !== 0) {
    theImage = theImageFilter[0].node.childImageSharp.fixed;
  } else {
    theImage = noImage[0].node.childImageSharp.fixed;
  }

  

  let { tags } = posts.node.frontmatter;
  //iffy in case a post misses tags.
  if (tags) {
    tags.forEach((tag) => {
      filterTags.indexOf(tag) === -1 ? setFilterTags([...filterTags, tag]) : console.log('');
    })
  }

    let theme = "dark";
    state.toggleDark ? theme = "dark": theme = "light";

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

//begin tag map.

const displayTags = filterTags.map((tag) => {
  let runTheFilter = (e) => {
    //filter the posts is working, must try and reset state before each time a tag is clicked
    let filterWord = e.target.getAttribute('name');
    // console.log(filterWord);
    let arrayFilter;
   if(thePosts) { //if thePosts exists, begin filter using tag which is filtered word.
     arrayFilter = postsQuery.posts.edges.filter((post) => {
      console.log(filterWord)
    
      return post.node.frontmatter.tags.includes(filterWord); 
     

     })
   }

   console.log(arrayFilter);
   filterThePosts(arrayFilter);
  }

  return (
    <div className='filter-tag' key={tag} name={tag} onClick={e => runTheFilter(e)}>
     {tag}
    </div>
  )
})

const cleanTags = (e) => {
  filterThePosts(postsQuery.posts.edges);
}



    return (
        <Layout>
            {/* <section className='section-blog-posts'>
                <div className='tags-section'>
                   <h1>Search By tags</h1>
                   {displayTags}
                   <div className='filter-tag clean' onClick={e => cleanTags(e)}>
                  Clean filters
                  </div>

                </div>
                <div className='posts-section'>
                   {posts}
               </div>
             </section> */}

            <div className="card-container"> { posts } </div>
        </Layout>
    )
}

export default Tutoriales
