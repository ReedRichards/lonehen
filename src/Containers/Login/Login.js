import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            isLoggedIn:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }
    handleChangePass(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        fetch('http://127.0.0.1:8000/api/users/login/', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa(this.state.username + ':' + this.state.password)
            }),
            body: JSON.stringify({
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }

    render() {
        return (
            <div >
              <label>
                UserName:
                <input type="text" value={this.state.username} onChange={this.handleChange} />
              </label>
              <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handleChangePass} />
              </label>
              <input type="submit" onClick={this.handleSubmit} value="Submit" />
            </div>
        );
    }
   }


export default Login;
