function heroSlyder() {
  const liHero = document.querySelectorAll(".hero__slide");
  const ulHero = document.querySelector(".hero__slider");

  const array = [...liHero];

  array.unshift(liHero[liHero.length - 1]);
  array.pop();

  ulHero.innerHTML = array.map((e) => e.outerHTML).join("");
}
setInterval(heroSlyder, 3000);
