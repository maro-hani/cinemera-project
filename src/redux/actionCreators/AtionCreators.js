
export function logedIn() {
    return function (dispatch) {
        dispatch({type:'LOGEDIN'})
    }
}
export function logedOut() {
    return function (dispatch) {
        dispatch({type:'LOGEDOUT'})
    }
}
