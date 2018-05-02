import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
const ShopItem = props => {
  return (
    <Card className="border-0">
      <h3>
        <Badge color="primary">${props.price}</Badge>
      </h3>
      <CardImg top width="100%" src={props.image} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardText>
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        </CardText>
        <Link to={"/shop/" + props.name + "/" + props.id}>
          <Button color="secondary">View Detials</Button>
        </Link>{" "}
        <Button onClick={() => props.add(props.shop)} color="primary">
          Add to Cart
        </Button>
      </CardBody>
    </Card>
  );
};
export default ShopItem;
