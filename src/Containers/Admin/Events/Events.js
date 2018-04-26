
import React,{Component} from 'react';
import { Container, Row, Col , Button} from 'reactstrap';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import LoneAPi from '../../../loneApi.js';

const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';

export default class EventsAdmin extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.state={
            events:false
        };
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
        fetch(baseAPIURL + "/event/")
            .then(response => response.json())
            .then(data => this.setState({ events:data  }));
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

        }
            //sets state to re render component
            fetch(baseAPIURL + "/event/")
                .then(response => response.json())
                .then(data => this.setState({ events:data  }));

    }
    handleChange(event,key){
        this.setState({[key]:event.target.value}) ;
    }


    render(){
        let renderevents = null;
        if(this.state.events){
            renderevents = this.state.events.map( e =>
                <Col sm="12" key={e.id} className="border" >
                  <div className="form-group">
                    <Col sm="12"  >
                      <label>Event Title:</label>
                      <input
                        value={e.event_title}
                        className="form-control"
                        onChange={(event) => this.handleChange(event,"eventTitle")}/>
                    </Col>
                    
                    <Col sm="12" md="6" >
                      <label>Start Date:</label>
                      <input
                        value={e.event_start_date}
                        className="form-control"
                        onChange={(event) => this.handleChange(event,"eventStartDate")}
                        type="date"/>
                    </Col>
                    
                    <Col sm="12" md="6" >
                      <label>Time:</label>
                      <input
                        value={e.event_start_time}
                        placeholder="10:00 am"
                        className="form-control"
                        onChange={(event) => this.handleChange(event,"eventStartTime")}/>
                    </Col>
                    
                    <Col sm="12" md="6" >
                      <label>End Date:</label>
                      <input
                        value={e.event_end_date}
                        className="form-control"
                        onChange={(event) => this.handleChange(event,"eventEndDate")}
                                    type="date"/>
                    </Col>
                    <Col sm="12" md="6" >
                      <label>End Time:</label>
                      <input
                        value={e.event_end_time}
                        className="form-control"
                        onChange={(event) => this.handleChange(event,"eventEndTime")}
                        placeholder="4:00 pm"/>
                    </Col>
                    
                  </div>
                  <RichTextEditor
                    post={this.quickAdd}
                    deleteBool={true}
                    description={e.press_raw}
                    destination={"event/" + e.id}/>
                </Col>
            )
        }

        return(
            <Container>
              <Row >
               <h2 >Add New Event</h2> 
                            <Col sm="12">
                              <div className="form-group">
                                <Col sm="12"  >
                                  <label>Event Title:</label>
                                  <input
                                    className="form-control"
                                    onChange={(event) => this.handleChange(event,"eventTitle")}/>
                                </Col>

                                <Col sm="12" md="6" >
                                  <label>Start Date:</label>
                                  <input
                                    className="form-control"
                                    onChange={(event) => this.handleChange(event,"eventStartDate")}
                                    type="date"/>
                                </Col>

                                <Col sm="12" md="6" >
                                    <label>Time:</label>
                                    <input
                                      placeholder="10:00 am"
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"eventStartTime")}/>
                                </Col>

                                <Col sm="12" md="6" >
                                  <label>End Date:</label>
                                  <input
                                    className="form-control"
                                    onChange={(event) => this.handleChange(event,"eventEndDate")}
                                    type="date"/>
                                </Col>
                                <Col sm="12" md="6" >
                                    <label>Time:</label>
                                    <input
                                      className="form-control"
                                      onChange={(event) => this.handleChange(event,"eventEndTime")}
                                      placeholder="4:00 pm"/>
                                </Col>

                              </div>
                              <RichTextEditor
                                post={this.quickAdd}
                                destination="event"/>
                            </Col>

                <h2 >Edit or delete an Event</h2>
                <div>{renderevents}</div>
              </Row>
            </Container>
        );
    }
}
