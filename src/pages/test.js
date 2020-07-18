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
            console.log("testing")
        } else {
            console.log("produ")
            axios.post("/heroku/sendmail/codigomate")
        }
       
    } 


    return (
        <div>
            <button onClick={sendTest}>
                Press to send test to api
            </button>
        </div>
    )
}

export default Test
