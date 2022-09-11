//'How it works' carousel
//get html elements
const photosList = document.querySelector(".photos");
const photosItems = document.querySelectorAll(".photos-item");
const elems = Array.from(photosItems);
photosList.addEventListener("click", function (event) {
  var newActive = event.target;
  var isItem = newActive.closest(".photos-item");

  // if (!isItem || newActive.classList.contains("photos-item_active")) {
  if (!isItem) {
    return;
  }

  update(newActive);
});

const update = function (newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  console.log("current:", current);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  console.log("prev:", prev);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  console.log("next:", next);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);

  // current.classList.remove("photos-item_active");

  [current, prev, next, first, last].forEach((item) => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos);
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current;
  }

  return diff;
};

// 'Pets in zoo' carousel
const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

let slideIndex = 0;

let width = carousel.offsetWidth;
let imgWidth = document.querySelector(".item").offsetWidth;
window.addEventListener("resize", (e) => {
  width = carousel.offsetWidth;
  imgWidth = document.querySelector(".item").offsetWidth;
});

const slideRightFunc = () => {
  console.log("slideIndex before:", slideIndex);
  slideIndex += 4;
  console.log("slideIndex after:", slideIndex);
  if (slideIndex > 0) {
    prev.style.display = "flex";
  }
  if (slideIndex >= 8) {
    next.style.display = "none";
  }
  if (slideIndex > 8) {
    slideIndex = 0;
    prev.style.display = "none";
    next.style.display = "flex";
  }
  carousel.scrollTo((imgWidth + gap) * slideIndex, 0);
};

// let autoSlideTimeout = null;
let autoSlideInterval = null;

next.addEventListener("click", (e) => {
  // clearInterval(autoSlideInterval);
  // slideRightFunc();
  // autoSlideInterval = setInterval(slideRightFunc, 3000);
  console.log("slideIndex before:", slideIndex);
  slideIndex += 4;
  console.log("slideIndex after:", slideIndex);
  carousel.scrollTo((imgWidth + gap) * slideIndex, 0);
  // if (slideIndex > 0) {
  //   // prev.style.visibility = "visible";
  // }
  if (slideIndex > 20) {
    slideIndex = 0;
    carousel.scrollTo(-(imgWidth + gap) * 20, 0);
    // next.style.visibility = "hidden";
  }
});
prev.addEventListener("click", (e) => {
  // clearInterval(autoSlideInterval);
  // slideLeftFunc();
  // autoSlideInterval = setInterval(slideLeftFunc, 3000);
  console.log("slideIndex before:", slideIndex);
  slideIndex -= 4;
  console.log("slideIndex after:", slideIndex);
  carousel.scrollTo((imgWidth + gap) * slideIndex, 0);
  // if (slideIndex < 8) {
  //   next.style.visibility = "visible";
  // }
  if (slideIndex < 0) {
    // prev.style.visibility = "hidden";
    slideIndex = 20;
    carousel.scrollTo((imgWidth + gap) * 20, 0);
  }
});

// let autoSlideTimeout = null;
// let autoSlideInterval = setInterval(slideFunc, 3000);

// const delayAutoSliding = () => {
//   clearTimeout(autoSlideTimeout);
//   clearInterval(autoSlideInterval);
//   autoSlideInterval = null;

//   autoSlideTimeout = setTimeout(() => {
//     clearInterval(autoSlideInterval);
//     autoSlideInterval = setInterval(slideRightFunc, 3000);
//   }, 3000);
// };

// carousel.addEventListener("click", delayAutoSliding);

//Donate pop-up
//get html elements for Donate pop-up
const coverItem = document.getElementById("cover");
const donatePopup = document.getElementById("donate-popup");
const donateButton = document.getElementById("donate");
const closeDonateButton = document.getElementById("close-donate");
const closeCardButton = document.getElementById("close-card");
const petWrap = document.getElementById("pet-wrap");
const petField = document.getElementById("pet");
const amount = document.getElementById("amount");
const valueField = document.getElementById("value");
const nextButton = document.getElementById("next-button");
const cardPopup = document.getElementById("card-popup");
const cardNumberWrap = document.getElementById("card-number-wrap");
const cardNumberField = document.getElementById("card-number");
const monthWrap = document.getElementById("month-wrap");
const monthField = document.getElementById("month");
const yearWrap = document.getElementById("year-wrap");
const yearField = document.getElementById("year");
const nameWrap = document.getElementById("name-wrap");
const nameField = document.getElementById("name");
const cvcWrap = document.getElementById("cvc-wrap");
const cvcField = document.getElementById("cvc");
const donatePayButton = document.getElementById("donate-button");

