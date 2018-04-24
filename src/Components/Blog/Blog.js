
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoneAPi from '../../loneApi.js';
import BlogPosts from '../BlogPosts/BlogPosts.js';

const API = new LoneAPi();
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: undefined } ;
    }
    componentDidMount(){
        let posts =API.get("blog");
        this.setState({posts:posts});
    }

    render() {
        let blog = null;
        if(this.state.posts ){
            blog= <BlogPosts posts={this.state.posts}/>;

        }
        return (
            <Container className="pad-60">
              <Row>
                <Col className="text-center">
                  <h1>Thirsty Hen Blog</h1>
                </Col>
              </Row>
              {blog}
              <Row >
              </Row>
            </Container>
        );
    }
}

export default Blog;
