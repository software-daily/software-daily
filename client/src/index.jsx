import 'babel-polyfill';
import './_assets/styles/index.pcss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Redirect, Router, Route, browserHistory} from 'react-router';
import App from './containers/App';
import AuthorDetail from './containers/AuthorDetail';
import PostDetail from './containers/PostDetail';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/authors/:authorUsername" component={AuthorDetail} />
        <Route path="/posts/:postId" component={PostDetail} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  </Provider>,
  document.getElementById('react-dom')
);
