import React, { Component } from 'react';

import HomeCarousel from '../../Containers/HomeCarousel/HomeCarousel.js';

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

class HomePage extends Component {
  render() {
    return (
        <div >
          <Container fluid id="hero">
            <Container fluid className="screen ">
            </Container>
          </Container>



          <Container id="about" className="pad-60">
            <Row >
              <Col sm="12" md="8">
                <h1>Located in College Station, Texas is a really great winery with lots of awesome stuff going on. If you like wine, check this out.</h1>
                <p>Steve and I sat on the upstairs porch, and thought, "Wouldn't it be great to grow grapes and run a winery?" We had always had an organic garden and we thought - "This will just be a bigger garden". That was about 10 years ago. Our goal was and still is - to join the long tradition of farmers and gardeners who grow and eat locally produced foods. To that end, Lone Hen Winery creates sparkling wines made in a modified traditional method utilizing estate grown and Texas sourced grapes. We hope to have everything figured out in about 3 to 4 generations, but we will certainly enjoy the process of learning! Come join us in our quest!</p>
              </Col>
              <Col  sm="12" md="4">
                <div >
                  <h3>Phone</h3>
                  <p >(979) 218-3985</p>
                </div>
                <div >
                  <h3>Email</h3>
                  <p >Lonehen@hotmail.com</p>
                </div>
                <div >
                  <h3>Location</h3>
                  <p >12455 Hopes Creek Rd<br/>
                    College Station, TX 77845</p>
                </div>
                <Button outline color="secondary">Shop</Button>{' '}
              </Col>
            </Row>
          </Container>


          <HomeCarousel/>

          <Container  className="pad-60 p-6">
            <Row >
              <Col sm="12" className="d-flex justify-content-center mb-5" >
                <h1>In the Press</h1>
              </Col>
                <Col sm="12" md="4">
                  <Col sm="12" className="d-flex justify-content-center mb-5" >
                  <img src="/static/img/wine-lover.jpeg" alt=""/>
                  </Col>
                  <p >Lone Hen Winery is located in College Station and is owned by Steve and Vicki Kirkpatrick. Their first vines of Blanc du Bois and Champanel were planted in 2004 on their ten acre lot where they live. They continued by planting Cabernet Sauvignon in 2006 and will be replanting with Lenoir soon. They currently have 1.5 acres of vines and will have four acres of vineyard when completed. In 2009, Lone Hen Winery officially</p>
                </Col>
                <Col sm="12" md="4">
                  <Col sm="12" className="d-flex justify-content-center mb-5" >
                  <img src="/static/img/finger-lakes-wine.jpeg" alt=""/>
                  </Col>
                  <p >The annual Finger Lakes International Wine Competition recently took place in Rochester, New York. Sweet!, Juicy!, and Bubbly! each received BRONZE MEDALS! 3824 wines from over 22 countries were blind judged by judges coming from all over the world including Australia, France Spain and Argentina. 525 medals were awarded.</p>
                </Col>
                <Col sm="12" md="4">
                  <Col sm="12" className="d-flex justify-content-center mb-5" >
                  <img src="/static/img/finger-lakes-wine.jpeg" alt=""/>
                  </Col>
                  <p >The annual Finger Lakes International Wine Competition recently took place in Rochester, New York. Sweet!, Juicy!, and Bubbly! each received BRONZE MEDALS! 3824 wines from over 22 countries were blind judged by judges coming from all over the world including Australia, France Spain and Argentina. 525 medals were awarded.</p>
                </Col>

            </Row>

          </Container>

          <Container fluid id="footer" className="d-flex justify-content-center mb-5 align-items-center">
            <Row>
              <Col >
              <p >Lone Hen Vineyard, 12455 Hopes Creek Road, Valley Ridge, TX, 77845, United States</p>
              </Col>
            </Row>
          </Container>


        </div>

    );
  }
}

export default HomePage;
