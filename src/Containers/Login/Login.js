import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm.js';
import LoneAPi from '../../loneApi.js';

const API= new LoneAPi();
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

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
    handleSubmit() {

        let test =  API.getToken(this.state.username,this.state.password);
        console.log(test);
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
