// const refs = {
//   openModalBtn: document.querySelector("[data-modal-open]"),
//   closeModalBtn: document.querySelector("[data-modal-close]"),
//   modal: document.querySelector("[data-modal]"),
//   options: document.querySelector(".nav__option"),
// };

//-Header--------------------------------------//

const select = document.querySelector(".nav__page.select");
const optionsBox = document.querySelector(".nav__options");

select.addEventListener("click", toggleSelect);
optionsBox.addEventListener("click", toggleSelect);

function toggleSelect() {
  optionsBox.classList.toggle("is-hidden");
}

//-Hero----------------------------------------//

function heroSlyder() {
  const liHero = document.querySelectorAll(".hero__slide");
  const ulHero = document.querySelector(".hero__slider");

  const array = [...liHero];

  array.unshift(array[array.length - 1]);
  array.pop();

  ulHero.innerHTML = array.map((e) => e.outerHTML).join("");
}

setInterval(heroSlyder, 3000);

//-Recom---------------------------------------//

let cards = document.querySelectorAll(".recommendation__slide");
const ulRecom = document.querySelector(".recommendation__slides");

let liRecom = cards;

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

let min = 0;
let max = Math.floor(vw / 380);

const inputs = document.querySelectorAll(".recommendation__input");
const labels = document.querySelectorAll(".recommendation__label");
const icons = document.querySelectorAll(".recommendation__span");
const texts = document.querySelectorAll(".recommendation__icon-radio");

inputs.forEach((input) => input.addEventListener("click", onInputClick));

function onInputClick(e) {
  if (e.target.getAttribute("checked") === "true") {
    e.target.setAttribute("checked", "false");
    labels.forEach((el) =>
      el.classList.contains(e.target.value)
        ? (el.style.backgroundColor = "#ffffff")
        : ""
    );
    icons.forEach((el) =>
      el.classList.contains(e.target.value) ? (el.style.fill = "#888B97") : ""
    );
    texts.forEach((el) =>
      el.classList.contains(e.target.value) ? (el.style.color = "#888B97") : ""
    );
    min = 0;
    max = Math.floor(vw / 380);
    liRecom = cards;
    recomSlyder(min, max, [...cards]);
    return;
  } else {
    e.target.setAttribute("checked", "true");
    inputs.forEach((el) =>
      !el.classList.contains(e.target.value)
        ? el.setAttribute("checked", "false")
        : ""
    );
    labels.forEach((el) =>
      el.classList.contains(e.target.value)
        ? (el.style.backgroundColor = "#D1FAE5")
        : (el.style.backgroundColor = "#ffffff")
    );
    icons.forEach((el) =>
      el.classList.contains(e.target.value)
        ? (el.style.fill = "#10B981")
        : (el.style.fill = "#888B97")
    );
    texts.forEach((el) =>
      el.classList.contains(e.target.value)
        ? (el.style.color = "#10B981")
        : (el.style.color = "#888B97")
    );
  }

  const array = [...cards];

  const insert = array.filter(
    (el) => el.attributes.property.value === e.target.value
  );

  ulRecom.innerHTML = insert.map((e) => e.outerHTML).join("");

  liRecom = document.querySelectorAll(".recommendation__slide");
  min = 0;
  max =
    Math.floor(vw / 380) > liRecom.length
      ? liRecom.length
      : Math.floor(vw / 380);
  recomSlyder(min, max, [...liRecom]);
}

//--

const btns = document.querySelectorAll(".recommendation__btn");
liRecom = document.querySelectorAll(".recommendation__slide");

btns.forEach((btn) => btn.addEventListener("click", move));

recomSlyder(min, max, [...liRecom]);

function recomSlyder(min, max, array) {
  checkEnd(min, max, liRecom);
  const insert = array.slice(min, max);
  ulRecom.innerHTML = insert.map((e) => e.outerHTML).join("");
}

