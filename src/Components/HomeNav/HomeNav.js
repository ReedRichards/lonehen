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
import {Link} from 'react-router-dom';
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
               <Link to="/"> <NavLink href="/">Home</NavLink></Link>
              </NavItem>
              <NavItem>
             <Link to="/#about"><NavLink href="/#about">About</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/#press"><NavLink href="/#press">Press</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/events"><NavLink href="/events">Events</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/makers-notes"><NavLink href="/makers-notes/">Maker's Notes</NavLink></Link>
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
                <Link to="/blog"><NavLink href="/blog">Blog</NavLink></Link>
              </NavItem>
            </Nav>
          </Collapse>
            
        </Navbar>
      </div>
        );
    }
}
