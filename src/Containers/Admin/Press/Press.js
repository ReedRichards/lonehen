
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
                                          <Col sm="12" className="border"      >
                                          <Col sm="12" className="d-flex  justify-content-center mb-5" >
                                          <img src={p.press_image} alt=""/>
                                          </Col>

                                          <RichTextEditor
                                          post={this.quickAdd}
                                          deleteBool={true}
                                          description={p.press_raw}
                                          destination={'press/' + p.id }/>
                                          </Col>
                                        )
        }
        return(
            <Container >
              <Row >
                <Col  sm="12" className="border">
                  <h2> add a new press release</h2>
                  <div className="form-group">
                    <label>Upoload an Image:</label>
                    <input onChange={(event) => this.fileChangedHandler(event)} className="form-control" type="file"/>
                  </div>
                  <RichTextEditor
                    post={this.quickAdd}
                    destination="press"/>
                </Col>
                <h2>Edit or delete posts</h2>
                <div >{press}</div>
              </Row>
            </Container>
        )
    }
}
