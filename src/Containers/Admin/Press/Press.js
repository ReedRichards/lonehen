
import React,{Component} from 'react';
import { Container, Row, Col , Button} from 'reactstrap';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import LoneAPi from '../../../loneApi.js';

const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';

export default class Press extends Component {
    constructor(props){
        super(props);
        this.state={press:false};
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
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
        fetch(baseAPIURL + "/press/")
            .then(response => response.json())
            .then(data => this.setState({ press:data  }));
    }


    render(){
        let press = null;
        if(this.state.press){
            press = this.state.press.map( p =>
                                          <Col sm="12" className="p-5"      >
                                          <Col sm="12" className="d-flex  justify-content-center mb-5" >
                                          <img src={p.press_image} alt=""/>
                                          </Col>

                                          <Col sm="12" className="p-5"      >
                                          <RichTextEditor
                                          post={this.quickAdd}
                                          deleteBool={true}
                                          description={p.press_raw}
                                          destination={'press/' + p.id }/>
                                          </Col>
                                          </Col>
                                        )
        }
        return(
            <Container >
              <Row >
                <Col  sm="12" className="p-5">
                  <Col  sm="12" className="p-5">
                  <h2> add a new press release</h2>
                  </Col>
                  <Col className=" p-5">
                    <label>Upoload an Image:</label>
                    <input onChange={(event) => this.fileChangedHandler(event)} className="form-control" type="file"/>
                  </Col>
                  <Col xs="12" className=" p-5">
                  <RichTextEditor
                    post={this.quickAdd}
                    destination="press"/>
                </Col>
                </Col>
                <Col xs="12" className=" p-5">
                <h2>Edit or delete posts</h2>
                </Col>
                <Col xs="12" className=" p-5">
                <div >{press}</div>
                </Col>
              </Row>
            </Container>
        )
    }
}
