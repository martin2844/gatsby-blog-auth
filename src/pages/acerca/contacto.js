import React from 'react';
import Layout from "../../layout/Layout";
import Title from '../../layout/title';
import SetCrumbs from '../../config/SetCrumbs';

const Contacto = () => {
    return (
        <Layout>
            <SetCrumbs second="Acerca" third="Contacto" />
            <Title title="Contacto" />
        </Layout>
    )
}

export default Contacto
