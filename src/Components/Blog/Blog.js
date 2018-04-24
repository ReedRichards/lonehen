
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoneAPi from '../../loneApi.js';
import Post from '../BlogPosts/Posts/Posts.js';

const API = new LoneAPi();
const baseAPIURL ='http://127.0.0.1:8000/api';
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] } ;
    }
    componentDidMount() {
        fetch(baseAPIURL + "/blog/")
            .then(response => response.json())
            .then(data => this.setState({ posts:data  }));
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
              {posts.map(post =>
                        <div key={post.id}>
                              {post.post_title}
                            </div>
                       )}
              <Row >
              </Row>
            </Container>
        );
    }
}

export default Blog;
