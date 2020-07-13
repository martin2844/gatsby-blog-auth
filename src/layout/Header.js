import React, {useContext, useEffect} from 'react';
import { Link, useStaticQuery } from 'gatsby';
import './header.scss';
import app from '../config/base.js';
import {GlobalStateContext, AuthContext, GlobalDispatchContext} from '../config/context';
import { globalHistory as history } from '@reach/router';
import Img from 'gatsby-image';

const Header = () => {
  // First we will define our dispatch function to hoist crumbs to global state.
  // Crumbs are hoisted on global state because its the only easy way to access the fourth and fifth crumbs if we needed them
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext) || {
    toggleDark: true,
    crumbs: {
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null
    }
  }

  // Location and Pathname will give us the actual path we see in our browser, useful because the path follows the crumbs
  const { location } = history;
  const { pathname } = location;
  console.log(state.crumbs)
    // use effect, to change crumbs only when location.pathname changes
    useEffect(() => {
      // console.log("location changed");
      // console.log(location.pathname);
      //Regex for number check on pagination of tut page
      const reg = /\/tutoriales\/\d+/;
      // @@@@@@@@@@@@@@ BEGIN CRUMB LOGIC 
        if(location.pathname.indexOf("tag") > -1) {
            // Si el location tiene Tag, estamos en un tag page, o en el tag page general
           if(location.pathname === "/tutoriales/tag/") { 
            dispatch({type: "CRUMB_SET", payload: {
              first: "Home",
              second: "Tutoriales",
              third: "Tag",
              fourth: null,
              fifth: null
            }});
           } else {
            dispatch({type: "CRUMB_SET", payload: {
              first: "Home",
              second: "Tutoriales",
              third: "Tag",
              fourth: "",
              fifth: null
            }});
           }
       
        } else if(location.pathname.indexOf("category") > -1) {
          // Si el location tiene category, estamos o dentro de un category page general, o dentro del cateogry specific
            if(location.pathname === "/tutoriales/category/") {
              dispatch({type: "CRUMB_SET", payload: {
                first: "Home",
                second: "Tutoriales",
                third: "Category",
                fourth: null,
                fifth: null
              }});
            } else {
              dispatch({type: "CRUMB_SET", payload: {
                first: "Home",
                second: "Tutoriales",
                third: "Category",
                fourth: "",
                fifth: null
              }});
            }
       
        } else if(location.pathname === "/tutoriales/" || location.pathname === "/tutoriales" ) {
          // Si el location es solo tutoriales, estamos en la pagina general
          dispatch({type: "CRUMB_SET", payload: {
            first: "Home",
            second: "Tutoriales",
            third: null,
            fourth: null,
            fifth: null
          }});
            
        } else if  (reg.test(location.pathname)){
          dispatch({type: "CRUMB_SET", payload: {
            first: "Home",
            second: "Tutoriales",
            third: null,
            fourth: null,
            fifth: null
          }});

        } else if (location.pathname.indexOf("tutoriales") > -1 && location.pathname.indexOf("category") === -1 && location.pathname.indexOf("tag") === -1){
          // si el location tiene tutoriales, pero no tiene category y tag estamos en un tutorial
          dispatch({type: "CRUMB_SET", payload: {
            first: "Home",
            second: "Tutoriales",
            third: "Category",
            fourth: "cat q va",
            fifth: "tut q va"
          }});

        } else if (location.pathname === "/") {
          dispatch({type: "CRUMB_SET", payload: {
            first: null,
            second: null,
            third: null,
            fourth: null,
            fifth: null
          }});
        } else {
          dispatch({type: "CRUMB_SET", payload: {
            first: null,
            second: null,
            third: null,
            fourth: null,
            fifth: null
          }});
        }
     // @@@@@@@@@@@@@@ END CRUMBS LOGIC 
    }, [pathname])

    // Begin static query in order to get all of the tags and categories from blog posts to generate a menu
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
        images: allFile(filter: {sourceInstanceName: {eq: "layout-img"}}) {
          edges {
            node {
              childImageSharp {
                fixed(width: 55) {
                  ...GatsbyImageSharpFixed
                  originalName
                }
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
        // console.log(cat);
        const tags = new Set();
        //Filter the posts for this category to extract the tags
        let onlyThisCatsPost = info.filter(node => node.node.frontmatter.category === cat);
        //Run through posts and extract all of the tags into the new set
        onlyThisCatsPost.forEach((post) => {
            post.node.frontmatter.tags.forEach(tag => tags.add(tag));
        });
        //Now with this we can map the newCat Array into JSX for displaying it afterwards.
        let mapTag = [...tags];
        let mapping = mapTag.map(tag => <Link key={tag} to={`/tutoriales/tag/${tag}`}  className="tag"><span >{tag}</span></Link>)
        return(
          <div key={cat} className="topic-container">
              <div className="cat-container">
                  <Link to={`/tutoriales/category/${cat}`}><h4>{cat}</h4></Link>
                  <hr/>
               </div>
            <div className="tag-container">
                 {mapping}
            </div>

               
          </div>
        )
    });


        // Declare an empty let to store our firebase user.
        let currentUser;
        // Get user from global context, which gets from firebase config
        let test = useContext(AuthContext);
        // iffy because on first render context is not loaded and test is undefined
        if(test) {
            currentUser = test.currentUser;
        }
    
    const profileTabs = (
      <>
      <span className="profile-span"><Link to="/perfil">Mi Perfil</Link></span>
      <span className="profile-span"><Link to="/perfil/cursos">Cursos</Link></span>
      <span className="profile-span"><Link to="/perfil/editar">Editar Perfil</Link></span>
      <span className="profile-span"><button onClick={() => app.auth().signOut()}>Salir</button></span>
      </>
    )

    // Define a const which will contain the crumbs bar, which has some logic to define wether crumbs exists or not.
    const subBottomBar = (
      <div className="sub-bottom-bar">
          {state.crumbs.first && state.crumbs.first !== "Perfil" ? <span><Link to="/">{state.crumbs.first}</Link></span> : null}
          {state.crumbs.second ? <span className="separator"> {">"} </span> : null}
          {state.crumbs.second && !state.crumbs.third ? <span>{state.crumbs.second}</span> : null}
          {state.crumbs.second && state.crumbs.third ? <span><Link to={`${state.crumbs.second.toLowerCase()}`}>{state.crumbs.second}</Link></span> : null}
          {state.crumbs.third ? <span className="separator"> {">"} </span> : null}
          {state.crumbs.third && !state.crumbs.fourth ? <span>{state.crumbs.third}</span> : null}
          {state.crumbs.third && state.crumbs.fourth ? <span><Link to={`${state.crumbs.second.toLowerCase()}/${state.crumbs.third.toLowerCase()}`}>{state.crumbs.third}</Link></span> : null}
          {state.crumbs.fourth ? <span className="separator" > {">"} </span> : null}
          {state.crumbs.fourth && !state.crumbs.fifth ? <span>{state.crumbs.fourth}</span> : null}
          {state.crumbs.fourth && state.crumbs.fifth ? <span><Link to={`${state.crumbs.second.toLowerCase()}/${state.crumbs.third.toLowerCase()}/${state.crumbs.fourth}`}>{state.crumbs.fourth}</Link></span> : null}
          {state.crumbs.fifth ? <span className="separator" > {">"} </span> : null}
          {state.crumbs.fifth ? <span>{state.crumbs.fifth}</span> : null}
          {state.crumbs.first === "Perfil" && profileTabs }
      </div>
    )
    const logosrc = articleQuery.images.edges.filter(img => img.node.childImageSharp.fixed.originalName === "codigomate.png");
    const logo = logosrc[0].node.childImageSharp.fixed;

    // Begin MAIN JSX return
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
                        <Img fixed={logo} style={{marginTop: "-5px", marginRight: "10px"}}/>
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
                        {state.crumbs.second === "Tutoriales" || state.crumbs.first === null ?
                        <div className={state.crumbs.first ? "trickster crumbs" : "trickster"}></div>
                        :
                        null
                        }
                      
                        <ul className="dropdownNav">
                            {display}
                        </ul>
                    </li>
                    <li>
                      <Link to="/cursos">Cursos</Link>
                    </li>
                    <li>
                      <Link to="/acerca">Acerca de</Link>
                    </li>
                    {currentUser && 
                    <li>
                      <Link to="/perfil">Perfil</Link>
                      {state.crumbs.first === "Perfil" ?
                        <div className={state.crumbs.first ? "trickster profile crumbs" : "trickster profile"}></div>
                        :
                        null
                        }
                      
                      
                    </li>
                      }
                </ul>

            </div>
            {state.crumbs.first ? subBottomBar : null}
        </section>
    )
}

export default Header
