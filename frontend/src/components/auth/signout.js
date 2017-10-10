import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Sorry to see you go...{alert("You successfully signed out")}{window.location = "/"}</div>;
  }
}

export default connect(null, actions)(Signout);
