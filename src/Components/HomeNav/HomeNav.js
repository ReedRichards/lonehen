import React from 'react';
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
          <NavbarBrand className="d-flex align-items-center" href="/">
            <img id="logoImage" src="/static/img/LoneHenLogo.png" alt=""/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" onClick={this.toggle}> <NavLink >Home</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/#about" onClick={this.toggle}><NavLink href="/#about">About</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/#press" onClick={this.toggle}><NavLink href="/#press">Press</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/events" onClick={this.toggle}><NavLink href="/events">Events</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/makers-notes" onClick={this.toggle}><NavLink href="/makers-notes/">Maker's Notes</NavLink></Link>
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
                <Link to="/blog" onClick={this.toggle}><NavLink href="/blog">Blog</NavLink></Link>
              </NavItem>
            </Nav>
          </Collapse>
            
        </Navbar>
      </div>
        );
    }
}