function move(e) {
  if (e.currentTarget.classList.contains("left") && min !== 0) {
    min -= 1;
    max -= 1;

    recomSlyder(min, max, [...liRecom]);
  } else if (
    e.currentTarget.classList.contains("right") &&
    max < liRecom.length
  ) {
    min += 1;
    max += 1;

    recomSlyder(min, max, [...liRecom]);
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

//-Sell----------------------------------------//

function sellSlyder() {
  let liSell = document.querySelectorAll(".sell__slide");
  const sellCards = [...liSell];

  for (let i = 0; i < sellCards.length; i++) {
    const id = Number(sellCards[i].children[0].id.split("_0")[1]);

    const newSrc = sellCards[i].children[0]
      .getAttribute("src")
      .replaceAll(`_0${id}`, `_0${id !== sellCards.length ? id + 1 : 1}`);
    const newSrcset = sellCards[i].children[0]
      .getAttribute("srcset")
      .replaceAll(`_0${id}`, `_0${id !== sellCards.length ? id + 1 : 1}`);
    const newId = sellCards[i].children[0]
      .getAttribute("id")
      .replaceAll(`_0${id}`, `_0${id !== sellCards.length ? id + 1 : 1}`);

    sellCards[i].children[0].setAttribute("src", newSrc);
    sellCards[i].children[0].setAttribute("srcset", newSrcset);
    sellCards[i].children[0].setAttribute("id", newId);
  }
}

let intervalId = setInterval(sellSlyder, 5000);

const sell = document.querySelector(".sell__right-side");
sell.addEventListener("mouseover", () => clearInterval(intervalId));
sell.addEventListener("mouseout", () => {
  intervalId = setInterval(sellSlyder, 5000);
});

const openModalBtn = document.querySelector("[data-modal-open]");
const closeModalBtn = document.querySelector("[data-modal-close]");
const modal = document.querySelector("[data-modal-window]");

openModalBtn.addEventListener("click", (e) => {
  if (!modal.classList.contains("is-hidden")) {
    closeModal(e);
  } else if (
    !e.target.classList.contains("modal__btn-close") &&
    !e.target.classList.contains("modal__close-icon") &&
    !e.target.classList.contains("modal__close-icon-use")
  ) {
    openModal(e);
    clearInterval(intervalId);
  }
});

function closeByEsc(e) {
  if (e.code === "Escape") {
    closeModal(e);
  }
}

function closeByButton(e) {
  closeModal(e);
}

function closeModal(e) {
  modal.classList.add("is-hidden");
  window.removeEventListener("keydown", closeByEsc);
  intervalId = setInterval(sellSlyder, 5000);
}

function openModal(e) {
  window.addEventListener("keydown", closeByEsc);
  closeModalBtn.addEventListener("click", closeByButton);

  const div = document.querySelector(".modal");

  const img = div.querySelector("img");
  if (img) {
    div.removeChild(img);
  }
  if (e.target.nodeName === "IMG") {
    div.insertAdjacentHTML("beforeend", e.target.outerHTML);
  }
  modal.classList.remove("is-hidden");
}

//-Review--------------------------------------//

const reviewBtns = document.querySelectorAll(".review__dot-button");

const slidesContainer = document.querySelector(".review__slides-container");
const reviewUl = document.querySelector(".review__slides");

let pressed = false;
let startX;
let x;

slidesContainer.addEventListener("mousedown", (e) => {
  pressed = true;
  startX = e.offsetX - reviewUl.offsetLeft;
  slidesContainer.style.cursor = "grabbing";
});

slidesContainer.addEventListener("mouseenter", () => {
  slidesContainer.style.cursor = "grab";
});

slidesContainer.addEventListener("mouseleave", () => {
  slidesContainer.style.cursor = "default";
});

slidesContainer.addEventListener("mouseup", () => {
  slidesContainer.style.cursor = "grab";
  pressed = false;
});

slidesContainer.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;

  reviewUl.style.left = `${x - startX}px`;

  checkBoundary();
});

function checkBoundary() {
  let outer = slidesContainer.getBoundingClientRect();
  let inner = reviewUl.getBoundingClientRect();

  if (parseInt(reviewUl.style.left) > inner.width * 0.5) {
    reviewUl.style.left = `${inner.width * 0.5}px`;
  }

  if (inner.right < outer.right) {
    reviewUl.style.left = `-${inner.width * 0.5 - outer.width}px`;
  }

  switch (true) {
    case Number(reviewUl.style.left.split("px")[0]) >
      inner.width * 0.5 - outer.width / 3:
      reviewBtns.forEach((btn) =>
        btn.id != 1
          ? btn.classList.remove("active")
          : btn.classList.add("active")
      );
      break;
    case Number(reviewUl.style.left.split("px")[0]) <=
      inner.width * 0.5 - outer.width / 3 &&
      Number(reviewUl.style.left.split("px")[0]) >=
        outer.width * 1.3 - inner.width * 0.5:
      reviewBtns.forEach((btn) =>
        btn.id != 2
          ? btn.classList.remove("active")
          : btn.classList.add("active")
      );
      break;
    case Number(reviewUl.style.left.split("px")[0]) <
      outer.width * 1.3 - inner.width * 0.5:
      reviewBtns.forEach((btn) =>
        btn.id != 3
          ? btn.classList.remove("active")
          : btn.classList.add("active")
      );
      break;
  }
}

reviewBtns.forEach((btn, index) =>
  btn.addEventListener("click", (e) => onDotClick(btn, index))
);

function onDotClick(btn, index) {
  let outer = slidesContainer.getBoundingClientRect();
  let inner = reviewUl.getBoundingClientRect();

  switch (index) {
    case 0:
      reviewUl.style.left = `${inner.width * 0.5}px`;
      btn.classList.add("active");
      reviewBtns.forEach((el) => {
        if (el.id != index + 1) {
          el.classList.remove("active");
        }
      });

      break;
    case 1:
      reviewUl.style.left = `${outer.width * 0.5}px`;
      btn.classList.add("active");
      reviewBtns.forEach((el) => {
        if (el.id != index + 1) {
          el.classList.remove("active");
        }
      });
      break;
    case 2:
      reviewUl.style.left = `-${inner.width * 0.5 - outer.width}px`;
      btn.classList.add("active");
      reviewBtns.forEach((el) => {
        if (el.id != index + 1) {
          el.classList.remove("active");
        }
      });
      break;
    default:
      reviewUl.style.left = `${outer.width}px`;
  }
}
