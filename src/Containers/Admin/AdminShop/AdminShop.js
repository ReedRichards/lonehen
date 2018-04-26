import React, {Component} from 'react';


import { Container, Row, Col , Button} from 'reactstrap';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import LoneAPi from '../../../loneApi.js';

const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';

export default class AdminShop extends Component{
    constructor(props){
        super(props);
        this.state={store:false};
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
        fetch(baseAPIURL + "/shop/")
            .then(response => response.json())
            .then(data => this.setState({ store:data  }));
    }
 
    render(){
        let store=null;
        if(this.state.store){
            store = this.state.store.map(s =>

                            <Col sm="12">
                              <Col sm="12" md="6" >
                                <label>Item Name:</label>
                                <input
                                  className="form-control"
                                         value={s.name}
                                  onChange={(event) => this.handleChange(event,"shopName")}/>
                              </Col>
                              <div className="form-group">
                                <label>Upoload an Image:</label>
                                         <img src={s.image}/>
                                <input
                                  onChange={(event) => this.fileChangedHandler(event,"shopImage")}
                                  className="form-control"
                                  type="file"/>
                              </div>
                              <Col sm="12" md="6" >
                                <label>Quantity:</label>
                                <input
                                  className="form-control"
                                         value={s.quantity}
                                  onChange={(event) => this.handleChange(event,"shopQuantity")}
                                  type="number" />
                              </Col>
                              <Col sm="12" md="6" >
                                <label>Price:</label>
                                <input
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"shopPrice")}
                                  type="number"
                                         value={s.price}
                                  min="0.01" step="0.01" max="2500"/>
                              </Col>
                              <Col sm="12" md="6" >
                                <label>Category:</label>
                                <input
                                         value={s.category}
                                  className="form-control"
                                  onChange={(event) => this.handleChange(event,"shopCategory")}/>
                                  
                              </Col>
                                         <RichTextEditor
                                         post={this.quickAdd}
                                         deleteBool={true}
                                         description={s.raw_description}
                                         destination={'shop/' + s.id }/>
                                         
                            </Col>
                                        )
        }
        return(
            <Container>

              <h2>Edit or delete posts</h2>
              <div >{store}</div>

            </Container>
        )
       
    }
}
