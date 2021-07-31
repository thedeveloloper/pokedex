import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class NavBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name="pokemon"
          active={activeItem === "pokemon"}
          onClick={this.handleItemClick}
        >
          Pokemon
        </Menu.Item>

        <Menu.Item
          name="items"
          active={activeItem === "items"}
          onClick={this.handleItemClick}
        >
          Items
        </Menu.Item>
      </Menu>
    );
  }
}
