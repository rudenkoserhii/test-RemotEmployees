const refs = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
  options: document.querySelector(".nav__option"),
};

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

//-Review--------------------------------------//

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
const modal = document.querySelector("[data-modal]");

(() => {
  openModalBtn.addEventListener("click", (e) => {
    toggleModal(e);
    clearInterval(intervalId);
  });
  closeModalBtn.addEventListener("click", (e) => {
    toggleModal(e);
    intervalId = setInterval(sellSlyder, 5000);
  });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      toggleModal(e);
      intervalId = setInterval(sellSlyder, 5000);
    }
  });

  function toggleModal(e) {
    modal.classList.toggle("is-hidden");
    const div = modal.querySelector(".modal");
    const button = div.querySelector("button");
    div.innerHTML = "";
    div.insertAdjacentHTML("beforeend", button.outerHTML);

    const img = div.querySelector("img");
    if (img) {
      div.removeChild(img);
    }
    if (e.target.nodeName === "IMG") {
      div.insertAdjacentHTML("beforeend", e.target.outerHTML);
    }
  }
})();
