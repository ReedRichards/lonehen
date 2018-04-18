import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage.js';
import Events from './Components/Events/Events.js';
import HomeNav from './Components/HomeNav/HomeNav.js';
import MakersNotes from './Components/MakersNotes/MakersNotes.js';
import Blog from './Components/Blog/Blog.js';


ReactDOM.render((
    <Router >
      <div>
        <Route path="/" component={HomeNav}/>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/events" component={Events}/>
        <Route exact path="/makers-notes" component={MakersNotes}/>
        <Route exact path="/blog" component={Blog}/>
      </div>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
