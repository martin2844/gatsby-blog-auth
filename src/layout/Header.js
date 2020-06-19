import React, {useContext, useState, useEffect} from 'react';
import { Link, useStaticQuery } from 'gatsby';
import './header.scss';
import {GlobalStateContext, AuthContext} from '../config/context';
import { globalHistory as history } from '@reach/router';

const Header = () => {

  const { location } = history;
  const { pathname } = location;
  const [crumbs, setCrumbs] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null
  })
    useEffect(() => {
      console.log("location changed");
      console.log(location.pathname);
        //define Bars from locations
        let firstBar = pathname.indexOf("/");
        let lastBar = pathname.lastIndexOf("/");
  
      
        if(location.pathname.indexOf("tag") > -1) {
            // Si el location tiene Tag, estamos en un tag page, o en el tag page general
           if(location.pathname === "/tutoriales/category") { 
            setCrumbs({
              first: "Home",
              second: "Tutoriales",
              third: "Tag",
              fourth: null,
              fifth: null
            })
           } else {
            setCrumbs({
              first: "Home",
              second: "Tutoriales",
              third: "Tag",
              fourth: "Tag que va",
              fifth: null
            })
           }
       
        } else if(location.pathname.indexOf("category") > 1) {
          // Si el location tiene category, estamos o dentro de un category page general, o dentro del cateogry specific
            if(location.pathname === "/tutoriales/category") {
              setCrumbs({
                first: "Home",
                second: "Tutoriales",
                third: "Category",
                fourth: null,
                fifth: null
              })
            } else {
              setCrumbs({
                first: "Home",
                second: "Tutoriales",
                third: "Category",
                fourth: "La categoria que va",
                fifth: null
              })
            }
       
        } else if(location.pathname === "/tutoriales") {
          // Si el location es solo tutoriales, estamos en la pagina general
                  setCrumbs({
                    first: "Home",
                    second: "Tutoriales",
                    third: null,
                    fourth: null,
                    fifth: null
                  })
            
        } else if (location.pathname.indexOf("tutoriales") > -1 && location.pathname.indexOf("category") === -1 && location.pathname.indexOf("tag") === -1){
          // si el location tiene tutoriales, pero no tiene category y tag estamos en un tutorial
          setCrumbs({
            first: "Home",
            second: "Tutoriales",
            third: "Category",
            fourth: "La categoria que va",
            fifth: "El titulo q va"
          })

        }
       

    }, [location])
    console.log(crumbs);
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

    const state = useContext(GlobalStateContext) || {
        user: "hello world"
        }

        let currentUser;
        let test = useContext(AuthContext);
        if(test) {
            currentUser = test.currentUser;
        }

    const subBottomBar = (
      <div className="sub-bottom-bar">
          {crumbs.first ? <span><Link to="/">{crumbs.first}</Link></span> : null}
          {crumbs.second ? <span className="separator"> {">"} </span> : null}
          {crumbs.second ? <span>{crumbs.second}</span> : null}
          {crumbs.third ? <span className="separator"> {">"} </span> : null}
          {crumbs.third ? <span>{crumbs.third}</span> : null}
          {crumbs.fourth ? <span className="separator" > {">"} </span> : null}
          {crumbs.fourth ? <span>{crumbs.fourth}</span> : null}
          {crumbs.fifth ? <span className="separator" > {">"} </span> : null}
          {crumbs.fifth ? <span>{crumbs.fifth}</span> : null}
      </div>
    )

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
            {crumbs.first ? subBottomBar : null}
        </section>
    )
}

export default Header
