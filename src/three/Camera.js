import React, { PureComponent } from "react";
import * as THREE from "three";

import propsFromContext from "../lib/propsFromContext";
import { RenderContext } from "./Renderer";
import { SceneContext } from "./Scene";

class Camera extends PureComponent {
  static defaultProps = {
    x: 0,
    y: 0,
    z: 0
  };

  componentWillMount() {
    const { x, y, z, width, height } = this.props;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(x, y, z);
  }

  render() {
    const { renderer, scene, width, height } = this.props;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    renderer.render(scene, this.camera);
    return null;
  }
}

export default propsFromContext(Camera, RenderContext, SceneContext);
