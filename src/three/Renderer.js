import React, { Component } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import propsFromContext from "../lib/propsFromContext";

export const RenderContext = React.createContext({});
export const withRenderContext = Component =>
  propsFromContext(Component, RenderContext);

class Renderer extends Component {
  static propTypes = {
    antialias: PropTypes.bool,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onAnimate: PropTypes.func
  };

  static defaultProps = {
    antialias: true,
    onAnimate: () => {}
  };

  wrapper = React.createRef();

  state = {
    renderer: new THREE.WebGLRenderer({ antialias: this.props.antialias })
  };

  static getDerivedStateFromProps(nextProps) {
    const { antialias, ...addToContext } = nextProps;
    return addToContext; // REVIEW IF THIS IS REALLY BAD PRACTICE OR OKAY IN THIS PLACE!
  }

  render() {
    this.state.renderer.setSize(this.props.width, this.props.height);

    return (
      <div ref={this.wrapper}>
        <RenderContext.Provider value={this.state}>
          {this.props.children}
        </RenderContext.Provider>
      </div>
    );
  }

  // connect to the dom element
  componentDidMount() {
    this.wrapper.current.appendChild(this.state.renderer.domElement);
    this.frameId = requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    this.wrapper.current.removeChild(this.state.renderer.domElement);
    cancelAnimationFrame(this.frameId);
  }

  animate = timestamp => {
    this.setState({ timestamp });
    this.props.onAnimate(timestamp);
    requestAnimationFrame(this.animate);
  };
}

export default Renderer;
