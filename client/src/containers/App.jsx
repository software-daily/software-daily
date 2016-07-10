import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Feed from '../containers/Feed';
import Header from '../components/Header';
import SiteControls from '../containers/SiteControls';

const App = React.createClass({
  propTypes: {
    auth: ImmutablePropTypes.mapContains({
      signedIn: PropTypes.bool.isRequired,
      user: ImmutablePropTypes.record
    }).isRequired
  },

  render() {
    const user = this.props.auth.get('user');

    return (
      <div>
        <Header username={user.get('username')} />
        <SiteControls title={'software daily.'} />
        <Feed />
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    auth: state.get('auth')
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
