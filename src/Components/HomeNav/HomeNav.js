import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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
    DropdownItem } from 'reactstrap';
export default class HomeNav extends React.Component {
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
        <Navbar id="homeNav" dark expand="md">
          <NavbarBrand href="/">
            <img id="logoImage" src="/static/img/LoneHenLogo.png"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#press">Press</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/events">Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/makers-notes/">Maker's Notes</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Shop
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/blog">Blog</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
            
        </Navbar>
      </div>
        );
    }
}
