import React from 'react';
import Layout from '../layout/Layout';
import {graphql, Link} from 'gatsby';



//export query so gatsby can grab it as a prop
export const query = graphql`
query($title: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$title] } } }
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




const CatTemplate = ({data, pageContext}) => {
    console.log(data)
    return (
        <Layout>
            <h1>{pageContext.title}</h1>
            asdasd
        </Layout>
    )
}

export default CatTemplate
