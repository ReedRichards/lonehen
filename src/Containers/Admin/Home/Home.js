import React,{Component} from 'react';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import {  Input,Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class Home extends Component {
    render(){
        return(
            <Container>
              <Row >
                <Col xs="12">
                  <h1 >Edit Home Page:</h1>
                  <h2>Home Page About Us Title:</h2>
                  <Input type="textarea" name="text" value="test"  />
                  <Button outline color="primary">Cancel</Button>
                  <Button color="primary" >Submit</Button>
                </Col>
              </Row>
            </Container>
        );
    }
}
