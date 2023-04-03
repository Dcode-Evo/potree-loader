import { Raycaster, Vector2, Vector3 } from 'three';
import { PointCloudOctree } from '../dist';
import { Viewer } from './viewer';

import './main.css';

const targetEl = document.createElement('div');
targetEl.className = 'container';
document.body.appendChild(targetEl);

const viewer = new Viewer();
viewer.initialize(targetEl);
const camera = viewer.camera;
camera.far = 1000;
camera.updateProjectionMatrix();
camera.position.set(0, 0, 10);
camera.lookAt(new Vector3());

let pointCloud: PointCloudOctree | undefined;
let loaded: boolean = false;

const unloadBtn = document.createElement('button');
unloadBtn.textContent = 'Unload';
unloadBtn.addEventListener('click', () => {
  if (!loaded) {
    return;
  }

  viewer.unload();
  loaded = false;
  pointCloud = undefined;
});

viewer
  .load(
    'metadata.json',
    'https://static.thelostmetropolis.org/BigShotCleanV2/',
  )
  .then(pco => {
    pointCloud = pco;
    pointCloud.material.size = 1.0;
    pointCloud.material.shape = 2;
    // pointCloud.material.outputColorEncoding = 1;
    pointCloud.position.set(0, -2, 1);
    pointCloud.scale.set(.1, .1, .1);
    viewer.add(pco);

    viewer.renderer.domElement.addEventListener('mousemove', (e) => {
      const event = e as MouseEvent;
      pointer.x = ((event as MouseEvent).clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((event as MouseEvent).clientY / window.innerHeight) * 2 + 1;
      const mouseOnCloud = getMousePositionOnCloud(pco);
      if (mouseOnCloud) {
        const { x, y, z } = mouseOnCloud;
        console.log(x, y, z);
      }
    });
  })
  .catch(err => console.error(err));

const pointer = new Vector2();


const raycaster = new Raycaster();
if (raycaster.params.Points) {
  raycaster.params.Points.threshold = 0.1;
}

function getMousePositionOnCloud(pointCloud: PointCloudOctree): Vector3 | null {
  raycaster.setFromCamera(new Vector2(pointer.x, pointer.y), viewer.camera);
  // update the picking ray with the camera and pointer position
  // get a point from the point cloud intersecting the picking ray
  const point = pointCloud.pick(viewer.renderer, viewer.camera, raycaster.ray);
  return point?.position || null;
}

