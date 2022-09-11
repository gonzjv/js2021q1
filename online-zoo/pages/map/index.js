const mapWrap = document.getElementById("map-wrap");
const mapContainer = document.getElementById("main");
const mapImage = document.getElementById("map");
const headerElem = document.getElementById("header");
const footerElem = document.getElementById("footer");
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

let topIndent = 0;
let leftIndent = 0;

const calculateCoords = (e, elem) => {
  var box = elem.getBoundingClientRect();
  topIndent = e.pageY - box.top + pageYOffset;
  leftIndent = e.pageX - box.left + pageXOffset;
  // console.log("box.left:", box.left);
  // console.log("pageXOffset:", pageXOffset);
  // console.log("pageYOffset:", pageYOffset);
  // console.log("topIndent:", topIndent);
  // console.log("leftIndent:", leftIndent);
};

const moveAt = (e) => {
  // console.log("pageX:", e.pageX);
  // console.log("pageY:", e.pageY);
  let leftAdjust = mapContainer.getBoundingClientRect().left;
  mapWrap.style.left = e.pageX - leftAdjust - leftIndent + "px";
  if (e.pageX >= mapContainer.offsetWidth + leftAdjust) {
    stopDrag();
  } else if (e.pageX <= leftAdjust) {
    stopDrag();
  }
  // console.log("leftAdjust:", leftAdjust);
  // console.log("style.left:", mapImage.style.left);
  let topAdjust = mapContainer.getBoundingClientRect().top;
  // console.log("topAdjust:", topAdjust);
  mapWrap.style.top = e.pageY - topAdjust - topIndent + pageYOffset + "px";
  if (e.pageY >= mapContainer.offsetHeight + topAdjust + pageYOffset) {
    stopDrag();
  } else if (e.pageY <= topAdjust) {
    stopDrag();
  }
};

const stopDrag = () => {
  document.removeEventListener("mousemove", moveAt);
  mapWrap.removeEventListener("mouseup", stopDrag);
};

mapWrap.addEventListener("mousedown", (e) => {
  if (mapImage.width <= mapContainer.offsetWidth) {
    return;
  }

  calculateCoords(e, mapWrap);

  moveAt(e);

  document.addEventListener("mousemove", moveAt);
  mapWrap.addEventListener("mouseup", stopDrag);
});

mapWrap.ondragstart = function () {
  return false;
};
// headerElem.addEventListener("mouseenter", stopDrag);
// footerElem.addEventListener("mouseenter", stopDrag);

zoomInButton.addEventListener("click", () => {
  if (mapImage.width <= mapContainer.offsetWidth * 2) {
    mapImage.style.width = `${mapImage.width * 1.25}px`;
    mapWrap.style.width = mapImage.style.width;
    mapWrap.style.height = `${mapImage.offsetHeight}px`;
    console.log("mapImage:", mapImage.style.width);
    console.log("mapWrap.style.width:", mapWrap.style.width);
    console.log("mapWrap.style.height:", mapWrap.style.height);
  }
});
zoomOutButton.addEventListener("click", () => {
  if (mapImage.width >= mapContainer.offsetWidth) {
    mapImage.style.width = `${mapImage.width / 1.25}px`;
    mapWrap.style.width = mapImage.style.width;
    mapWrap.style.height = `${mapImage.offsetHeight}px`;
    if (mapImage.width <= mapContainer.offsetWidth) {
      mapImage.style.width = `${mapContainer.offsetWidth}px`;
      mapWrap.style.width = mapImage.style.width;
      mapWrap.style.height = mapImage.style.height;
      mapWrap.style.top = "0px";
      mapWrap.style.left = "0px";
    }
  }
});
