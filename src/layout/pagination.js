import React from 'react';
import { Link } from 'gatsby';

const Pagination = ({currentPage, totalPages}) => {

    let pagesArray = [];

    for(let i = 0; i < totalPages; i++) {
        pagesArray.push(i + 1);
    }

    console.log(pagesArray);
    let numbers = pagesArray.map((no) => {
        if(no === 1) {
            return(
                <span>
                     {no === currentPage ? <React.Fragment>{no}</React.Fragment> : <Link to={`/tutoriales/`}>{no}</Link>}
                </span>
            )
        } else {
            return(
                <span>
                    {no === currentPage ? <React.Fragment>{no}</React.Fragment> : <Link to={`/tutoriales/${no}`}>{no}</Link>}
                </span>
            )
        }
  
    })

    return (
        <div className="pagination-container">
            {numbers}
        </div>
    )
}

export default Pagination
