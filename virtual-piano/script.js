const collection = document.querySelectorAll(".piano-key");
const btns = document.querySelectorAll(".btn");
const piano = document.getElementById("piano");
const mode = document.getElementById("mode");
const screen = document.querySelector(".fullscreen");

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}
//Sound_mouse
const startSound = (event) => {
  event.target.classList.add("piano-key-active");
  event.target.classList.add("piano-key-active-pseudo");
  if (event.target.classList.contains("piano-key")) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
};
const stopSound = (event) => {
  event.target.classList.remove("piano-key-active");
  event.target.classList.remove("piano-key-active-pseudo");
};

const startCorrespondOver = (event) => {
  event.target.classList.add("piano-key-active");
  event.target.classList.add("piano-key-active-pseudo");
  if (event.target.classList.contains("piano-key-active")) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
  collection.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};
const stopCorrespondOver = () => {
  collection.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.classList.remove("piano-key-active-pseudo");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);
//Sound_mouse_end
//
//sound_keybord
const kbdSound = (event) => {
  collection.forEach((elem) => {
    if (event.code[3] === elem.dataset.letter) {
      const ltr = elem.dataset.note;
      const path = `assets/audio/${ltr}.mp3`;
      console.log(event.code[3]);
      // console.log(ltr);
      // console.log(path);
      elem.classList.add("piano-key-active");
      elem.classList.add("piano-key-active-pseudo");
      playAudio(path);
    }
  });
};
const kbdRemove = (event) => {
  collection.forEach((elem) => {
    if (event.code[3] === elem.dataset.letter) {
      elem.classList.remove("piano-key-active");
      elem.classList.remove("piano-key-active-pseudo");
    }
  });
};
window.addEventListener("keydown", kbdSound);
window.addEventListener("keyup", kbdRemove);
//sound_keybord_end
//
//notes-or-letters
const notesLetters = (event) => {
  btns.forEach((elem) => {
    elem.classList.remove("btn-active");
  });
  if (event.target.classList.contains("btn-letters")) {
    collection.forEach((elem) => {
      elem.classList.add("piano-key-letter");
    });
  }
  if (event.target.classList.contains("btn-notes")) {
    collection.forEach((elem) => {
      elem.classList.remove("piano-key-letter");
    });
  }
  event.target.classList.add("btn-active");
};
mode.addEventListener("mousedown", notesLetters);
//notes-or-letters-end
//
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
screen.addEventListener("mousedown", fullscreen);
