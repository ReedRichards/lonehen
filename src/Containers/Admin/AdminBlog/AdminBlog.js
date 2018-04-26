
import React,{Component} from 'react';
import { Container, Row, Col , Button} from 'reactstrap';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import LoneAPi from '../../../loneApi.js';

const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';

export default class AdminBlog extends Component {
    constructor(props){
        super(props);
        this.state={blog:false};
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
        fetch(baseAPIURL + "/blog/")
            .then(response => response.json())
            .then(data => this.setState({ blog:data  }));
    }

    render(){
        let blog = null;
        if (this.state.blog){
            blog = this.state.blog.map(b=>

                                       <Col sm="12">
                                       <div className="form-group">
                                       <label>Title:</label>
                                       <input
                                       className="form-control"
                                       value={b.blog_title}
                                       onChange={(event) => this.handleChange(event,"blogTitle")}/>
                                       <label>Date:</label>
                                       <input
                                       className="form-control"
                                       value={b.blog_date}
                                       onChange={(event) => this.handleChange(event,"blogDate")}
                                       type="date"/>
                                       </div>
                                       <RichTextEditor
                                       post={this.quickAdd}
                                       deleteBool={true}
                                       description={b.press_raw}
                                       destination={'blog/' + b.id }/>
                                       </Col>
                                      )}
        return(

            <Container>
              <Row >
                {blog}
              </Row>
            </Container>
        )
    }
}
