import React, { Component } from "react";

import HomeCarousel from "../../Containers/HomeCarousel/HomeCarousel.js";
import { Card, CardImg, CardText, CardBody, Button } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutPage: {},
      press: false
    };
  }
  componentDidMount() {
    fetch(baseAPIURL + "/about-page/1/")
      .then(response => response.json())
      .then(data => this.setState({ aboutPage: data }));
    fetch(baseAPIURL + "/press/")
      .then(response => response.json())
      .then(data => this.setState({ press: data }));
  }
  render() {
    let press = null;
    if (this.state.press) {
      press = this.state.press
        .map(p => (
          <Col sm="12" md="6" className="mt-5">
            <Card className="shadow">
              <CardImg
                top
                width="100%"
                className="img-fluid"
                src={p.press_image}
                alt="Card image cap"
              />
              <CardBody>
                <CardText>
                  {" "}
                  <div
                    dangerouslySetInnerHTML={{ __html: p.press_descritption }}
                  />
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))
        .reverse();
    }
    return (
      <div>
        <Container fluid id="hero">
          <Container
            fluid
            className="screen d-flex align-content-center flex-column text-center justify-content-center"
          >
            <h1 className="display-2">Lone Hen Winery</h1>
            <p className="lead">Celebrating Life Together</p>
          </Container>
        </Container>

        <Container id="about" className="pad-60">
          <Row>
            <Col sm="12" id="about" md="8">
              <h1>{this.state.aboutPage.about_title}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.aboutPage.about_description
                }}
              />
            </Col>
            <Col sm="12" md="4">
              <div>
                <h3>Phone</h3>
                <p>(979) 218-3985</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>Lonehen@hotmail.com</p>
              </div>
              <div>
                <h3>Location</h3>
                <p>
                  12455 Hopes Creek Rd<br />
                  College Station, TX 77845
                </p>
              </div>
              <Button outline color="secondary">
                Shop
              </Button>{" "}
            </Col>
          </Row>
        </Container>

        <HomeCarousel />

        <Container className="pad-60 p-6" id="press">
          <Row>
            <Col sm="12" className="d-flex justify-content-center mb-5">
              <h1>In the Press</h1>
            </Col>
            {press}
          </Row>
        </Container>

        <Container
          fluid
          id="footer"
          className="d-flex justify-content-center mb-5 align-items-center"
        >
          <Row>
            <Col>
              <p>
                Lone Hen Vineyard, 12455 Hopes Creek Road, Valley Ridge, TX,
                77845, United States
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
