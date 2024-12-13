import { Color } from "three";
// import { element } from "three/webgpu";
//import { mod } from "three/webgpu";
import { IfcViewerAPI } from "web-ifc-viewer";

const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({
  container,
  backgroundColor: new Color(0xffffff),
});

// Create grid and axes
viewer.grid.setGrid();
viewer.axes.setAxes();

const input = document.getElementById("file-input");

//const input = document.getElementById("file-input");
// Listen for file input change and load the IFC file
input.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    loadIfc(URL.createObjectURL(file));
  }
});
//loadIfc("./small.ifc");

async function loadIfc(url) {
  // Load the model
  const model = await viewer.IFC.loadIfcUrl(url);

  // Add dropped shadow and post-processing efect
  await viewer.shadowDropper.renderShadow(model.modelID);
  viewer.context.renderer.postProduction.active = true;
}

window.ondblclick = async () => await viewer.IFC.selector.pickIfcItem();
window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();
