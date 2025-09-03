

export const initialPrefDataState = {
    theme : {
        darkmode : true,
    },
    messages : [],
    error: []
}


export const PrefDataReducer = (state, action) => {
    switch (action.type) {
      
        case 'SET_DARKMODE_THEME':
            return {
                ...state,
                theme: {
                    ...state.theme,
                    darkmode: !state.theme.darkmode}}
        
           
        case 'SET_MESSAGE':
            return {
                ...state,
                message: [...state.message,
                     { message : action.payload, 
                    id: state.message.length - 1 
                    ,read : false, timeStamp : new Date()}]
            }
        case 'SET_ERROR':
            return {
                ...state,
                error :[
                    ...state.error,
                     { message : action.payload, 
                    id: state.error.length - 1 
                   ,resolved : false, timeStamp : new Date()
                }]}
            case 'CLEAR_MESSAGE_BY_ID':
                const newMessage = state.message.filter((message) => message.id !== action.payload)
                return {
                    ...state,
                  message: [
                        ...newMessage
                  ]
                }
            case 'CLEAR_ERROR_BY_ID':
                    const newError = state.error.filter((error) => error.id !== action.payload)
                    return {
                        ...state,
                      error: [
                            ...newError]}
             case 'CLEAR_CURRENT_MESSAGE':
                return {
                    ...state,
                   message :  state.message.pop()
                }
                case 'CLEAR_CURRENT_ERROR':
                    return {
                        ...state,
                       error :  state.error.pop()
                    }
        
        default:
            return state;
    }
}