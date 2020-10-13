import React, { useContext, useState } from 'react'
import Layout from '../layout/Layout'
import app from '../config/base';
import SetCrumbs from '../config/SetCrumbs';
import PostCard from '../layout/postCard';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { GlobalDispatchContext, GlobalStateContext, AuthContext } from '../config/context';
import Button from '../layout/Button';
import Jumbotron from '../layout/Jumbotron';

const Cursos = () => {

    const state = useContext(GlobalStateContext) || {
        toggleDark: true,
    }

    

    const postsQuery = useStaticQuery(graphql `
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

  

    // use state to declare global filter tags.
    const [filterTags, setFilterTags] = useState([]);

    // put all posts on state, filter with tags, via filterThePosts.
    const [thePosts, filterThePosts] = useState(postsQuery.posts.edges);
    // console.log(thePosts);

    // image query

    //Extract images from queries
    const postImages = postsQuery.images.edges
        //What happens when there is no image. 
    let noImage = postImages.filter((image) => {
        return image.node.childImageSharp.fixed.originalName === "no-image.png";
    })

    //Begin posts mapping - or tut mapping
    const posts = thePosts.map((posts) => {
          //first return if type is paid:
          if(posts.node.frontmatter.type === "paid" || posts.node.frontmatter.type === "paid-preview" || posts.node.frontmatter.type === "free") {
             return
             }

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
                return
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



        let { tags } = posts.node.frontmatter;
        //iffy in case a post misses tags.
        if (tags) {
            tags.forEach((tag) => {
                filterTags.indexOf(tag) === -1 && setFilterTags([...filterTags, tag]);
            })
        }

        let theme = "dark";
        state.toggleDark ? theme = "dark" : theme = "light";

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
            if (thePosts) { //if thePosts exists, begin filter using tag which is filtered word.
                arrayFilter = postsQuery.posts.edges.filter((post) => {
                    // console.log(filterWord)

                    return post.node.frontmatter.tags.includes(filterWord);


                })
            }

            //  console.log(arrayFilter);
            filterThePosts(arrayFilter);
        }

        return ( <div className = 'filter-tag'
            key = { tag }
            name = { tag }
            onClick = { e => runTheFilter(e) } > { tag } </div>
        )
    })

    const cleanTags = (e) => {
        filterThePosts(postsQuery.posts.edges);
    }


    const courseCards = postsQuery.courses.edges.map((course) => {
        console.log(course.node)
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
        <SetCrumbs first="Home" second="Cursos"/>
        <section className="card-container"> 
                { courseCards } 
                <hr className="hr-god" />   
        </section>
        </Layout>
    )
}

export default Cursos