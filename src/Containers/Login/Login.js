
import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage.js';
import {Route} from 'react-router-dom';

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

    handleSubmit(event) {
        fetch('http://127.0.0.1:8000/api/users/login/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic'+btoa(this.state.username+':'+this.state.password)
            },
            body: JSON.stringify({
            })
        })
            .then(function(response) {
                console.log(response.json()) ;
            }).then(function(body) {
                console.log(body);
            });
    }

    render() {
        return (
           
            <form onSubmit={this.handleSubmit}>
              <label>
                UserName:
                <input type="text" value={this.state.username} onChange={this.handleChange} />
              </label>
              <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handleChangePass} />
              </label>
              <input type="submit" value="Submit" />
            </form>
        );
    }
   }


export default Login;
