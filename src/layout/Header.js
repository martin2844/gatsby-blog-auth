import React, {useContext} from 'react';
import { Link, useStaticQuery } from 'gatsby';
import './header.scss';
import {GlobalStateContext, AuthContext} from '../config/context';

const Header = () => {


    const articleQuery = useStaticQuery(graphql `
    query {
        posts: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
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

    // console.log(articleQuery.posts.edges);
    //Extract all info from graphql
    const info = articleQuery.posts.edges;
    // Create a new set to map out categories without repeating them
    const categories = new Set();

    //Fill out the categories set
    info.forEach((post) => {
        categories.add(post.node.frontmatter.category);
    })

    //convert to array to be able to map
    let newCat = [...categories];
    //Sort by alphabetical order
    newCat.sort((a, b) => a.localeCompare(b));
 

    //For each category, search the posts and create a unique tag combo, which will fill out the cat menu.
    let display = newCat.map((cat) => {
        //Create a new set to get all available tags without repeating for a category.
        console.log(cat);
        const tags = new Set();
        //Filter the posts for this category to extract the tags
        let onlyThisCatsPost = info.filter(node => node.node.frontmatter.category === cat);
        //Run through posts and extract all of the tags into the new set
        onlyThisCatsPost.forEach((post) => {
            post.node.frontmatter.tags.forEach(tag => tags.add(tag));
        });
        //Now with this we can map the newCat Array into JSX for displaying it afterwards.
        let mapTag = [...tags];
        let mapping = mapTag.map(tag => <Link key={tag} to={`/tag/${tag}`}  className="tag"><span >{tag}</span></Link>)
        return(
          <div key={cat} className="topic-container">
              <div className="cat-container">
                  <Link to={`/category/${cat}`}><h4>{cat}</h4></Link>
                  <hr/>
               </div>
            <div className="tag-container">
                 {mapping}
            </div>

               
          </div>
        )
    });

    const state = useContext(GlobalStateContext) || {
        user: "hello world"
        }

        let currentUser;
        let test = useContext(AuthContext);
        if(test) {
            currentUser = test.currentUser;
        }



    return (
        <section className="header-main">
            <div className="top-bar flex-row-center">
                 <div className="toggle-mode"></div>
                 {currentUser ?
                 <div>Bienvenido, <Link to="/profile">{currentUser.displayName}</Link></div>
                 :
                 <div>¿Tenés una cuenta? <Link to="/login"> Registrate</Link> o <Link to="/login"> Logueate</Link></div>
                 }
            </div>
            <div className="center-bar">
                  <div className="Logo flex-row-center">
                        <Link className="flex-row-center" to="/">
                        <h2 style={{color: "#6A635A"}}>codigo</h2>
                        <h2 style={{color: "#89837A"}}>Mate</h2>
                        </Link>
                  </div>
                  <div className="Social">

                  </div>
            </div>
            <div className="bottom-bar">
                <ul className="flex-row-center no-pad">
                    <li className="tutorial-link">
                        <Link to="/tutoriales">Tutoriales</Link>
                        <div className="trickster"></div>
                        <ul className="dropdownNav">
                            {display}
                        </ul>
                    </li>
                    <li>
                      <Link to="/tutoriales">Contacto</Link>
                    </li>
                    <li>
                      <Link to="/tutoriales">Acerca de</Link>
                    </li>
                </ul>

            </div>
        </section>
    )
}

export default Header
