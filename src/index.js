import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage.js';
import Login from './Containers/Login/Login.js';
import Events from './Components/Events/Events.js';
import HomeNav from './Components/HomeNav/HomeNav.js';
import MakersNotes from './Components/MakersNotes/MakersNotes.js';
import Blog from './Components/Blog/Blog.js';


ReactDOM.render((
    <Router >
      <div>
        <Switch >
          <Route exact path="/login" component={Login}/>
          <Route path="/" component={HomeNav}/>
        </Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/events" component={Events}/>
        <Route exact path="/makers-notes" component={MakersNotes}/>
        <Route exact path="/blog" component={Blog}/>
      </div>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
