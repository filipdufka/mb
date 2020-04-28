import React, { Component } from "react";
import { Link } from "react-router-dom";
import { links } from "../links";



export default class Menu extends Component {
  menuItems = links.map((link) => (
    <li key={link.path}> 
      <Link to={link.path} >{link.name}</Link>
    </li>
  ));
  render() {
    return (
      <nav><ul>{this.menuItems} </ul></nav>
    );
  }
}



