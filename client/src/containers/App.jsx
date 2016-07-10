import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Feed from '../containers/Feed';
import SiteControls from '../containers/SiteControls';

const App = React.createClass({
  propTypes: {
    auth: ImmutablePropTypes.mapContains({
      signedIn: PropTypes.bool.isRequired,
      user: ImmutablePropTypes.record
    }).isRequired,
    children: PropTypes.node,
    params: PropTypes.object.isRequired
  },

  render() {
    const {auth, children, params} = this.props;
    const user = auth.get('user');

    return (
      <div>
        <Header username={user.get('username')} />
        <SiteControls title={'software daily.'} />
        <Feed activePostId={Number(params.postId)} />
        {children}
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
