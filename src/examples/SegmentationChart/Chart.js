import { PureComponent } from "react";
import * as THREE from "three";
import { withSceneContext } from "../../three/Scene";
import _ from "lodash";
import { subnetMatch } from "ipaddr.js";

function createArc(inner, outer, start, end, height) {
  const bs = 0.08;
  const full = end - start - 1 > -1e-5;
  const center = inner < bs;

  const a1 = start * 2 * Math.PI;
  const a2 = end * 2 * Math.PI;
  const ac = (a2 + a1) / 2;
  const aiCorr = full ? 0 : Math.asin(bs / inner);
  const aoCorr = full ? 0 : Math.asin(bs / outer);

  const ri = inner + (center ? 1e-5 : bs);
  const ro = outer - bs;

  const shape = new THREE.Shape();
  if (full) {
    shape.absarc(0, 0, ro, a1 + aoCorr, ac, false);
    shape.absarc(0, 0, ro, ac, a2 - aoCorr, false);
    shape.absarc(0, 0, ri, a2 - aiCorr, ac, true);
    shape.absarc(0, 0, ri, ac, a1 + aiCorr, true);
  } else {
    shape.absarc(0, 0, ro, a1 + aoCorr, a2 - aoCorr, false);
    shape.absarc(0, 0, ri, a2 - aiCorr, a1 + aiCorr, true);
  }

  var extrudeSettings = {
    amount: height,
    bevelEnabled: true,
    bevelSegments: 4, // default 3
    curveSegments: Math.round(((a2 - a1) / (2 * Math.PI)) * ro * 10),
    steps: 1,
    bevelSize: bs,
    bevelThickness: 0.05
  };
  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  // curveSegments — int. ,
  // steps — int. Number of points used for subdividing segments along the depth of the extruded spline. Default is 1
  // depth — float. Depth to extrude the shape. Default is 100.
  // bevelEnabled — bool. Apply beveling to the shape. Default is true.
  // bevelThickness — float. How deep into the original shape the bevel goes. Default is 6.
  // bevelSize — float. Distance from the shape outline that the bevel extends. Default is bevelThickness - 2.
  // extrudePath — THREE.CurvePath. A 3D spline path along which the shape should be extruded.

  // geometry.center();
  geometry.mergeVertices();
  return geometry;
}

function createSegment(amount, inner, outer, start, end, height) {
  const arcFactor = 1 - amount;
  const arcOff = Math.max(0, amount - 0.5) / 2;

  // experimental
  const assumedHeight = 7.8;
  // const radiusOff = 5 * (2 ** amount - 1);
  const radiusOff = (assumedHeight * (1 / arcFactor - 1)) / 3;

  console.log(arcFactor, radiusOff);
  // 0.9 --- 15
  // 0.99 --- 150

  // equal volumes in radar
  const RadiusFn = r => Math.sqrt(r ** 2 / arcFactor + radiusOff ** 2);

  // call morped segement
  const segment = createArc(
    RadiusFn(inner),
    RadiusFn(outer),
    start * arcFactor + arcOff,
    end * arcFactor + arcOff,
    height
  );
  segment.translate(0, -radiusOff - amount * assumedHeight * 0.8, 0);
  segment.rotateX(2 * arcOff * Math.PI);
  return segment;
}

// const randHex = (from, to) => Math.floor(from + Math.random() * (to - from));

const material = color =>
  new THREE.MeshPhongMaterial({
    color,
    metalness: 0.2,
    roughness: 0.3
  });

const iterateLevel = (
  // incoming
  group,
  values,
  morph,
  // from parent to align children
  arcLengthRange = 1,
  arcLengthOffset = 0,
  arcHeightOffset = 0,
  // from parent as fallback
  color = 0x000000,
  // aggregates (to pass back down)
  sumHeight = 0
) => {
  const norm = 1 / _.sumBy(values || [], "arcLength") || 0;
  values.reduce((start, value) => {
    const delta = norm * arcLengthRange * value.arcLength || arcLengthRange;
    const outer = arcHeightOffset + value.arcHeight;
    const end = start + delta;
    const actualColor = value.color || color;
    sumHeight += value.arcHeight;
    if (value.children && value.children.length) {
      iterateLevel(
        group,
        value.children,
        morph,
        delta,
        start,
        outer,
        actualColor,
        sumHeight
      );
    }
    if (value.arcLength) {
      group.add(
        new THREE.Mesh(
          createSegment(morph, arcHeightOffset, outer, start, end, value.depth),
          material(actualColor)
        )
      );
    }
    return end;
  }, arcLengthOffset);
};

class Chart extends PureComponent {
  updateMeshes() {
    const { scene } = this.props;
    // cleanup
    if (this.group) {
      scene.remove(this.group);
    }
    this.group = new THREE.Group("chart");
    iterateLevel(this.group, this.props.data, this.props.morph);
    this.group.rotateX(-Math.PI / 2);
    scene.add(this.group);
  }
  componentWillMount() {
    this.updateMeshes();
  }
  componentDidUpdate() {
    this.updateMeshes();
  }
  render() {
    return null;
  }
}
export default withSceneContext(Chart);
