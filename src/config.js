export const apiDomain="http://localhost:3001/"
export const loginUrl=apiDomain+'auth'
export const userUrl=apiDomain+'api/user'
export const getHeader=function(){
    const userData=JSON.parse(window.localStorage.getItem('authUser'))
    const headers={
        'Accept':'application/json',
        'Authorization':'Bearer' +userData.userId
    }
    return headers;
}