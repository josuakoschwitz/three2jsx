import React, { PureComponent } from "react";
import * as THREE from "three";
import propsFromContext from "../lib/propsFromContext";

export const SceneContext = React.createContext({});
export const withSceneContext = Component =>
  propsFromContext(Component, SceneContext);

class Scene extends PureComponent {
  scene = new THREE.Scene();
  render() {
    return (
      <SceneContext.Provider value={{ scene: this.scene }}>
        {this.props.children}
      </SceneContext.Provider>
    );
  }
}

export default Scene;
