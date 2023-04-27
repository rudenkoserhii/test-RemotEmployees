const refs = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
  select: document.querySelector(".nav__page.select"),
  optionsBox: document.querySelector(".nav__options"),
  options: document.querySelector(".nav__option"),
};

refs.select.addEventListener("click", toggleSelect);
refs.optionsBox.addEventListener("click", toggleSelect);

//---------------------------------------------//

function heroSlyder() {
  const liHero = document.querySelectorAll(".hero__slide");
  const ulHero = document.querySelector(".hero__slider");

  const array = [...liHero];

  array.unshift(array[array.length - 1]);
  array.pop();

  ulHero.innerHTML = array.map((e) => e.outerHTML).join("");
}

setInterval(heroSlyder, 3000);

//---------------------------------------------//

const btns = document.querySelectorAll(".recommendation__btn");
const liRecom = document.querySelectorAll(".recommendation__slide");
const ulRecom = document.querySelector(".recommendation__slides");

btns.forEach((btn) => btn.addEventListener("click", move));

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

let min = 0;
let max = Math.floor(vw / 380);

checkEnd(min, max, liRecom);
recomSlyder(min, max);

function recomSlyder(min, max) {
  const array = [...liRecom];
  const insert = array.slice(min, max);
  ulRecom.innerHTML = insert.map((e) => e.outerHTML).join("");
}

function move(e) {
  if (e.currentTarget.classList.contains("left") && min !== 0) {
    min -= 1;
    max -= 1;

    checkEnd(min, max, liRecom);
    recomSlyder(min, max);
  } else if (
    e.currentTarget.classList.contains("right") &&
    max < liRecom.length
  ) {
    min += 1;
    max += 1;

    checkEnd(min, max, liRecom);
    recomSlyder(min, max);
  }
}

function checkEnd(min, max, liRecom) {
  btns.forEach((btn) => {
    if (max === liRecom.length) {
      if (btn.classList.contains("right")) {
        btn.classList.add("end");
        btn.style.pointerEvents = "none";
      }
    } else {
      if (btn.classList.contains("right")) {
        btn.classList.remove("end");
        btn.style.pointerEvents = "auto";
      }
    }
    if (min === 0) {
      if (btn.classList.contains("left")) {
        btn.classList.add("end");
        btn.style.pointerEvents = "none";
      }
    } else {
      if (btn.classList.contains("left")) {
        btn.classList.remove("end");
        btn.style.pointerEvents = "auto";
      }
    }
  });
}

//---------------------------------------------//

function toggleSelect() {
  refs.optionsBox.classList.toggle("is-hidden");
}

(() => {
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
