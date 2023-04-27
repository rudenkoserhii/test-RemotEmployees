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

checkEnd(min, max, liRecom)

function recomSlyder() {}

function move(e) {
//   checkEnd();


  const array = [...liRecom];
console.log(e.target)
  if (e.target.classList.contains("left") && min !== 0) {
min -= 1;
max -+ 1;
  } else if (e.target.classList.contains("right") && max < liRecom.length) {
min += 1;
max += 1;
}

  array.unshift(array[array.length - 1]);
  array.pop();

  ulRecom.innerHTML = array.map((e) => e.outerHTML).join("");
}

function checkEnd(min, max, liRecom) {
console.log(min)
console.log(max)
console.log(liRecom.length)
// console.log(min)

  if (max === liRecom.length) {
console.log('max')
    btns.forEach((btn) => {
console.log(btn.classList)
      if (btn.classList.contains("right")) {
console.log('right')
        btn.classList.add("end");
        btn.style.pointerEvents = 'none';
console.log(btn.classList)

      }
//  else {
//         btn.classList.remove("end");
//         btn.style.pointerEvents = 'auto';
// }
    });
  }


if (min === 0) {
console.log('min')

    btns.forEach((btn) => {
      if (btn.classList.contains("left")) {
console.log('left')

        btn.classList.add("end");
        btn.style.pointerEvents = 'none';
console.log(btn.classList)
      } 
// else {
//         btn.classList.remove("end");
//         btn.style.pointerEvents = 'auto';
// }
    });
  } 

//  {
//     btns.forEach((btn) => {
//       btn.classList.remove("end");
//         btn.style.pointerEvents = 'auto';
//     });
//   }
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
