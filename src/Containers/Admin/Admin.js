import React,{Component} from 'react';
import AdminNav from '../../Components/AdminNav/AdminNav.js';
import { Container, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import RichTextEditor from '../RichTextEditor/RichTextEditor.js';
import classnames from 'classnames';
import LoneAPi from '../../loneApi.js';

const API = new LoneAPi();
class Admin extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state={
            activeTab: '1',
            token:"",
            blogTitle:"",
            blogDate:"",
            blogTime:"",
            pressImage:null,
            eventTitle:"",
            eventDate:"",
            eventStartDate:"",
            eventEndDate:"",
            eventStartTime:"",
            eventEndTime:""

        };
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);

    }
    handleChange(event,key){
        this.setState({[key]:event.target.value}) ;
    }
    componentDidMount(){
        const cookie = this.getCookie("token");
        if (cookie){
            this.setState({token:cookie});
        }
        else{
            this.props.history.push("/login");
        }

    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    quickAdd= (rawvalue,value,destination)=>{
        let payload ={};

        switch(destination){
        case "blog":
            var event = new Date(this.state.blogDate);
            const isoDate = event.toISOString();
            payload ={
                post_title:this.state.blogTitle,
                post_body:value,
                post_date:isoDate
            } 
            API.post(destination,this.state.token,payload);
        case "press":
            payload ={
                press_image:this.state.pressImage,
                press_descritption:value,
                press_raw:rawvalue
            } 
            API.post(destination,this.state.token,payload);
        case "press":
            payload={
                event_title:eventTitle,
                event_start_date:eventStartDate,
                event_end_date:eventEndDate,
                event_raw:rawvalue,
                event:value
            }

        }
        
    }
    fileChangedHandler(event){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend =()=>{
            console.log(reader.result) ;
            this.setState({pressImage: reader.result});
        }
        reader.readAsDataURL(file);
    }


    render(){
        return(
            <div >
              <Container>
                <Row >
                  <Col xs="12">
                    <h1>Quick Add</h1>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            + Blog
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            + Press
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                            >
                            + Event
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                            >
                            + Shop Item
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              <div className="form-group">
                                <label>Title:</label>
                                <input
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"blogTitle")}/>
                                  <Col md="4">
                                    <label>Date:</label>
                                    <input
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"blogDate")}
                                      type="date"/>
                                  </Col>
                                  <Col md="4">
                                    <label>Time:</label>
                                    <input
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"blogTime")}
                                           placeholder="13:00"/>
                                  </Col>
                              </div>
                              <RichTextEditor
                                post={this.quickAdd}
                                destination="blog"/>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12">
                              <div className="form-group">
                                <label>Upoload an Image:</label>
                                <input onChange={(event) => this.fileChangedHandler(event)} className="form-control" type="file"/>
                              </div>
                              <RichTextEditor
                                post={this.quickAdd}
                                destination="press"/>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <Row>
                            <Col sm="12">
                              <div className="form-group">
                                <Col sm="12"  >
                                  <label>Event Title:</label>
                                  <input
                                    className="form-control"
                                    onChange={(event) => this.handleChange(event,"eventTitle")}/>
                                </Col>

                                <Col sm="12" md="6" >
                                  <label>Start Date:</label>
                                  <input
                                    className="form-control"
                                    onChange={(event) => this.handleChange(event,"eventStartDate")}
                                    type="date"/>
                                </Col>

                                <Col sm="12" md="6" >
                                    <label>Time:</label>
                                    <input
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"eventStartTime")}
                                      placeholder="13:00"/>
                                </Col>

                                <Col sm="12" md="6" >
                                  <label>End Date:</label>
                                  <input
                                    className="form-control"
                                    onChange={(event) => this.handleChange(event,"eventEndDate")}
                                    type="date"/>
                                </Col>
                                <Col sm="12" md="6" >
                                    <label>Time:</label>
                                    <input
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"eventEndTime")}
                                      placeholder="13:00"/>
                                </Col>

                              </div>
                              <RichTextEditor
                                post={this.quickAdd}
                                destination="event"/>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="4">
                          <Row>
                            <Col sm="12">
                              <div className="form-group">
                                <label>Upoload an Image:</label>
                                <input className="form-control" type="file"/>
                              </div>
                              <RichTextEditor/>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                  </Col>
                </Row>
              </Container>
            </div>
        );
    }
    }

export default Admin;
