import React, { Component } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

class Renderer extends Component {
  static propTypes = {
    antialias: PropTypes.bool,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  static defaultProps = {
    antialias: true
  };

  state = {};

  wrapper = React.createRef();

  componentWillMount() {
    const { antialias } = this.props;
    this.renderer = new THREE.WebGLRenderer({ antialias });
  }

  render() {
    const { width, height } = this.props;
    this.renderer.setSize(width, height);
    return (
      <div ref={this.wrapper}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            renderer: this.renderer,
            width: this.props.width,
            height: this.props.height,
            timestamp: this.state.timestamp
          })
        )}
      </div>
    );
  }

  componentDidMount() {
    console.log(this.wrapper);
    this.wrapper.current.appendChild(this.renderer.domElement);
    this.frameId = requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    this.wrapper.current.removeChild(this.renderer.domElement);
    cancelAnimationFrame(this.frameId);
  }

  animate = timestamp => {
    this.setState({ timestamp });
    requestAnimationFrame(this.animate);
  };
}

export default Renderer;
