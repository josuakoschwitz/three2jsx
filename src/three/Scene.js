import React, { PureComponent } from "react";
import * as THREE from "three";

import { RenderContext } from "./Renderer";

class Scene extends PureComponent {
  static contextType = RenderContext;

  componentWillMount() {
    const { width, height } = this.context;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.y = 1;
    this.camera.position.z = 10;
  }

  render() {
    const { renderer, width, height } = this.context;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    renderer.render(this.scene, this.camera);

    return (
      <RenderContext.Consumer>
        {context =>
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              scene: this.scene,
              timestamp: context.timestamp
            })
          ) || null
        }
      </RenderContext.Consumer>
    );
  }
}

export default Scene;
