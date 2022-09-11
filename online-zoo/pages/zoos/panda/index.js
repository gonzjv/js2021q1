//Stream samples carousel
//get html elements
const mainElem = document.querySelector(".main-stream");
const samplesContainer = document.querySelector(".samples");

//add listeners
samplesContainer.addEventListener("click", (event) => {
  event.target.preventDefault;
  let src = event.target.dataset.src;
  console.log("event.target:", event.target);

  if (!src) {
    return;
  }
  let tempSrc = mainElem.src;
  mainElem.src = event.target.src;
  const iFrame = event.target.querySelector(".sample-stream");
  iFrame.src = tempSrc;
  console.log("tempSrc:", tempSrc);
  console.log("mainElem.src:", mainElem.src);
  console.log("iFrame.src:", iFrame.src);
  // update(newActive);
});

// const update = function (newActive) {
//   const newActivePos = newActive.dataset.pos;

//   const current = elems.find((elem) => elem.dataset.pos == 0);
//   console.log("current:", current);
//   const prev = elems.find((elem) => elem.dataset.pos == -1);
//   console.log("prev:", prev);
//   const next = elems.find((elem) => elem.dataset.pos == 1);
//   console.log("next:", next);
//   const first = elems.find((elem) => elem.dataset.pos == -2);
//   const last = elems.find((elem) => elem.dataset.pos == 2);

//   // current.classList.remove("photos-item_active");

//   [current, prev, next, first, last].forEach((item) => {
//     var itemPos = item.dataset.pos;

//     item.dataset.pos = getPos(itemPos, newActivePos);
//   });
// };

// const getPos = function (current, active) {
//   const diff = current - active;

//   if (Math.abs(current - active) > 2) {
//     return -current;
//   }

//   return diff;
// };
