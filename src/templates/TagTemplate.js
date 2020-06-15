import React from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';
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
          }
        }
      }
    }
  }
`




const TagTemplate = ({data, pageContext}) => {
    console.log(data)
    return (
        <Layout>
               <h1 className="catntag-title" >{pageContext.title}</h1>
            asdasd
        </Layout>
    )
}

export default TagTemplate
