const path = require('path');



module.exports.onCreateNode = ({node, actions}) => {
    const {createNodeField} = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
    
}

module.exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const blogTemplate = path.resolve('./src/templates/BlogTemplate.js');
    const catTemplate = path.resolve('./src/templates/CatTemplate.js');
    const res = await graphql(`
    query {
        allMarkdownRemark {
          edges{
            node {
              frontmatter {
                tags
                category
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `)
    res.data.allMarkdownRemark.edges.forEach( (edge) => {
        createPage({
            component: blogTemplate,
            path: `/tutorial/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        });
        createPage({
          component:  catTemplate,
          path: `category/${edge.node.frontmatter.category}`,
          context: {
            category: edge.node.frontmatter.category
          }
        })
    } )

}



