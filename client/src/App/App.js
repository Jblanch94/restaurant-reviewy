import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUser } from 'actions';
import 'App/App.css';
import Routes from 'Routes/Routes';

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.props.fetchUser();
    }
  }

  render() {
    return <Routes user={this.props.user} auth={this.props.auth} />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(App);
