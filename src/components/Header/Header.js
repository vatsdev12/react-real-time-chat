import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  // sidebarMinimize(e) {
  //   e.preventDefault();
  //   document.body.classList.toggle('sidebar-minimized');
  // }

    brandMinimize() {
        document.body.classList.toggle('brand-minimized');
    }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

    sidebarMinimize() {
        document.body.classList.toggle('sidebar-minimized');
    }

    brandMinimize() {
        document.body.classList.toggle('brand-minimized');
    }

  render() {
    return (
      <header className="app-header navbar">
              <div className="media-loader">
    <div className="media-loader-in">
    <img src={'img/bars.svg'}  width="40" alt=""/>
    </div>
</div>
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#">
        <img src="" alt=""/>
        </NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={(event) => { this.sidebarMinimize(); this.brandMinimize() }}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>

        <Nav className="ml-auto" navbar>

          <HeaderDropdown accnt/>
        </Nav>

      </header>
    );
  }
}

export default Header;
