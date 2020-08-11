import axios from 'axios';
import app from '../config/base.js';




const pay = async (props) => {
    const {name, price, unit, id, img, email} = props;
    let buyer;
    console.log(email);
    
    const getBuyerUser = async () => {
        const db = app.firestore();
        const usernameRef = await db.collection('usernames').doc(email).get();
        const usernameEntry = usernameRef.data();
        return usernameEntry?.personal
    }

    // get user info? 
    buyer = await getBuyerUser();
    console.log(buyer);
    
    // const buyer = getbuyeruserinfo();


    
    // //First get buyer info @ username ref from profile.
    // let buyerUser = await getBuyerUser();
    // console.log(buyerUser);
    // //Then check if buyer info is complete.
    // if(!buyerUser?.address){
    //     console.log("no address")
    //     return false
    //     // What happens when return of error.
    // } 
    // //If complete allow proceedure.

    // //If not complete return error, userInfo Must be complete, on front end redirect to profile info to complete
    // //Or redirect to special checkout page where there will be a grid, on left side there will be the info to complete,
    // //On right side there will be a small box with the course, below the price, and after proceed to payment.
    
    

  
    let infoToSend = {
        name: name,
        price: price,
        unit: unit || 1,
        id: id,
        img: img || "https://eloquentjavascript.net/img/chapter_picture_1.jpg",
        buyer: {
            name: buyer.name,
            surname: buyer.sirname,
            email: email || "john@john.com",
            phone: {
                area: "",
                number: buyer.phone || ""
            },
            address: {
                zip: buyer.streetNumber  || "",
                streetName: buyer.streetName || "",
                number: buyer.streetNumber || ""

            }
        }
    }

    console.log(infoToSend)
    console.log("initializing")
    // el URL se puede reemplazar por api-codigomate
        axios.post("http://localhost:5000/api/payment/new/", infoToSend).then(response => {
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