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

// this action calls to the gatsby api that creates pages. 
module.exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    //here we import our templates for page creation.
    const blogTemplate = path.resolve('./src/templates/BlogTemplate.js');
    const CatTemplate = path.resolve('./src/templates/CatTemplate.js');
    const TagTemplate = path.resolve('./src/templates/TagTemplate.js');
    const proTemplate = path.resolve('./src/templates/ProCourse.js');
    //here we query gatsby's internal graphql api to source all of our markdown files.
    const res = await graphql(`
    query {
        allMarkdownRemark {
          edges{
            node {
              frontmatter {
                tags
                category
                type
                course
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    if (res.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    //Here we create a new SET to keep all of our tags extracted from posts without repeating itself
    const tagg = new Set();
    //Here we create a new set to keep all of our categories.
    const catt = new Set();



    res.data.allMarkdownRemark.edges.forEach( (edge) => {
      
      //Tags is an array inside frontmatter so we can loop it and add each individual item to the newly created tagg set.
      if(edge.node.frontmatter.course) {

        if(edge.node.frontmatter.type === "paid") {
          console.log("paid course")
          createPage({
            component: proTemplate,
            path: `/courses/pro/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        });
          return
        } else if(edge.node.frontmatter.type === "paid-preview") {
          console.log("a paid course preview")
          createPage({
            component: blogTemplate,
            path: `/courses/preview/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        });
          return
        } else {
          console.log("a free course")
          createPage({
            component: blogTemplate,
            path: `/courses/free/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        });
        }



      } else { 
        edge.node.frontmatter.tags.forEach(tag => tagg.add(tag));
        //category is a string, we want to add it into a set to make sure we dont have repeated categories. Since its just a string, we only
        //need to add it directly from the source.
        catt.add(edge.node.frontmatter.category);
          createPage({
              component: blogTemplate,
              path: `/tutoriales/${edge.node.frontmatter.category}/${edge.node.fields.slug}`,
              context: {
                  slug: edge.node.fields.slug
              }
          });
          console.log("Created page for: @@@@@@@@@  ", edge.node.fields.slug, "@@@@@@@@@")
      }

    } )

    //Spread the set to be able to apply array prototypes to it.
    const tags = [...tagg];
    //And for each item in the array create a page.
    tags.forEach((tag) => {
      createPage({
        component: TagTemplate,
        path: `/tutoriales/tag/${tag}`,
        context: {
          title: tag
        }
      })
    });
    const cats = [...catt];
    //Same as above but for categories.
    cats.forEach((cat) => {
      createPage({
        component: CatTemplate,
        path: `/tutoriales/category/${cat}`,
        context: {
          title: cat
        }
      })
    });

    //Pagination for tutorial main page.
    const posts = res.data.allMarkdownRemark.edges;
    const postsPerPage = 12;
    const numPages = Math.ceil(posts.length / postsPerPage);
    
    Array.from({ length: numPages }).forEach((_, i) => {
      console.log("page from array created")
      createPage({
        path: i === 0 ? `/tutoriales` : `/tutoriales/${i + 1}`,
        component: path.resolve("./src/templates/tutoriales.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    });



}




