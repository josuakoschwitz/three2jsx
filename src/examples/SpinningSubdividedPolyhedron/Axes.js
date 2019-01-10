import { PureComponent } from "react";
import * as THREE from "three";
import { withSceneContext } from "../../three/Scene";
import _ from "lodash";

const DEG90 = Math.PI / 2;

class Axes extends PureComponent {
  componentWillMount() {
    const group = new THREE.Group();
    this.props.scene.add(group);

    group.add(
      arrow(0xff0000).rotateZ(-DEG90),
      lineArray(0xff0000)
        .rotateX(DEG90)
        .rotateZ(DEG90),
      // lineArray(0xff0000).rotateZ(DEG90),
      arrow(0x00ff00),
      // lineArray(0x00ff00),
      // lineArray(0x00ff00).rotateY(DEG90),
      arrow(0x0000ff).rotateX(DEG90),
      lineArray(0x0000ff).rotateX(DEG90)
      // lineArray(0x0000ff).rotateX(DEG90).rotateY(DEG90)
    );
  }

  render() {
    return null;
  }
}

export default withSceneContext(Axes);

function material(color) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: 0x020202
  });
}

function arrow(color, direction, length = 7, width = 0.1) {
  const r = width / 2;
  const rt = 2.5 * r;
  const lt = 2.5 * rt;
  const line = new THREE.CylinderGeometry(r, r, length - lt, 16, 1, true);
  line.translate(0, (length - lt) / 2, 0);
  const tip = new THREE.ConeGeometry(rt, lt, 12, 1, false);
  tip.translate(0, length - lt, 0);
  const geometry = new THREE.Geometry();
  geometry.merge(line);
  geometry.merge(tip);
  geometry.mergeVertices();
  return new THREE.Mesh(geometry, material(color));
}

function lineArray(color, direction, size = 40) {
  size = Math.floor(size);
  const geometry = new THREE.Geometry();
  for (let i = -size; i <= size; i++) {
    geometry.vertices.push(
      new THREE.Vector3(i, -size, 0),
      new THREE.Vector3(i, +size, 0)
    );
  }
  return new THREE.LineSegments(geometry, material(color));
}
