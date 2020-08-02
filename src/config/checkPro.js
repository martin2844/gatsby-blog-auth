
import app from '../config/base.js';
const db = app.firestore();



export const checkPro = async (currentUser, course) => {
    if(currentUser){
            //get individual username entry
            const usernameRef = await db.collection('usernames').doc(currentUser.email).get();
            const usernameEntry = usernameRef.data();
            try {
                if(usernameEntry.pro === undefined) {
                    await db.collection("usernames").doc(currentUser.email).set({
                        pro: false,
                        courses: []
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

                            //If we passed the course parameter lets check if the course we are passing is in the user object
                            if(course) {
                                    //Filter out our courses object inside the usernameRef
                                let theCheck = usernameEntry.courses.filter((courseToCheck) => {
                                    return courseToCheck === course;
                                });
                                console.log(theCheck);
                                //If it has length, then the course was found
                                if(theCheck.length) {
                                    return true;
                                } else {
                                    //If no length this user does not have the course passed onto parameters
                                    return false;
                                }

                            
                            }
                        return usernameEntry.courses;
                    }
                }
            
    } catch (error) {
        console.log(error); 
    }


    }


}