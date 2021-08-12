import React, { Component } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";

import { Menu } from "semantic-ui-react";

export default class NavBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Router>
        <Menu>
          <Menu.Item
            as={NavLink}
            to="/#"
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/pokemon"
            name="pokemon"
            active={activeItem === "pokemon"}
            onClick={this.handleItemClick}
          >
            Pokemon
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/items"
            name="items"
            active={activeItem === "items"}
            onClick={this.handleItemClick}
          >
            Items
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/berries"
            name="berries"
            active={activeItem === "berries"}
            onClick={this.handleItemClick}
          >
            Berries
          </Menu.Item>
        </Menu>
      </Router>
    );
  }
}
