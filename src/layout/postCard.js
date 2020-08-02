import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './postCard.scss';



const PostCard = (props) => {
    const {slug, image, date, sinopsis, title, category, course, type} = props
    console.log(course);

    let courseCard = (
        <article className="postcard-main">
        <div className="postcard-img">
        {type === "free" ?
        <Link to={`/cursos/free/${slug}`} ><Img fixed={image} /></Link>
        :
        <Link to={`/cursos/preview/${slug}-preview`} ><Img fixed={image} /></Link>
        }
        
        </div>
        {type !== "free" ? <h3 className="proverlay">PRO</h3> : null}
            <div className="postcard-content course">
                <div className="card-content course">
                    {type === "free" 
                    ? 
                    <Link to={`/cursos/free/${slug}`} ><h3>{title}</h3></Link> 
                    : 
                    <Link to={`/cursos/preview/${slug}-preview`} ><h3>{title}</h3></Link>
                    }
                        <p>{sinopsis}</p>
                </div>
            </div>
        
    </article>
    )

    let tutCard = (
        <article className="postcard-main">
        <div className="postcard-img"><Link to={`/tutoriales/${category}/${slug}`} ><Img fixed={image} /></Link></div>
            <div className="postcard-content">
                <div className="card-meta"><Link to={`/tutoriales/category/${category}`}>{category}</Link> <span> / {date} </span></div>
                <div className="card-content">
                        <Link to={`/tutoriales/${category}/${slug}`} ><h3>{title}</h3></Link>
                        <p>{sinopsis}</p>
                </div>
            </div>
        
    </article>
    )
    return (
        <>
        {course ? courseCard : tutCard}
        </>

    )
}

export default PostCard
