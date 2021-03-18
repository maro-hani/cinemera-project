

function rootReducer(prevState, action)
{
    if (action.type === 'LOGEDIN')
    {
        return { ...prevState, isAuth: prevState.isAuth = true, }
    }

    else if (action.type === 'LOGEDOUT')
    {
        return { ...prevState, isAuth: prevState.isAuth = false }
    }
    else if (action.type === 'GETMOVIES')
    {
        return { ...prevState, movies: action.payload }
    }
    else if (action.type==='GETPERSON') {
        return { ...prevState, persons: action.payload }
    }
    else
    {
        return prevState
    }
}
export default rootReducer