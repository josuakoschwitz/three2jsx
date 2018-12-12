import { PureComponent } from "react";
import * as THREE from "three";

class Planes extends PureComponent {
  componentWillMount() {
    const { size, segments } = this.props;
    const material = new THREE.MeshPhongMaterial({
      color: 0x888888,
      // wireframe: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });

    this.group = new THREE.Group();
    this.props.scene.add(this.group);

    const PlaneZ = new THREE.PlaneGeometry(size, size, segments, segments);
    this.group.add(new THREE.Mesh(PlaneZ, material));

    const PlaneY = PlaneZ.clone();
    PlaneY.rotateX(Math.PI / 2);
    this.group.add(new THREE.Mesh(PlaneY, material));

    const PlaneX = PlaneZ.clone();
    PlaneX.rotateY(Math.PI / 2);
    this.group.add(new THREE.Mesh(PlaneX, material));
  }

  render() {
    // prettier-ignore
    const correct = ((this.props.timestamp - this.lastTimestamp) * 60 / 1000) || 0;
    if (correct) {
      this.group.rotation.x += 0.012 * correct;
      this.group.rotation.y += 0.011 * correct;
    }
    this.lastTimestamp = this.props.timestamp;
    return null;
  }
}

export default Planes;
