import axios from "axios"


export function getMovies()
{
    return async function (dispatch)
    {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=c8b6e1d5576aaf98bf9b92e7b7c92467')
        { dispatch({ type: 'GETMOVIES', payload: data.results }) }
    }
}

export function getPerson()
{
    return async function (dispatch)
    {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=c8b6e1d5576aaf98bf9b92e7b7c92467')
        { dispatch({ type: 'GETPERSON', payload: data.results }) }
    }
}