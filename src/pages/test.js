import React from 'react'
import axios from 'axios'





const Test = () => {

    const object = {
        help: "help"
    }
    console.log(process.env.GATSBY_PRODUCTION)

    const sendTest = () => {
        if(process.env.GATSBY_PRODUCTION === "false") {
            axios.post("/api/sendmail/codigomate/", object).then(response => console.log(response));
            // axios.get("/api/sendmail/").then(res => console.log(res));
            console.log("testing");
        } else {
            console.log("produ");
            axios.post("/heroku/sendmail/codigomate");
        }
       
    } 

    let course = {
        name: "curso de prueba",
        price: 200,
        unit: 1,
        img: "https://eloquentjavascript.net/img/chapter_picture_1.jpg"
    }

    const sendTest2 = () => {
        if(process.env.GATSBY_PRODUCTION === "false") {
            axios.post("/api/payment/new/", course).then(response => console.log(response));
        } else {
            axios.post("http://www.api.codigomate.com/api/payment/new/", course).then(response => console.log(response));
        }
       
    } 



    return (
        <div>
            <button onClick={sendTest}>
                Press to send test to api
            </button>
            <div>
            <button onClick={sendTest2}>
                Press to send test to payment api
            </button>
            </div>
        </div>
    )
}

export default Test
