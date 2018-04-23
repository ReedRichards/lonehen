import React,{Component} from 'react';
import AdminNav from '../../Components/AdminNav/AdminNav.js';
import { Container, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText} from 'reactstrap';
import classnames from 'classnames';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})


class Admin extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state={
            username:props.username,
            password:props.password,
            activeTab: '1',
            value:initialValue
        };
    }
    componentDidMount(){
        const cookie = this.getCookie("token");
        if (cookie){
            this.aboutDetail();
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
    aboutDetail(){
        return(
            fetch('http://127.0.0.1:8000/api/about-page/1/')
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

    editSlate= ({value}) =>{
        this.setState({value});
    }

    render(){
        return(
            <div >
              <AdminNav/>
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
                              <Editor value={this.state.value} onChange={this.editSlate}/>
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
