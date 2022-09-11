//get elements
const filters = document.querySelector(".filters");
const buttons = document.querySelector(".btn-container");
const filtersInputs = filters.getElementsByTagName("input");
const canvas = document.querySelector("canvas");
const defaultSrc = "assets/img/img.jpg";
const outsideSrc =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
const fullScreen = document.querySelector(".fullscreen");

function drawImage(src) {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };
}
drawImage(defaultSrc);

//apply filters
filters.addEventListener("input", (e) => {
  console.log(e.target.name);
  console.log(e.target.value);
  // console.log(filters);

  const suffix = e.target.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${e.target.name}`,
    e.target.value + suffix
  );
  // console.log(e.target.nextSibling.value);
  // console.log(e.target.nextSibling);
  // console.log(e.target.nextElementSibling);
  e.target.nextElementSibling.value = e.target.value;
});

//handling buttons
let counter = 00;
buttons.addEventListener("click", (e) => {
  // console.log(e.target.innerText);
  // console.log(filters.getElementsByTagName("input"));
  // console.log(Array.from(filtersInputs));

  // Reset button
  if (e.target.classList.contains("btn-reset")) {
    Array.from(filtersInputs).forEach((elem) => {
      elem.value = elem.defaultValue;
      const suffix = elem.dataset.sizing || "";
      const defVal = elem.name == "saturate" ? 100 : 0;
      document.documentElement.style.setProperty(
        `--${elem.name}`,
        defVal + suffix
      );
      elem.nextElementSibling.value = defVal;
    });
  }
  //Next button
  else if (e.target.classList.contains("btn-next")) {
    // document.getElementsByTagName("img").src =
    //   "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg";
    let d = new Date();
    let time =
      d.getHours() < 6
        ? "night"
        : d.getHours() < 12
        ? "morning"
        : d.getHours() < 18
        ? "day"
        : "evening";
    counter++;
    if (counter > 20) {
      counter = 1;
    }
    let imgNumber = counter.toString().padStart(2, 0);

    console.log(document.getElementsByTagName("img"));
    console.log("counter:", imgNumber);
    console.log("current hours:", d.getHours(), "BY");
    console.log("time of day:", time);

    // document.getElementById(
    //   "img-test"
    // ).src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${imgNumber}.jpg`;
    let srcNext = `${outsideSrc}${time}/${imgNumber}.jpg`;
    drawImage(srcNext);
  }
  // Save button
  else if (e.target.classList.contains("btn-save")) {
    // console.log(canvas.toDataURL());
    var link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  }
});

//load image with Filereader
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener("change", function (e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    // document.getElementById("img-test").src = reader.result;
    drawImage(reader.result);
  };
  reader.readAsDataURL(file);
});
//fullscreen
const fullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
fullScreen.addEventListener("mousedown", fullscreen);
