import React from 'react';
import Layout from '../../layout/Layout';
import { Link, graphql, useStaticQuery } from 'gatsby';


const Category = () => {

    const categoryQuery = useStaticQuery(graphql`
    {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
      }    
    `)
    //Create new categories set.
    const categories = new Set();
    categoryQuery.allMarkdownRemark.edges.forEach(cat => {
        categories.add(cat.node.frontmatter.category);
    })
    const categoryMap = [...categories].map(cat => {
        return(
        <Link className="categoryMap" key={cat} to={`/tutoriales/category/${cat}`}>{cat.slice(0,1).toUpperCase()}{cat.substring(1,cat.length)}</Link>
        )
    })


    return (
        <Layout>
        <h5 className="bread-crumbs"><Link to="/tutoriales"> Tutoriales </Link>   /  CATEGORIAS </h5>
         {categoryMap}
        </Layout>
    )
}

export default Category
