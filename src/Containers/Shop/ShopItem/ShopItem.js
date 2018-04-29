import React from "react";
import { Card, CardImg, CardText, CardBody,
         CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
const ShopItem = props => {
  return (
      <Card >
        <CardImg top width="100%" src={props.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardText>{props.description}</CardText>
          <Button>Add to Cart</Button>
          <Button>View Details</Button>
        </CardBody>
      </Card>
  );
};
export default ShopItem;
