import React,{Component} from 'react';
import AdminNav from '../../Components/AdminNav/AdminNav.js';

class Admin extends Component{
    constructor(props){
        super(props);

        this.state={
            username:props.username,
            password:props.password,
            aboutPage:{}
        };
    }
    componentDidMount(){
        this.aboutDetail();
    }

    aboutDetail(){
        return(
            fetch('http://127.0.0.1:8000/api/about_page/1/')
                .then((response) => response.json())
                .then((responseJson)=>{
                    this.setState({aboutPage:responseJson});
                    return responseJson;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        );
    }
    render(){
        return(
            <div >
              <AdminNav/>
             <div>
                <h1>{this.state.aboutPage.about_title}</h1>
              </div>
            </div>
        );
    }
}

export default Admin;
