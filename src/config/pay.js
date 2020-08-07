import axios from 'axios';
const pay = (props) => {
    const {name, price, unit, id, img} = props;

    let course = {
        name: name,
        price: price,
        unit: unit || 1,
        id: id,
        img: img || "https://eloquentjavascript.net/img/chapter_picture_1.jpg"
    }


    console.log("initializing")
    // el URL se puede reemplazar por api-codigomate
        axios.post("http://localhost:5000/api/payment/new/", course).then(response => {
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

export default pay;