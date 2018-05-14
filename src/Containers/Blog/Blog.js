import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import BlogPosts from "../../Components/BlogPosts/BlogPosts.js";

const baseAPIURL = "https://api.bvzzdesign.com/lonehen";
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  componentDidMount() {
    fetch(baseAPIURL + "/blog/")
      .then(response => response.json())
      .then(data => this.setState({ posts: data }));
  }
  render() {
    const { posts } = this.state;
    return (
      <Container className="pad-60">
        <Row>
          <Col className="text-center">
            <h1>Thirsty Hen Blog</h1>
          </Col>
        </Row>
        {posts.map(post => (
          <BlogPosts
            key={post.id}
            title={post.post_title}
            date={post.post_date}
            body={post.post_body}
          />
        ))}
        <Row />
      </Container>
    );
  }
}

export default Blog;
