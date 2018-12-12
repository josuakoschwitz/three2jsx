import { PureComponent } from "react";
import * as THREE from "three";
import SubdivisionModifier from "three-subdivision-modifier";
import _ from "lodash";

const material = new THREE.MeshPhysicalMaterial({
  color: 0xdddddd,
  specular: 0x009900,
  shininess: 30,
  transparent: true
});

const materialWire = new THREE.MeshPhysicalMaterial({
  color: 0xdddddd,
  specular: 0x009900,
  shininess: 30,
  transparent: true,
  wireframe: true
});

const materialWireBlack = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
  wireframeLinewidth: 2
});

const tetraR = 1 / Math.sqrt(3);
const tetraH = Math.sqrt(5 / 12);
const tetraY = tetraH * (Math.cbrt(1 / 2) - 1 / 2);

class SubidideDemo extends PureComponent {
  get getGeometry() {
    const { size: s, shape } = this.props;
    switch (shape) {
      case "tetra": {
        // const tetra = new THREE.ConeGeometry(tetraR * s, tetraH * s, 3);
        // tetra.translate(0, s * tetraY, 0);
        // return tetra;
        return new THREE.TetrahedronGeometry(s);
      }
      case "hexa":
        return new THREE.BoxGeometry(s, s, s);
      case "octa": {
        // const upper = new THREE.ConeGeometry(
        //   s / Math.sqrt(2),
        //   s / Math.sqrt(2),
        //   4,
        //   1,
        //   true
        // );
        // upper.translate(0, s / Math.sqrt(8), 0);
        // const lower = upper.clone();
        // lower.rotateX(Math.PI);
        // const octa = new THREE.Geometry();
        // octa.merge(lower);
        // octa.merge(upper);
        // octa.mergeVertices();
        // return octa;
        return new THREE.OctahedronGeometry(s);
      }
      case "icosa": {
        return new THREE.IcosahedronGeometry(s);
      }
      case "dodeca": {
        return new THREE.DodecahedronGeometry(s);
      }
      default: {
        return new THREE.Geometry();
      }
    }
  }

  componentWillMount() {
    const { subdivide } = this.props;
    this.group = new THREE.Group();
    this.props.scene.add(this.group);

    const geometry = this.getGeometry;

    _.times(_.clamp(subdivide, 0, 3), i => {
      const geometrySub = geometry.clone();
      const morifier = new SubdivisionModifier(i);
      morifier.modify(geometrySub);
      const mesh = new THREE.Mesh(geometrySub, materialWire);
      this.group.add(mesh);
    });

    const geometrySub = geometry.clone();
    const modifier = new SubdivisionModifier(subdivide);
    modifier.modify(geometrySub);

    this.group.add(new THREE.Mesh(geometrySub, material));
    this.group.add(new THREE.Mesh(geometrySub, materialWireBlack));
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

export default SubidideDemo;
