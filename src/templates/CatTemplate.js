import React from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';



//export query so gatsby can grab it as a prop
export const query = graphql`
query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

console.log(query)


const CatTemplate = ({data, pageContext}) => {
   
    return (
        <Layout>
            <h1>{pageContext.category}</h1>
            asdasd
        </Layout>
    )
}

export default CatTemplate
