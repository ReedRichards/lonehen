
import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage.js';
import {Route} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '',password:''};

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
        return <Route path="/test" render={()=><HomePage />}/>;
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
