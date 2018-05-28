import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

export default class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }
  componentDidMount() {
    fetch(baseAPIURL + "/blog/" + this.props.match.params.id + "/")
      .then(response => response.json())
      .then(data => this.setState({ post: data }));
  }

  render() {
    console.log("test" + this.props.match.params.id);
    return (
      <Container>
        <Row>
          <Col sm="12" className="text-center my-5 ">
            <h2>{this.state.post.post_title}</h2>
          </Col>
          <Col md="4">
            <Col className="my-5">
              <Link className="dark" to="/blog">
                <i className="fas fa-arrow-left" /> Back to Blog
              </Link>
            </Col>
            <Col>
              <h4>
                {new Date(this.state.post.post_date).toLocaleString("en-us", {
                  month: "short"
                })}{" "}
                {new Date(this.state.post.post_date).getUTCDate()},{" "}
                {new Date(this.state.post.post_date).getFullYear()}
              </h4>
            </Col>
          </Col>
          <Col md="8">
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.post.post_body
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
