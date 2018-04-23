import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
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
         fetch('http://127.0.0.1:8000/api/token-auth/', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa(this.state.username + ':' + this.state.password)
            }),
            body: JSON.stringify({
                username:this.state.username,
                password:this.state.password
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.detail){
                    console.log(responseJson.detail);
                }
                if (responseJson.token){
                    document.cookie = "token=" + responseJson.token+"; expires=0; path=/";
                    this.props.history.push('/admin');
                }
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
              <LoginForm
                username={this.state.username}
                password={this.state.password}
                onChangeUser={this.handleChange}
                onChangePass={this.handleChangePass}
                onClick={this.handleSubmit}/>;
              
            </div>
        );
    }
   }


export default Login;
