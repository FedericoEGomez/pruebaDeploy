module.exports = {
    setHeaders(token){
        const headers = {
            'x-token': token,
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
        return headers
    }
}