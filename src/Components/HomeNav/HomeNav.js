import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
export default class HomeNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  test() {
    console.log("test");
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar id="homeNav" dark expand="md">
          <NavbarBrand className="d-flex align-items-center" href="/">
            <img id="logoImage" src="/static/img/LoneHenLogo.png" alt="" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" onClick={this.toggle}>
                  {" "}
                  <NavLink>Home</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle} href="/#about">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle} href="/#press">
                  Press
                </NavLink>
              </NavItem>
              <NavItem>
                <Link to="/events" onClick={this.toggle}>
                  <NavLink href="/events">Events</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/makers-notes" onClick={this.toggle}>
                  <NavLink href="/makers-notes/">Maker's Notes</NavLink>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Shop
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/shop" onClick={this.toggle}>
                    <DropdownItem>All</DropdownItem>
                  </Link>
                  <Link to="/shop/wine" onClick={this.toggle}>
                    <DropdownItem>Wine</DropdownItem>
                  </Link>
                  <Link to="/shop/glasses" onClick={this.toggle}>
                    <DropdownItem>Wine Glasses</DropdownItem>
                  </Link>
                  <Link to="/shop/accessories" onClick={this.toggle}>
                    <DropdownItem>Accessories</DropdownItem>
                  </Link>
                  <DropdownItem onClick={this.props.ctoggle}>Cart</DropdownItem>
                  <Link to="/shop/checkout" onClick={this.toggle}>
                    <DropdownItem>Checkouy</DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link to="/blog" onClick={this.toggle}>
                  <NavLink href="/blog">Blog</NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
