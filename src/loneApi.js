
const baseAPIURL ='http://127.0.0.1:8000/api';

export default class LoneAPi {

    getToken (username,password){
         fetch(baseAPIURL + '/token-auth/', {
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
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.detail){
                    return responseJson;
                }
                if (responseJson.token){
                    document.cookie = "token=" + responseJson.token+"; expires=0; path=/";
                    return responseJson;
                }
            })
            .catch((error) => {
                return error;
            });
    } 
}
