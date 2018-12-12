import React, { PureComponent } from "react";
import * as THREE from "three";

class Scene extends PureComponent {
  componentWillMount() {
    const { width, height } = this.props;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.y = 1;
    this.camera.position.z = 10;
  }

  render() {
    const { renderer, width, height } = this.props;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    renderer.render(this.scene, this.camera);

    return (
      React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          scene: this.scene,
          timestamp: this.props.timestamp
        })
      ) || null
    );
  }
}

export default Scene;
