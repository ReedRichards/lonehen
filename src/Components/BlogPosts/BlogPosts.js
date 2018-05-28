import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const BlogPosts = props => {
  return (
    <Container className="pad-60 serif">
      <Row>
        <Col sm="12">
          <Link className="dark" to={"/blog/" + props.id}>
            <h2>{props.title}</h2>
          </Link>
        </Col>
        <Col sm="12">
          <h4>
            {new Date(props.date).toLocaleString("en-us", { month: "short" })}{" "}
            {new Date(props.date).getUTCDate()},{" "}
            {new Date(props.date).getFullYear()}
          </h4>
        </Col>
      </Row>
    </Container>
  );
};
export default BlogPosts;
