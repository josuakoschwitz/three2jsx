import React, { PureComponent } from "react";
import * as THREE from "three";
import propsFromContext from "../lib/propsFromContext";

export const SceneContext = React.createContext({});
export const withSceneContext = Component =>
  propsFromContext(Component, SceneContext);

class Scene extends PureComponent {
  static defaultProps = {
    background: 0xffffff,
    fog: 0xdddddd
  };

  constructor(props) {
    super(props);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(props.background);
    scene.fog = new THREE.FogExp2(props.fog, 0.01);
    this.state = { scene };
  }
  render() {
    return (
      <SceneContext.Provider value={this.state}>
        {this.props.children}
      </SceneContext.Provider>
    );
  }
}

export default Scene;
