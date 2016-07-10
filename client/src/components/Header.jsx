import React, {PropTypes} from 'react';
import navItems from '../sample_data/nav_items';

const Header = React.createClass({
  propTypes: {
    username: PropTypes.string.isRequired
  },

  render() {
    const {username} = this.props;

    return (
      <header className="header">
        <div className="container">
          <ul className="header-nav-items list-unstyled clearfix">
            {navItems.map((navItem, i) => (
              <li className={navItem.active ? 'is-active' : null} key={i}>
                <a href={navItem.href}>{navItem.text}</a>
              </li>
            ))}
          </ul>
          <ul className="header-status-items list-unstyled clearfix">
            <li>
              <span>{`Signed in as ${username}`}</span>
            </li>
            <li>
              <a href="#!">{'Sign out'}</a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
});

export default Header;
