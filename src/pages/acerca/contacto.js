import React, {useState, useEffect} from 'react';
import Layout from "../../layout/Layout";
import Title from '../../layout/title';
import SetCrumbs from '../../config/SetCrumbs';
import Axios from 'axios';


const Contacto = () => {

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    })

    const onSubmit = (e) => { 
        e.preventDefault();
        if(process.env.GATSBY_PRODUCTION === "false") {
        Axios.post('/api/sendmail/codigomate/', formData).then(res => console.log(res)).catch(err => console.error(err));
        } else {
            Axios.post('http://www.api.codigomate.com/api/sendmail/codigomate', formData).then(res => console.log(res)).catch(err => console.error(err));

        }
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    console.log(formData);

    return (
        <Layout>
            <section className="box">
            <SetCrumbs second="Acerca" third="Contacto" />
            <Title title="Contacto" />
            <h3>Si tenes una duda sobre algún tutorial, querés saber más sobre las clases, o cursos dejame un mensaje</h3>
            
            <form className="uniqueNewYork" onSubmit={e => onSubmit(e)}>
                <label>Nombre</label>
                <input onChange={e => onChange(e)} type="text" name="nombre" id="nombre"/>
                <label>Email</label>
                <input onChange={e => onChange(e)} type="email" name="email" id="email"/>
                <label>Mensaje</label>
                <textarea onChange={e => onChange(e)} type="text" name="mensaje" id="mensaje"/>
                <div></div>
                <button>Enviar</button>
            </form>
            </section>
        </Layout>
    )
}

export default Contacto
