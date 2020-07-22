import React, {useState, useEffect} from 'react';
import Layout from "../../layout/Layout";
import Title from '../../layout/title';
import SetCrumbs from '../../config/SetCrumbs';
import Axios from 'axios';
import RoundSpinner from '../../layout/RoundSpinner';
import Alert from '../../layout/Alert';

const Contacto = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    })

    

    const onSubmit = (e) => { 
        e.preventDefault();
        setLoading(true);
        if(process.env.GATSBY_PRODUCTION === "false") {
        Axios.post('/api/sendmail/codigomate/', formData).then((res) => {
            // console.log(res)
        })
        .then(() => {
            setTimeout(() => {
                setLoading(false);
                setSent(true);
            }, 200);
        })
        .catch(err => setError(err));
        } else {
            Axios.post('http://www.api.codigomate.com/api/sendmail/codigomate', formData).then((res) => {
                // console.log(res);
            }).then(() => {
                setTimeout(() => {
                    setLoading(false);
                    setSent(true);
                }, 200);
            })
            .catch(err => setError(err));
        }
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // console.log(formData);
    const sentOrNot = () => {
     if(sent) {
         return "Enviado";
     }  else {
         return "Enviar";
     }
    }

    return (
        <Layout>
            <section className="box min">
            <SetCrumbs second="Acerca" third="Contacto" />
            <Title title="Contacto" />
            <h3>Si tenes una duda sobre algún tutorial, querés saber más sobre las clases, o cursos dejame un mensaje</h3>
            
            <form className="uniqueNewYork" onSubmit={e => onSubmit(e)}>
                <label>Nombre</label>
                <input required onChange={e => onChange(e)} type="text" name="nombre" id="nombre"/>
                <label>Email</label>
                <input required onChange={e => onChange(e)} type="email" name="email" id="email"/>
                <label>Mensaje</label>
                <textarea required onChange={e => onChange(e)} type="text" name="mensaje" id="mensaje"/>
                <div></div>
                <div style={{justifySelf: "end"}}><button disabled={sent ? true : false} className={sent ? "sent" : null} >{!loading ? sentOrNot() : <RoundSpinner/>}</button></div>
            </form>
            
            {sent ? <Alert text={`Gracias por enviar tu mensaje ${formData.nombre}, será contestado a la brevedad`} success/> : null}
            {error ?  <Alert text={`Hubo un error "@@ ${error} @@", probá de nuevo mas tarde`} fail/> : null}
            </section>
        </Layout>
    )
}

export default Contacto
