/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require('path');

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
      
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-remark-relative-images',
        `gatsby-remark-copy-linked-files`,
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 750,
            linkImagesToOriginal: false
          }
        },
        {
          resolve: `gatsby-remark-copy-linked-files`,
          options: {
            destinationDir: `path/to/dir`,
            ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
          }
        }
      ]
    }
  }


]
}
