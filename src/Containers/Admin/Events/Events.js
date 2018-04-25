
import React,{Component} from 'react';
import { Container, Row, Col , Button} from 'reactstrap';
import RichTextEditor from '../../RichTextEditor/RichTextEditor.js';
import LoneAPi from '../../../loneApi.js';

const API = new LoneAPi();
const baseAPIURL ='http://api.bvzzdesign.com/lonehen';

export default class EventsAdmin extends Component {
    render(){
        return(<div>Events</div>);
    }
}