//validate.functions
const validateAnimal = () => {
  // console.log("petField is:", petField.validity.valid);
  // console.log("valueField is:", valueField.validity.valid);
  if (petField.validity.valid) {
    petWrap.style.setProperty("--displayPet", "none");
  } else {
    petWrap.style.setProperty("--displayPet", "block");
  }
  if (valueField.validity.valid) {
    amount.style.setProperty("--displayAmount", "none");
  } else {
    amount.style.setProperty("--displayAmount", "block");
  }
  if (petField.validity.valid && valueField.validity.valid) {
    nextButton.classList.remove("invalid");
  } else {
    nextButton.classList.add("invalid");
  }
};
const validatePay = () => {
  // console.log("petField is:", petField.validity.valid);
  // console.log("valueField is:", valueField.validity.valid);
  if (cardNumberField.validity.valid) {
    cardNumberWrap.style.setProperty("--displayCardNumber", "none");
  } else {
    cardNumberWrap.style.setProperty("--displayCardNumber", "block");
  }
  if (monthField.validity.valid) {
    monthWrap.style.setProperty("--displayMonth", "none");
  } else {
    monthWrap.style.setProperty("--displayMonth", "block");
  }
  if (yearField.validity.valid) {
    yearWrap.style.setProperty("--displayYear", "none");
  } else {
    yearWrap.style.setProperty("--displayYear", "block");
  }
  if (nameField.validity.valid) {
    nameWrap.style.setProperty("--displayName", "none");
  } else {
    nameWrap.style.setProperty("--displayName", "block");
  }
  if (cvcField.validity.valid) {
    cvcWrap.style.setProperty("--displayCvc", "none");
  } else {
    cvcWrap.style.setProperty("--displayCvc", "block");
  }
  if (
    cardNumberField.validity.valid &&
    monthField.validity.valid &&
    yearField.validity.valid &&
    nameField.validity.valid &&
    cvcField.validity.valid
  ) {
    donatePayButton.classList.remove("invalid");
  } else {
    donatePayButton.classList.add("invalid");
  }
};

//validate.listeners
donateButton.addEventListener("click", () => {
  document.body.classList.add("notScrollable");
  coverItem.classList.remove("hidden");
  donatePopup.classList.remove("hidden");
});
nextButton.addEventListener("click", () => {
  if (!nextButton.classList.contains("invalid")) {
    // document.body.classList.add("notScrollable");
    // coverItem.classList.remove("hidden");
    donatePopup.classList.add("hidden");
    cardPopup.classList.remove("hidden");
  }
});
coverItem.addEventListener("click", () => {
  document.body.classList.remove("notScrollable");
  coverItem.classList.add("hidden");
  donatePopup.classList.add("hidden");
  cardPopup.classList.add("hidden");
});
closeDonateButton.addEventListener("click", () => {
  console.log("close button is pushed");
  document.body.classList.remove("notScrollable");
  coverItem.classList.add("hidden");
  donatePopup.classList.add("hidden");
});
closeCardButton.addEventListener("click", () => {
  console.log("close button is pushed");
  document.body.classList.remove("notScrollable");
  coverItem.classList.add("hidden");
  cardPopup.classList.add("hidden");
});
petField.addEventListener("input", () => {
  validateAnimal();
});
valueField.addEventListener("input", () => {
  validateAnimal();
});
cardNumberField.addEventListener("input", () => {
  validatePay();
});
monthField.addEventListener("input", () => {
  validatePay();
});
yearField.addEventListener("input", () => {
  validatePay();
});
nameField.addEventListener("input", () => {
  validatePay();
});
cvcField.addEventListener("input", () => {
  validatePay();
});
donatePayButton.addEventListener("click", () => {
  if (!donatePayButton.classList.contains("invalid")) {
    coverItem.classList.add("hidden");
    cardPopup.classList.add("hidden");
    alert('Thank you for your donation"');
  }
});
