import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

export default class AdminNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/admin">LoneHen Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link onClick={this.toggle} to="/admin">
                  <NavLink>Quick Add</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/admin/home">
                  <NavLink>Home Page</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/admin/press">
                  <NavLink>Press</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/admin/events">
                  <NavLink>Events</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/admin/shop">
                  <NavLink>Shop</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/admin/blog">
                  <NavLink>Blog</NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
