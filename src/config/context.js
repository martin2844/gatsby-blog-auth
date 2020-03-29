import React, { useState, useEffect }  from "react"
import app from './base';


export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();
export const AuthContext = React.createContext();




// From global state reducers
const initialState = {
    toggleDark: true
}


function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return {
        ...state,
        toggleDark: !state.toggleDark
       
      }
    }
    case "CHANGE_ANIMATION": {
        return {
          ...state,
          
        }
      }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
      app.auth().onAuthStateChanged(setCurrentUser);
      console.log(app.auth().onAuthStateChanged(setCurrentUser))
  }, []);

  return (
      <AuthContext.Provider value={{currentUser}}>
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
    </AuthContext.Provider>
  )
}

export default GlobalContextProvider