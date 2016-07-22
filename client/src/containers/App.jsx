import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Feed from '../containers/Feed';
import SiteControls from '../containers/SiteControls';
import {userShape} from '../models/User';

const App = React.createClass({
  propTypes: {
    auth: PropTypes.shape({
      signedIn: PropTypes.bool.isRequired,
      user: PropTypes.shape(userShape)
    }).isRequired,
    children: PropTypes.node,
    params: PropTypes.object.isRequired
  },

  render() {
    const {auth, children, params} = this.props;
    const user = auth.user;
    const activePostId = Number(params.postId);

    return (
      <div>
        <Header username={user.username} />
        <SiteControls title={'software daily.'} />
        <Feed activePostId={activePostId} />
        {children}
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
