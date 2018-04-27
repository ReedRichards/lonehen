import React,{Component} from 'react';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import {  Input,Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import LoneAPi from '../../../loneApi.js';

import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            aboutTitle:"",
            aboutDescription:"",
            aboutRaw:false,
            modal: false
        };
        this.mtoggle = this.mtoggle.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    mtoggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentWillMount(){
        const cookie = this.getCookie("token");
        if (cookie){
            this.setState({token:cookie});
        }
        if (this.state.aboutTitle === "") {
            fetch(baseAPIURL + "/about-page/1/")
                .then(response => response.json())
                .then(data =>{

                    this.setState({
                        aboutTitle:data.about_title,
                        aboutDescription:data.about_description,
                        aboutRaw:data.about_raw
                    })
                });
                      }
    }
    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
    handleChange(event,key){
        this.setState({[key]:event.target.value}) ;
    }

    quickAdd= (rawValue,value,destination)=>{

        switch(destination){
        case "about-page/1":
            const payload ={
                about_title:this.state.aboutTitle,
                about_description:value,
                about_raw:rawValue
            } ;
            API.put(destination,this.state.token,payload);
            this.mtoggle(); 
            fetch(baseAPIURL + "/about-page/1/")
                .then(response => response.json())
                .then(data =>{

                    this.setState({
                        aboutTitle:data.about_title,
                        aboutDescription:data.about_description,
                        aboutRaw:data.about_raw
                    });
                });
            break;
        default:
            console.log("should never happen : adminhome line 78");
        }
        
    }

    render(){
        let test = null;

        if(this.state.aboutRaw){
          test = <RichTextEditor
            post={this.quickAdd}
            destination="about-page/1"
            description={this.state.aboutRaw}/>;
        }
        return(
            <Container>

              <Modal isOpen={this.state.modal} toggle={this.mtoggle} className={this.props.className}>
                <ModalHeader toggle={this.mtoggle}>Post Successful</ModalHeader>
                <ModalBody>
                  <Alert color="success">
                    Your post was successful
                  </Alert>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.mtoggle}>Done</Button>{' '}
                </ModalFooter>
              </Modal>

              <Row >
                <Col xs="12" className="p-5">
                  <Col xs="12" className="d-flex justify-content-center">
                    <h1>Edit Home Page:</h1>
                  </Col>
                  <Col className="p-5">

                    <h2>Home Page About Us Title:</h2>
                    <Input
                      type="textarea"
                      name="text"
                      onChange={(event) => this.handleChange(event,"aboutTitle")}
                      value={this.state.aboutTitle}  />
                  </Col>
                  <Col className="p-5">
                    <h2>Home Page About Us Decription:</h2>
                    {test}
                    </Col>
                </Col>
              </Row>
            </Container>
        );
    }
}
