import React, { useEffect, useState } from 'react'
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
            axios.post("https://api-codigomate.herokuapp.com/api/sendmail/codigomate");
        }
       
    } 

    let course = {
        name: "ESTA FUNCIONANDO HDP",
        price: 200,
        unit: 1,
        img: "https://eloquentjavascript.net/img/chapter_picture_1.jpg"
    }


    //FETCH TEST

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api-codigomate.herokuapp.com/api/payment/new'
        const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Origin': 'application/json',
        },
        body: JSON.stringify(course)

};


    const sendTest2 = () => {
        console.log("initializing")
            axios.post("https://api-codigomate.herokuapp.com/api/payment/new/", course).then(response => {
                console.log(response.data);
                if(window) {
                    window.location.href = response.data;
                } 
               
        
            }).catch(err => console.error(err));
        // fetch("https://cors-anywhere.herokuapp.com/https://api-codigomate.herokuapp.com/api/payment/new/", options)
        // .then(response => {
        //    console.log(response);
        //     } )
    
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
        <div>
        </div>
    </div>
    )
}

export default Test
