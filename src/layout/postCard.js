import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './postCard.scss';



const PostCard = (props) => {
    const {slug, image, date, sinopsis, title, category} = props
    return (
        <article className="postcard-main">
            <div className="postcard-img"><Img fixed={image} /></div>
                <div className="postcard-content">
                    <div className="card-meta"><Link to={`/category/${category}`}>{category}</Link> <span> / {date} </span></div>
                    <div className="card-content">
                            <Link to={`/tutoriales/${category}/${slug}`} ><h3>{title}</h3></Link>
                            <p>{sinopsis}</p>
                    </div>
                </div>
            
        </article>
    )
}

export default PostCard
