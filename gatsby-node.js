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

      
    const tagg = new Set();
 
    res.data.allMarkdownRemark.edges.forEach( (edge) => {
      edge.node.frontmatter.tags.forEach(tag => tagg.add(tag));
        createPage({
            component: blogTemplate,
            path: `/tutorial/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        });
        createPage({
          component:  catTemplate,
          path: `/category/${edge.node.frontmatter.category}`,
          context: {
            title: edge.node.frontmatter.category
          }
        })
    } )

    const tags = [...tagg];
    tags.forEach((tag) => {
      createPage({
        component: catTemplate,
        path: `/tag/${tag}`,
        context: {
          title: tag
        }
      })
    });

}




