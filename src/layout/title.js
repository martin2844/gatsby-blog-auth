import React from 'react'

const Title = ({title, subtitle,sub1, sub2}) => {
    return (
        <section className="title">
            {title ? <h1>{title}</h1> : null}
            {subtitle ? <h4>{subtitle}</h4> : null}
            {sub1 ? <h5>{sub1}</h5> : null}
            {sub2 ?  <p>{sub2}</p> : null}
            
            
           
            
        </section>
    )
}

export default Title
