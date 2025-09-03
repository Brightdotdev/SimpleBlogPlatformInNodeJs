import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { initialPrefDataState, PrefDataReducer } from '../Utils/Reducer'
import Cookies from 'js-cookie'
const InfoContext = createContext(null)



const InfoComponent = ({children}) => {
    const [state, dispatch] = useReducer(PrefDataReducer, initialPrefDataState, (initialData ) =>{
        const UpdatedState = Cookies.get(import.meta.env.VITE_PREF_DATA_COOKIE);
        return UpdatedState ? JSON.parse(UpdatedState) : initialData
    })

    const setTheme = () => {
        dispatch({type: 'SET_THEME'})}


    const setMessage = (message) => {
        dispatch({type: 'SET_MESSAGE'}, {payload: message})}
     
    const setError = (error) => {
        dispatch({type: 'SET_ERROR'}, {payload: error})
    }

    const clearMessage = (id) => {
        dispatch({type: 'CLEAR_MESSAGE_BY_ID'}, {payload: id})
    }
    const clearError = (id) => {
        dispatch({type: 'CLEAR_ERROR_BY_ID'}, {payload: id})}
  
    const clearCurrentMessage = (id) => {
        dispatch({type: 'CLEAR_CURRENT_MESSAGE'})
    }
    const clearCurrentError = (id) => {
      dispatch({type: 'CLEAR_CURRENT_ERROR'}, {payload: id})}

    useEffect(() =>{
        Cookies.set(import.meta.env.VITE_PREF_DATA_COOKIE, JSON.stringify(state))
    },[state])

return (
<InfoContext.Provider value = {{
    state,
    setTheme,
    setMessage,
    setError,
    clearMessage,
    clearError,
    clearCurrentMessage,
    clearCurrentError}} >
    {children}
</InfoContext.Provider>
  )
}

export default InfoComponent


export const useInfoContext = () => {
    return useContext(InfoContext)
}