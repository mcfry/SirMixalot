import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer/Footer';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(App);
