import React from "react";

import PropTypes from "prop-types";
import { Visibility, Loader } from "semantic-ui-react";

export default class LazyLoad extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
  };

  static defaultProps = {
    size: `medium`,
  };

  state = {
    show: false,
  };

  showContent = () => {
    this.setState({
      show: true,
    });
  };

  render() {
    const { size, lazy, content } = this.props;
    if (!this.state.show) {
      return lazy ? (
        <Visibility as="span" onTopVisible={this.showContent}>
          <Loader active inline="centered" size={size} />
        </Visibility>
      ) : (
        content
      );
    }
    return this.props.content;
  }
}
