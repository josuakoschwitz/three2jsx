import { PureComponent } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { withSceneContext } from "../Scene";

class Light extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(["ambient", "directional", "point"]).isRequired,
    color: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  };

  static defaultProps = {
    color: 0xffffff,
    x: 0,
    y: 0,
    z: 0
  };

  componentDidMount() {
    const { type, color, x, y, z } = this.props;
    let light;
    switch (type) {
      case "ambient":
        light = new THREE.AmbientLight(color);
        break;
      case "directional":
        light = new THREE.DirectionalLight(color);
        light.position.set(x, y, z).normalize();
        break;
      case "point":
        light = new THREE.PointLight(color, 2, 50);
        light.position.set(x, y, z);
        break;
      default:
        return;
    }
    this.props.scene.add(light);
  }

  render() {
    return null;
  }
}

export default withSceneContext(Light);
