import React from 'react';
import { graphql, Link } from "gatsby";
import StringSimilarity from "string-similarity";
import Layout from '../layout/Layout';
import Button from '../layout/Button';

export const pageQuery = graphql`
  {
    allSitePage(
      filter: { path: { nin: ["/dev-404-page", "/404", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`


const FourOFour = ({ location, data }) => {
    const pages = data.allSitePage.nodes.map(({ path }) => path)
    const pathname = location.pathname
    const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch
    function renderContent() {
        return result.rating > 0.6 ? (
          <>
            <h2>
              Probablemente estabas buscando{" "}
              <Link to={result.target} className="is-special-blue">
                {result.target}
              </Link>
            </h2>
            <h3>
            Sinó volvé al home
            </h3>
          </>
        ) : (
          <>
            <h1 className="is-hero-menu margin-3-t is-grey margin-3-b">
              Estás perdido
            </h1>
            <h3 className=" is-grey margin-5-b">
              Apretá el botón para volver al home
            </h3>
          </>
        )
      }
    return (
        <Layout>
            <h3>
              No se encontró la página
            </h3>
            {renderContent()}
            <Link
              to={"/"}
            >
              <Button to="/" color="green"> 
                Volver al inicio
              </Button>
            </Link>
        </Layout>
    )
}

export default FourOFour
