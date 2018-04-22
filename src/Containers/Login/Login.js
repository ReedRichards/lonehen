import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm.js';
import Admin from '../Admin/Admin.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            isLoggedIn:true
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
                if (responseJson.details === "Valid"){
                    this.setState({isLoggedIn:true});
                }
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }

    render() {
        let admin =null;

        let login = <LoginForm
        username={this.state.username}
        password={this.state.password}
        onChangeUser={this.handleChange}
        onChangePass={this.handleChangePass}
        onClick={this.handleSubmit}/>;
        
        if (this.state.isLoggedIn){
            admin = <Admin username={this.state.username} password ={this.state.password}/>;
            login=null;
        }

        return (
            <div >
              {admin}
              {login}
            </div>
        );
    }
   }


export default Login;
