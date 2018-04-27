import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import RichTextEditor from '../RichTextEditor/RichTextEditor.js';
import classnames from 'classnames';
import LoneAPi from '../../loneApi.js';
import { Alert } from 'reactstrap';


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
            eventEndTime:"",
            shopName:"",
            shopImage:"",
            shopQuantity:"",
            shopPrice:0,
            shopCategory:"",
            shopDescription:"",
            modal: false


        };
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.mtoggle = this.mtoggle.bind(this);

    }
    mtoggle() {
        this.setState({
            modal: !this.state.modal
        });
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
        const param = {target:{value:""}};

        switch(destination){
        case "blog":
            var event = new Date(this.state.blogDate);
            const isoDate = event.toISOString();
            payload ={
                post_title:this.state.blogTitle,
                post_body:value,
                post_date:isoDate
            } ;
             API.post(destination,this.state.token,payload);

            this.handleChange(param,"blogTitle");
            this.handleChange(param,"blogDate");
            break;
        case "press":
            payload ={
                press_image:this.state.pressImage,
                press_descritption:value,
                press_raw:rawvalue
            } ;
            this.handleChange(param,"pressImage");
            API.post(destination,this.state.token,payload);
            break;
        case "event":
            
            var eventStart = new Date(this.state.eventStartDate);
            const isoStartDate = eventStart.toISOString();
            var eventEnd = new Date(this.state.eventEndDate);
            const isoEndDate = eventEnd.toISOString();

            payload={
                event_title:this.state.eventTitle,
                event_start_date:isoStartDate,
                event_start_time:this.state.eventStartTime,
                event_end_date:isoEndDate,
                event_end_time:this.state.eventEndTime,
                event_raw:rawvalue,
                event_details:value
            };
            this.handleChange(param,"eventTitle");
            this.handleChange(param,"eventStartDate");
            this.handleChange(param,"eventEndDate");
            this.handleChange(param,"eventStartTime");
            this.handleChange(param,"eventEndTime");
            API.post(destination,this.state.token,payload);
            break;
        case "shop":
            payload={
                name:this.state.shopName,
                image:this.state.shopImage,
                quantity:this.state.shopQuantity,
                price:this.state.shopPrice,
                category:this.state.shopCategory,
                description:value,
                raw_description:rawvalue
            };
            API.post(destination,this.state.token,payload);
            break;

        default:
            console.log("should never happen admin line 140"); 
        }
        
        this.mtoggle();
    }
    fileChangedHandler(event,keyVal){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend =()=>{
            this.setState({[keyVal]: reader.result});
        }
        reader.readAsDataURL(file);
    }


    render(){
        return(
            <div >
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
                                  value={this.state.blogTitle}
                                  onChange={(event) => this.handleChange(event,"blogTitle")}/>
                                    <label>Date:</label>
                                    <input
                                      value={this.state.blogDate}
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"blogDate")}
                                      type="date"/>
                              </div>
                              <RichTextEditor
                                post={this.quickAdd}
                                quick={true}
                                destination="blog"/>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12">
                              <div className="form-group">
                                <label>Upoload an Image:</label>
                                <input onChange={(event) => this.fileChangedHandler(event,"pressImage")} className="form-control" type="file"/>
                              </div>
                              <RichTextEditor
                                quick={true}
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
                                      placeholder="10:00 am"
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"eventStartTime")}/>
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
                                      placeholder="4:00 pm"/>
                                </Col>

                              </div>
                              <RichTextEditor
                                quick={true}
                                post={this.quickAdd}
                                destination="event"/>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="4">
                          <Row>
                            <Col sm="12">
                              <Col sm="12" md="6" >
                                <label>Item Name:</label>
                                <input
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"shopName")}/>
                              </Col>
                              <div className="form-group">
                                <label>Upoload an Image:</label>
                                <input
                                  onChange={(event) => this.fileChangedHandler(event,"shopImage")}
                                  className="form-control"
                                  type="file"/>
                              </div>
                              <Col sm="12" md="6" >
                                <label>Quantity:</label>
                                <input
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"shopQuantity")}
                                  type="number" />
                              </Col>
                              <Col sm="12" md="6" >
                                <label>Price:</label>
                                <input
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"shopPrice")}
                                  type="number"
                                  min="0.01" step="0.01" max="2500"/>
                              </Col>
                              <Col sm="12" md="6" >
                                <label>Category:</label>
                                <input
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"shopCategory")}/>
                                  
                              </Col>
                              <RichTextEditor
                                quick={true}
                                post={this.quickAdd}
                                destination="shop"/>
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
