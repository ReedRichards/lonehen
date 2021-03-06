const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

export default class LoneAPi {
  async getToken(username, password) {
    let response = await fetch(baseAPIURL + "/token-auth/", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password)
      }),
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    let responseJson = await response.json();
    return responseJson;
  }

  async put(destination, token, payload) {
    let response = await fetch(baseAPIURL + "/" + destination + "/", {
      method: "PUT",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }),
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }
  async patch(destination, token, payload) {
    let response = await fetch(baseAPIURL + "/" + destination + "/", {
      method: "PATCH",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }),
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }
  async post(destination, token, payload) {
    let response = await fetch(baseAPIURL + "/" + destination + "/", {
      method: "POST",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }),
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }
  async delete(destination, token) {
    let response = await fetch(baseAPIURL + "/" + destination + "/", {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Token " + token
      })
    });
    let responseJson = await response;
    console.log(responseJson);
    return responseJson;
  }
}
