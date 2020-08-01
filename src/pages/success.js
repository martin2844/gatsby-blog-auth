import React from 'react'
import { useLocation } from '@reach/router';
import queryString from 'query-string';


const Success = () => {

    const location = useLocation();
    console.log(location);
    const query = queryString.parse(location.search);
    // Si esta approved es que el pago paso, 
    //Habria que diseñar que cuando alguien va a comprar un curso, se genere un token, y que eso vaya en algun lado, y si vuelve el mismo token, o esto quizas lo hace MP
    // ahi se pase el status a aprovado en la B.D.D.
    // Quizas el dato clave es la referencia de negocio : external_reference
    console.log(query)
    return (
        <div>
            success
        </div>
    )
}

export default Success
