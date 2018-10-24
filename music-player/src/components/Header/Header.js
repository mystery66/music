import React,{ Component } from 'react'
import logo from '../../static/img/logo.png'
import './Header.css'

class Header extends Component {
  render() {
    return(
      <div className="header">
        <img src={logo} width="40" alt="logo" />
         <h1 className="caption">Music Player</h1>
      </div>
    );
  }
}
export default Header;