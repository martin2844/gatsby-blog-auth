import React from 'react';
import Layout from '../layout/Layout';
import { Link, graphql, useStaticQuery } from 'gatsby';


const Category = () => {

    const tagQuery = useStaticQuery(graphql`
    {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }    
    `)
    //Create new categories set.
    const tags = new Set();
    tagQuery.allMarkdownRemark.edges.forEach(tag => {
       tag.node.frontmatter.tags.forEach(tagy => tags.add(tagy));
    })
    const tagMap = [...tags].map(tag => {
        return(
        <Link className="categoryMap" key={tag} to={`/tag/${tag}`}>{tag.slice(0,1).toUpperCase()}{tag.substring(1,tag.length)}</Link>
        )
    })


    return (
        <Layout>
        <h5 className="bread-crumbs"><Link to="/tutoriales"> Tutoriales </Link>   /  TAG </h5>
        <div className="tag-container">
        {tagMap}
        </div>
    
        </Layout>
    )
}

export default Category
