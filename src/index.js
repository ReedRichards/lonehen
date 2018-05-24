import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminNav from "./Containers/Admin/AdminNav/AdminNav.js";
import Login from "./Containers/Login/Login.js";
import Admin from "./Containers/Admin/Admin.js";
import Home from "./Containers/Admin/Home/Home.js";
import Press from "./Containers/Admin/Press/Press.js";
import AdminShop from "./Containers/Admin/AdminShop/AdminShop.js";
import AdminBlog from "./Containers/Admin/AdminBlog/AdminBlog.js";
import EventsAdmin from "./Containers/Admin/Events/Events.js";
import Cart from "./Cart.js";
import { StripeProvider } from "react-stripe-elements";

ReactDOM.render(
  <Router>
    <StripeProvider apiKey="pk_test_VPmvIXc8CykseKNSKW8Y6vEj">
      <div>
        <Route path="/admin" component={AdminNav} />
        <Switch>
          <Route exact path="/admin/shop" component={AdminShop} />
          <Route exact path="/admin/blog" component={AdminBlog} />
          <Route exact path="/admin/events" component={EventsAdmin} />
          <Route exact path="/admin/press" component={Press} />
          <Route exact path="/admin/home" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Cart} />
        </Switch>
      </div>
    </StripeProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
