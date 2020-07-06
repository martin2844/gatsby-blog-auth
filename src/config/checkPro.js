
import app from '../config/base.js';
const db = app.firestore();



export const checkPro = async (currentUser) => {
    if(currentUser){
                  //get individual username entry
    const usernameRef = await db.collection('usernames').doc(currentUser.email).get();
    const usernameEntry = usernameRef.data();
    try {
        if(usernameEntry.pro === undefined) {
            await db.collection("usernames").doc(currentUser.email).set({
                pro: false
            }, { merge: true });
            console.log("@@@@@@@PRO MODULE@@@@@@@ Check PRO HOOK - Pro was not defined in this user!");
            return false
        } else {
            console.log("@@@@@@@PRO MODULE@@@@@@@ Pro is already defined in this user!");
            if(usernameEntry.pro !== true) {
                console.log("@@@@@@@PRO MODULE@@@@@@@ This user is not pro");
                return false;
            } else {
                console.log("@@@@@@@PRO MODULE@@@@@@@ This user is pro confirmed");
                return true;
            }
        }
      
    } catch (error) {
        console.log(error); 
    }


    }


}