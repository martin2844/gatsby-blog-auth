import React, { useState, useEffect }  from "react"
import app from './base';

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();
export const AuthContext = React.createContext();



// From global state reducers
const initialState = {
    toggleDark: true,
    crumbs: {
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null
    },
    course: false
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
    case "CRUMB_SET": {
      return {
        ...state,
        crumbs: action.payload
      }
    }
    case "CRUMB_1_SET": {
      return {
        ...state,
        crumbs: {
          ...state.crumbs,
          first: action.payload
        }
      }
    }
    case "CRUMB_2_SET": {
      return {
        ...state,
        crumbs: {
          ...state.crumbs,
          second: action.payload
        }
      }
    }
    case "CRUMB_3_SET": {
      return {
        ...state,
        crumbs: {
          ...state.crumbs,
          third: action.payload
        }
      }
    }
    case "CRUMB_4_SET": {
      return {
        ...state,
        crumbs: {
          ...state.crumbs,
          fourth: action.payload
        }
      }
    }
    case "CRUMB_5_SET": {
      return {
        ...state,
        crumbs: {
          ...state.crumbs,
          fifth: action.payload
        }
      }
    }
    case "HOIST_COURSE": {
      return {
        ...state,
        course: {
          ...action.payload
        }
      }
    }
    case "CLEAR_COURSE": {
      return {
        ...state,
        course: false
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