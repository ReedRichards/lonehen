
const baseAPIURL ='http://127.0.0.1:8000/api';

export default class LoneAPi {

    async getToken (username,password){
        let response =await fetch(baseAPIURL + '/token-auth/', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa(username + ':' + password)
            }),
            body: JSON.stringify({
                username:username,
                password:password
            })
        })
        let responseJson = await response.json();
        return responseJson;
    } 

    async post(destination,token,payload){
        let response =await fetch(baseAPIURL + '/' + destination + '/', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ token
            }),
            body: JSON.stringify(payload)
        })
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
       
    }
}
