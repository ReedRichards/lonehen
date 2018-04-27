import React,{PureComponent} from 'react';
import { Container, Row, Col , } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Alert,Button } from 'reactstrap';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';

import LoneAPi from '../../../loneApi.js';

const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';

export default class AdminBlog extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            blog:false,
            modal: false,
            reset: false
        };
        this.mtoggle = this.mtoggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deltoggle = this.deltoggle.bind(this);
    }
    mtoggle(dest,id) {
        this.setState({
            modal: !this.state.modal,
            destination:dest,
            idnum:ih
        });
    }
    quickAdd= (rawvalue,value,destination)=>{
        let payload ={};

        switch(destination){
        case "blog":
            var event = new Date(this.state.blogDate);
            const isoDate = event.toISOString();
            payload ={
                post_title:this.state.blogTitle,
                post_body:value,
                post_date:isoDate
            } 
            this.setState({reset:!this.state.reset});
            API.post(destination,this.state.token,payload);
            break;
        case "press":
            payload ={
                press_image:this.state.pressImage,
                press_descritption:value,
                press_raw:rawvalue
            } 
            API.post(destination,this.state.token,payload);
            break;
        case "event":
            
            var eventStart = new Date(this.state.eventStartDate);
            const isoStartDate = eventStart.toISOString();
            var eventEnd = new Date(this.state.eventEndDate);
            const isoEndDate = eventEnd.toISOString();

            payload={
                event_title:this.state.eventTitle,
                event_start_date:isoStartDate,
                event_start_time:this.state.eventStartTime,
                event_end_date:isoEndDate,
                event_end_time:this.state.eventEndTime,
                event_raw:rawvalue,
                event_details:value
            }
            API.post(destination,this.state.token,payload);
            break;
        default:
            console.log("should never happen admin even line 104");
        }

        //sets state to re render component
        fetch(baseAPIURL + "/blog/")
            .then(response => response.json())
            .then(data => this.setState({ blog:data  }));
    }
    handleChange(event,key){
        this.setState({[key]:event.target.value}) ;
    }
    deltoggle() {
        API.delete(this.state.destination,this.state.token);
        this.mtoggle();
        let newevents = [...this.state.blog];
        let index = this.state.blog.findIndex( e => e.id === this.state.idnum );
        newevents.splice(index,1);
        this.setState({blog:newevents});

    }
    fileChangedHandler(event){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend =()=>{
            console.log(reader.result) ;
            this.setState({pressImage: reader.result});
        }
        reader.readAsDataURL(file);
    }
    componentWillMount(){
        const cookie = this.getCookie("token");
        if (cookie){
            this.setState({token:cookie});
 
        }
    }
    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
    componentDidMount() {
        fetch(baseAPIURL + "/blog/")
            .then(response => response.json())
            .then(data => this.setState({ blog:data  }));
    }

    render(){
        let blog = null;
        if (this.state.blog){
            blog = this.state.blog.map(b=>

                                       <Col sm="12" key={b.id}>
                                       <div className="form-group">
                                       <label>Title:</label>
                                       <input
                                       className="form-control"
                                       value={b.post_title}
                                       onChange={(event) => this.handleChange(event,"blogTitle")}/>
                                       <label>Date:</label>
                                       <input
                                       className="form-control"
                                       value={b.post_date}
                                       onChange={(event) => this.handleChange(event,"blogDate")}
                                       type="date"/>
                                       </div>
                                       <RichTextEditor
                                       post={this.quickAdd}
                                       deleteBool={true}
                                       del={this.mtoggle}
                                       id={b.id}
                                       description={b.post_raw}
                                       destination={'blog/' + b.id }/>
                                       </Col>
                                      )}
        return(

            <Container>
              <Modal isOpen={this.state.modal} toggle={this.mtoggle} className={this.props.className}>
                <ModalHeader toggle={this.mtoggle}>Delete Post</ModalHeader>
                <ModalBody>
                  <Alert color="danger">
                    warning, your are about to delete your post and will not be able to recover it, do you wish to continue?
                  </Alert>
                </ModalBody>
                <ModalFooter>
                  <Button color="link" onClick={this.mtoggle}>Cancel</Button>{' '}
                  <Button color="primary" onClick={this.deltoggle}>Delete</Button>{' '}

                </ModalFooter>
              </Modal>
                          <Row>
                            <Col sm="12">
                              <h2 >New Blog post</h2>
                              <div className="form-group">
                                <label>Title:</label>
                                <input
                                  className="form-control"
                                  value={this.state.blogTitle}
                                  onChange={(event) => this.handleChange(event,"blogTitle")}/>
                                    <label>Date:</label>
                                    <input
                                      value={this.state.blogDate}
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"blogDate")}
                                      type="date"/>
                              </div>
                              <RichTextEditor
                                post={this.quickAdd}
                                quick={true}
                                destination="blog"/>
                            </Col>
                          </Row>
              <Row >
                <h2 >Edit blog posts</h2>
                {blog}
              </Row>
            </Container>
        )
    }
}
