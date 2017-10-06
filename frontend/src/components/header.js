import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return <ul className="navbar navbar-nav navbar-right">
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      </ul>
    } else {
      // show a link to sign in or sign up
      return [
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
        </ul>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-dark navbar-custom navbar-fixed-top" style={{marginBottom:"50px"}}>
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">Smart bell</Link>
          
        </div>
        <div className="navbar navbar-slim">
            {this.renderLinks()}
          </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.bell.authenticated
  };
}

export default connect(mapStateToProps)(Header);
